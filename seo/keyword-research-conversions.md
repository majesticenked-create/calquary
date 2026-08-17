# Keyword Research — Everyday Conversions Calculators

> ⚠️ **Data note**: DataForSEO MCP retried again, still HTTP 402 (sixth consecutive attempt across categories, no account balance). Estimates below are qualitative, pattern-matched against known unit-converter search behavior — not sourced numbers. Re-run once the account has balance.

## Executive Summary
Everyday Conversions has 2 live tools (`unit-length-converter`, `cooking-converter`) in a very high-volume, evergreen niche (unit conversions are some of the most consistently searched calculator queries on the web). Ten opportunities identified. Two candidates — currency and time-zone converters — are flagged as poor fits for this static, no-backend site since they require live external data (exchange rates, DST rules) that would go stale without a backend. Batch 1 prioritizes temperature, weight, and volume converters — all reuse `unit-length-converter`'s lookup-table pattern, with temperature requiring a genuinely distinct offset formula rather than simple multiplication.

## Context & Objectives
- **Objective**: Identify exact-match "[thing] converter" opportunities for Everyday Conversions that map to a distinct, buildable, static tool.
- **Audience**: Anyone needing a quick unit conversion — cooking, travel, fitness, general reference.
- **Existing config reviewed**: `unit-length-converter` (multiplicative lookup table to a base unit) and `cooking-converter` (ingredient-specific density lookup) as pattern baseline.
- **Constraint specific to this category**: the site is static/client-side with no backend — any converter needing live external data (exchange rates, time zones with DST) either needs a hardcoded/stale snapshot (bad for accuracy) or should be deferred until the site has a data-refresh mechanism.

## Analysis
**Framework**: Search Intent Classification (Transactional "[thing] converter/calculator" head terms) + Pillar-Cluster, with "Everyday Conversions" as pillar and each unit family as a cluster.

Unit converters are typically informational-transactional with very consistent, non-seasonal search volume (unlike Construction's seasonal spikes or Finance's rate-sensitive terms). Competition is high on the biggest terms (calculator.net, Google's own built-in unit converter widget) but there's room via FAQ content and category breadth.

## Keyword Opportunities (ranked)

| # | Primary keyword | Est. volume | Est. difficulty | Search intent | Distinct from existing tools? |
|---|---|---|---|---|---|
| 1 | temperature converter (f to c) | Very High | High (Google's built-in widget competes directly) | Transactional | Yes — offset formula (not pure multiplication), genuinely new math |
| 2 | weight converter (kg to lbs) | Very High | High | Transactional | Yes — new unit family, same lookup-table pattern as unit-length-converter |
| 3 | volume converter (liters to gallons) | High | Medium-High | Transactional | Yes — raw volume units, distinct from cooking-converter's ingredient-specific density approach |
| 4 | speed converter (mph to kph) | Medium | Medium | Transactional | Yes — new unit family, same lookup-table pattern |
| 5 | area converter (sq ft to sq m) | Medium | Medium | Transactional | Yes — also relevant cross-link to Construction & Home category |
| 6 | data storage converter (mb to gb) | Medium | Low-Medium | Transactional | Yes — cross-category adjacent to Text & Digital, but fits the "unit conversion" pattern |
| 7 | pressure converter (psi to bar) | Low-Medium | Low | Transactional, technical audience | Yes — niche/technical, lower priority |
| 8 | fuel economy converter (mpg to l/100km) | Low-Medium | Low | Transactional | Yes — niche but simple |
| 9 | currency converter | Very High | Very High | Transactional | **Poor fit** — requires live exchange rate data; a static snapshot would mislead users. Defer unless the site adds a data-refresh mechanism. |
| 10 | time zone converter | High | High | Transactional | **Poor fit** — requires DST-aware timezone logic and current date context; meaningfully more complex than a unit lookup table. Defer. |

## Recommendations
1. **Batch 1 (highest confidence)**: `temperature-converter`, `weight-converter`, `volume-converter` — very high volume, no external data dependency, reuse the proven lookup-table pattern (temperature adds a genuinely new offset-formula variant).
2. **Batch 2**: `speed-converter`, `area-converter` — same pattern, lower volume but easy wins; area-converter cross-links naturally to Construction & Home.
3. **Batch 3 / lower priority**: `data-storage-converter`, `pressure-converter`, `fuel-economy-converter` — niche/technical audiences, still simple builds.
4. **Excluded from this site's static architecture**: `currency-converter` and `timezone-converter` — both need live/current external data that a no-backend static site can't serve accurately. Worth revisiting only if a build-time data refresh or client-side API call is added later.

## Implementation
| Action | Owner | Timeline | Priority |
|--------|-------|----------|----------|
| Build temperature-converter, weight-converter, volume-converter | Claude | Next batch | High |
| Build speed-converter, area-converter | Claude | Following batch | Medium |
| Build data-storage-converter, pressure-converter, fuel-economy-converter | Claude | Later batch | Low |
| Re-run this skill with live DataForSEO data once account has balance | User/Claude | Before finalizing priority order | High |

## Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Everyday Conversions tools live | 2 | 10 (2 existing + 8 buildable, excluding currency/timezone) | `calculatorsInCategory('conversions').length` |
| Organic traffic to /category/conversions.html | Unmeasured (no GA yet) | Baseline + growth | google-analytics-setup skill, then GSC |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Google's built-in SERP unit-converter widget captures most head-term searches before users click through | High | Medium | Lean on FAQ/long-tail content and the "reference library" positioning rather than expecting to outrank the widget |
| Currency/timezone converters are high-volume but structurally a poor fit for this static site | High (if built naively) | High (stale/wrong data) | Excluded from this batch; only reconsider with a proper data-refresh mechanism |
| Volume/difficulty estimates unsourced (DataForSEO still down) | High | Medium | Re-run once balance restored; validate top 3 manually |

## Next Steps
- [ ] Re-run keyword-research with live DataForSEO data once balance is restored
- [ ] Build Batch 1: temperature-converter, weight-converter, volume-converter
- [ ] Update Task Board.md with the batches above
