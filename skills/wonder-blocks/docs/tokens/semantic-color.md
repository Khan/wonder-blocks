# Semantic Color

---

## Semantic Colors

```tsx
<TokenTable
    columns={[
        {
            label: "Token",
            cell: (row: Row) => <Code>{`semanticColor.${row.label}`}</Code>,
        },
        {
            label: "CSS Variable",
            cell: (row) => <Code>{row.css}</Code>,
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
                        padding: sizing.size_060,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: row.value,
                            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        &nbsp;
                    </View>
                </View>
            ),
        },
    ]}
    tokens={flattenNestedTokens(semanticColor)}
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
- [Semantic Colors Groups](semantic-colors-groups.md)
- [Sizing](sizing.md)
- [Typography](typography.md)
- [Utilities Fade](utilities-fade.md)
- [Utilities Mix](utilities-mix.md)
