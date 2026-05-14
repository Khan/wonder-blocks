# BodyText (New)

> Package: `@khanacademy/wonder-blocks-typography`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xsmall" \| "small" \| "medium"` |  |  |
| `weight` | `"medium" \| "semi" \| "bold"` |  |  |

---

## Default

A dynamic example of the `BodyText` component where you can select a size and
weight via props. Defaults to `size="medium"` and `weight="medium"`.

```tsx
<BodyText size="medium" weight="medium" />
```

---

## Sizes and weights

An example of the `BodyText` component's `size` and `weight` prop combinations,
mimicking the ones found in Figma Foundation specs.

```tsx
<View style={styles.grid}>
    <View style={styles.row}>
        <BodyText size="xsmall" weight="medium">
            xSmall size, medium weight
        </BodyText>
        <BodyText size="xsmall" weight="bold">
            xSmall size, bold weight
        </BodyText>
        <div />
    </View>
    <View style={styles.row}>
        <BodyText size="small" weight="semi">
            Small size, semibold weight
        </BodyText>
        <div />
        <div />
    </View>
    <View style={styles.row}>
        <BodyText size="medium" weight="medium">
            Medium size, medium weight
        </BodyText>
        <BodyText size="medium" weight="semi">
            Medium size, semibold weight
        </BodyText>
        <BodyText size="medium" weight="bold">
            Medium size, bold weight
        </BodyText>
    </View>
</View>
```

---

## Classic Conversion Guide

A table showing the conversion from Classic Typography components to BodyText.

```tsx
<View style={[styles.grid, styles.conversionGuide]}>
    <View style={styles.row}>
        <Footnote tag="p" style={styles.classic}>
            Footnote
        </Footnote>
        <BodyText size="xsmall">BodyText size=xsmall</BodyText>
    </View>
    <View style={styles.row}>
        <LabelXSmall tag="p" style={styles.classic}>
            LabelXSmall
        </LabelXSmall>
        <BodyText size="xsmall">BodyText size=xsmall</BodyText>
    </View>
    <View style={styles.row}>
        <LabelSmall tag="p" style={styles.classic}>
            LabelSmall
        </LabelSmall>
        <BodyText size="small">BodyText size=small</BodyText>
    </View>
    <View style={styles.row}>
        <LabelMedium tag="p" style={styles.classic}>
            LabelMedium
        </LabelMedium>
        <BodyText>BodyText</BodyText>
    </View>
    <View style={styles.row}>
        <LabelLarge tag="p" style={styles.classic}>
            LabelLarge
        </LabelLarge>
        <BodyText weight="bold">BodyText weight=bold</BodyText>
    </View>
    <View style={styles.row}>
        <Body tag="p" style={styles.classic}>
            Body
        </Body>
        <BodyText>BodyText</BodyText>
    </View>
</View>
```

---

## Custom Styling

An example of overriding `BodyText` component's styling.

```tsx
<View>
    <BodyText>
        Text to show the default styling based on props. If we add more
        text here, it will run on multiple lines.
    </BodyText>
    <BodyText style={styles.customStyle}>
        A lot of text that runs on multiple lines, with custom styling.
        We really like ice cream. What flavor is your favorite? That’s
        not ice cream, it’s sorbet!
    </BodyText>
</View>
```



---

## Related docs

- [Accessibility](accessibility.md)
- [Body](body.md)
- [Body Monospace](body-monospace.md)
- [Body Serif](body-serif.md)
- [Body Serif Block](body-serif-block.md)
- [Caption](caption.md)
- [Footnote](footnote.md)
- [Heading Large](heading-large.md)
- [Heading Medium](heading-medium.md)
- [Heading New](heading-new.md)
- [Heading Small](heading-small.md)
- [Heading Xsmall](heading-xsmall.md)
- [Label Large](label-large.md)
- [Label Medium](label-medium.md)
- [Label Small](label-small.md)
- [Label Xsmall](label-xsmall.md)
- [Tagline](tagline.md)
- [Title](title.md)
