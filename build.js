/* ============================================================
   Calquary — static site builder
   Reads js/calculators-data.js (a plain browser script — no
   module.exports) and generates one HTML page per tool and
   per category from the templates in _templates/, plus a
   sitemap.xml listing every generated page.

   Wave-one i18n (es/fr/de): every generated page is STATIC per
   locale — title, h1, intro, FAQ, and meta are baked into the HTML
   string at build time from js/i18n.js, not swapped in by
   client-side JS after load. That distinction is deliberate: an
   earlier prototype approach (proven wrong on a sibling project)
   populated this content via JS reading from a live data object,
   which means a crawler only ever sees the English page source.
   The interactive calculator widget itself (fields/compute/results)
   stays JS-rendered and English-labeled across all locales for wave
   one — see js/i18n.js's header comment for why that's a deliberate
   scope line, not an oversight.

   Run with: node build.js
   ============================================================ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execSync } = require("child_process");

const ROOT = __dirname;
const SITE_URL = "https://calquary.com";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// "en" = site root (no prefix). Locale build order also controls hreflang
// link order in the <head> of every generated page.
const LOCALES = ["en", "es", "fr", "de", "pt", "it", "ja", "ro", "el", "zh", "ar", "th"];
const OG_LOCALE = { en: "en_US", es: "es_ES", fr: "fr_FR", de: "de_DE", pt: "pt_PT", it: "it_IT", ja: "ja_JP", ro: "ro_RO", el: "el_GR", zh: "zh_CN", ar: "ar_AR", th: "th_TH" };

// Wave-one tool batch: prioritized from the qualitative volume signals in
// seo/keyword-research-*.md (DataForSEO was down for that whole research
// pass, so these are "Very High"/"High" tier calls, not sourced numbers —
// see those files' own data-note). Picked to also spread across all 8
// categories rather than clustering in Finance/Health, so every category
// hub has at least one working localized tool page in wave one.
const WAVE_ONE_TOOL_IDS = [
  "percentage-calculator", "average-calculator",
  "mortgage-calculator", "loan-calculator", "compound-interest-calculator",
  "concrete-calculator", "flooring-calculator",
  "calorie-calculator", "bmi-calculator", "bmr-calculator",
  "age-calculator", "days-until-calculator",
  "unit-length-converter", "temperature-converter",
  "word-counter", "case-converter",
  "dog-age-calculator", "cat-age-calculator",
  // Wave two: added after users hit untranslated tool pages on non-English
  // locales (cat-pregnancy-calculator specifically) - a second batch
  // picked for general, cross-locale relevance rather than US-specific
  // tools (sales-tax, tip) alone.
  "cat-pregnancy-calculator", "dog-pregnancy-calculator",
  "simple-interest-calculator", "sales-tax-calculator",
  "tip-calculator", "discount-calculator",
  "gpa-calculator", "body-fat-calculator",
  // Wave three: full-catalog translation pass, added batch by batch across
  // all 8 categories until every calculator is covered.
  "amortization-schedule-calculator", "mortgage-payoff-calculator",
  "heloc-calculator", "home-affordability-calculator", "hourly-to-salary-calculator",
  "time-card-calculator", "savings-calculator", "tvm-solver", "irr-npv-calculator", "budget-calculator",
  "apr-to-apy-calculator", "price-calculator", "debt-payoff-calculator", "dti-ratio-calculator",
  "credit-card-payoff-calculator", "auto-loan-calculator", "investment-calculator",
  "retirement-401k-calculator", "bond-duration-calculator", "gas-trip-cost-calculator",
  "paint-calculator", "mulch-calculator", "gravel-calculator", "drywall-calculator",
  "tile-calculator", "roofing-calculator", "square-footage-calculator",
  "fence-calculator", "insulation-calculator", "ac-btu-calculator",
  "lumber-calculator", "paver-calculator", "mix-ratio-calculator",
  "height-percentile-calculator", "body-surface-area-calculator", "macro-calculator",
  "water-intake-calculator", "one-rep-max-calculator", "heart-rate-zone-calculator",
  "ideal-weight-calculator", "bra-size-calculator", "pace-calculator",
  "steps-to-miles-calculator", "pregnancy-due-date-calculator", "ovulation-calculator",
  "calories-burned-calculator",
  "dog-food-calculator", "rabbit-age-calculator", "horse-age-calculator", "ideal-dog-weight-calculator",
  "date-duration-calculator", "business-days-calculator", "time-duration-calculator", "time-add-calculator",
  "online-timer", "online-alarm-clock", "online-stopwatch",
  "current-time", "random-date-generator", "military-time-converter", "unix-timestamp-converter",
  "week-number-calculator", "time-zone-converter", "daylight-saving-time-calculator",
  "sunrise-sunset-calculator", "sun-position-calculator", "day-of-week-calculator",
  "leap-year-calculator", "birth-year-calculator", "time-zone-meeting-planner", "day-of-the-week-calculator",
  "screen-ppi-calculator", "print-dpi-calculator", "time-unit-converter", "oven-temperature-converter",
  "rainfall-volume-calculator", "water-density-calculator", "weight-converter",
  "volume-converter", "cooking-converter", "microwave-wattage-converter",
  "electricity-cost-calculator", "ppm-percent-converter", "speed-converter", "area-converter",
  "data-storage-converter", "pressure-converter", "torque-converter", "fuel-economy-converter",
  "gear-ratio-calculator", "tire-size-calculator", "weather-comfort-calculator",
  // Text category, batch 1
  "color-difference-checker", "list-shuffler", "weighted-random-picker",
  "password-generator", "uuid-generator", "random-number-generator", "coin-flipper",
  // Text category, batch 2
  "dice-roller", "card-deck-shuffler", "color-mixer", "lorem-ipsum-generator",
  "text-to-slug-generator", "binary-to-text-converter", "word-frequency-counter",
  // Text category, batch 3 (final)
  "url-encoder-decoder", "ip-subnet-calculator", "json-compare",
  "cidr-calculator", "group-randomizer",
  // Math category, batch 1
  "percentage-change-calculator", "fraction-calculator", "pi-digits-calculator",
  "long-division-calculator", "long-multiplication-calculator", "gcd-lcm-calculator",
  "factor-calculator",
  // Math category, batch 2
  "standard-deviation-calculator", "t-test-calculator", "effect-size-calculator",
  "mann-whitney-u-calculator", "sequences-series-calculator", "coupon-collector-calculator",
  "similarity-ratio-calculator",
  // Math category, batch 3
  "correlation-calculator", "z-score-calculator", "confusion-matrix-calculator",
  "odds-probability-converter", "normal-distribution-calculator", "lottery-odds-calculator",
  "poker-hand-probability-calculator",
  // Math category, batch 4
  "square-root-calculator", "ratio-calculator", "aspect-ratio-calculator",
  "exponent-calculator", "logarithm-calculator", "vector-calculator",
  "haversine-distance-calculator",
  // Math category, batch 5
  "quadratic-formula-calculator", "cone-volume-calculator", "cylinder-volume-calculator",
  "pythagorean-theorem-calculator", "distance-formula-calculator", "triangle-solver",
  "hypergeometric-calculator",
];

function loadData() {
  const src = fs.readFileSync(path.join(ROOT, "js/calculators-data.js"), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(src + "\nthis.CATEGORIES = CATEGORIES; this.CALCULATORS = CALCULATORS;", sandbox);
  return { categories: sandbox.CATEGORIES, calculators: sandbox.CALCULATORS };
}

function loadI18n() {
  const src = fs.readFileSync(path.join(ROOT, "js/i18n.js"), "utf8");
  const sandbox = { module: {} };
  vm.createContext(sandbox);
  vm.runInContext(
    src + "\nthis.I18N_UI = I18N_UI; this.I18N_CATEGORIES = I18N_CATEGORIES; this.I18N_TOOLS = I18N_TOOLS; this.I18N_STATIC = I18N_STATIC;",
    sandbox
  );
  return {
    ui: sandbox.I18N_UI,
    categories: sandbox.I18N_CATEGORIES,
    tools: sandbox.I18N_TOOLS,
    static: sandbox.I18N_STATIC,
  };
}

// English UI strings, kept in the same shape as I18N_UI[locale] so every
// template-filling function can treat "en" uniformly instead of branching.
const EN_UI = {
  catSuffix: "Calculators",
  nav: { categories: "Categories", allTools: "All tools", about: "About" },
  footer: {
    categoriesHeader: "Categories", popularHeader: "Popular", siteHeader: "Site",
    allCategories: "All categories", allTools: "All tools", allCalculators: "All calculators",
    about: "About", contact: "Contact", privacy: "Privacy", terms: "Terms",
    tagline: "A reference index of fast, accurate calculators - built for people who just need the answer.",
    copyright: "© 2026 Calquary. Calculators are provided for informational purposes and are not a substitute for professional advice.",
  },
  buttons: { findIt: "Find it", browseAll: "Browse all →", calculate: "Calculate", reset: "Reset", backToAll: "← Back to all calculators" },
  labels: {
    relatedTools: "Related tools",
    accuracyTitle: "A note on accuracy",
    accuracyText: "Calquary's calculators are built for quick, reliable estimates. For decisions with real financial, structural, or medical stakes, confirm with a qualified professional.",
    lastUpdated: "Last updated:",
    faqTitle: "Frequently asked questions",
    breadcrumbHome: "Calquary",
  },
  hero: {
    eyebrow: "Reference index · calculators for everything",
    h1: "Find the exact calculator you need - fast.",
    lede: "Calquary organizes calculators the way a good reference library organizes books: by subject, with plain answers and no clutter. Math, money, home projects, health, and more.",
    statLabel: "calculators live and counting",
    lookupTag: "LOOKUP",
    placeholder: "Try 'concrete', 'BMI', 'loan'...",
    hint: "Or browse by category below.",
  },
  sections: {
    browseKicker: "Browse", browseH2: "Every category, one shelf each",
    popularKicker: "Popular right now", popularH2: "Featured tools",
    recentKicker: "Just added", recentH2: "Recently added",
    faqKicker: "Good to know", faqH2: "Frequently asked questions",
  },
  homeFaq: [
    { q: "What is Calquary?", a: "Calquary is a reference index of fast, accurate calculators, organized by subject like a library instead of scattered across ads and unrelated content. Pick a category, open a tool, get your answer." },
    { q: "Are these calculators free to use?", a: "Yes - every calculator on Calquary is free, with no account, sign-up, or paywall. Just open a tool and use it." },
    { q: "How accurate are Calquary's calculators?", a: "Each calculator uses a standard, verified formula for its category, and every tool is checked against hand-calculated results before it's published. For decisions with real financial, structural, or medical stakes, confirm with a qualified professional." },
    { q: "Do you store any of my data?", a: "No - every calculator runs entirely in your browser. The numbers you enter are never sent to a server or stored anywhere; closing the tab clears everything." },
    { q: "How many calculators does Calquary have?", a: 'As of today, Calquary has <span id="faq-tool-count">—</span> calculators across 8 categories, and the catalog keeps growing.' },
    { q: "How often are new calculators added?", a: "There's no fixed schedule, but the catalog has grown steadily since launch - new calculators are added in batches by category, each one built and verified before it's published." },
  ],
};

function uiFor(I18N, locale) {
  return locale === "en" ? EN_UI : I18N.ui[locale];
}

function isoToDisplay(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

// Per-calculator "last updated" date, sourced from real git history rather
// than file mtime (which would just show "today" for every page after any
// rebuild, since tool/*.html regenerates every run). Each calculator's date
// is the max (most recent) commit time across the line range of its own
// object in the array — so an FAQ edit or a diagram added to just that one
// calculator correctly updates only its own date.
//
// This deliberately runs one `git blame -L <range>` call PER calculator
// rather than a single whole-file blame pass. Reason (found by testing, not
// assumed): every uncommitted working-tree line shares the same all-zero
// "Not Committed Yet" pseudo-commit hash, and git's porcelain output only
// prints full metadata (including committer-time) the FIRST time a given
// hash appears — every later uncommitted hunk elsewhere in the file gets
// silently collapsed to a hash-only line with no timestamp. A single
// whole-file parse therefore stamps every uncommitted calculator with
// whichever uncommitted edit happens to appear earliest in the file, not its
// own actual edit time. Scoping the blame call per calculator sidesteps this
// since each call independently sees its own range's first occurrence.
function computeCalculatorDates(calculators) {
  const filePath = "js/calculators-data.js";
  const lines = fs.readFileSync(path.join(ROOT, filePath), "utf8").split("\n");

  const idLineNumbers = [];
  lines.forEach((line, i) => {
    const m = line.match(/^\s*id:\s*"([^"]+)"/);
    if (m) idLineNumbers.push({ id: m[1], line: i + 1 });
  });

  const dates = {};
  idLineNumbers.forEach((entry, i) => {
    const start = entry.line;
    const end = i + 1 < idLineNumbers.length ? idLineNumbers[i + 1].line - 2 : lines.length;
    const blameOut = execSync(
      `git blame --porcelain -L ${start},${end} -- ${filePath}`,
      { cwd: ROOT, maxBuffer: 1024 * 1024 * 20 }
    ).toString();
    let maxTime = 0;
    for (const bl of blameOut.split("\n")) {
      if (bl.startsWith("committer-time ")) {
        const t = parseInt(bl.slice("committer-time ".length), 10);
        if (t > maxTime) maxTime = t;
      }
    }
    dates[entry.id] = new Date(maxTime * 1000).toISOString().slice(0, 10);
  });

  calculators.forEach((c) => {
    c.dateModified = dates[c.id] || new Date().toISOString().slice(0, 10);
  });
  return dates;
}

// Same git-history approach for standalone files (homepage, static pages) —
// keeps the whole sitemap on one real date source instead of a mix of real
// dates for some pages and "today" for others. `git log` alone only sees
// committed history, so a file with uncommitted working-tree edits (true for
// most of this project's files right now) would otherwise show its last
// *commit* date rather than reflecting the newer uncommitted content —
// checked for and dated as "today" first.
function getFileLastModDate(relPath) {
  try {
    const status = execSync(`git status --porcelain -- ${relPath}`, { cwd: ROOT }).toString().trim();
    if (status) return new Date().toISOString().slice(0, 10);
    const out = execSync(`git log -1 --format=%cd --date=short -- ${relPath}`, { cwd: ROOT }).toString().trim();
    return out || new Date().toISOString().slice(0, 10);
  } catch (e) {
    return new Date().toISOString().slice(0, 10);
  }
}

// Same default-values-in, compute()-out pattern index.html's JS uses to
// preview a live readout on each tool card, reused here at build time so the
// OG image can show a real sample result instead of a blank/generic card.
function computeSampleResult(calc) {
  const inputs = {};
  calc.fields.forEach((f) => {
    inputs[f.id] = f.type === "checkbox-group" ? (f.default || []) : f.default;
  });
  return calc.compute(inputs);
}

// ---- URL helpers -------------------------------------------------------

function localePath(locale) {
  return locale === "en" ? "" : `${locale}/`;
}
const RTL_LOCALES = ["ar"];
function htmlDirAttr(locale) {
  return RTL_LOCALES.includes(locale) ? ' dir="rtl"' : "";
}
function toolUrl(locale, id) {
  return `${SITE_URL}/${localePath(locale)}tool/${id}.html`;
}
function categoryUrl(locale, id) {
  return `${SITE_URL}/${localePath(locale)}category/${id}.html`;
}
function homeUrl(locale) {
  return `${SITE_URL}/${localePath(locale)}index.html`;
}
function staticUrl(locale, page) {
  return `${SITE_URL}/${localePath(locale)}${page}`;
}

// hreflang <link> block for a page that exists in `builtLocales` (a subset
// of LOCALES) — reciprocal by construction, since every page in the set
// links to every other page in the same set plus x-default (English).
function hreflangLinks(urlFor, builtLocales) {
  const HREFLANG_CODE = { en: "en", es: "es", fr: "fr", de: "de", pt: "pt", it: "it", ja: "ja", ro: "ro", el: "el", zh: "zh-Hans", ar: "ar", th: "th" };
  const lines = builtLocales.map(
    (loc) => `  <link rel="alternate" hreflang="${HREFLANG_CODE[loc]}" href="${urlFor(loc)}">`
  );
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${urlFor("en")}">`);
  return lines.join("\n");
}

// Visible language switcher for the header — reuses the exact same
// urlFor()/builtLocales pair each page already computes for its hreflang
// block, so it always points at the equivalent page in each locale (the
// same tool/category/static page, not just that locale's homepage), and
// only offers locales that actually exist for this page (an untranslated
// tool page only ever built "en", so no dead links to a missing translation).
const LOCALE_LABEL = { en: "EN", es: "ES", fr: "FR", de: "DE", pt: "PT", it: "IT", ja: "JA" };
const LOCALE_LABEL_FULL = { en: "English", es: "Español", fr: "Français", de: "Deutsch", pt: "Português", it: "Italiano", ja: "日本語", ro: "Română", el: "Ελληνικά", zh: "中文", ar: "العربية", th: "ไทย" };
const GLOBE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9s1.3-6.5 3.8-9z"/></svg>';

// One dropdown control, not an always-visible EN·ES·FR·DE link row — the
// trigger shows only the current locale; the menu (hidden until the
// trigger is clicked — see js/locale-switcher.js) lists the others. Root-
// relative hrefs, not the full https://calquary.com/... URL urlFor()
// returns for hreflang (which correctly wants an absolute URL there) — an
// absolute href here would jump a local/staging preview off to the real
// production domain instead of staying on the current host (this was a
// real bug caught and fixed in an earlier pass — root-relative here is
// deliberate, not an oversight).
function localeSwitcherHtml(currentLocale, urlFor, builtLocales) {
  if (builtLocales.length <= 1) return ""; // nothing to switch to on an untranslated page
  const items = builtLocales
    .map((loc) =>
      loc === currentLocale
        ? `<span class="locale-item current" role="menuitem" aria-current="true">${LOCALE_LABEL_FULL[loc]}</span>`
        : `<a class="locale-item" role="menuitem" href="${urlFor(loc).replace(SITE_URL, "")}">${LOCALE_LABEL_FULL[loc]}</a>`
    )
    .join("");
  return `<div class="locale-switcher">
          <button type="button" class="locale-trigger" aria-haspopup="true" aria-expanded="false" aria-label="Change language, current: ${LOCALE_LABEL_FULL[currentLocale]}">
            ${GLOBE_ICON}
            <span>${LOCALE_LABEL[currentLocale]}</span>
          </button>
          <div class="locale-menu" role="menu">${items}</div>
        </div>`;
}

// ---- Shared meta/schema helpers (unchanged behavior for English) -------

function toLdJsonScript(graph) {
  const schema = { "@context": "https://schema.org", "@graph": graph };
  // Escape "</" so no FAQ answer or description can accidentally close the script tag early.
  const json = JSON.stringify(schema, null, 2).split("</").join("<\\/");
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

function buildToolSchema(locale, calc, cat, title, description, faq) {
  const url = toolUrl(locale, calc.id);
  const graph = [
    {
      "@type": "SoftwareApplication",
      "name": title,
      "description": description,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "url": url,
      "isAccessibleForFree": true,
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "dateModified": calc.dateModified,
      "inLanguage": locale,
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Calquary", "item": homeUrl(locale) },
        { "@type": "ListItem", "position": 2, "name": cat.name, "item": categoryUrl(locale, cat.id) },
        { "@type": "ListItem", "position": 3, "name": title, "item": url },
      ],
    },
  ];

  if (faq && faq.length) {
    graph.push({
      "@type": "FAQPage",
      "mainEntity": faq.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a },
      })),
    });
  }

  return toLdJsonScript(graph);
}

function buildCategorySchema(locale, cat, nameFull) {
  const graph = [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Calquary", "item": homeUrl(locale) },
        { "@type": "ListItem", "position": 2, "name": nameFull, "item": categoryUrl(locale, cat.id) },
      ],
    },
  ];
  return toLdJsonScript(graph);
}

// all-calculators.html stays English-only (index page over the full 77-tool
// catalog — most of those tools have no translation yet, so a localized
// version would be mostly English content under a translated wrapper).
// Privacy/Terms ARE translated (see buildLegalPage below) but carry a
// visible translationNotice banner: translated in full, not legally
// reviewed independently of the English original, which governs any
// conflict — see the completion report for the reasoning.
const STANDARD_PAGES = ["all-calculators.html"];

// Tiny blocking (non-deferred) script — must run before first paint so a
// stored dark/light preference applies immediately, not after a flash of
// the wrong theme. Kept inline rather than an external file specifically
// because an external <script> (even deferred-adjacent) would add a
// request that must complete before this can run, defeating the point.
function themeInitScript() {
  return `<script>(function(){try{var t=localStorage.getItem('calquary-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();</script>`;
}

function faviconLinks() {
  return [
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`,
    `<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">`,
    `<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">`,
    `<link rel="icon" href="/favicon.ico" sizes="any">`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`,
  ].join("\n  ");
}

// Inter has no Japanese glyphs at all — without an explicit CJK-capable
// face, the browser would silently fall back to whatever generic sans-serif
// the OS provides (Hiragino/Yu Gothic/Noto Sans CJK depending on platform),
// which is *usually* fine but is a different typeface family than the rest
// of the site and isn't guaranteed everywhere. ja pages load Noto Sans JP
// alongside Inter (in one request) rather than relying on that fallback;
// css/styles.css then prefers it via an `html[lang="ja"]` override so
// Japanese text renders in a face actually chosen for this brand, not
// whatever the visitor's OS happens to ship. Every other locale keeps the
// original Inter-only request — no extra font weight for non-Japanese pages.
function fontsLink(locale) {
  if (locale === "ja") {
    return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap">`;
  }
  if (locale === "zh") {
    return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700;800&display=swap">`;
  }
  if (locale === "ar") {
    return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap">`;
  }
  if (locale === "th") {
    return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Thai:wght@400;500;600;700;800&display=swap">`;
  }
  return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">`;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function ogMetaTags({ title, description, url, image, locale }) {
  return [
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${escapeAttr(url)}">`,
    `<meta property="og:locale" content="${OG_LOCALE[locale]}">`,
    `<meta property="og:site_name" content="Calquary">`,
    `<meta property="og:image" content="${escapeAttr(image)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(description)}">`,
    `<meta name="twitter:image" content="${escapeAttr(image)}">`,
  ].join("\n  ");
}

// ---- OG images (unchanged — English source strings only; see report) --

const OG_SAMPLE_OVERRIDES = {
  "password-generator": { label: "Generated password", value: "••••••••••••••••" },
};

function generateOgImages(ogDir, categories, calculators) {
  const specs = [];

  calculators.forEach((calc) => {
    const cat = categories.find((c) => c.id === calc.category);
    let result;
    if (OG_SAMPLE_OVERRIDES[calc.id]) {
      result = { primary: OG_SAMPLE_OVERRIDES[calc.id] };
    } else {
      try {
        result = computeSampleResult(calc);
      } catch (e) {
        result = { primary: { label: "Result", value: "—" } };
      }
    }
    specs.push({
      kind: "tool",
      output: path.join(ogDir, `${calc.id}.png`),
      categoryId: cat.id,
      categoryName: cat.name,
      title: calc.title,
      primaryLabel: result.primary.label,
      primaryValue: String(result.primary.value),
    });
  });

  categories.forEach((cat) => {
    specs.push({
      kind: "category",
      output: path.join(ogDir, `category-${cat.id}.png`),
      categoryId: cat.id,
      categoryName: cat.name,
      title: `${cat.name} Calculators`,
      toolCount: calculators.filter((c) => c.category === cat.id).length,
    });
  });

  specs.push({
    kind: "site",
    output: path.join(ogDir, "site.png"),
    categoryId: null,
    categoryName: "Reference Index",
    title: "Calquary - Calculators, Organized Like a Library",
    tagline: `${calculators.length} calculators across ${categories.length} categories, and growing`,
  });

  const batchFile = path.join(ROOT, ".og-batch.json");
  fs.writeFileSync(batchFile, JSON.stringify(specs));
  execSync(`python3 scripts/generate-og-image.py ${batchFile}`, { cwd: ROOT, stdio: "inherit" });
  fs.unlinkSync(batchFile);
}

// ---- Page builders -------------------------------------------------------

function buildToolPage(template, locale, calc, cat, I18N) {
  const ui = uiFor(I18N, locale);
  const t = locale === "en"
    ? { title: calc.title, intro: calc.intro, description: calc.description, faq: calc.faq }
    : I18N.tools[calc.id][locale];

  const url = toolUrl(locale, calc.id);
  const image = `${SITE_URL}/og-images/${calc.id}.png`;
  const faqHtml = t.faq.map((item) => `<div class="faq-item">\n<h3>${escapeHtml(item.q)}</h3>\n<p>${item.a}</p>\n</div>`).join("\n");
  // Non-English tool titles run short (compact compound words/abbreviations
  // in de/ja especially) and were flagged by an SEO audit for a too-short
  // <title> tag. Short single/two-word English titles (e.g. "BMI
  // Calculator | Calquary", 25 chars) got flagged too - only English
  // titles that are actually short get the suffix, so already-adequate
  // ones stay untouched.
  const baseEnTitle = `${t.title} | Calquary`;
  const pageTitle = locale === "en"
    ? (baseEnTitle.length < 30 ? `${t.title} - Free Online Calculator | Calquary` : baseEnTitle)
    : `${t.title} - ${ui.labels.titleSuffix} | Calquary`;

  return template
    .split("{{LANG}}").join(locale)
    .split("{{DIR}}").join(htmlDirAttr(locale))
    .split("{{FONTS_LINK}}").join(fontsLink(locale))
    .split("{{CALC_ID}}").join(calc.id)
    .split("{{TITLE}}").join(t.title)
    .split("{{PAGE_TITLE}}").join(pageTitle)
    .split("{{INTRO}}").join(t.intro)
    .split("{{DESCRIPTION}}").join(t.description)
    .split("{{FAQ_HTML}}").join(faqHtml)
    .split("{{FAQ_TITLE}}").join(ui.labels.faqTitle)
    .split("{{LAST_UPDATED_LABEL}}").join(ui.labels.lastUpdated)
    .split("{{LAST_UPDATED}}").join(isoToDisplay(calc.dateModified))
    .split("{{BTN_CALCULATE}}").join(ui.buttons.calculate)
    .split("{{BTN_RESET}}").join(ui.buttons.reset)
    .split("{{BTN_BACK_TO_ALL}}").join(ui.buttons.backToAll)
    .split("{{RELATED_TOOLS_LABEL}}").join(ui.labels.relatedTools)
    .split("{{ACCURACY_TITLE}}").join(ui.labels.accuracyTitle)
    .split("{{ACCURACY_TEXT}}").join(ui.labels.accuracyText)
    .split("{{BREADCRUMB_HOME}}").join(ui.labels.breadcrumbHome)
    .split("{{NAV_CATEGORIES}}").join(ui.nav.categories)
    .split("{{NAV_ALL_TOOLS}}").join(ui.nav.allTools)
    .split("{{NAV_ABOUT}}").join(ui.nav.about)
    .split("{{FOOTER_CONTACT}}").join(ui.footer.contact)
    .split("{{FOOTER_PRIVACY}}").join(ui.footer.privacy)
    .split("{{FOOTER_TERMS}}").join(ui.footer.terms)
    .split("{{HOME_HREF}}").join(`/${localePath(locale)}index.html`)
    .split("{{ABOUT_HREF}}").join(`/${localePath(locale)}about.html`)
    .split("{{CONTACT_HREF}}").join(`/${localePath(locale)}contact.html`)
    .split("{{PRIVACY_HREF}}").join(`/${localePath(locale)}privacy.html`)
    .split("{{TERMS_HREF}}").join(`/${localePath(locale)}terms.html`)
    .split("{{CAT_HREF}}").join(`/${localePath(locale)}category/${cat.id}.html`)
    .split("{{CAT_NAME}}").join(locale === "en" ? cat.name : I18N.categories[cat.id][locale].name)
    .split("{{FAVICON_LINKS}}").join(faviconLinks())
    .split("{{THEME_INIT}}").join(themeInitScript())
    .split("{{OG_META}}").join(ogMetaTags({ title: `${t.title} | Calquary`, description: t.description, url, image, locale }))
    .split("{{HREFLANG_LINKS}}").join(hreflangLinks((loc) => toolUrl(loc, calc.id), calc.builtLocales))
    .split("{{LOCALE_SWITCHER}}").join(localeSwitcherHtml(locale, (loc) => toolUrl(loc, calc.id), calc.builtLocales))
    .split("{{SCHEMA_JSON}}").join(buildToolSchema(locale, calc, cat, t.title, t.description, t.faq));
}

// "{name} Calculators" (en/de suffix pattern) reads as backwards, ungrammatical
// noun-adjective order in Spanish/French ("Salud y Fitness Calculadoras") — those
// two locales front the category-word instead ("Calculadoras de Salud y Fitness"),
// with the French partitive "de" elided to "d'" before a vowel-initial name.
function categoryNameFull(locale, name, ui) {
  if (locale === "es" || locale === "pt") return `${ui.catSuffix} de ${name}`;
  if (locale === "it") return `${ui.catSuffix} di ${name}`;
  if (locale === "fr") {
    const de = /^[AEIOUÀÂÉÈÊËÎÏÔÙÛÜ]/i.test(name) ? "d'" : "de ";
    return `${ui.catSuffix} ${de}${name}`;
  }
  if (locale === "ja") return `${name}${ui.catSuffix}`; // Japanese compounds without a separator
  return `${name} ${ui.catSuffix}`;
}

function buildCategoryPage(template, locale, cat, calculators, I18N) {
  const ui = uiFor(I18N, locale);
  const name = locale === "en" ? cat.name : I18N.categories[cat.id][locale].name;
  const description = locale === "en" ? cat.description : I18N.categories[cat.id][locale].description;
  const longDescription = locale === "en" ? cat.longDescription : I18N.categories[cat.id][locale].longDescription;
  const nameFull = categoryNameFull(locale, name, ui);
  const url = categoryUrl(locale, cat.id);
  const image = `${SITE_URL}/og-images/category-${cat.id}.png`;

  const translatedIds = {};
  WAVE_ONE_TOOL_IDS.forEach((id) => { translatedIds[id] = true; });

  return template
    .split("{{LANG}}").join(locale)
    .split("{{DIR}}").join(htmlDirAttr(locale))
    .split("{{FONTS_LINK}}").join(fontsLink(locale))
    .split("{{CAT_ID}}").join(cat.id)
    .split("{{CAT_NAME_FULL}}").join(nameFull)
    .split("{{CAT_DESCRIPTION}}").join(description)
    .split("{{CAT_LONG_DESCRIPTION}}").join(longDescription)
    .split("{{TRANSLATED_TOOL_IDS_JSON}}").join(JSON.stringify(translatedIds))
    .split("{{LOCALE_PATH}}").join(localePath(locale))
    .split("{{BREADCRUMB_HOME}}").join(ui.labels.breadcrumbHome)
    .split("{{BREADCRUMB_CATEGORIES}}").join(ui.nav.categories)
    .split("{{NAV_CATEGORIES}}").join(ui.nav.categories)
    .split("{{NAV_ALL_TOOLS}}").join(ui.nav.allTools)
    .split("{{NAV_ABOUT}}").join(ui.nav.about)
    .split("{{FOOTER_CONTACT}}").join(ui.footer.contact)
    .split("{{FOOTER_PRIVACY}}").join(ui.footer.privacy)
    .split("{{FOOTER_TERMS}}").join(ui.footer.terms)
    .split("{{BTN_BACK_TO_ALL}}").join(ui.buttons.backToAll)
    .split("{{HOME_HREF}}").join(`/${localePath(locale)}index.html`)
    .split("{{ABOUT_HREF}}").join(`/${localePath(locale)}about.html`)
    .split("{{CONTACT_HREF}}").join(`/${localePath(locale)}contact.html`)
    .split("{{PRIVACY_HREF}}").join(`/${localePath(locale)}privacy.html`)
    .split("{{TERMS_HREF}}").join(`/${localePath(locale)}terms.html`)
    .split("{{FAVICON_LINKS}}").join(faviconLinks())
    .split("{{THEME_INIT}}").join(themeInitScript())
    .split("{{OG_META}}").join(ogMetaTags({ title: `${nameFull} | Calquary`, description, url, image, locale }))
    .split("{{HREFLANG_LINKS}}").join(hreflangLinks((loc) => categoryUrl(loc, cat.id), LOCALES))
    .split("{{LOCALE_SWITCHER}}").join(localeSwitcherHtml(locale, (loc) => categoryUrl(loc, cat.id), LOCALES))
    .split("{{SCHEMA_JSON}}").join(buildCategorySchema(locale, cat, nameFull));
}

function buildHomePage(template, locale, categories, calculators, I18N) {
  const ui = uiFor(I18N, locale);
  const title = locale === "en"
    ? "Calquary - Calculators, Organized Like a Library"
    : `Calquary - ${ui.hero.h1}`;
  const description = locale === "en"
    ? "Fast, accurate calculators for math, finance, home improvement, health, and everyday life - organized so you can actually find the one you need."
    : ui.hero.lede;
  const url = homeUrl(locale);
  const image = `${SITE_URL}/og-images/site.png`;

  const homeFaqHtml = ui.homeFaq.map((item) => `<div class="faq-item">\n<h3>${escapeHtml(item.q)}</h3>\n<p>${item.a}</p>\n</div>`).join("\n        ");

  const popularIds = ["percentage-calculator", "loan-calculator", "bmi-calculator"];
  const footerPopularLinks = popularIds.map((id) => {
    const calc = calculators.find((c) => c.id === id);
    const label = locale === "en" ? calc.title : I18N.tools[id][locale].title;
    const href = locale === "en" ? `/tool/${id}.html` : `/${localePath(locale)}tool/${id}.html`;
    return `<li><a href="${href}">${label}</a></li>`;
  }).join("\n            ");

  const schemaGraph = [
    {
      "@type": "WebSite",
      "name": "Calquary",
      "url": url,
      "inLanguage": locale,
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": `${url}?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": ui.homeFaq.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a.replace(/<[^>]+>/g, "") },
      })),
    },
  ];

  return template
    .split("{{LANG}}").join(locale)
    .split("{{DIR}}").join(htmlDirAttr(locale))
    .split("{{FONTS_LINK}}").join(fontsLink(locale))
    .split("{{LOCALE_CODE}}").join(locale)
    .split("{{LOCALE_PATH}}").join(localePath(locale))
    .split("{{TITLE}}").join(title)
    .split("{{DESCRIPTION}}").join(description)
    .split("{{HOME_FAQ_HTML}}").join(homeFaqHtml)
    .split("{{HERO_EYEBROW}}").join(ui.hero.eyebrow)
    .split("{{HERO_H1}}").join(ui.hero.h1)
    .split("{{HERO_LEDE}}").join(ui.hero.lede)
    .split("{{HERO_STAT_LABEL}}").join(ui.hero.statLabel)
    .split("{{HERO_LOOKUP_TAG}}").join(ui.hero.lookupTag)
    .split("{{HERO_PLACEHOLDER}}").join(escapeAttr(ui.hero.placeholder))
    .split("{{HERO_HINT}}").join(ui.hero.hint)
    .split("{{BTN_FIND_IT}}").join(ui.buttons.findIt)
    .split("{{BTN_BROWSE_ALL}}").join(ui.buttons.browseAll)
    .split("{{SEC_BROWSE_KICKER}}").join(ui.sections.browseKicker)
    .split("{{SEC_BROWSE_H2}}").join(ui.sections.browseH2)
    .split("{{SEC_POPULAR_KICKER}}").join(ui.sections.popularKicker)
    .split("{{SEC_POPULAR_H2}}").join(ui.sections.popularH2)
    .split("{{SEC_RECENT_KICKER}}").join(ui.sections.recentKicker)
    .split("{{SEC_RECENT_H2}}").join(ui.sections.recentH2)
    .split("{{SEC_FAQ_KICKER}}").join(ui.sections.faqKicker)
    .split("{{SEC_FAQ_H2}}").join(ui.sections.faqH2)
    .split("{{NAV_CATEGORIES}}").join(ui.nav.categories)
    .split("{{NAV_ALL_TOOLS}}").join(ui.nav.allTools)
    .split("{{NAV_ABOUT}}").join(ui.nav.about)
    .split("{{FOOTER_TAGLINE}}").join(ui.footer.tagline)
    .split("{{FOOTER_CATEGORIES_HEADER}}").join(ui.footer.categoriesHeader)
    .split("{{FOOTER_POPULAR_HEADER}}").join(ui.footer.popularHeader)
    .split("{{FOOTER_POPULAR_LINKS}}").join(footerPopularLinks)
    .split("{{FOOTER_SITE_HEADER}}").join(ui.footer.siteHeader)
    .split("{{FOOTER_ALL_CATEGORIES}}").join(ui.footer.allCategories)
    .split("{{FOOTER_ALL_TOOLS}}").join(ui.footer.allTools)
    .split("{{FOOTER_ALL_CALCULATORS}}").join(ui.footer.allCalculators)
    .split("{{FOOTER_CONTACT}}").join(ui.footer.contact)
    .split("{{FOOTER_PRIVACY}}").join(ui.footer.privacy)
    .split("{{FOOTER_TERMS}}").join(ui.footer.terms)
    .split("{{FOOTER_COPYRIGHT}}").join(ui.footer.copyright)
    .split("{{OG_META}}").join(ogMetaTags({ title, description, url, image, locale }))
    .split("{{HREFLANG_LINKS}}").join(hreflangLinks((loc) => homeUrl(loc), LOCALES))
    .split("{{LOCALE_SWITCHER}}").join(localeSwitcherHtml(locale, (loc) => homeUrl(loc), LOCALES))
    .split("{{SCHEMA_JSON}}").join(toLdJsonScript(schemaGraph));
}

function buildAboutPage(template, locale, I18N) {
  const ui = uiFor(I18N, locale);
  const s = I18N.static.about[locale];
  const url = staticUrl(locale, "about.html");
  const image = `${SITE_URL}/og-images/site.png`;

  return template
    .split("{{LANG}}").join(locale)
    .split("{{DIR}}").join(htmlDirAttr(locale))
    .split("{{FONTS_LINK}}").join(fontsLink(locale))
    .split("{{LOCALE_PATH}}").join(localePath(locale))
    .split("{{TITLE}}").join(`${s.title} | Calquary`)
    .split("{{DESCRIPTION}}").join(s.lede)
    .split("{{ABOUT_TITLE}}").join(s.title)
    .split("{{ABOUT_LEDE}}").join(s.lede)
    .split("{{ABOUT_BODY}}").join(s.body)
    .split("{{BREADCRUMB_HOME}}").join(ui.labels.breadcrumbHome)
    .split("{{NAV_CATEGORIES}}").join(ui.nav.categories)
    .split("{{NAV_ALL_TOOLS}}").join(ui.nav.allTools)
    .split("{{NAV_ABOUT}}").join(ui.nav.about)
    .split("{{FOOTER_CONTACT}}").join(ui.footer.contact)
    .split("{{FOOTER_PRIVACY}}").join(ui.footer.privacy)
    .split("{{FOOTER_TERMS}}").join(ui.footer.terms)
    .split("{{BTN_BACK_TO_ALL}}").join(ui.buttons.backToAll)
    .split("{{OG_META}}").join(ogMetaTags({ title: `${s.title} | Calquary`, description: s.lede, url, image, locale }))
    .split("{{HREFLANG_LINKS}}").join(hreflangLinks((loc) => staticUrl(loc, "about.html"), LOCALES))
    .split("{{LOCALE_SWITCHER}}").join(localeSwitcherHtml(locale, (loc) => staticUrl(loc, "about.html"), LOCALES));
}

function buildContactPage(template, locale, I18N) {
  const ui = uiFor(I18N, locale);
  const s = I18N.static.contact[locale];
  const url = staticUrl(locale, "contact.html");
  const image = `${SITE_URL}/og-images/site.png`;

  return template
    .split("{{LANG}}").join(locale)
    .split("{{DIR}}").join(htmlDirAttr(locale))
    .split("{{FONTS_LINK}}").join(fontsLink(locale))
    .split("{{LOCALE_PATH}}").join(localePath(locale))
    .split("{{TITLE}}").join(`${s.title} | Calquary`)
    .split("{{DESCRIPTION}}").join(s.body)
    .split("{{CONTACT_TITLE}}").join(s.title)
    .split("{{CONTACT_BODY}}").join(s.body)
    .split("{{BREADCRUMB_HOME}}").join(ui.labels.breadcrumbHome)
    .split("{{NAV_CATEGORIES}}").join(ui.nav.categories)
    .split("{{NAV_ALL_TOOLS}}").join(ui.nav.allTools)
    .split("{{NAV_ABOUT}}").join(ui.nav.about)
    .split("{{FOOTER_PRIVACY}}").join(ui.footer.privacy)
    .split("{{FOOTER_TERMS}}").join(ui.footer.terms)
    .split("{{FOOTER_CONTACT}}").join(ui.footer.contact)
    .split("{{BTN_BACK_TO_ALL}}").join(ui.buttons.backToAll)
    .split("{{OG_META}}").join(ogMetaTags({ title: `${s.title} | Calquary`, description: s.body, url, image, locale }))
    .split("{{HREFLANG_LINKS}}").join(hreflangLinks((loc) => staticUrl(loc, "contact.html"), LOCALES))
    .split("{{LOCALE_SWITCHER}}").join(localeSwitcherHtml(locale, (loc) => staticUrl(loc, "contact.html"), LOCALES));
}

// Shared by privacy.html and terms.html — same section-array shape, same
// translationNotice banner, only the doc key ("privacy" vs "terms") and the
// cross-link to the other legal page differ.
function buildLegalPage(template, locale, docKey, I18N) {
  const ui = uiFor(I18N, locale);
  const doc = I18N.static[docKey][locale];
  const url = staticUrl(locale, `${docKey === "privacy" ? "privacy" : "terms"}.html`);
  const image = `${SITE_URL}/og-images/site.png`;

  const sectionsHtml = doc.sections
    .map((s) => `<h2>${escapeHtml(s.h2)}</h2>\n${s.p.map((p) => `<p>${p}</p>`).join("\n")}`)
    .join("\n\n        ");

  const noticeBlock = locale === "en"
    ? ""
    : `<section class="section"><div class="wrap"><div class="article-block" style="margin-top:0;max-width:72ch;padding:16px;background:var(--paper-mint);border-radius:var(--radius-md);font-size:0.9rem;">${I18N.static.translationNotice[locale]}</div></div></section>`;

  const otherDocKey = docKey === "privacy" ? "terms" : "privacy";
  const otherLabel = docKey === "privacy" ? ui.footer.terms : ui.footer.privacy;

  return template
    .split("{{LANG}}").join(locale)
    .split("{{DIR}}").join(htmlDirAttr(locale))
    .split("{{FONTS_LINK}}").join(fontsLink(locale))
    .split("{{LOCALE_PATH}}").join(localePath(locale))
    .split("{{TITLE}}").join(doc.title)
    .split("{{DESCRIPTION}}").join(doc.sections[0].p[0])
    .split("{{EFFECTIVE_DATE_LABEL}}").join(doc.effectiveDateLabel)
    .split("{{SECTIONS_HTML}}").join(sectionsHtml)
    .split("{{TRANSLATION_NOTICE_BLOCK}}").join(noticeBlock)
    .split("{{BREADCRUMB_HOME}}").join(ui.labels.breadcrumbHome)
    .split("{{NAV_CATEGORIES}}").join(ui.nav.categories)
    .split("{{NAV_ALL_TOOLS}}").join(ui.nav.allTools)
    .split("{{NAV_ABOUT}}").join(ui.nav.about)
    .split("{{FOOTER_CONTACT}}").join(ui.footer.contact)
    .split("{{BTN_BACK_TO_ALL}}").join(ui.buttons.backToAll)
    .split("{{OTHER_LEGAL_HREF}}").join(`/${localePath(locale)}${otherDocKey}.html`)
    .split("{{OTHER_LEGAL_LABEL}}").join(otherLabel)
    .split("{{OG_META}}").join(ogMetaTags({ title: `${doc.title} | Calquary`, description: doc.sections[0].p[0], url, image, locale }))
    .split("{{HREFLANG_LINKS}}").join(hreflangLinks((loc) => staticUrl(loc, `${docKey}.html`), LOCALES))
    .split("{{LOCALE_SWITCHER}}").join(localeSwitcherHtml(locale, (loc) => staticUrl(loc, `${docKey}.html`), LOCALES));
}

// ---- Build ---------------------------------------------------------------

function build() {
  const { categories, calculators } = loadData();
  const I18N = loadI18n();
  computeCalculatorDates(calculators); // sets calc.dateModified on every calculator

  // Which locales actually get a page for each tool — English always;
  // es/fr/de only for the wave-one batch. Stashed on the calc object so
  // hreflangLinks() can build a correct (non-reciprocal-to-nowhere) set.
  calculators.forEach((c) => {
    c.builtLocales = WAVE_ONE_TOOL_IDS.includes(c.id) ? LOCALES : ["en"];
  });

  const ogDir = path.join(ROOT, "og-images");
  fs.mkdirSync(ogDir, { recursive: true });
  const ogStart = Date.now();
  generateOgImages(ogDir, categories, calculators);
  const ogMs = Date.now() - ogStart;

  const toolTemplate = fs.readFileSync(path.join(ROOT, "_templates/tool.template.html"), "utf8");
  const categoryTemplate = fs.readFileSync(path.join(ROOT, "_templates/category.template.html"), "utf8");
  const indexTemplate = fs.readFileSync(path.join(ROOT, "_templates/index.template.html"), "utf8");
  const aboutTemplate = fs.readFileSync(path.join(ROOT, "_templates/about.template.html"), "utf8");
  const contactTemplate = fs.readFileSync(path.join(ROOT, "_templates/contact.template.html"), "utf8");
  const legalTemplate = fs.readFileSync(path.join(ROOT, "_templates/legal.template.html"), "utf8");

  let toolPageCount = 0;
  let categoryPageCount = 0;

  LOCALES.forEach((locale) => {
    const prefix = localePath(locale);
    const toolDir = path.join(ROOT, prefix, "tool");
    const categoryDir = path.join(ROOT, prefix, "category");
    fs.mkdirSync(toolDir, { recursive: true });
    fs.mkdirSync(categoryDir, { recursive: true });

    calculators.forEach((calc) => {
      if (!calc.builtLocales.includes(locale)) return;
      const cat = categories.find((c) => c.id === calc.category);
      const html = buildToolPage(toolTemplate, locale, calc, cat, I18N);
      fs.writeFileSync(path.join(toolDir, `${calc.id}.html`), html);
      toolPageCount++;
    });

    categories.forEach((cat) => {
      const html = buildCategoryPage(categoryTemplate, locale, cat, calculators, I18N);
      fs.writeFileSync(path.join(categoryDir, `${cat.id}.html`), html);
      categoryPageCount++;
    });

    const homeHtml = buildHomePage(indexTemplate, locale, categories, calculators, I18N);
    fs.writeFileSync(path.join(ROOT, prefix, "index.html"), homeHtml);

    const aboutHtml = buildAboutPage(aboutTemplate, locale, I18N);
    fs.writeFileSync(path.join(ROOT, prefix, "about.html"), aboutHtml);

    const contactHtml = buildContactPage(contactTemplate, locale, I18N);
    fs.writeFileSync(path.join(ROOT, prefix, "contact.html"), contactHtml);

    const privacyHtml = buildLegalPage(legalTemplate, locale, "privacy", I18N);
    fs.writeFileSync(path.join(ROOT, prefix, "privacy.html"), privacyHtml);

    const termsHtml = buildLegalPage(legalTemplate, locale, "terms", I18N);
    fs.writeFileSync(path.join(ROOT, prefix, "terms.html"), termsHtml);
  });

  buildSitemap(categories, calculators);

  console.log(`Built ${toolPageCount} tool pages (${calculators.length} EN + ${WAVE_ONE_TOOL_IDS.length} × ${LOCALES.length - 1} locales) and ${categoryPageCount} category pages (${categories.length} × ${LOCALES.length} locales)`);
  console.log(`Built ${LOCALES.length} homepage / about / contact / privacy / terms page sets (${LOCALES.join(", ")})`);
  console.log(`Generated ${calculators.length + categories.length + 1} OG images in ${ogMs}ms`);
}

function buildSitemap(categories, calculators) {
  // Real per-page dates, not a single "today" stamped on every URL every
  // build. Tool pages use their own git-history dateModified (computed
  // above); category pages use the most recent date among their own
  // calculators (a category is only as fresh as its newest content change);
  // the homepage and static pages use their own file's git log date.
  //
  // Every localized URL carries an <xhtml:link> block cross-referencing its
  // sibling locale URLs (+ x-default) per the sitemap hreflang spec, mirroring
  // the <head> hreflang tags rather than duplicating a separate source of
  // truth for them.
  const HREFLANG_CODE = { en: "en", es: "es", fr: "fr", de: "de", pt: "pt", it: "it", ja: "ja", ro: "ro", el: "el", zh: "zh-Hans", ar: "ar", th: "th" };

  function xhtmlBlock(urlFor, builtLocales) {
    const lines = builtLocales.map(
      (loc) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG_CODE[loc]}" href="${urlFor(loc)}"/>`
    );
    lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor("en")}"/>`);
    return lines.join("\n");
  }

  const entries = [];

  LOCALES.forEach((locale) => {
    entries.push({
      loc: homeUrl(locale),
      lastmod: getFileLastModDate(locale === "en" ? "index.html" : `${locale}/index.html`),
      xhtml: xhtmlBlock((loc) => homeUrl(loc), LOCALES),
    });
    entries.push({
      loc: staticUrl(locale, "about.html"),
      lastmod: getFileLastModDate(locale === "en" ? "about.html" : `${locale}/about.html`),
      xhtml: xhtmlBlock((loc) => staticUrl(loc, "about.html"), LOCALES),
    });
    entries.push({
      loc: staticUrl(locale, "contact.html"),
      lastmod: getFileLastModDate(locale === "en" ? "contact.html" : `${locale}/contact.html`),
      xhtml: xhtmlBlock((loc) => staticUrl(loc, "contact.html"), LOCALES),
    });
    entries.push({
      loc: staticUrl(locale, "privacy.html"),
      lastmod: getFileLastModDate(locale === "en" ? "privacy.html" : `${locale}/privacy.html`),
      xhtml: xhtmlBlock((loc) => staticUrl(loc, "privacy.html"), LOCALES),
    });
    entries.push({
      loc: staticUrl(locale, "terms.html"),
      lastmod: getFileLastModDate(locale === "en" ? "terms.html" : `${locale}/terms.html`),
      xhtml: xhtmlBlock((loc) => staticUrl(loc, "terms.html"), LOCALES),
    });
    categories.forEach((c) => {
      const catCalcs = calculators.filter((calc) => calc.category === c.id);
      const lastmod = catCalcs.reduce((max, calc) => (calc.dateModified > max ? calc.dateModified : max), "0000-00-00");
      entries.push({
        loc: categoryUrl(locale, c.id),
        lastmod,
        xhtml: xhtmlBlock((loc) => categoryUrl(loc, c.id), LOCALES),
      });
    });
    calculators.forEach((c) => {
      if (!c.builtLocales.includes(locale)) return;
      entries.push({
        loc: toolUrl(locale, c.id),
        lastmod: c.dateModified,
        xhtml: xhtmlBlock((loc) => toolUrl(loc, c.id), c.builtLocales),
      });
    });
  });

  // English-only pages (no locale siblings): homepage-adjacent standard
  // pages plus privacy/terms/all-calculators, unchanged single-locale URLs.
  entries.push(...STANDARD_PAGES.map((p) => ({ loc: `${SITE_URL}/${p}`, lastmod: getFileLastModDate(p), xhtml: "" })));

  const body = entries
    .map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n${e.xhtml ? e.xhtml + "\n" : ""}  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;

  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
}

build();
