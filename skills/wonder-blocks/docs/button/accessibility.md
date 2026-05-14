## Accessibility

### Labeling

`Button` has an accessible label by default. The accessible name is computed from
the `children` prop. However, `aria-label` should be used when `spinner={true}`
to let people using screen readers that the action taken by clicking the button
will take some time to complete.

This is an example of a component with an accessible label:

```tsx
<View>
    <Button spinner={true} aria-label="The action is being saved...">
        Label
    </Button>
</View>
```

### Disabled state

When the `disabled` prop is set, the `aria-disabled` attribute will be set.
By using `aria-disabled` instead of the `disabled` attribute, the element
will remain focusable and will be included in the tab order.

When it is in a disabled state, the component will have disabled styling and
cannot be pressed.

```tsx
<View
    style={{
        flexDirection: "row",
    }}
>
    <Button
        style={styles.button}
        // eslint-disable-next-line no-console
        onClick={(e) => console.log("Hello, world!")}
        disabled={true}
    >
        Primary
    </Button>
    <Button
        style={styles.button}
        href={"/foo"}
        kind="secondary"
        disabled={true}
    >
        Secondary
    </Button>
    <Button
        style={styles.button}
        // eslint-disable-next-line no-console
        onClick={(e) => console.log("Hello, world!")}
        kind="tertiary"
        disabled={true}
    >
        Tertiary
    </Button>
</View>
```

### References

* [Implicit ARIA semantics](https://www.w3.org/TR/wai-aria-1.1/#implicit_semantics)
* [Document conformance requirements](https://www.w3.org/TR/html-aria/#document-conformance-requirements-for-use-of-aria-attributes-in-html)

For more details, see the [Accessibility section](https://www.w3.org/TR/wai-aria-practices-1.1/#button) in w3.org.


---

## Related docs

- [Overview](overview.md)
- [Activity Button](activity-button.md)
- [Best Practices](best-practices.md)
- [Button](button.md)
- [Navigation Callbacks](navigation-callbacks.md)
