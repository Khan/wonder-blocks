# Focus Styles

---

## focus

A global focus style that can be applied to interactive elements.
This style injects a combination of `outline` and `box-shadow` to indicate
the element is focused. This is used for accessibility purposes as it allows
the element to present a focus state on Windows High Contrast mode.
In the example below, the focus style is applied to an `IconButton` component
and to a `button` element.

```tsx
<View
    style={{
        padding: spacing.medium_16,
        flexDirection: "row",
        placeItems: "center",
    }}
>
    <View
        style={{
            background: semanticColor.status.success.background,
            padding: spacing.medium_16,
            gap: spacing.medium_16,
        }}
    >
        <IconButton
            kind="tertiary"
            icon={info}
            aria-label="Tertiary info button"
            style={focusStyles.focus}
        />
    </View>
    <View
        style={{
            background:
                semanticColor.core.background.neutral.strong,
            padding: spacing.medium_16,
            gap: spacing.medium_16,
        }}
    >
        <IconButton
            kind="tertiary"
            icon={info}
            aria-label="Tertiary info button"
            style={[
                focusStyles.focus,
                {
                    color: semanticColor.core.foreground.knockout
                        .default,
                },
            ]}
        />
    </View>
</View>
```

---

## Scenarios

```tsx
<ScenariosLayout scenarios={scenarios}>
    {({inverse, ...props}) => (
        <View
            {...props}
            style={{
                background: inverse
                    ? semanticColor.core.background.neutral.strong
                    : semanticColor.status.success.background,
                padding: spacing.medium_16,
                gap: spacing.medium_16,
            }}
        />
    )}
</ScenariosLayout>
```



---

## Related docs

- [Overview](overview.md)
- [Action Styles](action-styles.md)
- [Action Styles Action Styles All Variants](action-styles-action-styles-all-variants.md)
