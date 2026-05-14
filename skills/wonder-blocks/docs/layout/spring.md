# Spring

> Package: `@khanacademy/wonder-blocks-layout`

---

## Default

```tsx
<View style={styles.row}>
    <Button>Hello, world!</Button>
    <Spring />
    <Button actionType="destructive">Hello, world!</Button>
</View>
```

---

## Simple

```tsx
<View style={styles.column}>
    <View style={styles.row}>
        <Button>Hello, world!</Button>
        <Spring />
        <Button actionType="destructive">Hello, world!</Button>
    </View>
    <Strut size={16} />
    <View style={styles.row}>
        Hello
        <Spring />
        world!
    </View>
</View>
```

---

## With Style

`<Spring/>` can have a style.

```tsx
<View style={styles.column}>
    <View style={styles.row}>
        <Button>Hello, world!</Button>
        <Spring style={[styles.spring, styles.thick]} />
        <Button actionType="destructive">Hello, world!</Button>
        <Spring style={[styles.spring, styles.thick]} />
        <Button>Hello, world!</Button>
    </View>
    <Strut size={32} />
    <View style={styles.row}>
        Hello
        <Spring style={[styles.spring, styles.thin]} />
        wonderful
        <Spring style={[styles.spring, styles.thin]} />
        world!
    </View>
</View>
```



---

## Related docs

- [Media Layout Deprecated](media-layout-deprecated.md)
- [Strut](strut.md)
