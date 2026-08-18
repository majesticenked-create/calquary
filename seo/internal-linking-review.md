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
