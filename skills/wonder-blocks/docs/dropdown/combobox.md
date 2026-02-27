# Combobox

> Package: `@khanacademy/wonder-blocks-dropdown`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Array<OptionItemComponent>` | *required* | The list of items to display in the listbox. |
| `selectionType` | `"single" \| "multiple"` | *required* | Whether the use can select more than one option item. Defaults to |
| `value` | `MaybeValueOrValues` | *required* | The value of the currently selected items. |
| `onChange` | `(value: MaybeValueOrValues) => void` |  | Callback for when the selection changes. The value passed as an argument |
| `disabled` | `boolean` |  | Whether the combobox is disabled. |
| `error` | `boolean` |  | Whether this component is in an error state. |
| `id` | `string` |  | The unique identifier of the combobox element. |
| `labels` | `ComboboxLabels` |  | The object containing the custom labels used inside this component. |
| `loading` | `boolean` |  | TODO(WB-1678): Add async support to the listbox. |
| `opened` | `boolean` |  | Can be used to programmatically control the opening of the listbox. |
| `onToggle` | `(opened: boolean) => void` |  | In controlled mode, use this prop in case the parent needs to be notified |
| `placeholder` | `string` |  | Text that provides context for the user when there are no items selected. |
| `style` | `StyleType` |  | Custom styles to add to the combobox element (input). |
| `testId` | `string` |  | Test ID used for e2e testing. |
| `autoComplete` | `"none" \| "list" \| undefined` |  | Indicates whether inputting text could trigger display of one or more |
| `startIcon` | `React.ReactElement \| null` |  | An optional decorative icon to display at the start of the combobox. |

---

## Default

The default Combobox with a list of items.

```tsx
<Combobox
    selectionType="single"
    key={prevSelectionTypeRef.current}
    value={value}
    onChange={(newValue) => {
        updateArgs({value: newValue});
    }}
/>
```

---

## Combobox with single selection

Combobox supports by default single selection. This means that only one
element can be selected from the listbox at a time. In this example, we show
how this is done by setting a state variable in the parent component.

```tsx
<Combobox value="pear">
  {items}
</Combobox>
```

---

## Single selection (Controlled input)

`Combobox` can also be used in controlled mode. In this example, the selected
value is "pear". If another item is selected, the previously selected item is
deselected. This is the default selection type, and it is also set by
specifying value as a `string`.

```tsx
<Combobox
    value={value}
    onChange={setValue}
/>
```

---

## Controlled Combobox (opened state)

`Combobox` can work as a controlled component. This can be done by setting a
value to the `opened` prop (`true` or `false`). In this case, the parent is
responsible for managing the opening/closing of the listbox when using this
prop.
This means that you'll also have to update `opened` to the value triggered by
the `onToggle` prop.

```tsx
<View style={{gap: sizing.size_160}}>
    <Checkbox label="Open" onChange={setOpened} checked={opened} />
    <Combobox
        opened={opened}
        onToggle={() => {
            setOpened(!opened);
        }}
        onChange={setValue}
        value={value}
    />
</View>
```

---

## Disabled

A Combobox can be disabled. When disabled, the Combobox cannot be interacted
with.

```tsx
<Combobox disabled value="pear" />
```

---

## Multiple Selection

Combobox supports multiple selection. This means that more than one element
can be selected from the listbox at a time. In this example, we show how this
is done by using an array of strings as the value and setting the
`selectionType` prop to "multiple".
To navigate using the keyboard, use:
- Arrow keys (`up`, `down`) to navigate through the listbox.
- `Enter` to select an item.
- Arrow keys (`left`, `right`) to navigate through the selected items.

```tsx
<Combobox
    selectionType="multiple"
    value={value}
    onChange={setValue}
/>
```

---

## Controlled Multi-select Combobox (opened state)

This example shows how to use the multi-select `Combobox` component in
controlled mode.

```tsx
<Combobox
    selectionType="multiple"
    testId="test-combobox"
    opened={opened}
    onToggle={() => {
        setOpened(!opened);
    }}
    onChange={setValue}
    value={value}
/>
```

---

## Autocomplete

`Combobox` supports autocompletion. This means that the listbox will show
options that match the user's input. Note that the search is case-insensitive
and it will match any part of the option item's label. This is useful when
using custom option items that could contain Typography components or other
elements.
In this example, we show how this is done by setting the `autoComplete` prop
to "list".

```tsx
<Combobox placeholder="Type to search" autoComplete="list">
  {items}
</Combobox>
```

---

## Autocomplete (Multi-select)

Below you can see an example of a multi-select `Combobox` with custom option
items and autocompletion. This means that the listbox will show options that
match the user's input.
**NOTE:** If you want to use a custom Typography component in the option
label, you'll need to set the `labelAsText` prop to the text you want to
search for.

```tsx
<Combobox placeholder="Type to search" autoComplete="list" selectionType="multiple">
  {customItems}
</Combobox>
```

---

## Error

This `Combobox` is in an error state. Selecting any option will clear the
error state by updating the `error` prop to `false`.
**NOTE:** We internally apply the correct `aria-invalid` attribute based on
the `error` prop.

```tsx
<Combobox
    error={error}
    value={value}
    onChange={(newValue) => {
        setValue(newValue);
        setError(newValue !== "" ? false : true);
    }}
/>
```

---

## Start Icon

With `startIcon`, you can customize the icon that appears at the beginning of
the Combobox. This is useful when you want to add a custom icon to the
component.
**NOTE:** When `startIcon` is set, we set some default values for the icon:
- `size`: "small"
- `color`: `semanticColor.core.foreground.neutral.default`
You can customize the size and color of the icon by passing the `size` and
`color` props to the `PhosphorIcon` component.

```tsx
<View style={{gap: sizing.size_160}}>
    <BodyText>With default size and color:</BodyText>
    <Combobox
        startIcon={<PhosphorIcon icon={magnifyingGlassIcon} />}
        onChange={(newValue) => {
            updateArgs({value: newValue});
        }}
    />
    <BodyText>With custom size:</BodyText>
    <Combobox
        startIcon={
            <PhosphorIcon
                icon={magnifyingGlassIcon}
                size="medium"
            />
        }
        onChange={(newValue) => {
            updateArgs({value: newValue});
        }}
    />
    <BodyText>With custom color:</BodyText>
    <Combobox
        startIcon={
            <PhosphorIcon
                icon={magnifyingGlassIcon}
                size="small"
                color={
                    semanticColor.core.foreground.instructive.strong
                }
            />
        }
        onChange={(newValue) => {
            updateArgs({value: newValue});
        }}
    />
    <BodyText>Disabled (overrides color prop):</BodyText>
    <Combobox
        startIcon={
            <PhosphorIcon
                icon={magnifyingGlassIcon}
                size="small"
                color={
                    semanticColor.core.foreground.instructive.strong
                }
            />
        }
        disabled={true}
        onChange={(newValue) => {
            updateArgs({value: newValue});
        }}
    />
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Action Item](action-item.md)
- [Action Menu](action-menu.md)
- [Action Menu Accessibility](action-menu-accessibility.md)
- [Combobox Accessibility](combobox-accessibility.md)
- [Listbox](listbox.md)
- [Multi Select](multi-select.md)
- [Multi Select Accessibility](multi-select-accessibility.md)
- [Option Item](option-item.md)
- [Single Select](single-select.md)
- [Single Select Accessibility](single-select-accessibility.md)
