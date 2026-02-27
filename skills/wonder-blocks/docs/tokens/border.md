# Border

---

## Border Radius

```tsx
<TokenTable
    columns={[
        ...baseColumns("radius"),
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        backgroundColor:
                            semanticColor.core.background.instructive
                                .default,
                        borderRadius: row.value,
                        width: sizing.size_480,
                        height: sizing.size_480,
                    }}
                >
                    &nbsp;
                </View>
            ),
        },
    ]}
    tokens={border.radius}
/>
```

---

## Border Width

```tsx
<TokenTable
    columns={[
        ...baseColumns("width"),
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        borderColor:
                            semanticColor.core.border.instructive
                                .default,
                        borderWidth: row.value,
                        width: sizing.size_480,
                        height: sizing.size_480,
                    }}
                >
                    &nbsp;
                </View>
            ),
        },
    ]}
    tokens={border.width}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Box Shadow](box-shadow.md)
- [Deprecated Color Deprecated](deprecated-color-deprecated.md)
- [Deprecated Deprecated Semantic Colors](deprecated-deprecated-semantic-colors.md)
- [Deprecated Spacing Deprecated](deprecated-spacing-deprecated.md)
- [Media Query Breakpoints](media-query-breakpoints.md)
- [Semantic Color](semantic-color.md)
- [Semantic Colors Groups](semantic-colors-groups.md)
- [Sizing](sizing.md)
- [Typography](typography.md)
- [Utilities Fade](utilities-fade.md)
- [Utilities Mix](utilities-mix.md)
