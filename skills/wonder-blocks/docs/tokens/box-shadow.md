# Box Shadow

---

## Box Shadow

```tsx
<TokenTable
    columns={[
        {
            label: "Token",
            cell: (row: Row) => <Code>{`boxShadow.${row.label}`}</Code>,
        },
        {
            label: "CSS Variable",
            cell: (row: Row) => <Code>{row.css}</Code>,
        },
        {
            label: "Value",
            cell: "value",
        },
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        backgroundColor:
                            semanticColor.core.background.base.default,
                        boxShadow: `var(${row.css})`,
                        width: sizing.size_480,
                        height: sizing.size_480,
                    }}
                >
                    &nbsp;
                </View>
            ),
        },
    ]}
    tokens={boxShadow}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Border](border.md)
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
