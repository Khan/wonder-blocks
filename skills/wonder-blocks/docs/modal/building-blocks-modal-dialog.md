# ModalDialog

> Package: `@khanacademy/wonder-blocks-modal`

`ModalDialog` is a component that contains these elements:
- The visual dialog element itself (`<div role="dialog"/>`)
- The custom contents below and/or above the Dialog itself (e.g. decorative graphics).
**Accessibility notes:**
- By default (e.g. using `OnePaneDialog`), `aria-labelledby` is populated automatically using the dialog title `id`.
- If there is a custom Dialog implementation (e.g. `TwoPaneDialog`), the dialog element doesn’t have to have
the `aria-labelledby` attribute however this is recommended. It should match the `id` of the dialog title.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | *required* | The dialog content |
| `above` | `React.ReactNode` |  | When set, provides a component that can render content above the top of the modal; |
| `below` | `React.ReactNode` |  | When set, provides a component that will render content below the bottom of the modal; |
| `role` | `"dialog" \| "alertdialog"` |  | When set, overrides the default role value. Default role is "dialog" |
| `style` | `StyleType` |  | Custom styles |
| `testId` | `string` |  | Test ID used for e2e testing. |
| `aria-label` | `string` |  | The accessible name of dialog. |
| `aria-labelledby` | `string` | *required* | The ID of the title labelling this dialog. Required. |
| `aria-describedby` | `string` |  | The ID of the content describing this dialog, if applicable. |

---

## Default

This is a basic `<ModalDialog>` that wraps a `<ModalPanel>` element. The
 `<ModalDialog>` is just a a wrapper for the visual components of the overall
 modal. It sets the modal's role to `"dialog"`. If it did not have another
 element as a child here (a `<ModalPanel>` in this case), nothing would be
 visible. If the `<ModalDialog>` were not given a `maxHeight` or `maxWidth`
 style, it would take up the entire viewport.
#### Accessibility
In this example, the `aria-labelledby` provides the alert dialog an
accessible name by referring to the element that provides the dialog title.
The `aria-describedby` attribute gives the alert dialog an accessible
description by referring to the dialog content that describes the primary
message or purpose of the dialog.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <ModalDialog
            aria-labelledby="modal-title-0"
            aria-describedby="modal-desc-0"
        >
            <ModalPanel
                content={
                    <View style={{gap: sizing.size_240}}>
                        <Heading size="xxlarge" id="modal-title-0">
                            Modal Title
                        </Heading>
                        <BodyText id="modal-desc-0">
                            Here is some text in the modal.
                        </BodyText>
                    </View>
                }
            />
        </ModalDialog>
    </View>
</View>
```

---

## With Above And Below

The `above` and `below` props work the same for `<ModalDialog>` as they do
for `<OnePaneDialog>`. The element passed into the `above` prop is rendered
in front of the modal. The element passed into the `below` prop is rendered
behind the modal. In this example, a `<View>` element with a background image
of a person and an orange blob is passed into the `below` prop. A `<View>`
element with a background image of an arc and a blue semicircle is passed
into the `above` prop. This results in the person's head and the orange blob
peeking out from behind the modal, and the arc and semicircle going over the
front of the modal.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <ModalDialog
            aria-labelledby="modal-title-2"
            style={styles.squareDialog}
            above={<View style={aboveStyle} />}
            below={<View style={belowStyle} />}
        >
            <ModalPanel
                content={
                    <View style={{gap: sizing.size_240}}>
                        <Heading size="xxlarge" id="modal-title-2">
                            Modal Title
                        </Heading>
                        <BodyText>
                            Here is some text in the modal.
                        </BodyText>
                    </View>
                }
            />
        </ModalDialog>
    </View>
</View>
```

---

## With Launcher

A modal can be launched using a launcher. Here, the launcher is a `<Button>`
element whose `onClick` function opens the modal. The modal passed into the
`modal` prop of the `<ModalLauncher>` element is a `<ModalDialog>` element.
To turn an element into a launcher, wrap the element in a `<ModalLauncher>`
element.

```tsx
<ModalLauncher modal={MyModal}>
    {({openModal}) => (
        <Button onClick={openModal}>
            Click me to open the modal
        </Button>
    )}
</ModalLauncher>
```

---

## With Long Contents

When the content in a modal is longer than the available space, the modal
becomes scrollable by default. The `scrollOverflow` prop on `<ModalPanel>`
controls this behavior (defaults to `true`). This example demonstrates how
a modal with long contents will automatically enable scrolling, keeping the
header and footer fixed while the main content scrolls.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <ModalDialog>
            <ModalPanel
                aria-labelledby="modal-title-4"
                content={
                    <View style={{gap: sizing.size_240}} tabIndex={0}>
                        <Heading size="xxlarge" id="modal-title-4">
                            Terms of Service
                        </Heading>
                        {reallyLongText}
                    </View>
                }
            />
        </ModalDialog>
    </View>
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Building Blocks Modal Footer](building-blocks-modal-footer.md)
- [Building Blocks Modal Header](building-blocks-modal-header.md)
- [Building Blocks Modal Panel](building-blocks-modal-panel.md)
- [Drawer Launcher Drawer Launcher](drawer-launcher-drawer-launcher.md)
- [Flexible Dialog](flexible-dialog.md)
- [Modal Launcher](modal-launcher.md)
- [One Pane Dialog](one-pane-dialog.md)
