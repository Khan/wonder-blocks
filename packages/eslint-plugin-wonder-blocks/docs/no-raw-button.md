# no-raw-button

Disallow raw `<button>` elements and `addStyle("button")` components in favor of Wonder Blocks button components.

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

### Examples of **incorrect** code

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

### Examples of **correct** code

For most interactive button needs, use `Button` or `IconButton`. The `style`
prop accepts Aphrodite styles, so visual customization does not require a raw
button.

```tsx
import Button from "@khanacademy/wonder-blocks-button";

<Button onClick={handleClick}>Save</Button>
```

```tsx
import Button from "@khanacademy/wonder-blocks-button";

// style overrides are applied on top of the base button styles
<Button kind="tertiary" style={styles.myButton} onClick={handleClick}>
    Save
</Button>
```

```tsx
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import plusIcon from "@phosphor-icons/core/regular/plus.svg";

<IconButton
    icon={plusIcon}
    aria-label="Add item"
    onClick={handleClick}
/>
```

#### Custom dropdown openers

When `SingleSelect`, `MultiSelect`, or `ActionMenu` needs a custom-styled
opener, use `CustomOpener` from `@khanacademy/wonder-blocks-dropdown`. It
provides a blank-slate `<button>` with the WB focus ring baked in and correct
ref forwarding for the dropdown's focus management wiring.

```tsx
import {SingleSelect, OptionItem, CustomOpener} from "@khanacademy/wonder-blocks-dropdown";

<SingleSelect
    placeholder="Choose an option"
    opener={({hovered, focused, text}) => (
        <CustomOpener style={styles.myOpener}>
            <MyOpenerContent hovered={hovered} focused={focused} text={text} />
        </CustomOpener>
    )}
    onChange={handleChange}
>
    <OptionItem label="Option 1" value="1" />
</SingleSelect>
```

## When Not To Use

Disable this rule for files that **implement** Wonder Blocks button primitives
themselves. These files intentionally use `addStyle("button")` as the
underlying DOM element, and wrapping them in a higher-level WB component would
be circular.

Examples include: `button-unstyled.tsx`, `clickable.tsx`,
`icon-button-unstyled.tsx`, `select-opener.tsx`, `custom-opener.tsx`,
`tab.tsx`, and similar primitive implementation files.

```ts
/* eslint-disable @khanacademy/wonder-blocks/no-raw-button */
// This file IS the Wonder Blocks Foo implementation — it intentionally
// wraps addStyle("button") as its underlying DOM primitive.
const StyledButton = addStyle("button");
```
