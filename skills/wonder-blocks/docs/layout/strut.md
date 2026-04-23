# Strut

> Package: `@khanacademy/wonder-blocks-layout`

---

## Default

```tsx
<View style={styles.row}>
    <Button>Hello, world!</Button>
    <Strut />
    <Button actionType="destructive">Hello, world!</Button>
</View>
```

---

## Simple

```tsx
<View style={styles.column}>
    <View style={styles.row}>
        <Button>Hello, world!</Button>
        <Strut size={smallSize} />
        <Button actionType="destructive">Hello, world!</Button>
        <Strut size={largeSize} />
        <Button actionType="destructive">Hello, world!</Button>
        <Strut size={smallSize} />
        <Button>Hello, world!</Button>
    </View>
    <View style={styles.row}>
        Hello
        <Strut size={smallSize} />
        world!
        <Strut size={largeSize} />
        Hello
        <Strut size={smallSize} />
        world!
    </View>
</View>
```

---

## With Style

```tsx
<View style={styles.column}>
    <View style={styles.row}>
        <Button>Hello, world!</Button>
        <Strut size={smallSize} style={[styles.strut, styles.thick]} />
        <Button actionType="destructive">Hello, world!</Button>
        <Strut size={largeSize} style={[styles.strut, styles.thick]} />
        <Button actionType="destructive">Hello, world!</Button>
        <Strut size={smallSize} style={[styles.strut, styles.thick]} />
        <Button>Hello, world!</Button>
    </View>
    <Strut size={largeSize} />
    <View style={styles.row}>
        Hello
        <Strut size={smallSize} style={[styles.strut, styles.thin]} />
        remarkably
        <Strut size={largeSize} style={[styles.strut, styles.thin]} />
        wonderful
        <Strut size={smallSize} style={[styles.strut, styles.thin]} />
        world!
    </View>
</View>
```



---

## Related docs

- [Media Layout Deprecated](media-layout-deprecated.md)
- [Spring](spring.md)
