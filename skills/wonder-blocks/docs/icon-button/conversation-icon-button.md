# ConversationIconButton

> Package: `@khanacademy/wonder-blocks-icon-button`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionType` | `ActivityIconButtonActionType` |  | The action type of the button. This determines the visual style of the |
| `aria-label` | `string` | *required* | The alternative text for the icon button. Use `aria-label` for when |

---

## Default

Minimal conversation icon button. The only props specified in this example
are `icon` and `onClick`.
Note that the `aria-label` prop is required for accessibility, as it
provides a text alternative for the icon button. This is important for
screen readers and other assistive technologies to understand the purpose
of the button.

```tsx
<ConversationIconButton icon={microphone} actionType="progressive" disabled={false} kind="primary" />
```

---

## Kinds

In this example, we have `primary` (default), `secondary`, `tertiary` and
disabled `ConversationIconButton`'s from left to right.

```tsx
<View style={{gap: sizing.size_160, flexDirection: "row"}}>
    <ConversationIconButton
        icon={microphone}
        aria-label="search"
        onClick={(e) =>}
    />
    <ConversationIconButton
        icon={microphone}
        aria-label="search"
        kind="secondary"
        onClick={(e) =>}
    />
    <ConversationIconButton
        icon={microphone}
        aria-label="search"
        kind="tertiary"
        onClick={(e) =>}
    />
    <ConversationIconButton
        disabled={true}
        icon={microphone}
        aria-label="search"
        onClick={(e) =>}
    />
</View>
```

---

## ActionType

ConversationIconButton has an `actionType` prop that is either `progressive`
(default) or `neutral`:

```tsx
<View style={{gap: sizing.size_160}}>
    {actionTypes.map((actionType, index) => (
        <View
            key={index}
            style={{gap: sizing.size_160, flexDirection: "row"}}
        >
            {kinds.map((kind, index) => (
                <ConversationIconButton
                    icon={IconMappings.arrowUpBold}
                    aria-label="navigate"
                    onClick={() => {}}
                    actionType={actionType}
                    kind={kind}
                    key={`${kind}-${actionType}-${index}`}
                />
            ))}
            <ConversationIconButton
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

## Toggleable

ConversationIconButton can be configured to be toggleable. This is useful for
features like toggling a microphone on and off.
Note that the `aria-pressed` attribute is used to indicate the toggle state
of the button. This is important for accessibility, as it allows screen
readers to announce the current state of the button to users.

```tsx
<View style={{gap: sizing.size_080, placeItems: "center"}}>
    <ConversationIconButton
        icon={on ? microphoneFill : microphone}
        onClick={(e) => {
            setOn(!on);
        }}
        aria-label="Toggle microphone"
        aria-pressed={on}
    />
    <BodyText>The microphone is {on ? "ON" : "OFF"}</BodyText>
</View>
```

---

## Expanded

This example shows how to use the `ConversationIconButton` in an `ActionMenu`.
The `ConversationIconButton` is used as the opener for the menu, which allows
the button to be used in its "expanded" state.

```tsx
<ActionMenu
    aria-label="Conversation options"
    menuText=""
    opener={({opened}) => (
        <ConversationIconButton
            kind="secondary"
            icon={opened ? plusFill : plus}
            aria-label="Open menu"
        />
    )}
>
    <ActionItem
        label="Add to calendar"
        leftAccessory={
            <PhosphorIcon
                size="medium"
                icon={IconMappings.calendar}
            />
        }
    />
    <ActionItem
        label="Add to contacts"
        leftAccessory={
            <PhosphorIcon size="medium" icon={IconMappings.gear} />
        }
    />
</ActionMenu>
```

---

## With Custom Icon

For non-Phosphor icons, you can use the Wonder Blocks Icon component to wrap
the custom icon.
Note: The ConversationIconButton component will handle the sizing for the icon.

```tsx
<ConversationIconButton aria-label="Wonder Blocks" icon={<Icon>
                <img src="logo.svg" alt="" />
            </Icon>} kind="secondary" />
```



---

## Related docs

- [Overview](overview.md)
- [Activity Icon Button](activity-icon-button.md)
- [Icon Button](icon-button.md)
- [Node Icon Button](node-icon-button.md)
