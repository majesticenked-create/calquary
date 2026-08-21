/* ============================================================
   Calquary — static site builder
   Reads js/calculators-data.js (a plain browser script — no
   module.exports) and generates one HTML page per tool and
   per category from the templates in _templates/, plus a
   sitemap.xml listing every generated page.
   Run with: node build.js
   ============================================================ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const SITE_URL = "https://calquary.com";

function loadData() {
  const src = fs.readFileSync(path.join(ROOT, "js/calculators-data.js"), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(src + "\nthis.CATEGORIES = CATEGORIES; this.CALCULATORS = CALCULATORS;", sandbox);
  return { categories: sandbox.CATEGORIES, calculators: sandbox.CALCULATORS };
}

function build() {
  const { categories, calculators } = loadData();

  const toolTemplate = fs.readFileSync(path.join(ROOT, "_templates/tool.template.html"), "utf8");
  const categoryTemplate = fs.readFileSync(path.join(ROOT, "_templates/category.template.html"), "utf8");

  const toolDir = path.join(ROOT, "tool");
  const categoryDir = path.join(ROOT, "category");
  fs.mkdirSync(toolDir, { recursive: true });
  fs.mkdirSync(categoryDir, { recursive: true });

  calculators.forEach((calc) => {
    const cat = categories.find((c) => c.id === calc.category);
    const html = toolTemplate
      .split("{{CALC_ID}}").join(calc.id)
      .split("{{TITLE}}").join(calc.title)
      .split("{{DESCRIPTION}}").join(calc.description)
      .split("{{SCHEMA_JSON}}").join(buildToolSchema(calc, cat));
    fs.writeFileSync(path.join(toolDir, `${calc.id}.html`), html);
  });

  categories.forEach((cat) => {
    const html = categoryTemplate
      .split("{{CAT_ID}}").join(cat.id)
      .split("{{CAT_NAME}}").join(cat.name)
      .split("{{CAT_DESCRIPTION}}").join(cat.description)
      .split("{{SCHEMA_JSON}}").join(buildCategorySchema(cat));
    fs.writeFileSync(path.join(categoryDir, `${cat.id}.html`), html);
  });

  buildSitemap(categories, calculators);

  console.log(`Built ${calculators.length} tool pages and ${categories.length} category pages`);
}

function toLdJsonScript(graph) {
  const schema = { "@context": "https://schema.org", "@graph": graph };
  // Escape "</" so no FAQ answer or description can accidentally close the script tag early.
  const json = JSON.stringify(schema, null, 2).split("</").join("<\\/");
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

function buildToolSchema(calc, cat) {
  const url = `${SITE_URL}/tool/${calc.id}.html`;
  const graph = [
    {
      "@type": "SoftwareApplication",
      "name": calc.title,
      "description": calc.description,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "url": url,
      "isAccessibleForFree": true,
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Calquary", "item": `${SITE_URL}/index.html` },
        { "@type": "ListItem", "position": 2, "name": cat.name, "item": `${SITE_URL}/category/${cat.id}.html` },
        { "@type": "ListItem", "position": 3, "name": calc.title, "item": url },
      ],
    },
  ];

  if (calc.faq && calc.faq.length) {
    graph.push({
      "@type": "FAQPage",
      "mainEntity": calc.faq.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a },
      })),
    });
  }

  return toLdJsonScript(graph);
}

function buildCategorySchema(cat) {
  const graph = [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Calquary", "item": `${SITE_URL}/index.html` },
        { "@type": "ListItem", "position": 2, "name": cat.name, "item": `${SITE_URL}/category/${cat.id}.html` },
      ],
    },
  ];
  return toLdJsonScript(graph);
}

function buildSitemap(categories, calculators) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    `${SITE_URL}/index.html`,
    ...categories.map((c) => `${SITE_URL}/category/${c.id}.html`),
    ...calculators.map((c) => `${SITE_URL}/tool/${c.id}.html`),
  ];

  const body = urls
    .map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
}

build();
