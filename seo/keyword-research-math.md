# Keyword Research — Math Calculators

> ⚠️ **Data note**: DataForSEO MCP retried again, still HTTP 402 (eighth consecutive attempt, no account balance). Estimates below are qualitative, pattern-matched against known math-calculator search behavior — not sourced numbers. Re-run once the account has balance.

## Executive Summary
Math has 2 live tools (`percentage-calculator`, `percentage-change-calculator`) in a broad, evergreen, homework/reference-driven niche. Ten opportunities identified. Batch 1 prioritizes `average-calculator` (list statistics — new input pattern using a textarea field type not yet used elsewhere in the site), `fraction-calculator` (fraction arithmetic with simplification), and `gcd-lcm-calculator` (number theory) — three genuinely distinct calculation families, and the first Math tools handling a *set* of numbers rather than one or two scalar inputs.

## Context & Objectives
- **Objective**: Identify exact-match "[thing] calculator" opportunities for Math that map to a distinct, buildable tool.
- **Audience**: Students, homework help, and general reference lookups — this category skews more informational/educational than the transactional intent seen in Finance or Construction.
- **Existing config reviewed**: `percentage-calculator` and `percentage-change-calculator` (both single/pair scalar inputs) as pattern baseline.
- **New field type introduced**: `average-calculator` needs a `textarea` field (already supported by `engine.js` and the schema, just not previously used) to accept an arbitrary list of numbers — this is a genuinely new input shape for the site, not just a new formula.

## Analysis
**Framework**: Search Intent Classification (Transactional/Informational "[thing] calculator" head terms) + Pillar-Cluster, with "Math" as pillar.

Math calculator searches are dominated by education-reference sites (calculator.net, Symbolab, Mathway) and skew toward homework-help intent. Competition is high on head terms but this audience is also very FAQ/explanation-receptive — a good fit for the site's existing FAQ-heavy content pattern.

## Keyword Opportunities (ranked)

| # | Primary keyword | Est. volume | Est. difficulty | Search intent | Distinct from existing tools? |
|---|---|---|---|---|---|
| 1 | average calculator | Very High | High (calculator.net, Omni Calculator dominate) | Informational-transactional | Yes — first tool taking a list of numbers (textarea input), not a scalar |
| 2 | fraction calculator | High | High (Mathway, Symbolab dominate for homework help) | Informational-transactional | Yes — fraction arithmetic + GCD simplification, entirely new math |
| 3 | gcd calculator / lcm calculator | Medium | Medium | Informational | Yes — number theory, shares the new gcd() helper with fraction-calculator |
| 4 | standard deviation calculator | Medium-High | High | Informational-transactional | Yes — builds on average-calculator's list-input pattern with variance math |
| 5 | square root calculator | High | Medium | Informational | Yes — but very simple (near-trivial single operation); good quick win, lower content depth |
| 6 | ratio calculator | Medium | Medium | Informational-transactional | Yes — proportion-solving, distinct from fraction arithmetic |
| 7 | exponent calculator | Medium | Medium | Informational | Yes — power/root operations, simple |
| 8 | quadratic formula calculator | Medium | Medium-High | Informational, homework-help intent | Yes — but higher algebra complexity, needs careful complex-root handling |
| 9 | random number generator | Medium-High | Medium | Transactional | Overlaps conceptually with Text & Digital's `password-generator` — better scoped there or deferred to avoid category-fit ambiguity |
| 10 | rounding / significant figures calculator | Low-Medium | Low | Informational | Yes, but low volume — low priority |

## Recommendations
1. **Batch 1 (highest confidence)**: `average-calculator`, `fraction-calculator`, `gcd-lcm-calculator` — introduces the new textarea/list-input pattern and a shared `gcd()` helper function, both reusable by later Math tools.
2. **Batch 2**: `standard-deviation-calculator` (builds directly on average-calculator's list parsing), `square-root-calculator`, `ratio-calculator` — quick wins.
3. **Batch 3 / deferred**: `exponent-calculator`, `quadratic-formula-calculator` (needs complex-root handling — more careful build). `random-number-generator` deferred to avoid overlap with Text & Digital's existing `password-generator`.

## Implementation
| Action | Owner | Timeline | Priority |
|--------|-------|----------|----------|
| Build average-calculator, fraction-calculator, gcd-lcm-calculator | Claude | Next batch | High |
| Build standard-deviation-calculator, square-root-calculator, ratio-calculator | Claude | Following batch | Medium |
| Build exponent-calculator, quadratic-formula-calculator | Claude | Later batch | Medium-Low |
| Re-run this skill with live DataForSEO data once account has balance | User/Claude | Before finalizing priority order | High |

## Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Math tools live | 2 | 9 (2 existing + 7 buildable, excluding deferred random-number-generator) | `calculatorsInCategory('math').length` |
| Organic traffic to /category/math.html | Unmeasured (no GA yet) | Baseline + growth | google-analytics-setup skill, then GSC |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Math niche dominated by homework-help authority sites (Mathway, Symbolab, calculator.net) | High | Medium | Lean on FAQ/long-tail content; don't expect to outrank on bare head terms |
| Textarea list-parsing needs to handle messy user input (mixed commas/spaces/newlines, invalid entries) | Medium | Medium | Filter non-numeric tokens defensively (`.filter(n => !isNaN(n))`) rather than erroring on malformed input |
| Volume/difficulty estimates unsourced (DataForSEO still down) | High | Medium | Re-run once balance restored; validate top 3 manually |

## Next Steps
- [ ] Re-run keyword-research with live DataForSEO data once balance is restored
- [ ] Build Batch 1: average-calculator, fraction-calculator, gcd-lcm-calculator
- [ ] Update Task Board.md with the batches above
