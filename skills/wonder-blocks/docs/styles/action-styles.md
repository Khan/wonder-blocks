# Action Styles

---

## inverse

A style that can be applied to interactive elements on inverse backgrounds.
This is used for special cases where the element is on a dark background.
In the example below, the `inverse` style is applied to WB components along
with a `button` element.

```tsx
<>
    <IconButton
        kind="primary"
        icon={info}
        style={actionStyles.inverse}
        aria-label="Primary info button"
    />
    <IconButton
        kind="secondary"
        icon={info}
        style={actionStyles.inverse}
        aria-label="Secondary info button"
    />
    <IconButton
        kind="tertiary"
        icon={info}
        style={actionStyles.inverse}
        aria-label="Tertiary info button"
    />
    <IconButton
        kind="primary"
        disabled
        icon={info}
        style={actionStyles.inverse}
        aria-label="Disabled primary info button"
    />

    <Clickable onClick={() => {}} style={actionStyles.inverse}>
        {() => "Clickable component"}
    </Clickable>

    <StyledButton
        style={[
            {
                border: `${border.width.thin} solid ${semanticColor.core.border.critical.default}`,
                backgroundColor:
                    semanticColor.core.background.critical.default,
                color: semanticColor.status.success.background,
            },
            actionStyles.inverse,
        ]}
    >
        Custom button
    </StyledButton>

    <Button kind="primary" style={actionStyles.inverse}>
        Primary button
    </Button>
    <Button kind="secondary" style={actionStyles.inverse}>
        Secondary button
    </Button>
    <Button kind="tertiary" style={actionStyles.inverse}>
        Tertiary button
    </Button>

    <Link href="#test" style={actionStyles.inverse}>
        Link component
    </Link>
</>
```



---

## Related docs

- [Overview](overview.md)
- [Action Styles Action Styles All Variants](action-styles-action-styles-all-variants.md)
- [Focus Styles](focus-styles.md)
