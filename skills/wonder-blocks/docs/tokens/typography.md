# Typography

---

## Font Family

The available font families in our system.

```tsx
<TokenTable
    columns={[
        ...baseColumns("family"),
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        fontFamily: row.value,
                    }}
                >
                    <View className="sb-unstyled">
                        {sampleTextUpper}
                    </View>
                    <View className="sb-unstyled">
                        {sampleTextLower}
                    </View>
                </View>
            ),
        },
    ]}
    tokens={font.family}
/>
```

---

## Font Size (Body)

The list of possible font sizes that can be used with our components.
Sizes are categorized by `Body` and `Heading`, such as `font.body.size.small` and `font.heading.size.large`.
When using the `font.body.size.*` tokens, also use the corresponding
`font.body.lineHeight.*` token for the line height. As an alternative, the
WB `BodyText` component can be used instead, which will apply all the needed
font properties by default.
**Note:** the legacy font token API will be deprecated in the future (e.g. `font.size.small`) to support
both Classic and Thunderblocks with the same theme structure.

```tsx
<TokenTable
    columns={[
        ...baseColumns("body.size"),
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        fontSize: row.value,
                        lineHeight: 1,
                    }}
                >
                    <View className="sb-unstyled">
                        {sampleTextUpper}
                    </View>
                    <View className="sb-unstyled">
                        {sampleTextLower}
                    </View>
                </View>
            ),
        },
    ]}
    tokens={font.body.size}
/>
```

---

## Font Size (Heading)

When using the `font.heading.size.*` tokens, also use the corresponding
`font.heading.lineHeight.*` token for the line height. As an alternative, the
WB `Heading` component can be used instead, which will apply all the needed
font properties by default.

```tsx
<TokenTable
    columns={[
        ...baseColumns("heading.size"),
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        fontSize: row.value,
                        lineHeight: 1,
                    }}
                >
                    <View className="sb-unstyled">
                        {sampleTextUpper}
                    </View>
                    <View className="sb-unstyled">
                        {sampleTextLower}
                    </View>
                </View>
            ),
        },
    ]}
    tokens={font.heading.size}
/>
```

---

## Line Height (Body)

The vertical space associated to a given font size.
Line-heights are categorized by `Body` and `Heading`.
When using the `font.body.lineHeight.*` tokens, also use the corresponding
`font.body.size.*` token for the font size. As an alternative, the
WB `BodyText` component can be used instead, which will apply all the needed
font properties by default.

```tsx
<TokenTable
    columns={[
        ...baseColumns("body.lineHeight"),
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        backgroundColor:
                            semanticColor.core.background.neutral
                                .subtle,
                        lineHeight: row.value,
                    }}
                >
                    <View className="sb-unstyled">
                        {sampleTextUpper}
                    </View>
                    <View className="sb-unstyled">
                        {sampleTextLower}
                    </View>
                </View>
            ),
        },
    ]}
    tokens={font.body.lineHeight}
/>
```

---

## Line Height (Heading)

When using the `font.heading.lineHeight.*` tokens, also use the corresponding
`font.heading.size.*` token for the font size. As an alternative, the
WB `Heading` component can be used instead, which will apply all the needed
font properties by default.

```tsx
<TokenTable
    columns={[
        ...baseColumns("heading.lineHeight"),
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        backgroundColor:
                            semanticColor.core.background.neutral
                                .subtle,
                        lineHeight: row.value,
                    }}
                >
                    <View className="sb-unstyled">
                        {sampleTextUpper}
                    </View>
                    <View className="sb-unstyled">
                        {sampleTextLower}
                    </View>
                </View>
            ),
        },
    ]}
    tokens={font.heading.lineHeight}
/>
```

---

## Font Weight

Font weight options for Lato (Classic) include `light`, `medium` and `bold`.
Font weight options for Plus Jakarta Sans (Classroom) include `light`, `medium`, `semi`, `bold`, and `black`.

```tsx
<TokenTable
    columns={[
        ...baseColumns("weight"),
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        fontWeight: row.value,
                    }}
                >
                    <View className="sb-unstyled">
                        {sampleTextUpper}
                    </View>
                    <View className="sb-unstyled">
                        {sampleTextLower}
                    </View>
                </View>
            ),
        },
    ]}
    tokens={font.weight}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Border](border.md)
- [Box Shadow](box-shadow.md)
- [Deprecated Color Deprecated](deprecated-color-deprecated.md)
- [Deprecated Deprecated Semantic Colors](deprecated-deprecated-semantic-colors.md)
- [Deprecated Spacing Deprecated](deprecated-spacing-deprecated.md)
- [Media Query Breakpoints](media-query-breakpoints.md)
- [Semantic Color](semantic-color.md)
- [Semantic Colors Groups](semantic-colors-groups.md)
- [Sizing](sizing.md)
- [Utilities Fade](utilities-fade.md)
- [Utilities Mix](utilities-mix.md)
