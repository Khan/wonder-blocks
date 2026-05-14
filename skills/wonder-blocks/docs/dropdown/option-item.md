# OptionItem

> Package: `@khanacademy/wonder-blocks-dropdown`

---

## Default

The default option item with a `label` and an `onClick` handler. This is used
to trigger actions (if needed).

```tsx
<OptionItem label="Option Item" />
```

---

## Disabled

OptionItem can be `disabled`. This is used to indicate that the Option is not
available.

```tsx
<OptionItem label="Option Item" disabled />
```

---

## Custom Option Item

OptionItem can have more complex content, such as icons.
This can be done by passing in a `leftAccessory` and/or `rightAccessory`
prop. These can be any React node, and internally use the WB DetailCell
component to render.
If you need more control over the content, you can also use `subtitle1` and
`subtitle2` props. These can be any React node, and internally use the WB
`LabelSmall` component to render.

```tsx
<OptionItem label="Option Item" subtitle1={AccessoryMappings.badge} subtitle2="Subtitle 2" leftAccessory={<PhosphorIcon icon={IconMappings.calendar} size="medium" />} rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} size="medium" />} />
```

---

## Horizontal Rule

`horizontalRule` can be used to separate items within
SingleSelect/MultiSelect instances. It defaults to `none`, but can be set to
`inset` or `full-width` to add a horizontal rule at the bottom of the cell.

```tsx
<View style={styles.items}>
    <OptionItem
        label="full-width"
        horizontalRule="full-width"
    />
    <OptionItem label="inset" horizontalRule="inset" />
    <OptionItem label="none" />
    <OptionItem />
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Action Item](action-item.md)
- [Action Menu](action-menu.md)
- [Action Menu Accessibility](action-menu-accessibility.md)
- [Combobox](combobox.md)
- [Combobox Accessibility](combobox-accessibility.md)
- [Listbox](listbox.md)
- [Multi Select](multi-select.md)
- [Multi Select Accessibility](multi-select-accessibility.md)
- [Single Select](single-select.md)
- [Single Select Accessibility](single-select-accessibility.md)
