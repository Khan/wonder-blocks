# Design-sync fan-out instructions (Wonder Blocks → claude.ai/design)

You grade design-sync preview cards against Wonder Blocks' own storybook render, fixing preview
composition where needed. Wonder Blocks is being synced to claude.ai/design, where a design agent
builds real UIs from this exact compiled bundle; the storybook render is the proof of how each
component should look.

**Run ALL commands from `/Users/caitlynmayers/khan/wonder-blocks-latest`.** Your components and
BATCH_ID are given in the message that pointed you here.

## First action (once, for your whole batch)
Capture every sheet in your batch in one browser launch:
```
node .ds-sync/storybook/compare.mjs --out ./ds-bundle --storybook-static .design-sync/sb-reference --components <YOUR_COMPONENT_LIST>
```

## Artifacts
- `ds-bundle/_screenshots/compare/<group>__<Name>.png` — storybook LEFT vs preview RIGHT, per story. Full-res in `raw/`.
- `.design-sync/.cache/compare/<Name>.json` — pairing facts + shot paths (no scores; your eyes judge).
- Preview source: `.design-sync/previews/<Name>.tsx` if owned, else generated `.design-sync/.cache/previews/<Name>.tsx`. Your fixes go to `.design-sync/previews/<Name>.tsx`.
- Story source: find each story's file via `ds-bundle/.stories-map.json` or `.design-sync/sb-reference/index.json` (`importPath`). The story source is the authority on intended props/composition.

## Per component (max 3 iterations)
1. Read the sheet; judge the PRIMARY story from the two images (raw PNGs if the sheet is too small). If it grades `match` and the component is warning-free, sibling stories may be `{"verdict":"match","basis":"sibling-trusted"}` written in the same grade.json. Grade EVERY story exhaustively for components with portals/overlays, theme sensitivity, an owned preview, or any warning.
2. If a fix is needed: copy `.design-sync/.cache/previews/<Name>.tsx` to `.design-sync/previews/<Name>.tsx`, DELETE its first-line `// @ds-preview generated …` marker, mirror the story's JSX, inline story-local fixture data. Context-required leaves (a single Radio, OptionItem, ActionItem, Tab panel) must be composed inside their real parent to render meaningfully.
3. `node .ds-sync/lib/preview-rebuild.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle --components <Name>`
4. `node .ds-sync/storybook/compare.mjs --out ./ds-bundle --storybook-static .design-sync/sb-reference --components <Name>`
5. Re-read the fresh sheet, Write `.design-sync/.cache/compare/<Name>.grade.json`: `{"stories":{"<story>":{"verdict":"match|close|mismatch","note":"…"}}}`. Done when every story grades match. Accept `close` only when an iteration didn't improve it AND the note says what's off + what you tried. Blocked after 3 iterations → grade honestly + record the blocker.

## Rubric
- `match` — same content, composition, styling. Ignore antialiasing, sub-5px offsets, scrollbar slivers, and **framing/scale differences** (the preview card often renders at a slightly larger scale than the storybook canvas — judge the component, not the frame).
- `close` — recognizably the same with a minor nameable delta; still a fix target.
- `mismatch` — wrong/missing content, unstyled output, wrong variant, missing icons, default fonts.

## Known repo state (READ — most issues are already solved globally)
- **THEME**: the DS defaults to the Shape Your Learning / Thunderblocks theme (SYL indigo `#5753FA`). BOTH the preview AND the storybook reference render thunderblocks, so colors should match. A clear color mismatch between sides is worth noting.
- **ICONS ARE FIXED** (both story-imported SVGs and icons baked into the component bundle now render as real shapes — DueBadge clock, checkbox check, dropdown carets, etc.). If any icon renders as a **SOLID SQUARE** in the PREVIEW, that's a regression — report it `[GENERAL]`.
- The storybook-static reference may still render SOME icons **blank** (an oracle-side asset gap). For those the PREVIEW is authoritative — do NOT grade `mismatch` merely because the storybook side lacks an icon the preview shows correctly.
- **Play-function stories**: a story with a `play` fn that mutates state (clicks a switch on, opens a menu) makes the storybook reference show the POST-interaction state while the preview shows the initial JSX. That benign delta is `close`, not a defect — do NOT fake state in the .tsx to match.
- Multi-package monorepo: components import from `@khanacademy/wonder-blocks-<pkg>`; several main components are default exports. This already resolves correctly.
- Grid-overflow `cardMode` overrides (column/single) are already applied for many components; portals (DatePicker, Combobox, MultiSelect, SingleSelect, Popover, Tooltip, Tabs, NavigationTabs) use `cardMode:single`.

## HARD RULES (violating these corrupts other agents' work)
- Edit ONLY `.design-sync/previews/{your components}.tsx`, your components' `.design-sync/.cache/compare/*.grade.json`, and `.design-sync/learnings/{BATCH_ID}.md`.
- NEVER edit `.design-sync/config.json`, `.design-sync/NOTES.md`, `.ds-sync/`, `.design-sync/overrides/`, or any other component's files.
- NEVER run `package-build.mjs` or `package-validate.mjs`. Your only build commands are `preview-rebuild.mjs` and `compare.mjs` scoped via `--components`.
- NEVER write an image-judged grade for images you haven't Read this iteration. A sibling-trusted verdict requires the primary graded match + a warning-free component.
- Config-level needs — `sb-error` story → `cfg.overrides.<Name>.skip`; `[PORTAL?]`/overflow → a `cardMode`; a missing provider — are ORCHESTRATOR-ONLY. Record them in your learnings file + final report; do not work around them per-component. NEVER neutralize a story's open/interactive state in the .tsx to hide overlay bleed.
- If the SAME root cause appears in 2+ of your components — or once when it's config-level (provider/css/font/token/import) — STOP on those, write it to your learnings prefixed `[GENERAL]`, report it.

## Learnings
Append to `.design-sync/learnings/{BATCH_ID}.md` — one bullet per discovery: `<Component>: <symptom> → <root cause> → <fix>`, prefixed `[GENERAL]` if it applies beyond that component.

## Final report
Per component: match/close/blocked + one-line reason. Then any `[GENERAL]` learnings verbatim. Then any config changes the orchestrator must apply (skips, cardModes, providers, better primaryStory picks).
