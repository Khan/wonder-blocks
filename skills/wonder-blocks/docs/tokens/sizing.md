# Sizing

---

## Sizing

```tsx
<TokenTable
    columns={[
        {
            label: "Token",
            cell: (row: Row) => <Code>{`sizing.${row.label}`}</Code>,
        },
        {
            label: "CSS Variable",
            cell: (row) => <Code>{row.css}</Code>,
        },
        {
            label: "Base unit multiplier",
            cell: (row) => row.value.replace("rem", "x"),
        },
        {
            label: "Value",
            cell: "value",
        },
        {
            label: "Pixels (equivalent)",
            cell: (row) =>
                `${parseFloat(row.value.replace("rem", "")) * 10}px`,
        },
        {
            label: "Example",
            cell: (row) => (
                <View
                    style={{
                        backgroundColor: semanticColor.mastery.primary,
                        height: row.value,
                    }}
                >
                    &nbsp;
                </View>
            ),
        },
    ]}
    tokens={sizing}
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
- [Typography](typography.md)
- [Utilities Fade](utilities-fade.md)
- [Utilities Mix](utilities-mix.md)
