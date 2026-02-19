# NavigationTabItem

> Package: `@khanacademy/wonder-blocks-tabs`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactElement \| ((linkProps: NavigationTabItemLinkProps) => React.ReactElement)` | *required* | The `Link` to render for the navigation tab item. |
| `id` | `string` |  | An id for the root element. |
| `testId` | `string` |  | Optional test ID for e2e testing. |
| `current` | `boolean` |  | If the `NavigationTabItem` is the current page. If `true`, current |
| `style` | `StyleType` |  | Custom styles for overriding default styles. For custom link styling, |

---

## Default

```tsx
<NavigationTabItem>
  {<Link href="#link">Navigation tab item</Link>}
</NavigationTabItem>
```

---

## Custom Style

Custom styles can be set for the NavigationTabItem.
For custom link styling, prefer applying the styles to the `Link` component.
Note: The `NavigationTabItem` will also set styles to the `Link` child
component.
If there is a specific use case where the styling needs to be
overridden, please reach out to the Wonder Blocks team!

```tsx
<NavigationTabItem>
  {<Link href="#link">Navigation tab item</Link>}
</NavigationTabItem>
```



---

## Related docs

- [Overview](overview.md)
- [Responsive Navigation Tabs](responsive-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs](responsive-navigation-tabs-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs Accessibility](responsive-navigation-tabs-navigation-tabs-accessibility.md)
- [Responsive Navigation Tabs Navigation Tabs Dropdown](responsive-navigation-tabs-navigation-tabs-dropdown.md)
- [Responsive Tabs](responsive-tabs.md)
- [Responsive Tabs Tabs](responsive-tabs-tabs.md)
- [Responsive Tabs Tabs Accessibility](responsive-tabs-tabs-accessibility.md)
- [Responsive Tabs Tabs Dropdown](responsive-tabs-tabs-dropdown.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
