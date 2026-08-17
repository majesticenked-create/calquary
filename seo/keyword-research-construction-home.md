# Keyword Research — Construction & Home Improvement Calculators

> ⚠️ **Data note**: The DataForSEO MCP (Google Ads search volume, Keyword Ideas, Related Keywords) returns HTTP 402 on every call so far (no balance on the connected account) — retried again on this run, same result. Volume/difficulty below are **qualitative, pattern-matched estimates**, not sourced numbers — flagged per keyword rather than presented as precise figures, since fabricating exact search-volume numbers would fail the skill's own quality bar ("numbers and benchmarks are realistic and sourced"). Re-run once the account has balance, or verify manually in Google Keyword Planner / Ahrefs / Semrush before committing content budget.

## Executive Summary
The Construction & Home category has 2 live tools (`concrete-calculator`, `paint-calculator`) against a niche dominated by exact-match "[material] calculator" head terms with clear transactional/commercial intent. Ten calculator-shaped opportunities were identified; all ten map to a genuinely distinct tool — none are a variant of an existing one. Top priority: flooring, mulch, gravel, drywall — each reuses math patterns already proven in the existing config (`concrete-calculator`'s length × width × waste shape).

## Context & Objectives
- **Objective**: Identify exact-match "[material] calculator" keyword opportunities for the Construction & Home category that map 1:1 to a buildable tool — not general informational content.
- **Audience**: DIY homeowners and small contractors estimating material quantities before a purchase or project.
- **Existing config reviewed**: `js/calculators-data.js` — confirmed field/compute/faq/related schema; `concrete-calculator` and `paint-calculator` reviewed as the pattern baseline.
- **Timeline**: Feeds the next content sprint (Task Board backlog).

## Analysis
**Framework**: Search Intent Classification (all candidates filtered to Transactional/Commercial "[material] calculator" head terms — informational-only queries excluded per this run's brief) + Pillar-Cluster Model, with "Construction & Home" as the pillar and each material/project type as a cluster.

Every opportunity below was checked against the two live tools for overlap. None collapse into `concrete-calculator` or `paint-calculator` — each targets a distinct material, distinct compute logic, and a distinct head-term search query.

## Keyword Opportunities (ranked)

| # | Primary keyword | Est. volume | Est. difficulty | Search intent | Distinct from existing tools? |
|---|---|---|---|---|---|
| 1 | flooring calculator | High | Med-High (calculator.net, Omni, flooring retailers rank) | Transactional — sizing a purchase | Yes — new material, same length×width×waste shape as concrete-calculator |
| 2 | mulch calculator | Med-High | Low-Med | Transactional — seasonal (spring/fall spike) | Yes — landscaping material, reuses cubic-yard math |
| 3 | gravel calculator | Med-High | Low-Med | Transactional — seasonal | Yes — same cubic-yard shape, different material/density |
| 4 | drywall calculator | Medium | Low-Med | Transactional — sheet count from wall area | Yes — new unit (4×8 sheets), pairs with paint-calculator in "finishing a room" cluster |
| 5 | roofing calculator | Medium | Medium | Commercial — often precedes a contractor quote or bulk purchase | Yes — needs pitch-factor math, higher build complexity |
| 6 | tile calculator | Medium | Med-High (crowded — home improvement retailers rank) | Transactional | Yes — grout/spacing math differs from flooring |
| 7 | fence calculator | Medium | Low-Med | Transactional — linear feet → posts/panels | Yes — linear, not area-based; distinct compute shape |
| 8 | insulation calculator | Low-Med | Low | Transactional — R-value/area based | Yes — new variable (R-value), no existing analog |
| 9 | lumber calculator (board feet) | Low-Med | Low | Transactional — contractor/DIY framing estimate | Yes — board-foot formula, distinct from all current tools |
| 10 | paver calculator | Low-Med | Low | Transactional — patio/walkway sizing | Yes — area ÷ paver size + waste, landscaping-adjacent to mulch/gravel but distinct unit |

**Excluded as not a good fit for this run's brief**: "square footage calculator" (too generic/math-category, not construction-specific — would duplicate territory closer to `percentage-calculator`'s category than a material estimate) and "deck cost calculator" (cost-estimation intent pulls in labor/pricing variables outside this site's "material quantity" pattern — flag as a possible Finance-category crossover instead, not Construction).

## Recommendations
1. **Batch 1 (highest confidence, cheapest to build)**: flooring, mulch, gravel — all reuse the length × width × waste or cubic-yard compute pattern already proven in `concrete-calculator`.
2. **Batch 2**: drywall, tile — both extend the "finishing a room" cluster alongside `paint-calculator`.
3. **Batch 3 (higher build complexity)**: roofing (pitch factor), fence (linear not area-based), insulation (R-value), lumber (board-foot formula), paver.

## Implementation
| Action | Owner | Timeline | Priority |
|--------|-------|----------|----------|
| Build flooring-calculator, mulch-calculator, gravel-calculator | Claude | Next batch | High |
| Build drywall-calculator, tile-calculator | Claude | Following batch | Medium |
| Build roofing-calculator, fence-calculator, insulation-calculator, lumber-calculator, paver-calculator | Claude | Later batches | Medium-Low |
| Re-run this skill with live DataForSEO data once account has balance | User/Claude | Before finalizing exact priority order | High |

## Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Construction & Home tools live | 2 | 12 (2 existing + 10 identified) | `calculatorsInCategory('construction').length` |
| Organic traffic to /category/construction.html | Unmeasured (no GA yet) | Baseline + growth | google-analytics-setup skill, then GSC |
| Indexed construction tool pages | Unmeasured (site not yet live/indexed) | All indexed | google-search-console-audit skill |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Volume/difficulty estimates are directional only (no live data, 402 on retry) | High | Medium | Re-run with DataForSEO once balance restored; validate top 3 manually before building all 10 |
| Head-term competition high for flooring/tile (retailers + calculator.net/Omni rank) | Medium | Medium | Lean on long-tail FAQ content per tool (site's existing pattern) rather than competing on the bare head term alone |
| Roofing/lumber/insulation need real domain formulas (pitch factor, board-foot, R-value) — higher error risk than simple area math | Medium | Medium | Scope as their own batch; verify formulas against a construction reference before shipping compute() |

## Next Steps
- [ ] Re-run keyword-research with live DataForSEO data (balance permitting) to confirm/reorder this list
- [ ] Build Batch 1: flooring-calculator, mulch-calculator, gravel-calculator
- [ ] Run schema-markup-generator + content-seo-brief per new tool before writing calculators-data.js entries
- [ ] Update Task Board.md with the batches above
