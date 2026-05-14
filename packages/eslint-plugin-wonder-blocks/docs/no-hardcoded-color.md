# no-hardcoded-color

Warn about hardcoded color values in various formats to support theming and dark mode.

## Rule Details

This rule flags hardcoded color values in Aphrodite `StyleSheet.create()` calls and inline JSX `style` props. Hardcoded colors prevent the UI from adapting to themes (including dark mode) and bypass the Wonder Blocks design system's semantic color layer.

Use semantic color tokens from `@khanacademy/wonder-blocks-tokens` instead, which resolve to the correct value for the active theme at runtime.

Detected color formats:

- **Hex**: `#fff`, `#ffffff`, `#ffffffff`
- **RGB / RGBA**: `rgb(255, 0, 0)`, `rgba(0, 0, 0, 0.5)`
- **HSL / HSLA**: `hsl(120, 100%, 50%)`, `hsla(120, 100%, 50%, 0.3)`
- **HWB**: `hwb(194 0% 0%)`
- **CSS Color Level 4 functions**: `color()`, `lab()`, `lch()`, `oklab()`, `oklch()`
- **CSS named colors**: `red`, `blue`, `white`, `black`, etc.

CSS keywords `transparent`, `currentColor`, `inherit`, `initial`, and `unset` are **not** flagged, as they are valid values for resetting or inheriting styles.

Examples of **incorrect** code:

```tsx
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    root: {
        color: "#333333",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderColor: "red",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    },
});
```

```tsx
// Inline style
<div style={{color: "#fff", backgroundColor: "hsl(200, 100%, 50%)"}} />
```

Examples of **correct** code:

```tsx
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

const styles = StyleSheet.create({
    root: {
        color: semanticColor.core.foreground.primary,
        backgroundColor: semanticColor.core.background.primary,
        borderColor: semanticColor.core.border.neutral.subtle,
    },
});
```

```tsx
// CSS custom properties are also allowed
const styles = StyleSheet.create({
    root: {
        color: "var(--wb-color-primary)",
    },
});
```

```tsx
// CSS keywords for resetting values are allowed
const styles = StyleSheet.create({
    root: {
        color: "inherit",
        backgroundColor: "transparent",
    },
});
```
