## Best Practices

### Layout

In vertical layouts, buttons will stretch horizontally to fill the available
space. This is probably not what you want unless you're on a very narrow
screen.

```tsx
<View>
    <Button>Label</Button>
</View>
```

This can be corrected by applying appropriate flex styles to the container.

```tsx
<View>
    <View style={styles.row}>
        <Button>Button in a row</Button>
    </View>
    <View style={styles.gap} />
    <View style={styles.column}>
        <Button>Button in a column</Button>
    </View>
</View>
```

### Usign minWidth for internationalization

Layouts often specify a specific width of button. When implementing such designs
use `minWidth` instead of `width`. `minWidth` allows the button to resize to fit
the content whereas `width` does not. This is important for international sites
since sometimes strings for UI elements can be much longer in other languages.
Both of the buttons below have a "natural" width of `144px`. The one on the
right is wider but it accommodates the full string instead of wrapping it.

```tsx
<View style={styles.row}>
    <Button style={styles.buttonMinWidth} kind="secondary">
        label
    </Button>
    <Button style={styles.buttonMinWidth}>
        label in a different language
    </Button>
</View>
```

### Truncating text

If the parent container of the button doesn't have enough room to accommodate
the width of the button, the text will truncate. This should ideally never
happen, but it's sometimes a necessary fallback.

```tsx
<View
    style={{
        flexDirection: "row",
        width: 300,
    }}
>
    <Button style={styles.buttonMinWidth} kind="secondary">
        label
    </Button>
    <Button style={styles.buttonMinWidth}>
        label too long for the parent container
    </Button>
</View>
```


---

## Related docs

- [Overview](overview.md)
- [Accessibility](accessibility.md)
- [Activity Button](activity-button.md)
- [Button](button.md)
- [Navigation Callbacks](navigation-callbacks.md)
