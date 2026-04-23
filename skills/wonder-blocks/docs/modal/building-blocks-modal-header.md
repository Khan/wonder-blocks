# ModalHeader

> Package: `@khanacademy/wonder-blocks-modal`

---

## Default

This is a basic `<ModalHeader>`. It just has a `content` prop that contains a
title and a body.

```tsx
<ModalDialog aria-labelledby={"modal-title-id-default-example"} style={styles.dialog}>
    <ModalPanel header={<ModalHeader />} content={longBody} />
</ModalDialog>
```

---

## With Subtitle

This is `<ModalHeader>` with a subtitle, which can be done by passing a
string into the `subtitle` prop.

```tsx
<ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
    <ModalPanel
        header={
            <ModalHeader
                title="Modal Title"
                titleId="modal-title-3"
                subtitle="This is what a subtitle looks like."
            />
        }
        content={longBody}
    />
</ModalDialog>
```

---

## With Breadcrumbs

This is `<ModalHeader>` with breadcrumbs, which can be done by passing a
Wonder Blocks `<Breadcrumbs>` element into the `breadcrumbs` prop.

```tsx
<ModalDialog aria-labelledby="modal-title-5" style={styles.dialog}>
    <ModalPanel
        header={
            <ModalHeader
                title="Modal Title"
                titleId="modal-title-5"
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
        }
        content={longBody}
    />
</ModalDialog>
```



---

## Related docs

- [Overview](overview.md)
- [Building Blocks Modal Dialog](building-blocks-modal-dialog.md)
- [Building Blocks Modal Footer](building-blocks-modal-footer.md)
- [Building Blocks Modal Panel](building-blocks-modal-panel.md)
- [Drawer Launcher Drawer Launcher](drawer-launcher-drawer-launcher.md)
- [Flexible Dialog](flexible-dialog.md)
- [Modal Launcher](modal-launcher.md)
- [One Pane Dialog](one-pane-dialog.md)
