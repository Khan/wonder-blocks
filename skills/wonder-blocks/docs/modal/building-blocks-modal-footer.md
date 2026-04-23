# ModalFooter

> Package: `@khanacademy/wonder-blocks-modal`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | *required* |  |

---

## Default

This is a basic footer. It contains an empty `<View>`, so it is completely
blank.

```tsx
<ModalDialog aria-labelledby={"modal-id-0"} style={styles.dialog}>
    <ModalPanel
        content={
            <View style={{gap: sizing.size_240}}>
                <Heading size="xxlarge" id="modal-id-0">
                    Modal Heading
                </Heading>
                {longBody}
            </View>
        }
        footer={<ModalFooter />}
    />
</ModalDialog>
```

---

## With Button

This is a `<ModalFooter>` with a `<Button>` as a child. No additional styling
is needed, as the footer already has the style `{justifyContent: "flex-end"}`.

```tsx
<ModalDialog aria-labelledby={"modal-id-2"} style={styles.dialog}>
    <ModalPanel
        content={
            <View style={{gap: sizing.size_240}}>
                <Heading size="xxlarge" id="modal-id-2">
                    Modal Heading
                </Heading>
                {longBody}
            </View>
        }
        footer={
            <ModalFooter>
                <Button onClick={() => {}}>Submit</Button>
            </ModalFooter>
        }
    />
</ModalDialog>
```

---

## With Three Actions

This is an example of a footer with multiple actions. It's fully responsive,
so the buttons are in a column layout when the window is small.

```tsx
<ModalDialog aria-labelledby={"modal-id-3"} style={styles.dialog}>
    <ModalPanel
        content={
            <View style={{gap: sizing.size_240}}>
                <Heading size="xxlarge" id="modal-id-3">
                    Modal Heading
                </Heading>
                {longBody}
            </View>
        }
        footer={
            <ModalFooter>
                <View style={containerStyle}>
                    <Button style={buttonStyle} kind="tertiary">
                        Tertiary action
                    </Button>
                    <Button style={buttonStyle} kind="tertiary">
                        Secondary action
                    </Button>
                    <Button style={buttonStyle}>
                        Primary action
                    </Button>
                </View>
            </ModalFooter>
        }
    />
</ModalDialog>
```

---

## With Multiple Actions

This is an example of a footer that indicates multiple steps in a flow.

```tsx
<ModalDialog aria-labelledby={"modal-id-4"} style={styles.dialog}>
    <ModalPanel
        content={
            <View style={{gap: sizing.size_240}}>
                <Heading size="xxlarge" id="modal-id-4">
                    Modal Heading
                </Heading>
                <BodyText>Here is some text in the modal.</BodyText>
            </View>
        }
        footer={
            <ModalFooter>
                <View style={footerStyle}>
                    <BodyText weight="bold">Step 1 of 4</BodyText>
                    <View style={rowStyle}>
                        <Button kind="tertiary">Previous</Button>
                        <Button kind="primary">Next</Button>
                    </View>
                </View>
            </ModalFooter>
        }
    />
</ModalDialog>
```



---

## Related docs

- [Overview](overview.md)
- [Building Blocks Modal Dialog](building-blocks-modal-dialog.md)
- [Building Blocks Modal Header](building-blocks-modal-header.md)
- [Building Blocks Modal Panel](building-blocks-modal-panel.md)
- [Drawer Launcher Drawer Launcher](drawer-launcher-drawer-launcher.md)
- [Flexible Dialog](flexible-dialog.md)
- [Modal Launcher](modal-launcher.md)
- [One Pane Dialog](one-pane-dialog.md)
