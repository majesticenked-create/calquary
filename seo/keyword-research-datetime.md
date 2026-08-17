# Keyword Research — Date & Time Calculators

> ⚠️ **Data note**: DataForSEO MCP retried again, still HTTP 402 (seventh consecutive attempt, no account balance). Estimates below are qualitative, pattern-matched against known date/time calculator search behavior — not sourced numbers. Re-run once the account has balance.

## Executive Summary
Date & Time has 2 live tools (`days-until-calculator`, `age-calculator`) in a very high-volume, evergreen niche led by calculator.net's "date calculator." Ten opportunities identified. Two — timezone conversion and generic "countdown timer" — are flagged as poor fits: timezone conversion needs live DST data (same constraint that excluded currency/timezone converters from Everyday Conversions), and a generic countdown timer would duplicate `days-until-calculator` too closely. Batch 1 prioritizes `date-duration-calculator` (arbitrary two-date difference), `business-days-calculator` (weekday-only counting), and `time-duration-calculator` (clock-time arithmetic) — three genuinely distinct calculation shapes.

## Context & Objectives
- **Objective**: Identify exact-match "[thing] calculator" opportunities for Date & Time that map to a distinct, buildable tool.
- **Audience**: General planners, project/work schedulers, anyone needing exact date or time math.
- **Existing config reviewed**: `days-until-calculator` (today → future date, whole days only) and `age-calculator` (birth date → today, years/months/days) as pattern baseline.
- **Engine constraint**: the field schema has no native time-of-day input type — clock-time fields must be built from paired number inputs (hour/minute), the same pattern already used by `pace-calculator`'s hours/minutes/seconds fields.

## Analysis
**Framework**: Search Intent Classification (Transactional "[thing] calculator" head terms) + Pillar-Cluster, with "Date & Time" as pillar.

Both existing tools anchor one side of their calculation to "today" (`new Date()`), which makes their FAQ examples describe *how* the calculation works rather than a fixed numeric answer, since the result changes daily. New tools using two arbitrary user-supplied dates (rather than "today") can have fully deterministic FAQ examples — this is a build consideration, not a ranking one, but affects how each tool's default/FAQ content should be written.

## Keyword Opportunities (ranked)

| # | Primary keyword | Est. volume | Est. difficulty | Search intent | Distinct from existing tools? |
|---|---|---|---|---|---|
| 1 | date calculator (days between dates) | Very High | Very High (calculator.net's flagship tool) | Transactional | Yes — arbitrary start/end dates, not anchored to "today" like days-until-calculator |
| 2 | business days calculator | Medium-High | Medium | Transactional | Yes — weekday-only counting logic, genuinely new algorithm |
| 3 | time duration calculator (hours between times) | Medium-High | Medium | Transactional | Yes — clock-time arithmetic with overnight rollover, not calendar-day math |
| 4 | week number calculator | Medium | Low-Medium | Informational-transactional | Yes — ISO week number lookup, simple new formula |
| 5 | day of the week calculator | Medium | Low-Medium | Informational | Yes — given any date, returns the weekday name |
| 6 | leap year calculator | Low-Medium | Low | Informational | Yes — simple divisibility rule, very easy build |
| 7 | work hours calculator (timesheet) | Medium | Medium | Transactional, work-adjacent | Overlaps with time-duration-calculator's core math — could be a variant framing (multiple clock-in/out pairs) rather than a separate tool |
| 8 | time zone converter | High | High | Transactional | **Poor fit** — same constraint as currency-converter: needs live DST-aware data, excluded from Everyday Conversions for the same reason |
| 9 | countdown timer | High | High | Transactional | **Too close to days-until-calculator** — would need a materially different framing (e.g., live-updating JS timer) to justify as separate; skip for a static content batch |
| 10 | anniversary calculator | Low | Low | Transactional | Close variant of days-until-calculator (same math, different framing) — low priority, possible future content angle rather than new compute logic |

## Recommendations
1. **Batch 1 (highest confidence)**: `date-duration-calculator`, `business-days-calculator`, `time-duration-calculator` — each introduces genuinely distinct calculation logic (arbitrary date diff, weekday-only counting, clock-time arithmetic with rollover).
2. **Batch 2**: `week-number-calculator`, `day-of-week-calculator`, `leap-year-calculator` — simple, low-competition, quick wins.
3. **Excluded**: `timezone-converter` (live DST data dependency, same reasoning as Everyday Conversions), `countdown-timer` (too close to days-until-calculator without a live-updating JS component), `anniversary-calculator` (same math as days-until, low differentiation value).

## Implementation
| Action | Owner | Timeline | Priority |
|--------|-------|----------|----------|
| Build date-duration-calculator, business-days-calculator, time-duration-calculator | Claude | Next batch | High |
| Build week-number-calculator, day-of-week-calculator, leap-year-calculator | Claude | Following batch | Medium |
| Re-run this skill with live DataForSEO data once account has balance | User/Claude | Before finalizing priority order | High |

## Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Date & Time tools live | 2 | 8 (2 existing + 6 buildable) | `calculatorsInCategory('datetime').length` |
| Organic traffic to /category/datetime.html | Unmeasured (no GA yet) | Baseline + growth | google-analytics-setup skill, then GSC |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| date-duration-calculator competes directly with calculator.net's dominant "date calculator" | High | Medium | Lean on FAQ/long-tail content; don't expect to outrank the category leader on the bare head term |
| business-days-calculator doesn't account for holidays, only weekends | Medium | Low | Note this clearly in the tool's output/FAQ rather than building a holiday calendar (out of scope for a static site) |
| Volume/difficulty estimates unsourced (DataForSEO still down) | High | Medium | Re-run once balance restored; validate top 3 manually |

## Next Steps
- [ ] Re-run keyword-research with live DataForSEO data once balance is restored
- [ ] Build Batch 1: date-duration-calculator, business-days-calculator, time-duration-calculator
- [ ] Update Task Board.md with the batches above
