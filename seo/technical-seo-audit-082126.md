# Technical SEO Audit — Calquary (082126)

> Ran using `.claude/skills/seo/technical-seo-audit/SKILL.md`. Note: like the other SEO skill files
> discovered in this project, this one is a generic report-template (Executive Summary /
> Recommendations / Implementation table), not a code-scanning tool — the actual checks below
> were run manually against the live repo (91 generated + static HTML pages, `build.js`, `sitemap.xml`)
> and the skill's output structure/best-practice thresholds were used to frame the findings.
> No exact `seo-audit` skill exists at `.claude/skills/seo/` — `technical-seo-audit` is the closest
> match for this checklist (crawlability, meta tags, mobile, CWV, HTTPS, duplicate content, broken links).

## Executive Summary
Calquary's link graph and template output are structurally sound — 0 broken internal links across 997
checked hrefs, 0 duplicate titles/meta descriptions, 0 duplicate intro copy across all 77 calculators,
every generated page has exactly one `<h1>` and a viewport meta tag. The real gaps are crawl-directive
hygiene (no `robots.txt` at all) and an incomplete sitemap (the 4 standard pages added last session were
never wired into `build.js`'s sitemap generator) — both fix-now items before any deployment/GSC submission.

## Scope
77 tool pages, 8 category pages, homepage, about/privacy/terms/contact/404, `build.js`, `sitemap.xml`.
Not deployed yet (no live domain, no HTTPS/security-header layer to audit — see Section 6).

---

## Re-audit — Crawlability & Page Speed (082126, post-fix)

Both sections re-checked after fixing the 4 flagged items. **Both now PASS.**

- **Crawlability: PASS.** `robots.txt` added at project root (`User-agent: * / Allow: / / Sitemap:
  https://calquary.com/sitemap.xml`), reachable at `/robots.txt` (200). `buildSitemap()` in build.js
  now includes a `STANDARD_PAGES` array merged into the URL list; `sitemap.xml` regenerated via
  `node build.js` and now lists **90 URLs** — 1 homepage + 4 standard pages + 8 category pages + 77
  tool pages. (404.html correctly stays excluded — it's `noindex`'d and not a real content page, so
  90 is the correct total, not 91; 91 was the full page count on disk including 404.html.)
- **Page speed / CWV signals: PASS** (static-analysis level — no live deployment to run Lighthouse
  against yet). The `@import` in `css/styles.css` is gone; `grep -rn "@import"` across the whole repo
  returns zero matches. All 91 real HTML pages (verified programmatically) now carry
  `<link rel="preconnect" href="https://fonts.googleapis.com">`,
  `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`, and the actual
  `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">` in `<head>`, ahead of
  `styles.css` — font discovery no longer waits on a full CSS parse. Homepage `<title>` shortened from
  74 to 48 chars ("Calquary — Calculators, Organized Like a Library").
- Fixes applied to both `_templates/tool.template.html` and `_templates/category.template.html` (so
  all 85 generated pages inherit it automatically) plus the 6 static pages (index/about/privacy/terms/
  contact/404) individually, since those aren't build.js-generated.

---

## Section 1 — Crawlability: ~~FAIL~~ → **PASS** (see re-audit above)
- **`robots.txt` does not exist anywhere in the repo.** Nothing blocks crawling by default (fine), but
  there's no explicit `Sitemap:` directive pointing crawlers at `sitemap.xml`, and no rule excluding
  `404.html` from being crawled as a real page (it isn't linked anywhere and isn't in the sitemap, so
  risk is low, but a `noindex` is already set via meta tag — a matching robots.txt disallow would be
  the standard complementary layer).
- `sitemap.xml` exists, well-formed, 86 `<url>` entries (77 tools + 8 categories + homepage) — but is
  **missing about.html, privacy.html, terms.html, contact.html** (4 pages, 0% coverage for the standard
  pages added in the prior session). `build.js`'s `buildSitemap()` only enumerates categories +
  calculators; the standard pages were hand-added to the repo and never wired into that function.
  404.html correctly excluded (has `<meta name="robots" content="noindex">` and no sitemap entry — that
  part was done right).
- **Fix now**: add `robots.txt` with `Sitemap: https://calquary.com/sitemap.xml` and
  `Disallow: /404.html`; add the 4 standard-page URLs to `buildSitemap()` in build.js as a static array
  merged with the generated ones.

## Section 2 — Meta Tags: **WARN**
- **Titles**: 90/91 pages within the ~60-char practical limit. 1 exception — **homepage title is 74
  chars** ("Calquary — A calculator for everything, organized like a reference library"), likely to be
  truncated in SERPs. No duplicate titles anywhere (91/91 unique).
- **Descriptions**: 0/91 exceed 165 chars (no truncation risk), but **71/91 (78%) are under 70 chars**,
  well short of the skill's 150–160-char best-practice target — most tool-page descriptions are terse
  one-liners (e.g. `data-storage-converter.html` at 42 chars) that leave SERP snippet real estate unused.
  This isn't broken, it's underused opportunity — not a fix-now blocker, but worth a content pass.
  0 duplicate descriptions (91/91 unique).
- **Canonical tags**: none present on any page (checked homepage, all 4 standard pages, a sample tool
  page, a sample category page). Low risk today since every page has exactly one accessible URL and no
  query-param variants except the homepage's `?q=` search redirect, but worth adding once deployed,
  especially since the homepage will be reachable at both `/` and `/index.html`.

## Section 3 — Mobile-Friendliness: **PASS**
- Viewport meta tag (`width=device-width, initial-scale=1.0`) present on all 91 pages checked, no
  exceptions.
- No fixed-width layout containers found in `css/styles.css` (uses relative units / flex-based grid
  per the design-system work done in prior sessions).

## Section 4 — Page Speed / Core Web Vitals signals: ~~WARN~~ → **PASS** (see re-audit above)
- **Google Fonts loaded via `@import` inside `css/styles.css`** rather than a `<link rel="preconnect">`
  + `<link rel="stylesheet">` pair in `<head>`. `@import` is a known CWV anti-pattern — it forces the
  browser to fully fetch and parse `styles.css` before it can even discover the font request, adding a
  full extra round-trip to the render-blocking critical path and directly hurting LCP. Fix: replace the
  `@import` with `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` +
  `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` in each page's `<head>` (or at
  minimum in the shared templates + static pages).
- `js/calculators-data.js` is 136KB and is loaded, deferred, **on every single page** — including each
  of the 77 tool pages, even though a given tool page only needs its own calculator's config and
  `compute()`. Deferred loading means it doesn't block first paint, but it's still 136KB of JS parsed on
  every page load for content ~98.7% of which is unused per-page. Not a fix-now blocker (site is small,
  parse cost is low in absolute terms), but flagged as the main lever if CWV numbers come back weak after
  deployment — worth a future pass to split per-calculator data or code-split by category.
- Per-tool-page HTML weight is small and consistent (avg 6.0KB, range 5.6–6.4KB) — no bloat outliers.
- No actual Lighthouse/PageSpeed Insights run performed — the site isn't deployed, so this section is
  static-analysis-only; re-run a real CWV measurement (Lighthouse or PSI) once there's a live URL.

## Section 5 — Duplicate Content Risk: **PASS**
- All 77 calculator `intro` fields are unique (0 duplicate groups) — the concern with template-driven
  calculator sites (thin/duplicate boilerplate across pages) doesn't apply here; each page's unique
  content differs meaningfully page to page.
- 0 duplicate `<title>` tags, 0 duplicate meta descriptions across all 91 pages (checked above).
- Shared chrome (header/nav/footer/scripts) is identical across pages by design — normal and expected
  for a reference-utility site (same pattern calculator.net/CalcBE.com use), not a duplicate-content
  penalty risk since unique on-page content differs per page.

## Section 6 — HTTPS / Security Headers: **N/A (not deployed)**
- Site has no live domain/hosting yet — nothing to audit at the transport/header layer. Revisit this
  section specifically before or immediately after deployment: confirm HTTPS is enforced (redirect
  http→https), and set baseline headers (`X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a basic CSP) at the host/CDN level once a
  platform (Netlify/Vercel/GitHub Pages/S3+CloudFront) is chosen.

## Section 7 — Broken Internal Links: **PASS**
- Extracted and resolved all 997 hardcoded `href` targets across every generated tool/category page
  plus the 6 static pages (index/about/privacy/terms/contact/404) against the actual filesystem —
  **0 broken links**. The recent schema-markup and standard-pages work introduced no link regressions.
- Cross-checked: BreadcrumbList schema URLs, footer links on the new standard pages, and category-page
  `related`-array links all resolve correctly.

---

## Fix-Now Items — ALL RESOLVED 082126
1. ~~Add `robots.txt`~~ — done. Note: per user direction, shipped as a standard permissive config
   (`Allow: /` + `Sitemap:` directive only, no `Disallow` rules) since there's no admin/private area —
   simpler than the originally-suggested `Disallow: /404.html`, and unnecessary since 404.html was
   already excluded from the sitemap and isn't linked from anywhere.
2. ~~Fix `buildSitemap()` in build.js~~ — done, 90/90 real content pages now listed.
3. ~~Shorten the homepage `<title>`~~ — done, 74 → 48 chars.
4. ~~Replace the `@import` Google Fonts load~~ — done across both templates + 6 static pages; 0
   remaining `@import` instances repo-wide.

## Defer (not blocking deployment)
- Expand the 71 under-70-char meta descriptions toward the 150–160-char target — content pass, not urgent.
- Add canonical tags once a live domain exists.
- Investigate splitting `calculators-data.js` per-calculator/per-category if post-deployment CWV numbers
  (real Lighthouse/PSI run) show JS parse cost mattering in practice.

## Success Metrics (post-deployment, once measurable)
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|---------------------|
| Index coverage | N/A (not deployed) | 86/86 sitemap URLs indexed (91 once sitemap fix ships) | Google Search Console |
| LCP | Not measured | < 2.5s | PageSpeed Insights / CrUX |
| Crawl errors | N/A | 0 | Search Console coverage report |
