# Keyword Research — Finance Calculators

> ⚠️ **Data note**: DataForSEO MCP retried, still HTTP 402 (no account balance). Estimates below are qualitative, pattern-matched against known personal-finance calculator search behavior — not sourced numbers. Re-run once the account has balance.

## Executive Summary
Finance has 2 live tools (`loan-calculator`, `tip-calculator`) in one of the highest-volume, highest-competition calculator niches on the web (dominated by Bankrate, NerdWallet, Calculator.net). Ten exact-match opportunities identified; all distinct. Priority given to three that reuse `loan-calculator`'s amortization/compound-growth math but produce genuinely different outputs: `savings-calculator` (recurring-contribution future value — different formula shape entirely), `compound-interest-calculator` (lump-sum growth, no contributions), and `mortgage-calculator` (full PITI — principal, interest, taxes, insurance — not just a bare payment like loan-calculator).

## Context & Objectives
- **Objective**: Identify exact-match "[thing] calculator" opportunities for Finance that map to a distinct, buildable tool.
- **Audience**: Consumers doing personal finance math before a purchase, loan, or savings decision.
- **Existing config reviewed**: `loan-calculator` (amortization formula) and `tip-calculator` (simple % split) as pattern baseline.

## Analysis
**Framework**: Search Intent Classification (Transactional/Commercial only) + Pillar-Cluster, with "Finance" as pillar and each financial product/decision as a cluster.

Finance is a much more competitive niche than Construction — nearly every head term here is dominated by large finance-media sites with domain authority this new site won't match quickly. The strategic lean should be the same one already working for Construction: build the tool (captures the exact-match searchers who land directly on a calculator via Google's calculator-widget-style intent), then rely on FAQ/long-tail content for organic ranking rather than competing on the bare head term.

## Keyword Opportunities (ranked)

| # | Primary keyword | Est. volume | Est. difficulty | Search intent | Distinct from existing tools? |
|---|---|---|---|---|---|
| 1 | mortgage calculator | Very High | Very High (Bankrate, NerdWallet, Zillow dominate) | Transactional | Yes — full PITI (principal+interest+taxes+insurance), not just a bare payment like loan-calculator |
| 2 | compound interest calculator | High | Medium-High | Informational-transactional | Yes — lump-sum growth formula, no amortization/contributions |
| 3 | savings calculator | Medium-High | Medium | Transactional | Yes — future value with recurring contributions, opposite direction from loan-calculator's payoff math |
| 4 | debt payoff calculator | Medium | Medium | Transactional | Yes — payoff timeline/schedule, not a single payment amount |
| 5 | credit card payoff calculator | Medium | Medium-High | Transactional, high commercial intent | Yes — revolving balance + minimum payment dynamics, distinct from fixed-term loan math |
| 6 | auto loan calculator | Medium-High | High (auto/finance sites dominate) | Transactional | Borderline — same amortization core as loan-calculator; only distinct if scoped with trade-in value + sales tax |
| 7 | retirement calculator | High | Very High (huge scope, many variables) | Transactional | Yes, but high build complexity — best deferred |
| 8 | investment calculator | Medium-High | High | Transactional | Yes — but overlaps conceptually with compound-interest/savings; needs clear differentiation (e.g. contribution + expected return + inflation) |
| 9 | sales tax calculator | Medium | Low | Transactional, simple | Yes — flat-rate lookup/multiply, simplest build in the list |
| 10 | discount calculator | Medium | Low-Medium | Transactional | Yes — sale price from original price + discount %, distinct from tip's add-on math |

**Excluded as poor fit for this run**: "budget calculator" (too open-ended/multi-variable to map to one clean tool) and "net worth calculator" (requires multi-asset input structure that doesn't fit the site's single-purpose calculator pattern well).

## Recommendations
1. **Batch 1 (highest confidence)**: `savings-calculator`, `compound-interest-calculator`, `mortgage-calculator` — savings and compound-interest introduce a genuinely new formula family (compound growth) the site doesn't have yet; mortgage-calculator extends loan-calculator's amortization core into a real point of differentiation (PITI) that's worth the added fields.
2. **Batch 2**: `sales-tax-calculator`, `discount-calculator` — simplest builds, quick wins, round out everyday-money coverage alongside tip-calculator.
3. **Batch 3 (higher complexity/competition)**: `debt-payoff-calculator`, `credit-card-payoff-calculator`, `auto-loan-calculator`, `investment-calculator`. Defer `retirement-calculator` — scope is large enough it may warrant its own content brief rather than a quick batch addition.

## Implementation
| Action | Owner | Timeline | Priority |
|--------|-------|----------|----------|
| Build savings-calculator, compound-interest-calculator, mortgage-calculator | Claude | Next batch | High |
| Build sales-tax-calculator, discount-calculator | Claude | Following batch | Medium |
| Build debt-payoff, credit-card-payoff, auto-loan, investment calculators | Claude | Later batches | Medium-Low |
| Re-run this skill with live DataForSEO data once account has balance | User/Claude | Before finalizing exact priority order | High |

## Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Finance tools live | 2 | 11 (2 existing + 9 identified, excluding deferred retirement-calculator) | `calculatorsInCategory('finance').length` |
| Organic traffic to /category/finance.html | Unmeasured (no GA yet) | Baseline + growth | google-analytics-setup skill, then GSC |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Finance head terms are dominated by major finance-media sites — low realistic chance of ranking on the bare term | High | Medium | Lean harder on FAQ/long-tail content than in Construction; treat direct/calculator-widget traffic as the primary win, not organic rank |
| mortgage-calculator's PITI scope could balloon (PMI, HOA, extra payments) | Medium | Low | Keep v1 to principal+interest+taxes+insurance only; note PMI/HOA as a future enhancement, don't scope-creep this batch |
| Volume/difficulty estimates unsourced (DataForSEO still down) | High | Medium | Re-run once account has balance; validate top 3 manually before further batches |

## Next Steps
- [ ] Re-run keyword-research with live DataForSEO data once balance is restored
- [ ] Build Batch 1: savings-calculator, compound-interest-calculator, mortgage-calculator
- [ ] Update Task Board.md with the batches above
