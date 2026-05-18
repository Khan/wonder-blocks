# no-raw-button

Disallow raw `<button>` elements and `addStyle("button")` components in favor of Wonder Blocks Button, IconButton, or ActivityButton.

## Rule Details

This rule flags raw HTML `<button>` elements and components created via `addStyle("button")`. Using raw buttons bypasses the Wonder Blocks design system's built-in focus styles, keyboard navigation, and visual consistency guarantees.

Wonder Blocks button components provide:

- **Focus styles** — correct `:focus-visible` rings that meet WCAG contrast requirements
- **Keyboard navigation** — Space/Enter activation, correct `tab` order
- **ARIA semantics** — appropriate roles and states (e.g. `aria-disabled`)
- **Theme support** — colors that adapt to light and dark mode via `semanticColor` tokens

Flagged patterns:

- `<button>` — raw HTML button element
- Components declared as `const X = addStyle("button")` — styled wrappers around a raw button

Examples of **incorrect** code:

```tsx
// Raw HTML button
<button onClick={handleClick}>Save</button>
```

```tsx
// addStyle("button") wrapper
const StyledButton = addStyle("button");

function MyComponent() {
    return <StyledButton onClick={handleClick}>Save</StyledButton>;
}
```

Examples of **correct** code:

```tsx
import Button from "@khanacademy/wonder-blocks-button";

<Button onClick={handleClick}>Save</Button>
```

```tsx
import {IconButton} from "@khanacademy/wonder-blocks-icon-button";
import plusIcon from "@phosphor-icons/core/regular/plus.svg";

<IconButton
    icon={plusIcon}
    aria-label="Add item"
    onClick={handleClick}
/>
```

```tsx
import {ActivityButton} from "@khanacademy/wonder-blocks-activity-button";

<ActivityButton onClick={handleClick}>Start exercise</ActivityButton>
```

## When Not To Use

Disable this rule for files that implement Wonder Blocks button primitives themselves (e.g. `button-unstyled.tsx`, `clickable.tsx`, `icon-button-unstyled.tsx`). These files intentionally use `addStyle("button")` as the underlying DOM implementation.

```ts
// eslint-disable-next-line @khanacademy/wonder-blocks/no-raw-button
const StyledButton = addStyle("button");
```

Also acceptable to disable for stories that explicitly demonstrate low-level styling utilities (e.g. `focus-styles.stories.tsx`) where using the raw primitive is the purpose of the example.
