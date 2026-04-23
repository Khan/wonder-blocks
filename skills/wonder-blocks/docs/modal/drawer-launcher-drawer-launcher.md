# DrawerLauncher

> Package: `@khanacademy/wonder-blocks-modal`

---

## Default

```tsx
<DrawerLauncher modal={DefaultModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</DrawerLauncher>
```

---

## Inline Start Aligned

An inlineStart-aligned drawer. Uses the `alignment` prop to slide in from the
left in LTR writing mode and right in RTL writing mode.

```tsx
<DrawerLauncher modal={DefaultModal} alignment={"inlineStart"}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</DrawerLauncher>
```

---

## Inline End Aligned

An inlineEnd-aligned drawer. Uses the `alignment` prop to slide in from the
right in LTR writing mode and left in RTL writing mode.

```tsx
<DrawerLauncher modal={DefaultModal} alignment={"inlineEnd"}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</DrawerLauncher>
```

---

## Block End Aligned

An blockEnd-aligned drawer. Uses the `alignment` prop to slide in from the
bottom in all writing modes, and a `timingDuration` of 400 milliseconds to
allow more time for animating-in vertically.

```tsx
<DrawerLauncher modal={DefaultModal} alignment={"blockEnd"}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</DrawerLauncher>
```

---

## With No Animation

A drawer with `animated` set to false for reducing motion

```tsx
<DrawerLauncher
    modal={DefaultModal}
    animated={false}
    alignment={"inlineStart"}
>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</DrawerLauncher>
```

---

## With Short Content

An drawer with short content for style testing.
Note: this component likely isn't the best choice for short content in the wild.

```tsx
<DrawerLauncher
    modal={
        <DrawerDialog
            title="Single-line title"
            content={
                <View>
                    <BodyText>Short contents</BodyText>
                </View>
            }
        />
    }
    alignment={"inlineEnd"}
>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</DrawerLauncher>
```

---

## With Really Long Content

A launcher with a really long DrawerDialog, for testing overflow styles.

```tsx
<DrawerLauncher alignment={"inlineEnd"} modal={longModal}>
    {({openModal}) => (
        <Button onClick={openModal}>
            Click me to open the modal
        </Button>
    )}
</DrawerLauncher>
```

---

## With Nested Dialogs

A launcher with nested dialogs, for testing a real-world implementation.
This demonstrates that DrawerLauncher styles are properly applied to DrawerDialog
even when there are nested components in between. The modal should receive the
proper alignment animation and full-height styles.

```tsx
<DrawerLauncher
    alignment={"inlineEnd"}
    modal={renderNestedModal}
>
    {({openModal}) => (
        <Button onClick={openModal}>
            Click me to open the modal
        </Button>
    )}
</DrawerLauncher>
```

---

## With Custom Dimensions

An drawer with customized dialog dimensions.

```tsx
<DrawerLauncher
    modal={
        <DrawerDialog
            styles={{
                root: {
                    minWidth: "unset",
                    width: "unset",
                },
            }}
            title="Single-line title"
            content={
                <View>
                    <BodyText>Short contents</BodyText>
                </View>
            }
        />
    }
    alignment={"inlineEnd"}
>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</DrawerLauncher>
```

---

## With Backdrop Dismiss Disabled

This is an example in which the modal _cannot_
    be dismissed by clicking in in the backdrop. This is done by
    setting the `backdropDismissEnabled` prop on the
    `<DrawerLauncher>` element to false.

```tsx
<DrawerLauncher
    modal={DefaultModal}
    backdropDismissEnabled={false}
    alignment={"inlineEnd"}
>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</DrawerLauncher>
```

---

## Triggering Programmatically

Sometimes you'll want to trigger a modal
    programmatically. This can be done by rendering `<DrawerLauncher>`
    without any children and instead setting its `opened` prop to
    true. In this situation, `DrawerLauncher` is a controlled
    component which means you'll also have to update `opened` to
    false in response to the `onClose` callback being triggered.
    It is necessary to use this method in this example, as
    `ActionMenu` cannot have a `DrawerLauncher` element as a child,
    (it can only have `Item` elements as children), so launching a
    modal from a dropdown must be done programatically.

```tsx
<View>
    <ActionMenu menuText="actions">
        <ActionItem label="Open modal" onClick={handleOpen} />
    </ActionMenu>

    <DrawerLauncher
        onClose={handleClose}
        opened={opened}
        alignment={"inlineEnd"}
        modal={({closeModal}) => (
            <DrawerDialog
                title="Triggered from action menu"
                content={
                    <View>
                        <BodyText>Hello, world</BodyText>
                    </View>
                }
            />
        )}
        // Note that this modal launcher has no children.
    />
</View>
```

---

## With Closed Focus Id

You can use the `closedFocusId` prop on the
    `DrawerLauncher` to specify where to set the focus after the
    modal has been closed. Imagine the following situation:
    clicking on a dropdown menu option to open a modal
    causes the dropdown to close, and so all of the dropdown options
    are removed from the DOM. This can be a problem because by
    default, the focus shifts to the previously focused element after
    a modal is closed; in this case, the element that opened the modal
    cannot receive focus since it no longer exists in the DOM,
    so when you close the modal, it doesn't know where to focus on the
    page. When the previously focused element no longer exists,
    the focus shifts to the page body, which causes a jump to
    the top of the page. This can make it diffcult to find the original
    dropdown. A solution to this is to use the `closedFocusId` prop
    to specify where to set the focus after the modal has been closed.
    In this example, `closedFocusId` is set to the ID of the button
    labeled "Focus here after close." If the focus shifts to the button
    labeled "Top of page (should not receieve focus)," then the focus
    is on the page body, and the `closedFocusId` did not work.

```tsx
<View style={{gap: 20}}>
    <Button>Top of page (should not receive focus)</Button>
    <Button id="button-to-focus-on">Focus here after close</Button>
    <ActionMenu menuText="actions">
        <ActionItem
            label="Open modal"
            onClick={() => handleOpen()}
        />
    </ActionMenu>
    <DrawerLauncher
        alignment={"inlineEnd"}
        onClose={() => handleClose()}
        opened={opened}
        closedFocusId="button-to-focus-on"
        modal={DefaultModal}
    />
</View>
```

---

## With Initial Focus Id

Sometimes, you may want a specific element inside
    the modal to receive focus first. This can be done using the
    `initialFocusId` prop on the `<DrawerLauncher>` element.
    Just pass in the ID of the element that should receive focus,
    and it will automatically receieve focus once the modal opens.
    In this example, the top text input would have received the focus
    by default, but the bottom text field receives focus instead
    since its ID is passed into the `initialFocusId` prop.

```tsx
<DrawerLauncher
    alignment={"inlineEnd"}
    modal={modalInitialFocus}
    initialFocusId="field-to-be-focused-field"
>
    {({openModal}) => (
        <Button onClick={openModal}>
            Open modal with initial focus
        </Button>
    )}
</DrawerLauncher>
```

---

## Focus Trap

All modals have a focus trap, which means that the
    focus is locked inside the modal. This is done to prevent the user
    from tabbing out of the modal and losing their place. The focus
    trap is also used to ensure that the focus is restored to the
    correct element when the modal is closed. In this example, the
    focus is trapped inside the modal, and the focus is restored to the
    button that opened the modal when the modal is closed.

    Also, this example includes a sub-modal that is opened from the
    first modal so we can test how the focus trap works when multiple
    modals are open.

```tsx
<DrawerLauncher
    modal={modalInitialFocus}
    alignment={"inlineEnd"}
>
    {({openModal}) => (
        <Button onClick={openModal}>
            Open modal with RadioGroup
        </Button>
    )}
</DrawerLauncher>
```



---

## Related docs

- [Overview](overview.md)
- [Building Blocks Modal Dialog](building-blocks-modal-dialog.md)
- [Building Blocks Modal Footer](building-blocks-modal-footer.md)
- [Building Blocks Modal Header](building-blocks-modal-header.md)
- [Building Blocks Modal Panel](building-blocks-modal-panel.md)
- [Flexible Dialog](flexible-dialog.md)
- [Modal Launcher](modal-launcher.md)
- [One Pane Dialog](one-pane-dialog.md)
