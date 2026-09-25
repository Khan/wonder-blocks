# @khanacademy/wonder-blocks-native (SPIKE — FEI-8331, option D)

> Throwaway proof of concept. Not intended to merge as-is.

A variant of the [option A spike](https://github.com/Khan/wonder-blocks/pull/3225)
that answers: **can the off-the-shelf
[`react-native-css`](https://github.com/nativewind/react-native-css)
(NativeWind v5's engine) replace our own CSS → RN compiler and runtime?**

Same component (`Button`), same inputs (the web `*.module.css` files and the
theme tokens), same test and Storybook setup. The only difference is who
compiles and resolves the CSS.

## How it works

```
wonder-blocks-tokens/dist/css/index.css ─┐                       (build time)
button-unstyled / body-text / button     │
  .module.css                            ├─ build/compile-css.ts
                                         │   · same PostCSS chain as web
                                         │   · wbToRnCss adapter (rewrites,
                                         │     class prefixes, see below)
                                         │   · react-native-css/compiler
                                         ▼
                src/generated/stylesheet.ts, themes.ts, report.json
                                         │
                                         ▼                       (runtime)
      StyleCollection.inject(json)  (what react-native-css's Metro
                                     transformer would generate)
      useCssElement(Pressable, {className: "button__button …"})
      · react-native-css cascade, var(), :hover/:active/:disabled, and
        automatic Pressable interaction wiring
```

We **don't** use `react-native-css` as a Metro transformer (the way it's
documented). That would need `@expo/metro-config`, mobile's Metro would have
to process CSS from `node_modules`, and on native a `*.module.css` import
compiles to `export {}` (no class-name map). Calling the compiler at WB
build time and shipping JSON sidesteps all three.

## Commands

```sh
pnpm build   # generates the theme CSS the compiler reads
pnpm --filter @khanacademy/wonder-blocks-native gen:native-styles
pnpm jest packages/wonder-blocks-native
```

Storybook: _Spikes / Native / Button → WebVsNative_.

## What we had to work around

The adapter (`wbToRnCss` in `build/compile-css.ts`) and a post-compile pass
fix things `react-native-css` 3.0.7 gets wrong or drops for WB's CSS. Each
rewrite is counted in `src/generated/report.json`.

| Problem | Workaround |
| --- | --- |
| `.button:where(.primary):hover` is misread as "inside a `.primary` container", so the rule never matches (silently) | Unwrap `:where()` into plain classes |
| `[aria-disabled="true"]` matches a prop called `ariaDisabled`, which RN doesn't have | Rewrite to `:disabled` (matches `Pressable`'s `disabled`) |
| `background:` shorthand is dropped | Rewrite to `background-color` |
| **Bug:** every `line-height` length is treated as a font-size multiplier (`24px` → 384) | Unwrap its `lineHeight()` function after compiling |
| Unquoted multi-word families (`Plus Jakarta Sans, …`) are split into words | Keep the first family, quoted |
| `block-size` etc. pass through as `blockSize`, which react-native-web accepts but RN doesn't have | Rewrite to `height`/`width` |
| `display: flex` doesn't imply `row` | Add `flex-direction: row` |
| `[data-wb-theme]` blocks are ignored (only `:root` / dark mode) | Compile each theme as its own `:root`; swap at runtime |
| Rule order restarts for each `compile()`; `@layer` is ignored | One compile for all sheets, in layer order |
| Global class registry (no CSS Modules hashing) | Prefix classes with the sheet name |
| `:focus-visible` and pseudo-elements are dropped **without a warning** | Reported by the adapter |
| `transition` needs `react-native-reanimated` v4 (New Architecture) | Stripped |
| **Pinned `lightningcss@1.30.1`**: 1.30.2 has a known bug; 1.33 fails to deserialize | Root `pnpm.overrides` |

Runtime integration issues:

- `react-native-css/native` **throws a "setup error" on import** unless the
  bundler replaces `react-native-css-metro-override` with an empty module.
  Mobile's Metro would need that resolver rule (Vite has it here).
- It **`require()`s `react-native-reanimated`** statically, so bundlers
  (Metro included) need it installed or stubbed even with no transitions.
- React 18 gaps (it declares `react >= 19`): `styled()` components drop
  `ref` (we call `useCssElement` with `ref` in props), and
  `VariableContextProvider` uses `<Context value>`, so **theming is
  app-wide**, not per subtree.
- It calls `PlatformColor()` at import time, which react-native-web lacks
  (shimmed for Jest/Storybook).
