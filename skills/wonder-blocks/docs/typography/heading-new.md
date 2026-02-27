# Heading (New)

> Package: `@khanacademy/wonder-blocks-typography`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `HeadingSize` |  |  |
| `tag` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` |  |  |
| `weight` | `"medium" \| "semi" \| "bold"` |  |  |

---

## Default

A dynamic example of the `Heading` component where you can select a size and
weight via props. Defaults to `size="large"` and `weight="bold"`.

```tsx
<Heading size="large" weight="bold" />
```

---

## Sizes and weights

An example of the `Heading` component's `size` and `weight` prop combinations,
mimicking the ones found in Figma Foundation specs.

```tsx
<View style={styles.grid}>
    <View style={styles.row}>
        <Heading size="small" weight="bold">
            Small size, bold weight
        </Heading>
        <Heading size="small" weight="semi">
            Small size, semibold weight
        </Heading>
        <Heading size="small" weight="medium">
            Small size, medium weight
        </Heading>
    </View>
    <View style={styles.row}>
        <Heading size="medium" weight="bold">
            Medium size, bold weight
        </Heading>
        <Heading size="medium" weight="semi">
            Medium size, semibold weight
        </Heading>
        <Heading size="medium" weight="medium">
            Medium size, medium weight
        </Heading>
    </View>
    <View style={styles.row}>
        <Heading size="large" weight="bold">
            Large size, bold weight
        </Heading>
        <Heading size="large" weight="semi">
            Large size, semibold weight
        </Heading>
        <Heading size="large" weight="medium">
            Large size, medium weight
        </Heading>
    </View>
    <View style={styles.row}>
        <Heading size="xlarge" weight="bold">
            xLarge size, bold weight
        </Heading>
        <Heading size="xlarge" weight="semi">
            xLarge size, semibold weight
        </Heading>
        <Heading size="xlarge" weight="medium">
            xLarge size, medium weight
        </Heading>
    </View>
    <View style={styles.row}>
        <Heading size="xxlarge" weight="bold">
            xxLarge size, bold weight
        </Heading>
        <Heading size="xxlarge" weight="semi">
            xxLarge size, semibold weight
        </Heading>
        <div />
    </View>
</View>
```

---

## Classic Conversion Guide

A table showing the conversion from Classic Typography components to Heading.

```tsx
<View style={[styles.grid, styles.conversionGuide]}>
    <View style={styles.row}>
        <HeadingXSmall>HeadingXSmall</HeadingXSmall>
        <Heading size="small">Heading size=small</Heading>
    </View>
    <View style={styles.row}>
        <HeadingSmall>HeadingSmall</HeadingSmall>
        <Heading size="medium">Heading size=medium</Heading>
    </View>
    <View style={styles.row}>
        <HeadingMedium>HeadingMedium</HeadingMedium>
        <Heading size="large">Heading size=large</Heading>
    </View>
    <View style={styles.row}>
        <Tagline>Tagline</Tagline>
        <Heading size="large" weight="medium">
            Heading size=large, weight=medium
        </Heading>
    </View>
    <View style={styles.row}>
        <HeadingLarge>HeadingLarge</HeadingLarge>
        <Heading size="xlarge">Heading size=xlarge</Heading>
    </View>
    <View style={styles.row}>
        <Title>Title</Title>
        <Heading size="xxlarge">Heading size=xxlarge</Heading>
    </View>
</View>
```

---

## Custom Styling

An example of overriding `Heading` component's styling.

```tsx
<View>
    <Heading>
        Text to show the default styling based on props. If we add more
        text here, it will run on multiple lines.
    </Heading>
    <Heading style={styles.customStyle}>
        A lot of text that runs on multiple lines, with custom styling.
        We really like ice cream. What flavor is your favorite? That’s
        not ice cream, it’s sorbet!
    </Heading>
</View>
```



---

## Related docs

- [Accessibility](accessibility.md)
- [Body](body.md)
- [Body Monospace](body-monospace.md)
- [Body Serif](body-serif.md)
- [Body Serif Block](body-serif-block.md)
- [Body Text New](body-text-new.md)
- [Caption](caption.md)
- [Footnote](footnote.md)
- [Heading Large](heading-large.md)
- [Heading Medium](heading-medium.md)
- [Heading Small](heading-small.md)
- [Heading Xsmall](heading-xsmall.md)
- [Label Large](label-large.md)
- [Label Medium](label-medium.md)
- [Label Small](label-small.md)
- [Label Xsmall](label-xsmall.md)
- [Tagline](tagline.md)
- [Title](title.md)
