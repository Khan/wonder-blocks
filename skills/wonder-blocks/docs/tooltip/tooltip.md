# Tooltip

---

## Default

Default example (interactive).

---

## Complex Anchor And Title

In this example, we're no longer forcing the anchor root to be focusable,
since the text input can take focus. However, that needs a custom
accessibility implementation too (for that, we should use `useId`, but we'll
cheat here and give our own identifier).

---

## Anchor In Scrollable Parent

In this example, we have the anchor in a scrollable parent. Notice how, when
the anchor is focused but scrolled out of bounds, the tooltip disappears.

```tsx
<View style={styles.scrollbox}>
    <View style={styles.hostbox}>
        <Body>
            This is a big long piece of text with a
            <Tooltip
                forceAnchorFocusivity
                content="This tooltip will disappear when scrolled out of bounds"
                placement="bottom"
            >
                [tooltip]
            </Tooltip>{" "}
            in the middle.
        </Body>
    </View>
</View>
```

---

## Tooltip In Modal

This checks that the tooltip works how we want inside a modal. Click the
button to take a look.

```tsx
<ModalLauncher modal={modal}>
    {({openModal}) => (
        <Button onClick={openModal}>Click here!</Button>
    )}
</ModalLauncher>
```

---

## Side-by-side

Here, we can see that the first tooltip shown has an initial delay before it
appears, as does the last tooltip shown, yet when moving between tooltipped
items, the transition from one to another is instantaneous.

```tsx
<View style={styles.row}>
    <Tooltip content="Tooltip A" placement="bottom">
        <View style={styles.block}>A</View>
    </Tooltip>
    <Tooltip content="Tooltip B" placement="bottom">
        <View style={styles.block}>B</View>
    </Tooltip>
    <Tooltip content="Tooltip C" placement="bottom">
        <View style={styles.block}>C</View>
    </Tooltip>
    <Tooltip content="Tooltip D" placement="bottom">
        <View style={styles.block}>D</View>
    </Tooltip>
</View>
```

---

## Tooltip On Buttons

This example shows tooltips on different types of buttons.

```tsx
<View style={[styles.centered, styles.row]}>
    <Tooltip content={"This is a tooltip on a button."}>
        <Button disabled={false}>Example 1</Button>
    </Tooltip>
    <Tooltip
        forceAnchorFocusivity
        content="This is a tooltip on a disabled button."
        placement="bottom"
    >
        <Button disabled={true}>Example 2</Button>
    </Tooltip>
    <Tooltip content="Short and stout">
        <IconButton
            icon={magnifyingGlass}
            aria-label="search"
            kind="tertiary"
            onClick={() => {}}
        />
    </Tooltip>
</View>
```

---

## Controlled

Sometimes you'll want to trigger a tooltip programmatically. This can be done
by setting the `opened` prop to `true`. In this situation the `Tooltip` is a
controlled component. The parent is responsible for managing the
opening/closing of the tooltip when using this prop. This means that you'll
also have to update `opened` to `false` in response to the `onClose` callback
being triggered.

```tsx
<View style={[styles.centered, styles.row]}>
    <Tooltip
        forceAnchorFocusivity
        placement="top"
        content="You opened the tooltip with a button"
        opened={opened}
    >
        tooltip
    </Tooltip>
    <Button onClick={() => setOpened(!opened)}>{buttonText}</Button>
</View>
```

---

## With Style

Tooltips can be styled with the `backgroundColor` and `contentStyle` props.
The example below shows a tooltip with a dark blue background, white text,
and 32px of padding.

```tsx
<View style={[styles.centered, styles.row]}>
    <Tooltip
        forceAnchorFocusivity
        placement="top"
        contentStyle={{
            color: semanticColor.core.foreground.knockout.default,
            padding: spacing.xLarge_32,
        }}
        content={`This is a styled tooltip.`}
        backgroundColor="darkBlue"
        opened={true}
        testId="test-tooltip"
    >
        My tooltip is styled!
    </Tooltip>
</View>
```

---

## Auto Update

Tooltip by default (and for performance reasons) only updates its position
under the following conditions:
1. When the window is resized.
2. When the scroll position changes.
However, there are cases where you might want the tooltip to update its
position when the trigger element changes. This can be done by setting the
`autoUpdate` prop to `true`.

```tsx
<View style={[styles.centered, styles.row, {position: "relative"}]}>
    <Button
        forceAnchorFocusivity
        placement="top"
        onClick={() => {
            setPosition({
                x: Math.floor(Math.random() * 200),
                y: Math.floor(Math.random() * 200),
            });
        }}
    >
        Click to update trigger position (randomly)
    </Button>

    <Button
        onClick={() => {
            setPosition({
                x: 0,
                y: 0,
            });
        }}
    >
        Click to update trigger position (fixed)
    </Button>
    <Tooltip
        content="This is a tooltip that auto-updates its position when the trigger element changes."
        opened={true}
        autoUpdate={true}
    >
        <View
            style={[
                position && {
                    position: "absolute",
                    top: position.y,
                    left: position.x,
                },
            ]}
        >
            Trigger element
        </View>
    </Tooltip>
</View>
```

---

## In Top Corner

This story shows the behaviour of the tooltip when it is in the top corner

```tsx
<View
    forceAnchorFocusivity
    placement="top"
    style={{
        position: "absolute",
        top: 0,
        left: 0,
    }}
>
    <Tooltip content="This is an example descriptor that's long with more content to see if it will display properly in different browsers">
        <PhosphorIcon
            icon={info}
            size="small"
            aria-label="Info"
            style={{
                ":hover": {
                    backgroundColor:
                        semanticColor.status.critical.foreground,
                },
            }}
        />
    </Tooltip>
</View>
```

---

## In Corners

If the Tooltip is placed near the edge of the viewport, default spacing of
12px is applied to provide spacing between the Tooltip and the viewport. This
spacing value can be overridden using the `viewportPadding` prop.

```tsx
<View
    forceAnchorFocusivity
    placement="top"
    style={{
        height: "100vh",
        width: "100vw",
        justifyContent: "space-between",
    }}
>
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        {renderTooltip()}
        {renderTooltip()}
    </View>
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        {renderTooltip()}
        {renderTooltip()}
    </View>
</View>
```



---

## Related docs

- [Tooltip Content](tooltip-content.md)
