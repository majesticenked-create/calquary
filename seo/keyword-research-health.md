# Keyword Research — Health & Fitness Calculators

> ⚠️ **Data note**: DataForSEO MCP retried again, still HTTP 402 (no account balance, fourth consecutive attempt across categories). Estimates below are qualitative, pattern-matched against known health/fitness calculator search behavior — not sourced numbers. Re-run once the account has balance.

## Executive Summary
Health & Fitness has 2 live tools (`bmi-calculator`, `pace-calculator`) in a very high-volume niche driven by year-round fitness/diet search demand plus seasonal spikes (New Year, summer). Ten exact-match opportunities identified. Priority given to three that form a genuinely distinct formula trio: `bmr-calculator` (baseline metabolism, Mifflin-St Jeor), `calorie-calculator` (BMR × activity level = daily calorie targets — TDEE), and `body-fat-calculator` (US Navy circumference method — entirely different formula family, no overlap with weight/height-only BMI math).

## Context & Objectives
- **Objective**: Identify exact-match "[thing] calculator" opportunities for Health & Fitness that map to a distinct, buildable tool.
- **Audience**: General fitness/diet planners and runners; existing tools already cover BMI and running pace.
- **Existing config reviewed**: `bmi-calculator` (height/weight only) and `pace-calculator` (distance/time) as pattern baseline.

## Analysis
**Framework**: Search Intent Classification (Transactional/Commercial "[thing] calculator" head terms) + Pillar-Cluster, with "Health & Fitness" as pillar.

Note on distinctness risk: `bmr-calculator` and `calorie-calculator` share the same underlying Mifflin-St Jeor formula (calorie-calculator = BMR × activity multiplier), which mirrors the mortgage/loan-calculator relationship in Finance. Both are kept as separate tools because both are independently high-volume head terms with different user intent — BMR alone (metabolism curiosity, medical context) vs. calorie-calculator (actionable daily targets: maintain/cut/bulk) — the same reasoning used to justify mortgage-calculator alongside loan-calculator.

**Sensitive-topic note**: pregnancy-related calculators carry higher accuracy/liability expectations than a materials estimate — flagged as lower priority for a first pass, not excluded outright.

## Keyword Opportunities (ranked)

| # | Primary keyword | Est. volume | Est. difficulty | Search intent | Distinct from existing tools? |
|---|---|---|---|---|---|
| 1 | calorie calculator | Very High | Very High (calculator.net, Mayo Clinic, Healthline dominate) | Transactional | Yes — BMR × activity level → daily calorie targets, not just BMI's static number |
| 2 | bmr calculator | High | High | Informational-transactional | Borderline vs. calorie-calculator (same core formula) — kept as separate head term per note above |
| 3 | body fat calculator | High | Medium-High | Transactional | Yes — circumference-based (US Navy method), entirely different inputs from BMI |
| 4 | macro calculator | Medium-High | Medium-High | Transactional, fitness-community intent | Yes — splits calorie target into protein/fat/carb grams, builds on calorie-calculator's output |
| 5 | ideal weight calculator | Medium | Medium | Informational-transactional | Yes — frame-based formula (Devine/Robinson), distinct from BMI's ratio |
| 6 | water intake calculator | Medium | Low-Medium | Transactional | Yes — simple weight-based hydration formula, no analog |
| 7 | heart rate zone calculator | Medium | Medium | Transactional, fitness-community | Yes — age-based max HR + zone bands, distinct from pace-calculator |
| 8 | one rep max calculator | Medium | Low-Medium (strength-training niche, less contested) | Transactional | Yes — Epley/Brzycki formula, distinct strength-training niche |
| 9 | pregnancy due date calculator | High | High (medical-authority sites dominate; higher accuracy bar) | Transactional | Yes — but sensitive topic, defer to a later, more careful pass |
| 10 | body frame size calculator | Low | Low | Informational | Yes, but low volume — low priority |

## Recommendations
1. **Batch 1 (highest confidence)**: `bmr-calculator`, `calorie-calculator`, `body-fat-calculator` — introduces two new formula families (Mifflin-St Jeor, US Navy method) the site doesn't have yet.
2. **Batch 2**: `macro-calculator` (builds directly on calorie-calculator's output), `water-intake-calculator`, `one-rep-max-calculator` — simple, low-competition, quick wins.
3. **Batch 3 / deferred**: `heart-rate-zone-calculator`, `ideal-weight-calculator`, `body-frame-size-calculator`. `pregnancy-due-date-calculator` deferred pending a dedicated accuracy/liability review given the medical-adjacent stakes.

## Implementation
| Action | Owner | Timeline | Priority |
|--------|-------|----------|----------|
| Build bmr-calculator, calorie-calculator, body-fat-calculator | Claude | Next batch | High |
| Build macro-calculator, water-intake-calculator, one-rep-max-calculator | Claude | Following batch | Medium |
| Build heart-rate-zone-calculator, ideal-weight-calculator | Claude | Later batch | Medium-Low |
| Review pregnancy-due-date-calculator separately before building (accuracy/liability bar higher) | User/Claude | Deferred | Low (until reviewed) |
| Re-run this skill with live DataForSEO data once account has balance | User/Claude | Before finalizing priority order | High |

## Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Health & Fitness tools live | 2 | 11 (excluding deferred pregnancy-due-date) | `calculatorsInCategory('health').length` |
| Organic traffic to /category/health.html | Unmeasured (no GA yet) | Baseline + growth | google-analytics-setup skill, then GSC |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| BMR/calorie-calculator overlap reads as duplicate content to search engines | Medium | Medium | Ensure genuinely different output framing and FAQ content per tool (metabolism baseline vs. actionable daily targets) |
| Health-niche head terms dominated by medical-authority sites (Mayo Clinic, Healthline) | High | Medium | Lean on FAQ/long-tail content; don't expect to outrank medical sites on bare head terms |
| Volume/difficulty estimates unsourced (DataForSEO still down) | High | Medium | Re-run once balance restored; validate top 3 manually |

## Next Steps
- [ ] Re-run keyword-research with live DataForSEO data once balance is restored
- [ ] Build Batch 1: bmr-calculator, calorie-calculator, body-fat-calculator
- [ ] Update Task Board.md with the batches above
