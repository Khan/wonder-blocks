---
"@khanacademy/wonder-blocks-dropdown": minor
---

Migrate `SelectOpener` (the default `SingleSelect` / `MultiSelect` opener) and
`CustomOpener` from Aphrodite to CSS Modules (WB-2485, CSS Modules Phase 5 /
Wave H). The public API is unchanged.

- `select-opener.module.css` and `custom-opener.module.css` replace the
  Aphrodite stylesheets. They read the same `--wb-*` / `--wb-c-dropdown-*`
  variables, so theming is unchanged. Focus rings use the shared
  `--wb-focus-visible` mixin.
- The opener's modifier classes are declared in the old style-array order, so
  every combination of disabled / readOnly / error / placeholder / pressed
  resolves as before.
- The package now ships its bundled stylesheet at `dist/index.css`, which the
  JS entry imports automatically.
- **Behavior change:** if a `CustomOpener` consumer's `styles.root` sets
  `outline` or `box-shadow` at rest, that value now also applies while the
  opener is focused, replacing the built-in focus ring. Before, the built-in
  `:focus-visible` ring won. Consumer styles are unlayered and now outrank the
  component's layered state styles for the same property. Consumers that want
  a custom resting `box-shadow` and the WB focus ring should set the ring on
  their own `:focus-visible`.
