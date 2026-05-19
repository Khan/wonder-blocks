# no-hardcoded-color

Warn about hardcoded color values in various formats to support theming and dark mode.

## Rule Details

This rule flags hardcoded color values in:

- Aphrodite `StyleSheet.create()` calls
- Inline JSX `style` and `styles` props
- SVG presentation attributes used as JSX props (`fill`, `stroke`, `stopColor`, `floodColor`, `lightingColor`)
- The `color` prop on WB components such as `PhosphorIcon`

Hardcoded colors prevent the UI from adapting to themes (including dark mode) and bypass the Wonder Blocks design system's semantic color layer.

Use semantic color tokens from `@khanacademy/wonder-blocks-tokens` instead, which resolve to the correct value for the active theme at runtime.

Detected color formats:

- **Hex**: `#fff`, `#ffffff`, `#ffffffff`
- **RGB / RGBA**: `rgb(255, 0, 0)`, `rgba(0, 0, 0, 0.5)`
- **HSL / HSLA**: `hsl(120, 100%, 50%)`, `hsla(120, 100%, 50%, 0.3)`
- **HWB**: `hwb(194 0% 0%)`
- **CSS Color Level 4 functions**: `color()`, `lab()`, `lch()`, `oklab()`, `oklch()`
- **CSS named colors**: `red`, `blue`, `white`, `black`, etc.

The following CSS keywords are **not** flagged:

| Keyword | Why it's allowed |
|---|---|
| `currentColor` | Inherits the computed `color` value from the nearest ancestor. Valid when that ancestor already uses a `semanticColor` token, so the value participates in theming. |
| `transparent` | Explicitly no color; valid for clearing backgrounds or borders. |
| `inherit` | Inherits the property value from the parent element. |
| `initial` | Resets the property to its browser default. |
| `unset` | Resets the property as if no value had been set. |

Examples of **incorrect** code:

```tsx
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    root: {
        color: "#333333",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderColor: "red",
        backgroundImage: "linear-gradient(180deg, #b8bdc4 0%, #8b93a0 50%, #717883 100%)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    },
});
```

```tsx
// Inline style
<div style={{color: "#fff", backgroundColor: "hsl(200, 100%, 50%)"}} />
```

```tsx
// SVG presentation attributes
<path fill="#ff0000" />
<circle stroke="blue" />
```

```tsx
// PhosphorIcon color prop
<PhosphorIcon icon={someIcon} color="#3C6D4A" />
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
// CSS keywords for resetting or inheriting values are allowed
const styles = StyleSheet.create({
    root: {
        color: "inherit",
        backgroundColor: "transparent",
    },
});
```

```tsx
// currentColor is allowed — it inherits the computed color from an ancestor
// that already uses a semanticColor token, so it participates in theming.
const styles = StyleSheet.create({
    icon: {
        fill: "currentColor",
    },
});
```

```tsx
// SVG presentation attributes accept currentColor, none, or transparent
<path fill="currentColor" />
<path fill="none" />
```

```tsx
// PhosphorIcon color prop with a semantic token
<PhosphorIcon icon={someIcon} color={semanticColor.core.foreground.primary} />
```
