# PopoverContentCore

> Package: `@khanacademy/wonder-blocks-popover`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | *required* | The content to render inside the popover. |
| `closeButtonLight` | `boolean` |  | Close button color |
| `closeButtonLabel` | `string` |  | Close button label for use in screen readers |
| `closeButtonVisible` | `boolean` |  | When true, the close button is shown; otherwise, the close button is not shown. |
| `style` | `StyleType` |  | Custom styles applied to the content container |
| `testId` | `string` |  | Test ID used for e2e testing. |

---

## With Icon

```tsx
<PopoverContentCore closeButtonVisible />
```

---

## With Detail Cell

Popovers can also benefit from other Wonder Blocks components. In this
example, we are using the `DetailCell` component embedded as part of the
popover contents.

```tsx
<PopoverContentCore />
```



---

## Related docs

- [Popover](popover.md)
- [Popover Accessibility](popover-accessibility.md)
- [Popover Content](popover-content.md)
