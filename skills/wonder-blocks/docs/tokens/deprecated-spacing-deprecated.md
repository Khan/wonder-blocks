# Spacing (deprecated)

---

## Spacing

```tsx
<TokenTable
    columns={[
        {
            label: "Token",
            cell: (row: Row) => <Code>{`spacing.${row.label}`}</Code>,
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
                        backgroundColor: semanticColor.mastery.primary,
                        height: row.value,
                    }}
                >
                    &nbsp;
                </View>
            ),
        },
    ]}
    tokens={spacing}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Border](border.md)
- [Box Shadow](box-shadow.md)
- [Deprecated Color Deprecated](deprecated-color-deprecated.md)
- [Deprecated Deprecated Semantic Colors](deprecated-deprecated-semantic-colors.md)
- [Media Query Breakpoints](media-query-breakpoints.md)
- [Semantic Color](semantic-color.md)
- [Semantic Colors Groups](semantic-colors-groups.md)
- [Sizing](sizing.md)
- [Typography](typography.md)
- [Utilities Fade](utilities-fade.md)
- [Utilities Mix](utilities-mix.md)
