# ClickableBehavior

---

## Default

```tsx
<ClickableBehavior role="button">
    {(state, childrenProps) => {
        const {pressed, hovered, focused} = state;
        return (
            <View
                disabled={false}
                style={[
                    styles.clickable,
                    hovered && styles.hover,
                    focused && styles.focus,
                    pressed && styles.press,
                ]}
                {...childrenProps}
            >
                This is an element wrapped with ClickableBehavior
            </View>
        );
    }}
</ClickableBehavior>
```

---

## Wrapping Button

This is an example of a `<ClickableBehavior>` wrapping a button. Since
buttons have a built in tabIndex, a tabIndex does not need to be added to
`<ClickableBehavior>` here.

```tsx
<ClickableBehavior>
    {(state, childrenProps) => {
        const {pressed, hovered, focused} = state;
        return (
            <StyledButton
                disabled={false}
                style={[
                    styles.clickable,
                    styles.newButton,
                    hovered && styles.hover,
                    focused && styles.focus,
                    pressed && styles.press,
                ]}
                {...childrenProps}
            >
                This is an element wrapped with ClickableBehavior
            </StyledButton>
        );
    }}
</ClickableBehavior>
```

---

## With Tab Index

```tsx
<ClickableBehavior role="button" tabIndex={0}>
    {(state, childrenProps) => {
        const {pressed, hovered, focused} = state;
        return (
            <View
                disabled={false}
                style={[
                    styles.clickable,
                    hovered && styles.hover,
                    focused && styles.focus,
                    pressed && styles.press,
                ]}
                {...childrenProps}
            >
                This is an element wrapped with ClickableBehavior
            </View>
        );
    }}
</ClickableBehavior>
```



---

## Related docs

- [Clickable](clickable.md)
- [Clickable Accessibility](clickable-accessibility.md)
