# FlexibleDialog

> Package: `@khanacademy/wonder-blocks-modal`

A flexible modal variant with fewer layout constraints. It can receive
a custom background (image or color), a title for the main heading, and that
title can optionally render in the content area through a render prop.
It can be used directly with `ModalLauncher`. In a `DrawerLauncher`, use
`DrawerDialog` instead, which is a wrapper around `FlexibleDialog`.
One of the following is required for labeling the dialog:
- title content (React element or string)
- aria-label (string)
- aria-labelledby (string ID reference)
### Usage
```jsx
import {FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
<FlexibleDialog
    title={<Heading size="xxlarge" id="main-heading">Select mission</Heading>}
    content={
        <BodyText>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est.`}
        </BodyText>
    }
/>
```
### Custom styling
You can optionally pass in the `styles` prop to override various parts of a DrawerDialog.
- `styles.root` -  The outermost container of the dialog: box shadow, minWidth, maxWidth, width, height, maxHeight, etc.
- `styles.dialog` - The actual dialog element with minWidth/minHeight, mostly to override View default styles
- `styles.panel` - The inner dialog flex panel, targeting the internal `FlexiblePanel` component
- `styles.content` - The internal `ModalContent` component, which sets padding
- `styles.closeButton` - The close button, including absolute positioning

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `titleId` | `string` |  | An optional id parameter for the main heading. If one is not provided, |
| `content` | `React.ReactElement \| ((slots: RenderProps) => React.ReactElement)` | *required* | The content of the modal. Supports a render prop for placing the title in a slot. |
| `onClose` | `() => unknown` |  | Called when the close button is clicked. |
| `closeButtonVisible` | `boolean` |  | When true, the close button is shown; otherwise, the close button is not shown. |
| `role` | `"dialog" \| "alertdialog"` |  | When set, overrides the default role value. Default role is "dialog" |
| `styles` | `FlexibleDialogStyles` |  | Optional custom styles. |
| `testId` | `string` |  | Test ID used for e2e testing. |
| `aria-describedby` | `string` |  | The ID of the content describing this dialog, if applicable. |

---

## Default

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog />
    </View>
</View>
```

---

## With Background Image

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog
            title={
                <Heading
                    size="xlarge"
                    weight="bold"
                    id="gem-challenge-completed-modal-heading"
                    tag="h2"
                >
                    Congrats Rainier McCheddarton!
                </Heading>
            }
            styles={{
                panel: modalBgStyle,
            }}
            content={({title}) => (
                <View style={styles.centered}>
                    <img
                        src={celebrationChest}
                        style={{maxWidth: "240px"}}
                        alt=""
                    />
                    {title}
                    <Heading
                        size="large"
                        weight="bold"
                        style={{
                            marginBlock: sizing.size_240,
                            textAlign: "center",
                        }}
                    >
                        Your class, Advanced Calculus, reached 1500 of
                        1500 gems
                    </Heading>
                    <ActivityButton
                        kind="primary"
                        styles={{
                            root: {
                                marginBlockStart: 20,
                                alignSelf: "center",
                            },
                        }}
                        onClick={() => {}}
                    >
                        Continue
                    </ActivityButton>
                </View>
            )}
        />
    </View>
</View>
```

---

## With No Padding

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog
            styles={{
                content: {
                    padding: 0,
                    maxWidth: "90%",
                    [small]: {
                        paddingInline: 0,
                    },
                },
            }}
            title="Dogz are the best"
            content={
                <View>
                    <BodyText>{longText}</BodyText>
                    <BodyText>{longText}</BodyText>
                    <BodyText>{longText}</BodyText>
                </View>
            }
        />
    </View>
</View>
```

---

## With Title Render Prop

A FlexibleDialog can have a movable title via the
  `content` and its `title` render prop, so it doesn't have to be the first
  element. It will also label the dialog as its accessible name.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog
            title={<Heading tag="h2">Hey, Bagley!</Heading>}
            content={({title}) => (
                <View>
                    <img src={celebrationChest} alt="" />
                    {title}
                    <Heading
                        size="large"
                        weight="bold"
                        tag="h3"
                        style={{
                            marginBlock: sizing.size_240,
                            textAlign: "center",
                        }}
                    >
                        Your class, Advanced Calculus, reached 1500 of
                        1500 gems
                    </Heading>
                </View>
            )}
        />
    </View>
</View>
```

---

## With Aria Label

A FlexibleDialog can have an aria-label as its accessible name.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog
            aria-label="Catz are the best"
            content={
                <View>
                    <BodyText>This is some text</BodyText>
                </View>
            }
        />
    </View>
</View>
```

---

## With Aria Labelledby

A FlexibleDialog can derive its accessible name from aria-labelledby.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog
            aria-labelledby="main-heading"
            title={
                <Heading id="main-heading">Dogz are the best</Heading>
            }
            content={
                <View>
                    <BodyText>This is some text</BodyText>
                </View>
            }
        />
    </View>
</View>
```

---

## With Style

A FlexibleDialog can have custom styles via the
  `style` prop. Here, the modal has a `maxWidth: 1000` and
  `color: Color.blue` in its custom styles.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog
            title={<Heading>Hello, world!</Heading>}
            content={
                <>
                    <BodyText>{reallyLongText}</BodyText>
                </>
            }
            styles={{
                root: {
                    color: semanticColor.status.notice.foreground,
                    maxWidth: 1000,
                },
                panel: {
                    backgroundColor:
                        semanticColor.status.notice.background,
                },
            }}
        />
    </View>
</View>
```

---

## With Long Contents

A FlexibleDialog will adjust with long contents, instead of fixing its height.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog
            title={<Heading>Hello, world!</Heading>}
            content={
                <>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText style={{display: "flex"}}>
                        <Button
                            style={{
                                marginInlineStart: "auto",
                                marginBlockStart: sizing.size_100,
                            }}
                        >
                            A button
                        </Button>
                    </BodyText>
                </>
            }
        />
    </View>
</View>
```

---

## With Launcher

A modal can be launched using a launcher. Here,
   the launcher is a `<Button>` element whose `onClick` function
   opens the modal. The modal passed into the `modal` prop of
   the `<ModalLauncher>` element is a `<FlexibleDialog>`.
   To turn an element into a launcher, wrap the element in a
   `<ModalLauncher>` element.

```tsx
<ModalLauncher modal={MyModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</ModalLauncher>
```

---

## With Full Screen Styling

A FlexibleDialog can be positioned full-screen by overriding the root styles.
This creates a clean, full-viewport experience.

```tsx
<ModalLauncher modal={FullScreenModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Open Full-Screen Dialog</Button>
    )}
</ModalLauncher>
```

---

## With Custom Close Button Positioning

A FlexibleDialog can have custom close button positioning through the styles prop.
This example shows positioning the close button in a novel location.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog
            title={
                <Heading size="large">
                    Custom Close Button Positioning
                </Heading>
            }
            styles={{
                closeButton: {
                    // Position close button at bottom left instead of top right
                    position: "absolute",
                    insetBlockEnd: sizing.size_240,
                    insetInlineStart: sizing.size_240,
                    insetBlockStart: "auto",
                    insetInlineEnd: "auto",
                },
            }}
            content={
                <View>
                    <BodyText>
                        This FlexibleDialog demonstrates custom close
                        button positioning. Instead of the traditional
                        top-right corner, the close button has been
                        moved to the bottom-left corner.
                    </BodyText>

                    <View style={styles.row}>
                        <Button kind="primary">Save Changes</Button>
                        <Button kind="secondary">Cancel</Button>
                    </View>
                </View>
            }
        />
    </View>
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Building Blocks Modal Dialog](building-blocks-modal-dialog.md)
- [Building Blocks Modal Footer](building-blocks-modal-footer.md)
- [Building Blocks Modal Header](building-blocks-modal-header.md)
- [Building Blocks Modal Panel](building-blocks-modal-panel.md)
- [Drawer Launcher Drawer Launcher](drawer-launcher-drawer-launcher.md)
- [Modal Launcher](modal-launcher.md)
- [One Pane Dialog](one-pane-dialog.md)
