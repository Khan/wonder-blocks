# ModalPanel

> Package: `@khanacademy/wonder-blocks-modal`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactElement \| React.ReactNode` | *required* | The main contents of the ModalPanel. All other parts of the panel |
| `header` | `React.ReactElement \| React.ReactNode` |  | The modal header to show at the top of the panel. |
| `footer` | `React.ReactElement \| React.ReactNode` |  | A footer to show beneath the contents. |
| `closeButtonVisible` | `boolean` | *required* | When true, the close button is shown; otherwise, the close button is not shown. |
| `scrollOverflow` | `boolean` |  | Should the contents of the panel become scrollable should they |
| `style` | `StyleType` |  | Any optional styling to apply to the panel. |
| `onClose` | `() => unknown` |  | Called when the close button is clicked. |
| `testId` | `string` |  | Test ID used for e2e testing. |

---

## Default

This is a basic `<ModalPanel>`. It just has a `content` prop that contains a
title and a body.

```tsx
<ModalDialog aria-labelledby="modal-title-0" style={styles.dialog}>
    <ModalPanel
        content={
            <View
                style={[styles.content, styles.scrollContainer]}
                tabIndex={0}
            >
                <Heading size="xxlarge" id="modal-title-0">
                    Modal Title
                </Heading>
                {longBody}
            </View>
        }
    />
</ModalDialog>
```

---

## With Header

This is a `<ModalPanel>` with a `header` prop. Note that the header that
renders here as part of the `header` prop is sticky, so it remains even if
you scroll down in the modal.

```tsx
<ModalDialog aria-labelledby="modal-title-2" style={styles.dialog}>
    <ModalPanel
        header={
            <ModalHeader titleId="modal-title-2" title="Modal Title" />
        }
        content={
            <View tabIndex={0} style={styles.scrollContainer}>
                {longBody}
            </View>
        }
    />
</ModalDialog>
```

---

## With Footer

A modal panel can have a footer with the `footer` prop. In this example, the
footer just contains a button. Note that the footer is sticky.

```tsx
<ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
    <ModalPanel
        content={
            <View
                style={[styles.content, styles.scrollContainer]}
                tabIndex={0}
            >
                <Heading size="xxlarge" id="modal-title-3">
                    Modal Title
                </Heading>
                {longBody}
            </View>
        }
        footer={
            <ModalFooter>
                <Button onClick={() => {}}>Continue</Button>
            </ModalFooter>
        }
    />
</ModalDialog>
```

---

## Two Panels

Here is an example of how you can have a modal with two panels. Observe that
it is responsive, so it uses a row layout with a larger window size and a
column layout on a smaller window size. The "X" close button has been
disabled for both panels since the top right spot would change depending on
which layout is being used.

```tsx
<ModalDialog
    style={twoPaneDialogStyle}
    aria-labelledby="sidebar-title-id"
>
    <View style={panelGroupStyle}>
        <ModalPanel
            content={
                <View style={styles.content}>
                    <Heading size="xxlarge" id="sidebar-title-id">
                        Sidebar
                    </Heading>
                    <BodyText>
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris.
                    </BodyText>
                </View>
            }
            closeButtonVisible={false}
        />
        <ModalPanel
            content={
                <View style={styles.content}>
                    <Heading size="xxlarge">Contents</Heading>
                    <BodyText>
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </BodyText>
                    <Button>Primary action</Button>
                </View>
            }
            closeButtonVisible={false}
        />
    </View>
</ModalDialog>
```

---

## With Style

A `<ModalPanel>` can have custom styles. In this example, the styles for the
modal panel include blue text color, a 2px solid dark blue border, and a
border radius of 20px.

```tsx
<ModalDialog aria-labelledby="modal-title-1" style={styles.dialog}>
    <ModalPanel
        header={
            <ModalHeader
                titleId="modal-title-1"
                title="Modal Title"
            />
        }
        content={
            <>
                {longBody}
                {button}
            </>
        }
        style={modalStyles}
    />
</ModalDialog>
```



---

## Related docs

- [Overview](overview.md)
- [Building Blocks Modal Dialog](building-blocks-modal-dialog.md)
- [Building Blocks Modal Footer](building-blocks-modal-footer.md)
- [Building Blocks Modal Header](building-blocks-modal-header.md)
- [Drawer Launcher Drawer Launcher](drawer-launcher-drawer-launcher.md)
- [Flexible Dialog](flexible-dialog.md)
- [Modal Launcher](modal-launcher.md)
- [One Pane Dialog](one-pane-dialog.md)
