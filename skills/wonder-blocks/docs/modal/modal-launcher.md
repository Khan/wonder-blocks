# ModalLauncher

> Package: `@khanacademy/wonder-blocks-modal`

This component enables you to launch a modal, covering the screen.
Children have access to `openModal` function via the function-as-children
pattern, so one common use case is for this component to wrap a button:
```js
<ModalLauncher modal={<TwoColumnModal ... />}>
    {({openModal}) => <button onClick={openModal}>Learn more</button>}
</ModalLauncher>
```
The actual modal itself is constructed separately, using a layout component
like OnePaneDialog and is provided via
the `modal` prop.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modal` | `ModalElement \| ((props: { closeModal: () => void }) => ModalElement)` | *required* | The modal to render. |
| `backdropDismissEnabled` | `boolean` |  | Enables the backdrop to dismiss the modal on click/tap |
| `initialFocusId` | `string` |  | The selector for the element that will be focused when the dialog shows. |
| `closedFocusId` | `string` |  | The selector for the element that will be focused after the dialog |
| `testId` | `string` |  | Test ID used for e2e testing. It's set on the ModalBackdrop |
| `opened` | `boolean` |  | Renders the modal when true, renders nothing when false. |
| `onClose` | `() => unknown` |  | If the parent needs to be notified when the modal is closed, use this |
| `children` | `(arg1: { openModal: () => unknown }) => React.ReactNode` |  | WARNING: This props should only be used when using the component as a |

---

## Default

```tsx
<ModalLauncher modal={DefaultModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</ModalLauncher>
```

---

## Simple

This is a basic modal launcher. Its child, the button, has access to the `openModal` function via the function-as-child pattern. It passes this into its `onClick` function, which causes the modal to launch when the button is clicked.

```tsx
<ModalLauncher modal={DefaultModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</ModalLauncher>
```

---

## With Long Contents And Footer

This example demonstrates how to handle long content in modals, especially at high zoom levels. The modal supports two modes: standard (fixed height with overflow hidden) and fullscreen (scrollable content). The fullscreen mode is particularly useful for accessibility, allowing users to read all content even at 400% zoom.

```tsx
<ModalLauncher modal={LongModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</ModalLauncher>
```

---

## With Custom Close Button

This is an example of a modal that uses a close button other than the default "X" button in the top right corner. Here, the default "X" close button is not rendered because the `closeButtonVisible` prop on the `<OnePaneDialog>` is set to false. Instead, a custom close button has been added to the modal footer. The `modal` prop on `<ModalLauncher>` can either be a plain modal, or it can be a function that takes a `closeModal` function as a parameter and returns a modal. The latter is what we do in this case. Then the `closeModal` function is passed into the `onClick` prop on the button in the footer.

```tsx
<ModalLauncher modal={ModalWithCloseButton}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</ModalLauncher>
```

---

## With Backdrop Dismiss Disabled

This is an example in which the modal _cannot_ be dismissed by clicking in in the backdrop. This is done by setting the `backdropDismissEnabled` prop on the `<ModalLauncher>` element to false.

```tsx
<ModalLauncher modal={DefaultModal} backdropDismissEnabled={false}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</ModalLauncher>
```

---

## Triggering Programmatically

Sometimes you'll want to trigger a modal programmatically. This can be done by rendering `<ModalLauncher>` without any children and instead setting its `opened` prop to true. In this situation, `ModalLauncher` is a controlled component which means you'll also have to update `opened` to false in response to the `onClose` callback being triggered. It is necessary to use this method in this example, as `ActionMenu` cannot have a `ModalLauncher` element as a child, (it can only have `Item` elements as children), so launching a modal from a dropdown must be done programatically.

```tsx
<View>
    <ActionMenu menuText="actions">
        <ActionItem label="Open modal" onClick={handleOpen} />
    </ActionMenu>

    <ModalLauncher
        onClose={handleClose}
        opened={opened}
        modal={({closeModal}) => (
            <OnePaneDialog
                title="Triggered from action menu"
                content={
                    <View>
                        <Heading size="xxlarge">Hello, world</Heading>
                    </View>
                }
                footer={
                    <Button onClick={closeModal}>Close Modal</Button>
                }
            />
        )}
        // Note that this modal launcher has no children.
    />
</View>
```

---

## With Opened True

```tsx
<View>
    <View style={styles.actionMenuRow}>
        <BodyText>Example Item</BodyText>
        <ActionMenu
            menuText=""
            opener={() => (
                <IconButton
                    aria-label="Actions"
                    aria-haspopup="true"
                    kind="secondary"
                    icon={dotsThreeIcon}
                    testId="item-actions-button"
                    size="small"
                />
            )}
        >
            <ActionItem
                onClick={() => {
                    setSelectedItem(item.id);
                    setOpenedModal("EDIT");
                }}
                label="Edit"
                leftAccessory={
                    <PhosphorIcon icon={pencilIcon} size="small" />
                }
            />
            <ActionItem
                onClick={() => {
                    setSelectedItem(item.id);
                    setOpenedModal("DELETE");
                }}
                label="Delete"
                leftAccessory={
                    <PhosphorIcon icon={trashIcon} size="small" />
                }
            />
        </ActionMenu>
    </View>

    {/* Edit Modal */}
    <ModalLauncher
        opened={openedModal === "EDIT"}
        onClose={handleClose}
        modal={editDialog}
    />

    {/* Delete Modal */}
    <ModalLauncher
        opened={openedModal === "DELETE"}
        onClose={handleClose}
        modal={deleteDialog}
    />
</View>
```

---

## With Closed Focus Id

You can use the `closedFocusId` prop on the `ModalLauncher` to specify where to set the focus after the modal has been closed. Imagine the following situation: clicking on a dropdown menu option to open a modal causes the dropdown to close, and so all of the dropdown options are removed from the DOM. This can be a problem because by default, the focus shifts to the previously focused element after a modal is closed; in this case, the element that opened the modal cannot receive focus since it no longer exists in the DOM, so when you close the modal, it doesn't know where to focus on the page. When the previously focused element no longer exists, the focus shifts to the page body, which causes a jump to the top of the page. This can make it diffcult to find the original dropdown. A solution to this is to use the `closedFocusId` prop to specify where to set the focus after the modal has been closed. In this example, `closedFocusId` is set to the ID of the button labeled "Focus here after close." If the focus shifts to the button labeled "Top of page (should not receieve focus)," then the focus is on the page body, and the `closedFocusId` did not work.

```tsx
<View style={{gap: 20}}>
    <Button>Top of page (should not receive focus)</Button>
    <Button id="button-to-focus-on">Focus here after close</Button>
    <ActionMenu menuText="actions">
        <ActionItem label="Open modal" onClick={() => handleOpen()} />
    </ActionMenu>
    <ModalLauncher
        onClose={() => handleClose()}
        opened={opened}
        closedFocusId="button-to-focus-on"
        modal={DefaultModal}
    />
</View>
```

---

## With Initial Focus Id

Sometimes, you may want a specific element inside the modal to receive focus first. This can be done using the `initialFocusId` prop on the `<ModalLauncher>` element. Just pass in the ID of the element that should receive focus, and it will automatically receieve focus once the modal opens. In this example, the top text input would have received the focus by default, but the bottom text field receives focus instead since its ID is passed into the `initialFocusId` prop.

```tsx
<ModalLauncher
    modal={modalInitialFocus}
    initialFocusId="text-field-to-be-focused-field"
>
    {({openModal}) => (
        <Button onClick={openModal}>
            Open modal with initial focus
        </Button>
    )}
</ModalLauncher>
```

---

## Focus Management Pattern

```tsx
<CompletionModalContainer />
```

---

## Focus Trap

All modals have a focus trap, which means that the focus is locked inside the modal. This is done to prevent the user from tabbing out of the modal and losing their place. The focus trap is also used to ensure that the focus is restored to the correct element when the modal is closed. In this example, the focus is trapped inside the modal, and the focus is restored to the button that opened the modal when the modal is closed.

Also, this example includes a sub-modal that is opened from the first modal so we can test how the focus trap works when multiple modals are open.

```tsx
<ModalLauncher modal={modalInitialFocus}>
    {({openModal}) => (
        <Button onClick={openModal}>Open modal with RadioGroup</Button>
    )}
</ModalLauncher>
```

---

## Conditional Dialogs With Focus Management

This story demonstrates using a single controlled ModalLauncher with
conditional dialog content. Different buttons trigger different modal
content, and focus management is handled correctly when the modal closes.
This pattern is useful when you need to show different dialogs based on
user interaction, but want to manage them through a single ModalLauncher
instance.

```tsx
<View style={styles.storyContainer}>
    <BodyText>
        This story demonstrates conditional dialogs within a single
        ModalLauncher. Click either button to open different modal
        content. When the modal closes, focus returns to the triggering
        button using the `closedFocusId` prop.
    </BodyText>

    <View style={styles.buttonRow}>
        <Button
            onClick={() => setOpenedModal("REGULAR")}
            testId="regular-modal-trigger"
        >
            Open Regular Modal
        </Button>

        <Button
            onClick={() => setOpenedModal("WRAPPED")}
            id="alternative-modal-trigger"
        >
            Open Alternative Modal
        </Button>
    </View>

    {/* Single ModalLauncher with conditional dialogs */}
    <ModalLauncher
        opened={openedModal !== null}
        onClose={handleClose}
        closedFocusId={
            openedModal === "WRAPPED"
                ? "alternative-modal-trigger"
                : undefined
        }
        modal={conditionalDialog}
    />
</View>
```

---

## Creating a custom modal with ModalLauncher

This example demonstrates how to use `ModalLauncher` to launch a modal that
looks like our own `PopoverContent` component. This is useful when you want
to create a modal with a custom layout that includes illustrations.
You can find more details about how to build custom modals in our
`Modal>Building Blocks` section.
#### Implementation details
- Make sure to wrap `ModalPanel` with `ModalDialog` to ensure that the modal
  is displayed correctly and includes all the proper a11y atrributes.
- Due to some constrains with `ModalDialog`, you'll likely need to override
  its width and height to ensure that the `PopoverContent` is displayed with
  the correct dimensions (see `ModalDialog.style` in the code snippet below).
#### Accessibility notes
- Try to include the `aria-labelledby` attribute on the modal dialog, which
  is used to announce the title of the dialog to screen readers when it is
  opened.
- Make sure to include `alt` text for any images used in the `PopoverContent`
  component.

```tsx
<ModalLauncher modal={popoverModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Open custom modal</Button>
    )}
</ModalLauncher>
```



---

## Related docs

- [Overview](overview.md)
- [Building Blocks Modal Dialog](building-blocks-modal-dialog.md)
- [Building Blocks Modal Footer](building-blocks-modal-footer.md)
- [Building Blocks Modal Header](building-blocks-modal-header.md)
- [Building Blocks Modal Panel](building-blocks-modal-panel.md)
- [Drawer Launcher Drawer Launcher](drawer-launcher-drawer-launcher.md)
- [Flexible Dialog](flexible-dialog.md)
- [One Pane Dialog](one-pane-dialog.md)
