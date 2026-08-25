# Knowledge Base

System-wide learned rules. Read by ALL agents and sessions at startup.
Written ONLY by the auditor after confirming learnings.
Entries are mandatory constraints, not suggestions.

## Provenance Hierarchy
Every entry MUST cite its source using one of:
- `[Source: user override MMDDYY]` — User explicitly corrected something
- `[Source: empirical MMDDYY]` — Verified through testing or data
- `[Source: agent inference MMDDYY]` — Pattern observed by an agent, confirmed by auditor

## Hard Rules
- Before committing any anchor-based text insertion into js/i18n.js (or similarly large hand-templated JS data files), run a duplicate-locale-key scan per top-level block, not just a parse/syntax check — a file can parse cleanly while silently shadowing correct content with an earlier misplaced block (JS object literals resolve duplicate keys last-write-wins with no error). [Source: empirical 082526 — found a 3rd instance of this exact bug pattern in js/i18n.js:585-611 (mortgage-calculator block contaminated with average-calculator content) after 2 similar instances were already caught the same session via syntax-only checks]

## Platform & Tool Rules
- CJK locales (e.g. ja) need an explicit web-font fallback — Inter (and most Latin-only sans stacks) have no CJK glyphs. Load a CJK-capable font (e.g. Noto Sans JP) per-locale and scope it with an `html[lang="ja"]` CSS override rather than loading it globally. [Source: empirical 082526 — verified via Playwright screenshot, css/styles.css:9-16, build.js fontsLink()]

## Project Patterns
- (none yet)

## Known Failure Modes
- Anchor-based Python/script insertion into large hand-maintained JS translation files (js/i18n.js) is a recurring source of misplaced-content bugs — 3 instances in one session (2 caught, 1 missed until audit). Prefer a full-file rewrite or AST-aware insertion over text-anchor insertion for this file going forward. [Source: agent inference 082526, confirmed by auditor]
