# @khanacademy/wonder-blocks-native (SPIKE — FEI-8331)

> Throwaway proof of concept. Not intended to merge as-is.

Tests whether Wonder Blocks' web CSS Modules can be the **single source of
truth** for React Native styling.

## How it works

```
wonder-blocks-tokens/dist/css/index.css ─┐                      (build time)
  (per-theme custom properties)          │
                                         ├─ build/compile-css-to-native.ts
button.module.css, body-text.module.css ─┘   · same PostCSS chain as web
  (component styles)                         · flattens nesting / @media / @layer
                                             · selectors → {classes, states}
                                             ▼
                          src/generated/*.native-styles.ts + theme-vars.ts
                                             │
                                             ▼                  (runtime)
      resolveStyle(sheets, {classes, states, ancestors, inherited}, theme)
      · specificity + source order + layers, var() resolution,
        :hover/:active/:focus-visible/[aria-disabled], descendant selectors
      · css-to-react-native + logical-property / rem / flex-row mapping
                                             ▼
                                   React Native style object
```

- `src/components/button.tsx` builds the same class list as the web
  `button-core.tsx` and maps `Pressable` state to CSS states.
- Tests run in the existing Jest (jsdom) via `react-native` →
  `react-native-web`; stories render in the existing Storybook the same way
  (`__docs__/wonder-blocks-native/`).

## Commands

```sh
pnpm build   # generates the theme CSS the compiler reads
pnpm --filter @khanacademy/wonder-blocks-native gen:native-styles
pnpm jest packages/wonder-blocks-native
```
