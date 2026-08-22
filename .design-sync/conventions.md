## How to build with Wonder Blocks

Every component and token is a property of the global `window.WonderBlocks` — e.g. `window.WonderBlocks.Button`,
`window.WonderBlocks.View`, `window.WonderBlocks.semanticColor`. These are the real, published Khan Academy
Wonder Blocks components; compose them, don't reimplement them.

### 1. Theme — wrap everything in the Shape Your Learning (Thunderblocks) theme
This design system defaults to Khan Academy's **Shape Your Learning / Thunderblocks** theme (brand indigo
`#5753FA`). Wrap your app (or any subtree) in `ThemeSwitcher` so the theme's token values resolve:

```jsx
const {ThemeSwitcher, View, Button, Heading, BodyText, semanticColor, sizing} = window.WonderBlocks;

<ThemeSwitcher theme="thunderblocks">
  {/* your UI */}
</ThemeSwitcher>
```

`ThemeSwitcher` renders `<div data-wb-theme="thunderblocks">`; the shipped token CSS defines each token under that
scope. **Without this wrapper components render with the base (default Wonder Blocks) palette, not SYL.** Theme
values: `"thunderblocks"` (SYL light — the default for this DS), `"default"` (classic Wonder Blocks), `"syl-dark"`
(SYL dark, WIP).

### 2. Styling idiom — tokens + Aphrodite, never utility classes or raw hex/px
Wonder Blocks styles with **Aphrodite** (CSS-in-JS) and **design tokens**. There are NO CSS utility classes.
- Style via each component's `style` / `styles` props, which accept an Aphrodite `StyleSheet.create({...})` object
  (or an array of them).
- Always pull values from tokens, never hardcode: `semanticColor.*` (e.g. `semanticColor.core.background.base`,
  `semanticColor.core.foreground.neutral.default`), `sizing.*` (e.g. `sizing.size_160` — a 4px scale, size_160 = 16px),
  `spacing.*`, `font.*`, `border.*`, `breakpoint.*`. Tokens resolve to theme-scoped CSS variables, so they
  automatically follow the active `data-wb-theme`.
- Use `View` (a styled flex `<div>`) for layout instead of raw `<div>`; use `Heading` and `BodyText`
  (from typography) for text; use `PhosphorIcon` with a `@phosphor-icons/core` svg for icons.

```jsx
const {View, Button, Heading, BodyText, StyleSheet, semanticColor, sizing} = window.WonderBlocks;
const styles = StyleSheet.create({
  card: {
    backgroundColor: semanticColor.core.background.base,
    padding: sizing.size_240,
    gap: sizing.size_160,
  },
});
<ThemeSwitcher theme="thunderblocks">
  <View style={styles.card}>
    <Heading size="large">Welcome back</Heading>
    <BodyText>Pick up where you left off.</BodyText>
    <Button kind="primary" onClick={() => {}}>Continue</Button>
  </View>
</ThemeSwitcher>
```

### 3. Where the truth lives
Before styling, read the bound token/style files — `_ds/<folder>/styles.css` and its `@import`s
(`tokens/index.css`, `tokens/vars.css`) hold every token name and value. Each component's `.d.ts` is its exact
prop contract and its `.prompt.md` shows intended usage — consult them rather than guessing prop names.

### Notes
- Many main components are default exports upstream but are exposed here by name (`window.WonderBlocks.Button`, etc.).
- The brand text font (Plus Jakarta Sans) is expected to be provided by the host page's font service; if it isn't
  available the browser falls back to a system sans-serif — layout and tokens are unaffected.
- Prefer configuration props over ad-hoc children (e.g. Button's `startIcon`/`endIcon`, not manual icon markup);
  compose list/menu components from their item components (e.g. `SingleSelect` with `OptionItem`s).
