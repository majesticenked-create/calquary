# Keyword Research — Text & Digital Calculators

> ⚠️ **Data note**: DataForSEO MCP retried again, still HTTP 402 (ninth consecutive attempt, no account balance). Estimates below are qualitative, pattern-matched against known text/utility tool search behavior — not sourced numbers. Re-run once the account has balance.

## Executive Summary
Text & Digital has 2 live tools (`word-counter`, `password-generator`) in a developer/writer-adjacent utility niche. Batch 1 prioritizes `random-number-generator` (deferred here from Math, since it fits alongside `password-generator`'s client-side-randomness pattern), `case-converter` (uppercase/lowercase/title/sentence case), and `lorem-ipsum-generator` (placeholder text) — all simple, synchronous, no external dependencies.

## Context & Objectives
- **Objective**: Identify exact-match "[thing]" opportunities for Text & Digital that map to a distinct, buildable tool.
- **Audience**: Writers, developers, and general users needing quick text utilities.
- **Existing config reviewed**: `word-counter` (textarea → live counts) and `password-generator` (client-side `Math.random()`, string output in `primary.value`) as pattern baseline — password-generator establishes that a generated *string*, not just a number, is a valid primary output for this engine.
- **Build constraint**: anything needing an async API (e.g. `crypto.subtle` for a hash generator) is a poor fit — the engine's `compute()` is called synchronously and result rendering assumes a synchronous return.

## Analysis
**Framework**: Search Intent Classification (Transactional utility-tool head terms) + Pillar-Cluster, with "Text & Digital" as pillar.

This category is less seasonal and less competitive than Finance/Health, but also lower absolute volume — utility tools like case converters and lorem ipsum generators have loyal, consistent traffic without media-site dominance the way "mortgage calculator" does.

## Keyword Opportunities (ranked)

| # | Primary keyword | Est. volume | Est. difficulty | Search intent | Distinct from existing tools? |
|---|---|---|---|---|---|
| 1 | random number generator | High | Medium-High | Transactional | Yes — deferred from Math batch, fits the client-side-randomness pattern next to password-generator |
| 2 | case converter | Medium-High | Medium | Transactional | Yes — text transformation, not counting |
| 3 | lorem ipsum generator | Medium | Medium | Transactional, developer/designer intent | Yes — text generation from a fixed word bank |
| 4 | character counter | Medium | Low-Medium | Transactional | **Too close to word-counter** — already reports character count; a separate tool would be near-duplicate content |
| 5 | text to slug generator | Low-Medium | Low-Medium | Transactional, developer intent | Yes — URL-slug formatting, simple string transform |
| 6 | hash generator (md5/sha256) | Medium | Medium | Transactional, developer intent | **Poor fit for this build** — needs async `crypto.subtle` API, doesn't match the engine's synchronous compute() pattern |
| 7 | binary to text converter | Low | Low | Transactional, technical | Yes — simple encode/decode, niche audience |
| 8 | text reverser | Low | Low | Transactional | Yes but very low value-add — near-trivial |
| 9 | word frequency counter | Low-Medium | Low | Transactional | Yes — builds on word-counter's tokenization but distinct output (frequency table) |
| 10 | QR code generator | Medium-High | Medium | Transactional | **Poor fit** — needs a rendering/image output the current engine (numeric/string result panel) doesn't support without new UI work |

## Recommendations
1. **Batch 1 (highest confidence)**: `random-number-generator`, `case-converter`, `lorem-ipsum-generator` — all simple, synchronous, string/number output compatible with the existing engine.
2. **Batch 2**: `text-to-slug-generator`, `binary-to-text-converter`, `word-frequency-counter` — lower volume but still simple, synchronous builds.
3. **Excluded**: `character-counter` (duplicate of word-counter's existing output), `hash-generator` (async API mismatch with engine), `QR-code-generator` (needs image/rendering output, not a fit for this engine without new UI work), `text-reverser` (too trivial to justify a dedicated page).

## Implementation
| Action | Owner | Timeline | Priority |
|--------|-------|----------|----------|
| Build random-number-generator, case-converter, lorem-ipsum-generator | Claude | Next batch | High |
| Build text-to-slug-generator, binary-to-text-converter, word-frequency-counter | Claude | Following batch | Medium |
| Re-run this skill with live DataForSEO data once account has balance | User/Claude | Before finalizing priority order | High |

## Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Text & Digital tools live | 2 | 8 (2 existing + 6 buildable) | `calculatorsInCategory('text').length` |
| Organic traffic to /category/text.html | Unmeasured (no GA yet) | Baseline + growth | google-analytics-setup skill, then GSC |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Random-output tools (random-number-generator) can't be verified against a fixed expected value like other calculators | High (by design) | Low | Verify structurally instead — correct range, correct count, correct format — rather than an exact output match |
| lorem-ipsum-generator's text-block primary.value may render awkwardly in the numeric-focused result panel | Medium | Low | Follow password-generator's precedent (string in primary.value already works); keep paragraph joins simple to avoid CSS/whitespace issues |
| Volume/difficulty estimates unsourced (DataForSEO still down) | High | Medium | Re-run once balance restored; validate top 3 manually |

## Next Steps
- [ ] Re-run keyword-research with live DataForSEO data once balance is restored
- [ ] Build Batch 1: random-number-generator, case-converter, lorem-ipsum-generator
- [ ] Update Task Board.md with the batches above
