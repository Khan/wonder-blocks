---
"@khanacademy/wonder-blocks-styles": minor
---

Add a CSS-mixin counterpart to the `actionStyles` JS export so CSS
Modules authors can opt into the same interactive-control styling
without Aphrodite (WB-2327, Phase 3). A new package subpath,
`@khanacademy/wonder-blocks-styles/action-styles.css`, ships the
`--wb-action-inverse` mixin (mirroring `actionStyles.inverse`), which
expands into the control's nested `:hover` / `:focus-visible` /
`:active` rules and reuses the shared `--wb-focus-visible` ring.

This is purely additive — the existing Aphrodite-shaped `actionStyles`
and `focusStyles` JS exports are unchanged and remain available for
packages that have not migrated.
