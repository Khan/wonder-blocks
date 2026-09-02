---
"@khanacademy/wonder-blocks-icon-button": minor
---

Migrate `NodeIconButton` from Aphrodite to CSS Modules (WB-2329, CSS Modules
Phase 5 / Wave A). This completes the `wonder-blocks-icon-button` package — it
now has zero `aphrodite` imports. The public component API is unchanged — same
props, same DOM structure, and the same `styles.root` / `styles.box` /
`styles.icon` and `tokens` overrides — so this is an internal styling refactor.

- `NodeIconButton` already had a `--wb-c-node-icon-button--*` component-token
  surface (it's the component the convention was named after), so the migration
  mostly moves that surface from JS objects (`DEFAULT_TOKENS` + `variants`) into
  `node-icon-button.module.css` variant classes. The two axes are fully
  orthogonal — `size` owns the geometry, `actionType` owns the colours — so
  there's no compound colour matrix. Theming is unchanged.
- The `tokens` prop keeps working exactly as before: it still routes through
  `mapTokensToVariables` and Aphrodite, whose unlayered declarations override
  the `@layer shared` variant classes.
- `DEFAULT_TOKENS` is dropped. The component always applies exactly one size
  class and one actionType class, and those duplicated the defaults verbatim.
- The "chonky" box's hover / press / disabled styling is now driven by
  descendant selectors from the root element rather than by classes toggled in
  JS. The box keeps its plain `chonky` class name in the DOM as a
  consumer/test hook, it just no longer drives styling.
- A focused *and* hovered disabled button now keeps the full global focus ring.
  Previously the disabled hover reset stripped its outline, which was an
  artifact of Aphrodite's rule ordering rather than an intentional design.
  `Button`, `ActivityButton`, `IconButton` and `ConversationIconButton` already
  made the same call.
- Pressing a disabled button with the pointer still applies the pressed "drop"
  styling to the box, keeping its disabled colours. The Aphrodite version reset
  `:hover` on the box but not `:active`, and that behaviour is deliberately
  preserved rather than harmonised with `ActivityIconButton` (which resets
  both).
