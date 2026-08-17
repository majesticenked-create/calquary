# Keyword Research — Pet & Lifestyle Calculators

> ⚠️ **Data note**: DataForSEO MCP retried again, still HTTP 402 (tenth consecutive attempt across every category run this session, no account balance). Estimates below are qualitative, pattern-matched against known pet-calculator search behavior — not sourced numbers. Re-run once the account has balance.

## Executive Summary
Pet & Lifestyle has 2 live tools (`dog-age-calculator`, `cat-age-calculator`), the smallest and most niche category on the site by search volume ceiling. Batch 1 prioritizes `dog-food-calculator` (RER-based feeding amount — an entirely new formula family, not an age curve), `rabbit-age-calculator` (extends the age-curve pattern to a third pet), and `dog-pregnancy-calculator` (gestation date math, extending the days-until-calculator pattern to a pet-specific use case).

## Context & Objectives
- **Objective**: Identify exact-match "[thing] calculator" opportunities for Pet & Lifestyle that map to a distinct, buildable tool.
- **Audience**: Pet owners — smaller, more devoted audience than the site's other categories, with genuine reference/planning intent (feeding amounts, breeding timelines) alongside the curiosity-driven age-conversion searches.
- **Existing config reviewed**: `dog-age-calculator` (size-adjusted age curve) and `cat-age-calculator` (simpler age curve, no size variable) as pattern baseline.

## Analysis
**Framework**: Search Intent Classification (Transactional/Informational "[thing] calculator" head terms) + Pillar-Cluster, with "Pet & Lifestyle" as pillar.

This is the lowest-volume category on the site by a wide margin — age-conversion calculators (dog/cat) capture most of the category's search demand, with everything else being a long tail. Worth building out for completeness and cross-linking value (e.g. from `bmi-calculator`'s existing link to `dog-age-calculator`) rather than expecting it to be a major traffic driver.

## Keyword Opportunities (ranked)

| # | Primary keyword | Est. volume | Est. difficulty | Search intent | Distinct from existing tools? |
|---|---|---|---|---|---|
| 1 | dog food calculator | Medium | Medium | Transactional | Yes — RER (resting energy requirement) formula, entirely new math, not an age curve |
| 2 | rabbit age calculator | Low-Medium | Low | Informational | Yes — extends the age-curve pattern (like cat-age-calculator) to a third pet species |
| 3 | dog pregnancy calculator | Low-Medium | Low-Medium | Transactional, planning intent | Yes — gestation date math (mating date + ~63 days), extends days-until-calculator's date-math pattern to a pet use case |
| 4 | horse age calculator | Low | Low | Informational | Yes, but very low volume — lower priority than rabbit |
| 5 | ideal dog weight calculator | Low-Medium | Low-Medium | Transactional | Yes — breed/size-based weight range, distinct from the age curve |
| 6 | pet cost calculator | Low | Low | Transactional, planning intent | Yes — annual cost estimate, more Finance-adjacent than Pet, could arguably live in either category |
| 7 | bird age calculator | Low | Low | Informational | Yes, but very low volume | 
| 8 | cat pregnancy calculator | Low | Low-Medium | Transactional | Same math pattern as dog-pregnancy-calculator (different gestation length, ~63-65 days too) — near-duplicate value, lower priority than building the dog version first |
| 9 | puppy weight predictor | Low | Medium (needs a growth curve model, more complex) | Transactional | Yes, but meaningfully more complex to build accurately — defer |
| 10 | dog age in human years by breed (specific breed lookup) | Low | High (needs a breed database) | Informational | **Poor fit** — would need a breed-name lookup table, out of scope for a simple calculator; the existing size-based dog-age-calculator already approximates this |

## Recommendations
1. **Batch 1 (highest confidence)**: `dog-food-calculator`, `rabbit-age-calculator`, `dog-pregnancy-calculator` — one new formula family (RER), one pattern extension (age curve), one pattern extension (gestation date math).
2. **Batch 2 (lower volume, still simple)**: `horse-age-calculator`, `ideal-dog-weight-calculator`, `cat-pregnancy-calculator`.
3. **Deferred/excluded**: `puppy-weight-predictor` (needs a growth curve model, meaningfully more complex), breed-specific lookup tools (would need a breed database, out of scope).

## Implementation
| Action | Owner | Timeline | Priority |
|--------|-------|----------|----------|
| Build dog-food-calculator, rabbit-age-calculator, dog-pregnancy-calculator | Claude | Next batch | High |
| Build horse-age-calculator, ideal-dog-weight-calculator, cat-pregnancy-calculator | Claude | Following batch | Low |
| Re-run this skill with live DataForSEO data once account has balance | User/Claude | Before finalizing priority order | High |

## Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Pet & Lifestyle tools live | 2 | 8 (2 existing + 6 buildable) | `calculatorsInCategory('pets').length` |
| Organic traffic to /category/pets.html | Unmeasured (no GA yet) | Baseline + growth | google-analytics-setup skill, then GSC |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Category has a low absolute volume ceiling compared to the rest of the site | High | Low | Build for completeness/cross-linking value, not as a primary growth driver — consistent with treating this as the last, smallest category |
| dog-food-calculator's RER formula can mislead if taken as veterinary advice | Low-Medium | Medium | Include a clear note that it's an estimate, consistent with the site's existing "not a substitute for professional advice" framing on health-adjacent tools |
| Volume/difficulty estimates unsourced (DataForSEO still down for all 10 category runs this session) | High | Medium | Re-run once balance restored; validate top 3 manually |

## Next Steps
- [ ] Re-run keyword-research with live DataForSEO data once balance is restored
- [ ] Build Batch 1: dog-food-calculator, rabbit-age-calculator, dog-pregnancy-calculator
- [ ] Update Task Board.md with the batches above
