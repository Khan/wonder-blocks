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
- Two fixes to disabled-state handling that the Aphrodite version got wrong
  through rule ordering, bringing `NodeIconButton` in line with the rest of the
  button family: pressing a disabled button with the pointer no longer applies
  the pressed "drop" styling to the box (the Aphrodite `disabled` style reset
  `:hover` but not `:active`), and a disabled button that is both focused and
  hovered now keeps the full global focus ring.
