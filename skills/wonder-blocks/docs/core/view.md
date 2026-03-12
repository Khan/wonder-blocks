# View

> Package: `@khanacademy/wonder-blocks-core`

---

## Default

```tsx
<View>
  {"This is a View!"}
</View>
```

---

## Inline Styles

Styles can be applied inline to the component, or by passing an Aphrodite
style object.

```tsx
<View style={styles.container}>
    <HeadingMedium>Hello, world!</HeadingMedium>
    <View
        style={[
            styles.container,
            {
                background:
                    semanticColor.core.background.instructive.subtle,
                border: `1px solid ${semanticColor.core.border.instructive.default}`,
                padding: spacing.xxxSmall_4,
            },
        ]}
    >
        The style prop can accept a (nested) array of Aphrodite styles
        and inline styles.
    </View>
</View>
```

---

## Using other props

Other props can be passed through `View`s as if they were normal tags.

```tsx
<View style={styles.container}>
    <View style={styles.item}>View with custom styles!</View>

    <View aria-hidden="true">
        This text is hidden from screen readers.
    </View>
</View>
```

---

## Defining Layout

`View` can also be used to wrap elements and apply different flexbox layouts.
By default, `View` uses `flexDirection: "column"`.

```tsx
<View style={styles.container}>
    <HeadingMedium>View as a column</HeadingMedium>
    <View style={styles.view}>
        <View style={styles.item}>
            <LabelMedium>First item</LabelMedium>
        </View>
        <View style={styles.item}>
            <LabelMedium>Second item</LabelMedium>
        </View>
    </View>

    <HeadingMedium>View as a row</HeadingMedium>
    <View style={[styles.view, {flexDirection: "row"}]}>
        <View style={styles.item}>
            <LabelMedium>First item</LabelMedium>
        </View>
        <View style={styles.item}>
            <LabelMedium>Second item</LabelMedium>
        </View>
    </View>
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Add Style](add-style.md)
- [Exports Use Force Update](exports-use-force-update.md)
- [Exports Use Is Mounted](exports-use-is-mounted.md)
- [Exports Use Latest Ref](exports-use-latest-ref.md)
- [Exports Use On Mount Effect](exports-use-on-mount-effect.md)
- [Exports Use Online](exports-use-online.md)
- [Exports Use Pre Hydration Effect](exports-use-pre-hydration-effect.md)
- [Exports Use Render State](exports-use-render-state.md)
- [Id](id.md)
- [Initial Fallback](initial-fallback.md)
- [Server](server.md)
