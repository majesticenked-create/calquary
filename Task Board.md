# Task Board

## Today
- [HIGH] Fix Stop hook verdict logging — `log-stop-verdict.sh` has recorded "unknown" for 32/32 sessions (08-17 through 08-21), meaning the haiku `type:prompt` verdict JSON is never actually reaching it. The quality-gate/block-rate tracking has never worked. See System Audit — 082126 in Daily Notes.
- Refresh memory.md's "SEO passes done" bullet — still doesn't mention BreadcrumbList/WebSite schema, the 5 standard pages, or the apple-ui-design UX pass, all committed since it was last written.
- Seed knowledge-base.md with at least 2 confirmed learnings from this session (the `serve` clean-URL query-string-stripping quirk; SEO skill files under `.claude/skills/seo/` are report templates, not code generators) — knowledge-nominations.md has never fed the pipeline.

## Backlog
- puppy-weight-predictor deferred — needs a growth curve model, meaningfully more complex than other pet tools
- character-counter excluded — duplicate of word-counter's existing output
- hash-generator excluded — needs async crypto.subtle API, mismatch with engine's synchronous compute()
- QR-code-generator excluded — needs image/rendering output, not a fit for current engine
- text-reverser excluded — too trivial to justify a dedicated page
- currency-converter and timezone-converter excluded — need live external data, poor fit for static no-backend site
- countdown-timer excluded — too close to days-until-calculator without a live-updating JS component
- anniversary-calculator excluded — same math as days-until-calculator, low differentiation
- pregnancy-due-date-calculator deferred — needs dedicated accuracy/liability review before building (medical-adjacent stakes)
- retirement-calculator deferred — scope large enough to need its own content brief
- Re-run keyword-research with live DataForSEO data once account balance is restored (402 on ten separate attempts across every category run this session)
- category-page-optimization pass — category pages are currently thin (auto-generated grid only)
- Google Analytics / Search Console setup — no analytics installed, growth from this session's build-out is currently unmeasurable
- Prefer topically specific converters (weight-converter, temperature-converter, etc.) over unit-length-converter as the default cross-category related link going forward — it's absorbed 18 inbound links vs. next-highest at 10
- Re-run internal-linking review after the next batch of new calculators — new tools can reintroduce orphans

## Blocked
- (none)

## Done
- Content-score fixes (082126): added 2nd/3rd FAQ questions to all 18 single-question calculators, retitled unit-length-converter/days-until-calculator/cooking-converter to match their target keyword; then fixed the final 2 sub-70 pages (gcd-lcm-calculator, date-duration-calculator) by adding a 3rd FAQ + weaving the exact keyword phrase into each intro. **Site-wide result: 77/77 (100%) score 70+.** See `seo/seo-content-audit-082126.md` for before/after scores.
- Technical SEO audit fixes (082126): added robots.txt, fixed build.js's buildSitemap() to include the 4 standard pages, shortened homepage title 74→48 chars, replaced Google Fonts @import with preconnect+link tags across both templates + 6 static pages — see `seo/technical-seo-audit-082126.md` for the re-audit confirming crawlability and page-speed sections now PASS
- Batch 1: mulch-calculator, gravel-calculator, flooring-calculator (Construction & Home)
- Batch 2: drywall-calculator, tile-calculator (Construction & Home)
- Batch 3: roofing-calculator, fence-calculator, insulation-calculator, lumber-calculator, paver-calculator (Construction & Home) — Construction & Home category now complete at 12/12 from keyword research
- Finance Batch 1: mortgage-calculator, savings-calculator, compound-interest-calculator
- Finance Batch 2: sales-tax-calculator, discount-calculator
- Finance Batch 3: debt-payoff-calculator, credit-card-payoff-calculator, auto-loan-calculator, investment-calculator — Finance category now at 11 tools (retirement-calculator deferred)
- Health Batch 1: bmr-calculator, calorie-calculator, body-fat-calculator
- Health Batch 2: macro-calculator, water-intake-calculator, one-rep-max-calculator
- Health Batch 3: heart-rate-zone-calculator, ideal-weight-calculator — Health & Fitness category now at 10 tools (pregnancy-due-date deferred)
- Conversions Batch 1: temperature-converter, weight-converter, volume-converter
- Conversions Batch 2: speed-converter, area-converter
- Conversions Batch 3: data-storage-converter, pressure-converter, fuel-economy-converter — Everyday Conversions category now complete at 10/10 (currency/timezone excluded by design)
- Date & Time Batch 1: date-duration-calculator, business-days-calculator, time-duration-calculator
- Date & Time Batch 2: week-number-calculator, day-of-week-calculator, leap-year-calculator — Date & Time category now complete at 8/8
- Math Batch 1: average-calculator, fraction-calculator, gcd-lcm-calculator (added shared gcd() helper)
- Math Batch 2: standard-deviation-calculator, square-root-calculator, ratio-calculator
- Math Batch 3: exponent-calculator, quadratic-formula-calculator — Math category now complete at 10 tools (random-number-generator deferred to Text & Digital)
- Text & Digital Batch 1: random-number-generator, case-converter, lorem-ipsum-generator
- Text & Digital Batch 2: text-to-slug-generator, binary-to-text-converter, word-frequency-counter — Text & Digital category now complete at 8/8
- Pet & Lifestyle Batch 1: dog-food-calculator, rabbit-age-calculator, dog-pregnancy-calculator
- Pet & Lifestyle Batch 2: horse-age-calculator, ideal-dog-weight-calculator, cat-pregnancy-calculator — Pet & Lifestyle category now complete at 8/8. ALL 8 CATEGORIES NOW HAVE A FULL KEYWORD-RESEARCH + BUILD PASS.
- schema-markup-generator pass — FAQPage/SoftwareApplication JSON-LD generated in build.js for all 77 tool pages (not hand-added; automatic for future calculators)
- internal-linking-strategy review — fixed 14 orphaned pages (zero inbound related links) via targeted array edits; see seo/internal-linking-review.md
