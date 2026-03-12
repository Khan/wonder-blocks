# Listbox

> Package: `@khanacademy/wonder-blocks-dropdown`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Array<OptionItemComponent>` | *required* | The list of items to display in the listbox. |
| `selectionType` | `"single" \| "multiple"` | *required* | Whether the use can select more than one option item. Defaults to |
| `value` | `MaybeValueOrValues` |  | The value of the currently selected items. |
| `onChange` | `(value: MaybeValueOrValues) => void` |  | Callback for when the selection changes. The value passed as an argument |
| `aria-label` | `string` |  | Provides a label for the listbox. |
| `aria-labelledby` | `string` |  | A reference to the element that describes the listbox. |
| `disabled` | `boolean` |  | Whether the listbox is disabled. |
| `id` | `string` |  | The unique identifier of the listbox element. |
| `loading` | `boolean` |  | TODO(WB-1678): Add async support to the listbox. |
| `style` | `StyleType` |  | Optional custom styles applied to the listbox container. |
| `tabIndex` | `number` |  | Includes the listbox in the page tab sequence. |
| `testId` | `string` |  | Test ID used for e2e testing. |

---

## Default

The default listbox with a list of items.
By default, the listbox is single-select and there are no selected items.
This means that the listbox is in uncontrolled mode.
To navigate the listbox, focus on it, then use the arrow keys. To select an
item, press `Enter` or `Space`.

```tsx
<Listbox>
  {items}
</Listbox>
```

---

## Single selection (Controlled)

`Listbox` can also be used in controlled mode. In this example, the selected
value is "pear". If another item is selected, the previously selected item is
deselected. This is the default selection type, and it is also set by
specifying value as a `string`.

```tsx
<Listbox
    value={value}
    onChange={setValue}
/>
```

---

## Multiple Selection

Listbox can also have multiple selection. This is set by adding
`selectionType="multiple"` and specifying `value` as an array of strings.

```tsx
<Listbox value={["pear", "grape"]} selectionType="multiple">
  {items}
</Listbox>
```

---

## Multiple selection (Controlled)

This example shows a controlled multi-select listbox with a default value of
"pear" and "grape".

```tsx
<Listbox
    selectionType="multiple"
    value={value}
    onChange={setValue}
/>
```

---

## Disabled

A listbox with a list of items that are all disabled.

```tsx
<Listbox disabled value="pear" />
```

---

## Using Aria Label

Aria attributes are used to describe the listbox. In this case, the listbox
will be announced as "Favorite fruit" by screen readers.

```tsx
<Listbox value="pear" aria-label="Favorite fruit">
  {items}
</Listbox>
```

---

## Custom Styles

The listbox element can use custom styles when needed. In this example, we
are passing a custom style to the listbox container, via the `style` prop.

```tsx
<Listbox value="pear">
  {items}
</Listbox>
```

---

## Single selection with custom OptionItems

This example illustrates how you can use the `OptionItem` component to
display a `listbox` with custom option items. Note that in this example, we
are using `leftAccessory` to display a custom icon for each option item,
`subtitle1` to optionally display a pill and `subtitle2` to display the
email.

```tsx
<Listbox aria-label="Profiles">
  {allProfilesWithPictures.map((user, index) => (
            <OptionItem
                key={user.id}
                value={user.id}
                horizontalRule="full-width"
                label={user.name}
                leftAccessory={user.picture}
                subtitle1={
                    index === 1 ? (
                        <StatusBadge label="New" kind="info" />
                    ) : undefined
                }
                subtitle2={user.email}
            />
        ))}
</Listbox>
```

---

## Multiple selection with custom OptionItems

This example illustrates how you can use the custom `OptionItem` component
with a multi-select `Listbox`.

```tsx
<Listbox selectionType="multiple" />
```



---

## Related docs

- [Overview](overview.md)
- [Action Item](action-item.md)
- [Action Menu](action-menu.md)
- [Action Menu Accessibility](action-menu-accessibility.md)
- [Combobox](combobox.md)
- [Combobox Accessibility](combobox-accessibility.md)
- [Multi Select](multi-select.md)
- [Multi Select Accessibility](multi-select-accessibility.md)
- [Option Item](option-item.md)
- [Single Select](single-select.md)
- [Single Select Accessibility](single-select-accessibility.md)
