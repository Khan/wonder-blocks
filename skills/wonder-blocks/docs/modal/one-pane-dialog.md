# OnePaneDialog

> Package: `@khanacademy/wonder-blocks-modal`

---

## Default

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog />
    </View>
</View>
```

---

## Simple

This is the most basic OnePaneDialog, with just the title and content.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            title="Hello, world! Here is an example of a long title that wraps to the next line."
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
    </View>
</View>
```

---

## With Long Contents And Footer

This is the most basic OnePaneDialog, with just the title and content.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            title="Hello, world! Here is an example of a long title that wraps to the next line."
            content={
                <View tabIndex={0}>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                    <BodyText>{reallyLongText}</BodyText>
                </View>
            }
            footer={
                <View style={styles.footer}>
                    <View style={styles.row}>
                        <Button kind="tertiary">Previous</Button>
                        <Button kind="primary">Next</Button>
                    </View>
                </View>
            }
        />
    </View>
</View>
```

---

## With Footer

This OnePaneDialog includes a custom footer.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            title="Hello, world!"
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
            footer={
                <View style={styles.footer}>
                    <BodyText weight="bold">Step 1 of 4</BodyText>
                    <View style={styles.row}>
                        <Button kind="tertiary">Previous</Button>
                        <Button kind="primary">Next</Button>
                    </View>
                </View>
            }
        />
    </View>
</View>
```

---

## With Subtitle

This OnePaneDialog includes a custom subtitle.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            title="Hello, world!"
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
            subtitle={
                "Subtitle that provides additional context to the title"
            }
        />
    </View>
</View>
```

---

## With Breadcrumbs

This OnePaneDialog includes a custom Breadcrumbs element.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            title="Hello, world!"
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
            breadcrumbs={
                <Breadcrumbs>
                    <BreadcrumbsItem>
                        <Link href="#course">Course</Link>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>
                        <Link href="#unit">Unit</Link>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                </Breadcrumbs>
            }
        />
    </View>
</View>
```

---

## With Above And Below

The element passed into the `above` prop is rendered in front of the modal.
The element passed into the `below` prop is rendered behind the modal. In
this example, a `<View>` element with a background image of a person and an
orange blob is passed into the `below` prop. A `<View>` element with a
background image of an arc and a blue semicircle is passed into the `above`
prop. This results in the person's head and the orange blob peeking out from
behind the modal, and the arc and semicircle going over the front of the modal.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            title="Single-line title"
            content={
                <View style={{gap: sizing.size_160}} tabIndex={0}>
                    <BodyText>
                        {`Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id
                est.`}
                    </BodyText>
                    <BodyText>
                        {`Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id
                est.`}
                    </BodyText>
                    <BodyText>
                        {`Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id
                est.`}
                    </BodyText>
                </View>
            }
            above={<View style={aboveStyle} />}
            below={<View style={belowStyle} />}
        />
    </View>
</View>
```

---

## With Style

A OnePaneDialog can have custom styles via the `style` prop. Here, the modal
has a `maxWidth: 1000` and `color: Color.blue` in its custom styles.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            title="Hello, world!"
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
            style={{
                color: semanticColor.status.notice.foreground,
                maxInlineSize: 1000,
            }}
        />
    </View>
</View>
```

---

## With Style And Footer

This example shows how to override the default styling of the modal, like a
confirmation modal.

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            style={{
                blockSize: "fit-content",
                inlineSize: "fit-content",
                maxInlineSize: "100%",
            }}
            title="Title of the modal"
            content={"Content"}
            footer={<Button kind="primary">Confirm</Button>}
        />
    </View>
</View>
```

---

## Multi Step Modal

This example illustrates how we can update the Modal's contents by wrapping
it into a new component/container. `Modal` is built in a way that provides
great flexibility and makes it work with different variations and/or layouts.

```tsx
<View style={styles.example}>
    <ExerciseContainer
        questions={[
            "First question",
            "Second question",
            "Last question",
        ]}
    />
</View>
```

---

## With Launcher

A modal can be launched using a launcher. Here, the launcher is a `<Button>`
element whose `onClick` function opens the modal. The modal passed into the
`modal` prop of the `<ModalLauncher>` element is a `<OnePaneDialog>`. To turn
an element into a launcher, wrap the element in a `<ModalLauncher>` element.

```tsx
<ModalLauncher modal={MyModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
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
- [Modal Launcher](modal-launcher.md)
