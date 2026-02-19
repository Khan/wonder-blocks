# IconButton

> Package: `@khanacademy/wonder-blocks-icon-button`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` |  | A unique identifier for the IconButton. |
| `icon` | `PhosphorIconAsset \| React.ReactElement` | *required* | A Phosphor icon asset (imported as a static SVG file), or for |
| `kind` | `"primary" \| "secondary" \| "tertiary"` |  | The kind of the icon button, either primary, secondary, or tertiary. |
| `disabled` | `boolean` |  | Whether the icon button is disabled. |
| `testId` | `string` |  | Test ID used for e2e testing. |
| `type` | `"submit" \| "button"` |  | Used for icon buttons within forms. |
| `style` | `StyleType` |  | Optional custom styles. |
| `className` | `string` |  | Adds CSS classes to the IconButton. |
| `href` | `string` |  | URL to navigate to. |
| `target` | `"_blank"` |  | A target destination window for a link to open in. |
| `rel` | `string` |  | Specifies the type of relationship between the current document and the |
| `tabIndex` | `number` |  | Set the tabindex attribute on the rendered element. |
| `skipClientNav` | `boolean` |  | Whether to avoid using client-side navigation. |
| `onClick` | `(e: React.SyntheticEvent) => unknown` |  | Function to call when button is clicked. |
| `onMouseDown` | `(e: React.MouseEvent) => void` |  | Function to call when the mouse down event is triggered. |
| `actionType` | `"progressive" \| "destructive" \| "neutral"` |  | The action type/category of the icon button. |
| `size` | `"xsmall" \| "small" \| "medium" \| "large"` |  | Size of the icon button. |

---

## Default

Minimal icon button. The only props specified in this example are `icon` and
`onClick`.

```tsx
<IconButton icon={magnifyingGlass} actionType="progressive" disabled={false} kind="primary" size="medium" />
```

---

## Sizes

IconButtons can be used with any icon from the `@phosphor-icons/core`
package. The `icon` prop takes an SVG asset from the package.
In this example you can see the different sizes of the icon button:
- `xsmall` (16px icon with a 24px touch target).
- `small` (24px icon with a 32px touch target).
- `medium` (24px icon with a 40px touch target).
- `large` (24px icon with a 48px touch target).

```tsx
<View style={{gap: spacing.medium_16}}>
    <View style={styles.row}>
        <LabelMedium style={styles.label}>xsmall</LabelMedium>
        <IconButton
            aria-label="Search"
            icon={magnifyingGlassBold}
            size="xsmall"
        />
    </View>
    <View style={styles.row}>
        <LabelMedium style={styles.label}>small</LabelMedium>
        <IconButton size="small" />
    </View>
    <View style={styles.row}>
        <LabelMedium style={styles.label}>medium</LabelMedium>
        <IconButton size="medium" />
    </View>
    <View style={styles.row}>
        <LabelMedium style={styles.label}>large</LabelMedium>
        <IconButton size="large" />
    </View>
</View>
```

---

## Kinds

In this example, we have `primary`, `secondary`, `tertiary`,
and disabled `IconButton`s from left to right.

```tsx
<View style={styles.row}>
    <IconButton
        icon={magnifyingGlass}
        aria-label="search"
        onClick={(e) => console.log("Click!")}
    />
    <IconButton
        icon={magnifyingGlass}
        aria-label="search"
        kind="secondary"
        onClick={(e) => console.log("Click!")}
    />
    <IconButton
        icon={magnifyingGlass}
        aria-label="search"
        kind="tertiary"
        onClick={(e) => console.log("Click!")}
    />
    <IconButton
        disabled={true}
        icon={magnifyingGlass}
        aria-label="search"
        onClick={(e) => console.log("Click!")}
    />
</View>
```

---

## ActionType

IconButton has an `actionType` prop that is either `progressive` (the default, as shown
above), `destructive` or `neutral` (as can seen below):

```tsx
<View style={{gap: spacing.medium_16}}>
    <View style={styles.row}>
        <IconButton
            icon={minusCircle}
            onClick={() => {}}
            actionType="destructive"
        />
        <IconButton
            icon={minusCircle}
            onClick={() => {}}
            kind="secondary"
            actionType="destructive"
        />
        <IconButton
            icon={minusCircle}
            onClick={() => {}}
            kind="tertiary"
            actionType="destructive"
        />
        <IconButton
            disabled={true}
            icon={minusCircle}
            aria-label="search"
            onClick={(e) => console.log("Click!")}
            actionType="destructive"
        />
    </View>
    <View style={styles.row}>
        <IconButton
            icon={minusCircle}
            onClick={() => {}}
            actionType="neutral"
        />
        <IconButton
            icon={minusCircle}
            onClick={() => {}}
            kind="secondary"
            actionType="neutral"
        />
        <IconButton
            icon={minusCircle}
            onClick={() => {}}
            kind="tertiary"
            actionType="neutral"
        />
        <IconButton
            disabled={true}
            icon={minusCircle}
            aria-label="search"
            onClick={(e) => console.log("Click!")}
            actionType="neutral"
        />
    </View>
</View>
```

---

## Using Href

This example has an `href` prop in addition to the `onClick` prop. `href` takes a URL or path,
and clicking the icon button will result in a navigation to the specified page. Note that
`onClick` is not required if `href` is defined. The `target="_blank"` prop will cause the href
 page to open in a new tab.

```tsx
<IconButton
    icon={info}
    aria-label="More information"
    href="/"
    target="_blank"
    onClick={(e) => console.log("Click!")}
/>
```

---

## With Aria Label

By default, the icon buttons do not have accessible names. The `aria-label` prop must be used
to explain the function of the button. Remember to keep the description concise but understandable.

```tsx
<View style={styles.arrowsWrapper}>
    <IconButton
        icon={caretLeft}
        onClick={(e) => console.log("Click!")}
        aria-label="Previous page"
    />
    <IconButton
        icon={caretRight}
        onClick={(e) => console.log("Click!")}
        aria-label="Next page"
    />
</View>
```

---

## Navigation with React Router

Icon Buttons do client-side navigation by default, if React Router exists:

```tsx
<MemoryRouter>
    <CompatRouter>
        <View style={styles.row}>
            <IconButton
                href="/foo"
                icon={caretRight}
                onClick={() => console.log("Click!")}
                aria-label="Navigate to /foo using React Router"
            />
            <IconButton
                href="https://www.khanacademy.org"
                target="_blank"
                icon={externalLinkIcon}
                onClick={() => console.log("Click!")}
                aria-label="Skip client navigation"
                skipClientNav
            />
            <Routes>
                <Route
                    path="/foo"
                    element={<View id="foo">Hello, world!</View>}
                />
            </Routes>
        </View>
    </CompatRouter>
</MemoryRouter>
```

---

## Submitting forms

If the button is inside a form, you can use the `type="submit"` prop, so the
form will be submitted on click or by pressing `Enter`.

```tsx
<form
    onSubmit={(e) => {
        e.preventDefault();
        console.log("form submitted");
    }}
>
    <View style={styles.row}>
        <LabelMedium tag="label" style={styles.row}>
            Search:{" "}
            <TextField
                id="foo"
                value="press the button"
                onChange={() => {}}
            />
        </LabelMedium>
        <IconButton
            icon={magnifyingGlass}
            aria-label="Search"
            type="submit"
        />
    </View>
</form>
```

---

## With Custom Icon

For non-Phosphor icons, you can use the Wonder Blocks Icon component to wrap
the custom icon.
Note: The IconButton component will handle the sizing for the icon.

```tsx
<IconButton
    kind="secondary"
    icon={
        <Icon>
            <img src="logo.svg" alt="" />
        </Icon>
    }
    aria-label="Wonder Blocks"
    onClick={(e) =>}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Activity Icon Button](activity-icon-button.md)
- [Conversation Icon Button](conversation-icon-button.md)
- [Node Icon Button](node-icon-button.md)
