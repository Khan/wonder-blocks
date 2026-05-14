# ActivityIconButton

> Package: `@khanacademy/wonder-blocks-icon-button`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styles` | `{ root?: StyleType; box?: StyleType; label?: StyleType }` |  | Custom styles for the elements in the ActivityIconButton component. |

---

## Default

Minimal activity icon button. The only props specified in this example are
`icon` and `onClick`.

```tsx
<ActivityIconButton icon={magnifyingGlass} actionType="progressive" disabled={false} kind="primary" />
```

---

## Kinds

In this example, we have `primary`, `secondary`, `tertiary` and `disabled`
`ActivityIconButton`s from left to right.

```tsx
<View style={{gap: sizing.size_160, flexDirection: "row"}}>
    <ActivityIconButton
        actionType="progressive"
        icon={magnifyingGlass}
        aria-label="search"
        onClick={(e) =>}
    />
    <ActivityIconButton
        icon={magnifyingGlass}
        aria-label="search"
        kind="secondary"
        onClick={(e) =>}
    />
    <ActivityIconButton
        icon={magnifyingGlass}
        aria-label="search"
        kind="tertiary"
        onClick={(e) =>}
    />
    <ActivityIconButton
        disabled={true}
        icon={magnifyingGlass}
        aria-label="search"
        onClick={(e) =>}
    />
</View>
```

---

## ActionType

ActivityIconButton has an `actionType` prop that is either `progressive` (the
default, as shown above) or `neutral`:

```tsx
<View style={{gap: sizing.size_160}}>
    {actionTypes.map((actionType, index) => (
        <View
            key={index}
            style={{gap: sizing.size_160, flexDirection: "row"}}
        >
            {kinds.map((kind, index) => (
                <ActivityIconButton
                    icon={IconMappings.arrowUpBold}
                    aria-label="navigate"
                    onClick={() => {}}
                    actionType={actionType}
                    kind={kind}
                    key={`${kind}-${actionType}-${index}`}
                />
            ))}
            <ActivityIconButton
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

## Using Href

This example has an `href` prop in addition to the `onClick` prop. `href`
takes a URL or path, and clicking the icon button will result in a navigation
to the specified page. Note that `onClick` is not required if `href` is
defined. The `target="_blank"` prop will cause the href page to open in a new
tab.

```tsx
<ActivityIconButton
    kind="primary"
    actionType="progressive"
    icon={IconMappings.info}
    aria-label="More information"
    href="/"
    target="_blank"
    onClick={(e) =>}
/>
```

---

## With Aria Label

There are two ways to provide accessible names to `ActivityIconButton`. One
approach is using the `aria-label` prop that can be used to explain the
function of the button. Remember to keep the description concise but
understandable.

```tsx
<View style={{gap: sizing.size_160, flexDirection: "row"}}>
    <ActivityIconButton
        kind="primary"
        actionType="progressive"
        icon={IconMappings.caretLeftBold}
        onClick={(e) =>}
        aria-label="Previous page"
    />
    <ActivityIconButton
        icon={IconMappings.caretRightBold}
        onClick={(e) =>}
        aria-label="Next page"
    />
</View>
```

---

## With Label

Another way to provide accessible names to `ActivityIconButton` is by
providing a label for the button using the `label` prop. This is
recommended when the button is used as a navigation item in the context
of a menu, for example.

```tsx
<View
    aria-label="Search"
    kind="primary"
    actionType="progressive"
    style={{
        gap: sizing.size_160,
        flexDirection: "row",
        alignItems: "flex-start",
    }}
>
    <ActivityIconButton
        icon={IconMappings.check}
        onClick={(e) =>}
        label="Check"
    />
    <ActivityIconButton
        icon={IconMappings.magnifyingGlass}
        onClick={(e) =>}
        label="Search"
    />
</View>
```

---

## With Custom Icon

For non-Phosphor icons, you can use the Wonder Blocks Icon component to wrap
the custom icon.
Note: The ActivityIconButton component will handle the sizing for the icon.

```tsx
<View
    actionType="progressive"
    style={{
        gap: sizing.size_160,
        flexDirection: "row",
        alignItems: "flex-start",
    }}
>
    <ActivityIconButton
        icon={
            <Icon size="medium">
                <img alt="" src={khanmigoIcon} />
            </Icon>
        }
        onClick={(e) =>}
        aria-label="Khanmigo"
        kind="secondary"
    />
</View>
```

---

## With Styles

You can use the `styles` prop to apply custom styles to speicific parts of
the ActivityIconButton component.
The following parts can be styled:
- `root`: Styles the root element (button)
- `box`: Styles the "chonky" box element
- `label`: Styles the text in the button

```tsx
<ActivityIconButton
    aria-label="Search"
    kind="primary"
    actionType="progressive"
    icon={IconMappings.info}
    label="More information"
    styles={{
        root: {
            width: "200px",
            maxWidth: "unset",
            maxHeight: "unset",
        },
        box: {
            width: "100%",
            backgroundColor:
                semanticColor.learning.background.streaks.default,
            justifyContent: "center",
            alignItems: "center",
        },
        label: {
            fontWeight: "bold",
        },
    }}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Conversation Icon Button](conversation-icon-button.md)
- [Icon Button](icon-button.md)
- [Node Icon Button](node-icon-button.md)
