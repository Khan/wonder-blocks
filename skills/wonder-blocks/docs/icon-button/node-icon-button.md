# NodeIconButton

> Package: `@khanacademy/wonder-blocks-icon-button`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionType` | `"notStarted" \| "attempted" \| "complete"` |  | The action type of the button. This determines the visual style of |
| `aria-label` | `string` | *required* | The alternative text for the icon button. Required for accessibility. |
| `size` | `"small" \| "large"` |  | The size of the icon button. |
| `styles` | `{ root?: StyleType; box?: StyleType; icon?: StyleType }` |  | Custom styles for the elements in the NodeIconButton component. |
| `tokens` | `{ boxForeground?: string; boxBackground?: string; boxShadowColor?: string; boxPadding?: string \| number; boxShadowYRest?: string \| number; boxShadowYHover?: string \| number; boxShadowYPress?: string \| number; iconSize?: string \| number }` |  | The token object that contains the CSS variables that can be overridden |

---

## Default

Minimal node icon button. The only props specified in this example are
`icon`, `onClick`, and `aria-label`. Note that `aria-label` is required for
accessibility, as it provides a text alternative for the icon button.

```tsx
<NodeIconButton icon={IconMappings.pencilSimple} disabled={false} />
```

---

## ActionType

NodeIconButton has an `actionType` prop that is either `notStarted` (the
default, as shown above) or `attempted` or `complete`:

```tsx
<View style={{gap: sizing.size_160}}>
    {actionTypes.map((actionType, index) => (
        <View
            key={index}
            style={{gap: sizing.size_160, flexDirection: "row"}}
        >
            <NodeIconButton
                icon={IconMappings.arrowUpBold}
                aria-label="navigate"
                onClick={() => {}}
                actionType={actionType}
                key={`${actionType}-${index}`}
            />

            <NodeIconButton
                disabled={true}
                icon={IconMappings.arrowUpBold}
                aria-label="search"
                onClick={(e) =>}
                actionType={actionType}
                key={`disabled-${actionType}-${index}`}
            />
        </View>
    ))}
</View>
```

---

## Size

NodeIconButton has a `size` prop that is either `small` (16 icon, 24 target)
or `medium` (48 icon, 48 target).
- `small` is used for smaller buttons that are used in smaller contexts, such
  as in a menu.
- `large` is used for larger buttons that are used in larger contexts, such
  as in a header.
Defaults to `large`.

```tsx
<View style={{gap: sizing.size_160}}>
    {sizes.map((size, index) => (
        <NodeIconButton
            key={index}
            icon={IconMappings.arrowUpBold}
            aria-label="navigate"
            onClick={() => {}}
            actionType="notStarted"
            size={size}
        />
    ))}
</View>
```

---

## Using Href

This example has an `href` prop in addition to the `onClick` prop. `href`
takes a URL or path, and clicking the icon button will result in a navigation
to the specified page. Note that `onClick` is not required if `href` is
defined. The `target="_blank"` prop will cause the href page to open in a new
tab.

```tsx
<NodeIconButton
    actionType="notStarted"
    icon={IconMappings.clock}
    aria-label="More information"
    href="/"
    target="_blank"
    onClick={(e) =>}
/>
```

---

## With Custom Icon

For non-Phosphor icons, you can use the Wonder Blocks Icon component to wrap
the custom icon.
Note: The NodeIconButton component will handle the sizing for the icon.

```tsx
<View
    style={{
        gap: sizing.size_160,
        flexDirection: "row",
        alignItems: "flex-start",
    }}
>
    <NodeIconButton
        icon={
            <Icon size="medium">
                <img alt="" src={khanmigoIcon} />
            </Icon>
        }
        onClick={(e) =>}
        aria-label="Khanmigo"
        actionType="notStarted"
    />
</View>
```

---

## With Custom Tokens

The recommended way to customize the appearance of the `NodeIconButton`
component is to use the `tokens` prop. This prop accepts a token object that
contains the CSS variables that can be overridden to customize the appearance
of the `NodeIconButton` component.
The following tokens can be overridden:
- `boxForeground`: The foreground color of the "chonky" box element.
- `boxBackground`: The background color of the "chonky" box element.
- `boxShadowColor`: The color of the shadow of the "chonky" box element.
- `boxPadding`: The padding of the "chonky" box element.
- `boxShadowYRest`: The y-offset of the rest state shadow of the "chonky" box
  element.
- `boxShadowYHover`: The y-offset of the hover state shadow of the "chonky"
  box element.
- `boxShadowYPress`: The y-offset of the press state shadow of the "chonky"
  box element.
- `iconSize`: The size of the icon element.

```tsx
<NodeIconButton
    actionType="notStarted"
    icon={IconMappings.info}
    aria-label="More information"
    tokens={{
        boxForeground:
            semanticColor.learning.foreground.streaks.default,
        boxBackground:
            semanticColor.learning.background.streaks.default,
        boxShadowColor: semanticColor.learning.math.foreground.pink,
        boxPadding: sizing.size_120,
        boxShadowYRest: sizing.size_080,
        boxShadowYHover: sizing.size_100,
        boxShadowYPress: sizing.size_0,
        iconSize: sizing.size_960,
    }}
/>
```

---

## With Custom Styles

Alternatively, you can use the `styles` prop to apply custom styles to
speicific parts of the `NodeIconButton` component.
The following parts can be styled:
- `root`: Styles the root element (button)
- `box`: Styles the "chonky" box element
- `icon`: Styles the icon element
**Note:** The `styles` prop is not recommended for most use cases. Instead,
we recommend using the `tokens` prop to customize the appearance of the
`NodeIconButton` component. If you still need to provide more specific
styles, you can use the `styles` prop.

```tsx
<NodeIconButton
    actionType="notStarted"
    icon={IconMappings.info}
    aria-label="More information"
    styles={{
        root: {
            width: sizing.size_960,
            height: sizing.size_960,
        },
        box: {
            background:
                semanticColor.learning.background.streaks.default,
        },
        icon: {
            color: semanticColor.learning.foreground.streaks
                .default,
            margin: sizing.size_120,
        },
    }}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Activity Icon Button](activity-icon-button.md)
- [Conversation Icon Button](conversation-icon-button.md)
- [Icon Button](icon-button.md)
