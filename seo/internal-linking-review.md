# Internal Linking Review — All Categories

> **Note on this review's scope**: the request that triggered this review described the site as having "26 live calculator pages" and "6 categories still at only 2 tools each." That's stale — as of this review the site has **77 tool pages across 8 fully-built categories** (Math 10, Finance 11, Construction & Home 12, Health & Fitness 10, Date & Time 8, Everyday Conversions 10, Text & Digital 8, Pet & Lifestyle 8). This review analyzes the actual current state, not the stale premise.

## Executive Summary
Analyzed the internal link graph formed by the `related` array on all 77 calculators (231 edges total), plus the structural hub↔tool linking built into the templates. Found **14 orphaned pages** (zero inbound links from sibling calculators) and fixed all of them with targeted `related` array edits — extending arrays rather than swapping, so no existing reciprocal pair was broken in the process. Category hub↔tool linking needs no fixes: it's automatic by template design, not `related`-array-dependent. One structural pattern worth watching going forward: `unit-length-converter` has absorbed 18 inbound links (2.4x the next-highest page) by being everyone's generic "related conversions" pick — not broken, but worth diversifying as new tools are added.

## Method
Ran a script against `js/calculators-data.js` treating each calculator's `related` array as a directed edge. Checked: broken links (pointing to non-existent ids), orphans (in-degree 0), reciprocity (A→B without B→A), and in-category vs. cross-category link ratio. Also inspected `_templates/tool.template.html` and `_templates/category.template.html` to confirm hub↔tool linking is structural, not `related`-array-dependent.

## Findings

### 1. Category hub ↔ tool linking — no gap, works by design
Category pages (`category.template.html`) call `calculatorsInCategory(cat.id)` and render **every** tool in that category automatically — this isn't sourced from `related` arrays at all, so it's impossible for a tool to be "missing" from its own category hub. Tool pages link back up via the breadcrumb (`../category/${cat.id}.html`), generated for every tool unconditionally. **Verdict: not a gap. Structural, not content-dependent — will never drift out of sync as calculators are added.**

### 2. Orphaned pages — found 14, now fixed
14 calculators had zero inbound links from any other calculator's `related` array — reachable only via their category hub, the homepage's 8 featured tools, or search:

| Orphan | Category | Fix applied |
|---|---|---|
| `ratio-calculator` | Math | Added to `percentage-calculator`'s related (2→3 items) |
| `auto-loan-calculator` | Finance | Added to `loan-calculator`'s related (3→4) |
| `investment-calculator` | Finance | Added to `compound-interest-calculator`'s related (3→4) |
| `insulation-calculator` | Construction | Added to `drywall-calculator`'s related (3→4) |
| `water-intake-calculator` | Health | Added to `bmi-calculator`'s related (3→4) |
| `heart-rate-zone-calculator` | Health | Added to `pace-calculator`'s related (2→3) |
| `ideal-weight-calculator` | Health | Added to `body-fat-calculator`'s related (3→4) |
| `speed-converter` | Conversions | Added to `weight-converter`'s related (3→4) |
| `area-converter` | Conversions | Added to `concrete-calculator`'s related (already at 4 — swapped out non-reciprocal `percentage-calculator` link) |
| `data-storage-converter` | Text & Digital | Added to `word-counter`'s related (2→3) |
| `binary-to-text-converter` | Text & Digital | Added to `case-converter`'s related (3→4) |
| `horse-age-calculator` | Pets | Added to `cat-age-calculator`'s related (3→4) |
| `ideal-dog-weight-calculator` | Pets | Added to `dog-age-calculator`'s related (3→4) |
| `cat-pregnancy-calculator` | Pets | Added to `dog-pregnancy-calculator`'s related (3→4), which also fixed a flagged non-reciprocal pair in the same edit |

**Verdict: structural problem, now fixed.** This wasn't a "not enough content yet" issue — several orphans (e.g. `heart-rate-zone-calculator`, `ideal-dog-weight-calculator`) sit in categories that are already fully built out, so more content wouldn't have surfaced them on its own; they needed an explicit `related` array edit.

### 3. Construction & Home cluster (12 tools) — was already reasonably interlinked, one real gap
Before this review, `insulation-calculator` was the only true orphan in the category — every other newer addition (mulch, gravel, flooring, drywall, roofing, tile, fence, lumber, paver) already had at least one inbound link, mostly anchored through `concrete-calculator` (in-degree 10, the category's natural hub) or paired siblings (mulch↔gravel, tile↔flooring). Fixed the one gap by adding `insulation-calculator` to `drywall-calculator`'s related array (they're both "finishing a room" tools — topically sound).

**Verdict: mostly a non-issue — the category's `related` arrays were written with cross-linking already in mind during the original build batches. Just one gap, now closed.**

### 4. Reciprocity — mostly fine, not something to force globally
125 of 231 edges are non-reciprocal (A→B without B→A). This is **expected and healthy**, not a defect: hub pages like `unit-length-converter` (in-degree 18) and `concrete-calculator` (in-degree 10) are pointed to by many tools without linking back to all of them — forcing full reciprocity would bloat every hub page's related list to 10+ items, which is bad UX, not good SEO. The one place reciprocity mattered was fixing orphans, where making a link reciprocal was the mechanism for giving an orphan its first inbound link (e.g. `cat-pregnancy-calculator` ↔ `dog-pregnancy-calculator`).

**Verdict: not a problem to fix broadly. Reciprocity is a byproduct of good linking, not a target in itself.**

### 5. Link concentration — one pattern worth watching
`unit-length-converter` has in-degree 18, more than double the next-highest page (`concrete-calculator` at 10). It's become the default "throw in a conversions link" choice across many unrelated tools (finance, health, text tools all point to it). Not broken — a general-purpose converter is a legitimate cross-category link — but as Everyday Conversions' other 9 tools (temperature, weight, volume, speed, area, data-storage, pressure, fuel-economy, cooking) mature, some of that inbound weight could be redistributed to the more topically specific converter for each linking tool (e.g. a Health tool linking to `unit-length-converter` might fit `weight-converter` better).

**Verdict: not urgent, but worth keeping in mind for future `related` array edits — prefer the most topically specific converter over the generic length converter when one exists.**

### 6. In-category vs. cross-category link ratio
201 in-category edges vs. 39 cross-category edges (84% in-category). This is a healthy topical-clustering ratio — most links stay within a category (supporting topical authority for that category's silo), with enough cross-category links (mostly to `unit-length-converter`, `percentage-calculator`, `days-until-calculator`, `bmi-calculator`) to avoid the site feeling siloed.

**Verdict: healthy ratio, no action needed.**

## Recommendations
1. **Done**: fixed all 14 orphans via targeted `related` array edits (see table above) — extended arrays rather than swapping, preserving existing reciprocal pairs except where the array was already at the 4-item practical cap (`concrete-calculator`, where a non-reciprocal link was swapped out instead).
2. **Not urgent, future practice**: when adding new calculators or editing `related` arrays, prefer the most topically specific target over `unit-length-converter` as a generic catch-all, to avoid further concentration.
3. **Not needed**: no changes to templates — hub↔tool linking is already automatic and correct by design.
4. **Not needed**: no broad reciprocity-forcing pass — non-reciprocal links are mostly healthy hub behavior, not a defect.

## What's a real fix vs. what would resolve naturally
Everything flagged above was analyzed against the **current, fully-built state** of all 8 categories (not the stale "2 tools per category" premise) — so none of these findings are "will resolve as content fills out." The orphan issue in particular was worth catching precisely *because* several categories are already complete; more content wouldn't have surfaced these gaps on its own since the orphaned tools already had plenty of category siblings that simply weren't pointing to them.

## Success Metrics
| Metric | Before this review | After this review | Measurement Method |
|--------|---------|--------|-------------------|
| Orphaned pages (in-degree 0) | 14 | 0 | Graph script over `calculators-data.js` `related` arrays |
| Broken related links | 0 | 0 | Same script — id existence check |
| `related` array length distribution | 6×2, 69×3, 2×4 | 3×2, 62×3, 12×4 | Same script |
| Max in-degree concentration | `unit-length-converter` at 18 | Unchanged (18) — flagged for future practice, not fixed this pass | Same script |

## Next Steps
- [x] Fix all 14 orphaned pages
- [x] Verify zero broken links, rebuild, spot-check rendered related lists
- [ ] When adding future calculators, prefer topically specific converters over `unit-length-converter` as the default cross-category link
- [ ] Re-run this analysis after the next batch of new calculators, since new tools can reintroduce orphans

## Re-run — 082126
No new calculators were added since the original review — the last several sessions were content-score
and technical-SEO fixes (FAQ additions, 3 title changes, robots.txt/sitemap/font-loading) on the
existing 77, none of which touch the `related` array. Re-ran the same graph script to confirm the link
structure itself hasn't drifted:
- **Broken related refs**: 0 (unchanged)
- **Orphaned pages (in-degree 0)**: 0 (unchanged — still fixed)
- **Pages with <3 related links**: still the same 3 — `percentage-change-calculator`, `tip-calculator`,
  `age-calculator` (2 each). Not a new finding; these were below the informal 3-link target at the time
  of the original review too but weren't orphans, so weren't in scope for that pass.
- **Link concentration**: `unit-length-converter` still at in-degree 18 (unchanged, as expected — no new
  calculators means no new inbound-link decisions were made either way).
- **New static pages** (about/privacy/terms/contact/404) added since the original review: not part of
  the calculator `related`-array graph (by design — they're not calculators), but confirmed reachable
  from every tool/category page via the shared footer, and confirmed to have zero broken links in the
  082126 technical SEO audit (997/997 hrefs resolved).

**Verdict: no action needed this pass.** The graph is exactly as healthy as it was after the original
fix — nothing regressed, and nothing new was introduced to fix. The two still-open backlog items
(diversify `unit-length-converter`'s inbound concentration; bump the 3 pages under the 3-link target)
remain valid follow-ups but aren't urgent — same status as before, not newly discovered problems.

## Recently Added homepage section — 082126
Added a "Recently added" section to the homepage (`index.html`), reusing the existing `.tool-grid`/
`.tool-card` live-readout pattern from Featured Tools. Selection logic reads `CALCULATORS.slice()
.reverse()`, filtered to exclude anything already in Featured Tools, sliced to 8 — dynamic, not a
hardcoded list, so it stays accurate as new calculators are appended in future sessions.

**Recency source**: no `dateAdded` field was needed. Verified against `git log --reverse -- 
js/calculators-data.js` that the CALCULATORS array's current order exactly matches true addition
order — the last commit that added new calculator entries (Pet & Lifestyle Batch 2) puts its 3
calculators at the very tail of the array, with nothing reordering entries since (the only later
commit touching the file, the orphan-fix pass, only edited `related` arrays in place). Array order is
a reliable recency proxy as-is; adding a redundant `dateAdded` field would have been unnecessary
schema churn.

**Effect on link concentration** — re-ran the graph check, this time extended beyond the original
`related`-array-only methodology to also count homepage entry points (Featured Tools + Recently
Added) as real inbound links, since that's the honest way to evaluate this feature's actual effect
(a `related`-array-only check can't move, since Recently Added doesn't touch `related` arrays at all):

| Metric | related-array-only (original methodology) | + homepage entry points |
|---|---|---|
| `unit-length-converter` in-degree | 18 | 19 |
| `unit-length-converter` share of all inbound edges | 7.50% | **7.42%** |
| Total inbound edges in graph | 240 | 256 |

`unit-length-converter`'s absolute in-degree actually ticks up by 1 in the full-graph view, because
it was already in Featured Tools (that link just wasn't being counted before). But its *share* of
total inbound link equity — the actual concentration metric that matters — genuinely decreased,
because Recently Added introduced 8 new homepage-sourced inbound links to 8 *other* pages (7 Pet &
Lifestyle calculators + word-frequency-counter) without adding any new link to
`unit-length-converter` itself. That's a small, real, honest effect, not a large fix — the underlying
`related`-array concentration this was partly motivated by is unchanged and still logged as an open
backlog item.

## All Calculators index page — 082126
Added `all-calculators.html`: one page listing every calculator, grouped by category, generated
dynamically from `CATEGORIES`/`calculatorsInCategory()` (not hardcoded — stays accurate as new
calculators are added). This directly targets the underlying issue Recently Added couldn't touch:
every one of the 77 calculators now gets exactly one guaranteed additional inbound link, regardless
of its `related`-array position.

**Concentration effect** (same extended methodology as the Recently Added measurement — `related`
arrays + all homepage/index entry points counted as real inbound edges):

| Stage | `unit-length-converter` in-degree | Share of total inbound edges | Total inbound edges |
|---|---|---|---|
| `related`-array only (original baseline) | 18 | 7.50% | 240 |
| + Featured Tools + Recently Added (previous measurement) | 19 | 7.42% | 256 |
| + All Calculators index page (this pass) | 20 | **6.01%** | 333 |

Concentration share dropped meaningfully this time (7.42% → 6.01%) — a real, larger effect than
Recently Added's, because this page adds one link to literally every calculator rather than a
rotating subset of 8.

**The more important number, arguably**: the site-wide **minimum** in-degree. Before this page, 29
calculators sat at in-degree 1 (a single inbound link each, from `related` + Featured + Recently
Added combined) — including `standard-deviation-calculator`, `ratio-calculator`, `drywall-calculator`,
`heart-rate-zone-calculator`, `speed-converter`, and 24 others. After adding `all-calculators.html`,
**every calculator on the site has in-degree ≥2** — the index page's guaranteed link puts a floor
under every page, not just redistributes weight away from the one over-linked page. That's the
concentration problem actually being fixed, not just diluted.

**Verdict**: this closes the loop the Recently Added feature correctly didn't try to close on its
own. The underlying `related`-array-only concentration (18, unchanged, still the number that governs
topical/contextual link relevance) is left as-is per the original review's recommendation — but the
site-wide reachability floor this was really about is now solved structurally, via a page that will
never go stale since it's generated from live data.
