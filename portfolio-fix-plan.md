# Portfolio Fix Plan
## Goal
Fix all AI-telltale patterns, real bugs, and minor improvements in the portfolio so the code reads as genuinely human-authored. Changes are surgical — no rewrites, no new features.

---

## Sub-Task 1 — Fix AI Telltale Patterns
**Intent:** Remove the most obvious signs that the code was generated in multiple AI sessions. These are the items a technical recruiter or senior developer would immediately spot.

**Expected Outcomes:**
- No "PREMIUM UI FEATURES / UPGRADES" all-caps comment blocks
- No `// JavaScript` header comment in original.js
- No over-explained comments that restate what the code obviously does
- No duplicate `.proj-card` transition rule
- About text is grammatically consistent (no third-person slip)
- Cursor tilt comment matches actual values

**Todo List:**
1. `script.js` line 176 — Replace `/* --- PREMIUM UI FEATURES --- */` block header with lowercase dash-style comment consistent with the rest of the file (`// ---- custom cursor ----`)
2. `style.css` line 1513 — Replace `/* --- PREMIUM UI UPGRADES --- */` with a standard section divider matching existing style (`/* ============================================================ CUSTOM CURSOR + TILT ... */`)
3. `original.js` line 1 — Remove `// JavaScript` comment entirely
4. `original.js` lines 86–87, 95 — Remove verbose scroll comments (`// Show the button when the user scrolls down 200px`, `// Scroll to the top when the button is clicked`) — replace with brief inline ones or remove
5. `style.css` lines 1595–1599 — Remove the duplicate `.proj-card, .bento-item` transition rule block (second occurrence) since the first at line 788 is correct and this one conflicts
6. `index.html` line 146 — Fix `"Holds a Google Cybersecurity Professional certificate"` → `"I hold a Google Cybersecurity Professional certificate"` (person consistency)
7. `script.js` line 215 — Fix comment `// Max 5 deg` → `// max 10 deg` (matches actual rotation values of ±10)

**Relevant Context:**
- `script.js` lines 176–233 (premium block)
- `style.css` lines 1513–1599 (premium upgrades block)
- `original.js` lines 1, 83–101
- `index.html` line 146
- `style.css` lines 788, 1596–1599

**Status:** [ ] pending

---

## Sub-Task 2 — Fix Real Bugs
**Intent:** Correct functional bugs that either break visual behavior or silently fail.

**Expected Outcomes:**
- Custom cursor hover glow is accent-colored (indigo), not red/pink
- `.mesh-bg` CSS variable resolves correctly
- Encoding artifact in original.html renders as a real apostrophe
- `.proj-card` transition no longer has a conflicting rule (resolved in Sub-Task 1)
- Cursor follower doesn't fight its own CSS transition

**Todo List:**
1. `style.css` line 1547 — Fix `.cursor-hover .custom-cursor` background from `rgba(255, 0, 79, 0.1)` → `rgba(99, 102, 241, 0.15)` (matches `--accent` color)
2. `style.css` line 1560 — Fix `.mesh-bg { background: var(--bg-main); }` → `var(--bg)` (correct variable name as defined in `:root`)
3. `original.html` line 127 — Fix `"itΓÇÖs"` → `"it's"` (UTF-8 encoding fix)
4. `script.js` lines 187–191 — Remove `setTimeout` cursor follower delay and rely on the CSS `transition: top/left 0.1s ease-out` already in place; simplify to direct coordinate assignment

**Relevant Context:**
- `style.css` line 1547 (cursor hover color)
- `style.css` line 1560 (mesh-bg variable)
- `original.html` line 127 (encoding)
- `script.js` lines 183–198 (cursor mousemove handler)

**Status:** [ ] pending

---

## Sub-Task 3 — Fix Minor Issues
**Intent:** Clean up dead code, broken links, and small inconsistencies that undercut polish.

**Expected Outcomes:**
- No dead `showSection()` function in original.js
- No dead `.bento-grid` CSS rules
- `original.html` has a proper page title
- Body theme flash on load is eliminated
- Burger menu has consistent 2-span behavior (or gets a 3rd span for proper 3-line → X animation)
- Services "learn more" links in original.html have consistent capitalisation and point somewhere real (or are removed)

**Todo List:**
1. `original.js` lines 1–18 — Remove orphaned `showSection()` function (never called, not referenced in any HTML)
2. `style.css` lines 1590–1593 — Remove dead `.bento-grid > div:nth-child(...)` transition-delay rules (no `.bento-grid` exists in HTML)
3. `original.html` line 7 — Change `<title>Portfolio</title>` → `<title>Mithun Kumar Rajak | Portfolio</title>`
4. `index.html` line 29 — Change `<body class="classic">` → `<body>` so dark (modern) theme is the hardcoded default, and localStorage loads over it without a flash. Update `script.js` default saved value from `'classic'` to `'modern'` on line 26.
5. `original.html` lines 120, 131, 142 — Normalize "learn more" capitalisation to all-lowercase across all three service cards (already 2 of 3 are lowercase)
6. `index.html` line 57 — Add a third `<span></span>` to the burger button so the hamburger → X animation uses all 3 lines; add corresponding CSS `burger.open span:nth-child(3)` rule in `style.css`

**Relevant Context:**
- `original.js` lines 1–18
- `style.css` lines 1590–1593
- `original.html` line 7
- `index.html` line 29, line 57
- `script.js` line 26
- `style.css` lines 213–215 (burger CSS)

**Status:** [ ] pending

---

## Execution Order
1. Sub-Task 1 (AI telltale fixes) — highest visibility impact
2. Sub-Task 2 (real bugs) — correctness
3. Sub-Task 3 (minor cleanup) — polish
