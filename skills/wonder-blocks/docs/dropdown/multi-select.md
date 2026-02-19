# MultiSelect

---

## Default

```tsx
<MultiSelect
    isFilterable={false}
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label={"Planets"}
    onChange={setSelectedValues}
    selectedValues={selectedValues}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</MultiSelect>
```

---

## Student Multi Select

This example demonstrates a StudentMultiSelect with all students initially selected.
The screen reader will not announce the initial values on mount, but will
announce when values change through user interaction.

```tsx
<MultiSelect
    error={false}
    disabled={false}
    readOnly={false}
    implicitAllEnabled={false}
    testId=""
    aria-label="Students"
    id="students-multiselect"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
    shortcuts={true}
    isFilterable={true}
    labels={studentLabels}
    opened={opened}
    onToggle={setOpened}
>
    {studentData.map((student) => (
        <OptionItem
            key={student.kaid}
            label={student.coachNickname}
            value={student.kaid}
        />
    ))}
</MultiSelect>
```

---

## With Labeled Field

The field can be used with the LabeledField component to provide a label,
description, required indicator, and/or error message for the field.
Using the field with the LabeledField component will ensure that the field
has the relevant accessibility attributes set.

```tsx
<LabeledField
    isFilterable={false}
    error={false}
    opened={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label="Planets"
    label="Label"
    field={
        <MultiSelect
            selectedValues={value}
            onChange={setValue}
            onValidate={setErrorMessage}
            required={true}
        >
            {optionItems}
        </MultiSelect>
    }
    description="Description"
    errorMessage={errorMessage}
    contextLabel="required"
/>
```

---

## Controlled (opened)

Sometimes you'll want to trigger a dropdown programmatically. This can be
done by `MultiSelect` is a controlled component. The parent is responsible
for managing the opening/closing of the dropdown when using this prop.
This means that you'll also have to update `opened` to the value triggered by
the `onToggle` prop.

```tsx
<ControlledWrapper isFilterable={false} error={false} opened={false} disabled={false} readOnly={false} shortcuts={false} implicitAllEnabled={false} id="" testId="" aria-label="Planets" />
```

---

## Custom Styles

Sometimes, we may want to customize the dropdown style (for example, to limit
the height of the list). For this purpose, we have the `dropdownStyle` prop.
**NOTE:** We are overriding the max height of the dropdown in this example
but we recommend letting the dropdown calculate its own height, as we already
have a max height set for the dropdown internally.

```tsx
<MultiSelect
    isFilterable={false}
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label={"Planets"}
    onChange={setSelectedValues}
    selectedValues={selectedValues}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</MultiSelect>
```

---

## Custom styles (opened)

Here you can see an example of the previous dropdown opened.

```tsx
<MultiSelect
    isFilterable={false}
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label={"Planets"}
    onChange={setSelectedValues}
    selectedValues={selectedValues}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</MultiSelect>
```

---

## Error

If the `error` prop is set to true, the field will have error styling and
`aria-invalid` set to `true`.
This is useful for scenarios where we want to show an error on a
specific field after a form is submitted (server validation).
Note: The `required` and `validate` props can also put the field in an
error state.

```tsx
<LabeledField
    isFilterable={false}
    error
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label="Planets"
    label={label || "MultiSelect"}
    errorMessage={
        errorMessage || (true && "Error from error prop")
    }
    field={
        <MultiSelect
            opened={opened}
            onToggle={setOpened}
            selectedValues={selectedValues}
            onChange={setSelectedValues}
            validate={(values) => {
                if (values.includes("jupiter")) {
                    return "Don't pick jupiter!";
                }
            }}
            onValidate={setErrorMessage}
        >
            {items}
        </MultiSelect>
    }
/>
```

---

## Required

A required field will have error styling and aria-invalid set to true if the
select is left blank.
When `required` is set to `true`, validation is triggered:
- When a user tabs away from the select (opener's onBlur event)
- When a user closes the dropdown without selecting a value
(either by pressing escape, clicking away, or clicking on the opener).
Validation errors are cleared when a valid value is selected. The component
will set aria-invalid to "false" and call the onValidate prop with null.

```tsx
<LabeledField
    isFilterable={false}
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label="Planets"
    required="Custom required error message"
    label={label || "MultiSelect"}
    errorMessage={
        errorMessage || (false && "Error from error prop")
    }
    field={
        <MultiSelect
            opened={opened}
            onToggle={setOpened}
            selectedValues={selectedValues}
            onChange={setSelectedValues}
            validate={(values) => {
                if (values.includes("jupiter")) {
                    return "Don't pick jupiter!";
                }
            }}
            onValidate={setErrorMessage}
        >
            {items}
        </MultiSelect>
    }
/>
```

---

## Error From Validation

If a selected value fails validation, the field will have error styling.
This is useful for scenarios where we want to show errors while a
user is filling out a form (client validation).
Note that we will internally set the correct `aria-invalid` attribute to the
field:
- aria-invalid="true" if there is an error.
- aria-invalid="false" if there is no error.
Validation is triggered:
- On mount if the `value` prop is not empty and it is not required
- When the dropdown is closed after updating the selected values
Validation errors are cleared when the value is updated. The component
will set aria-invalid to "false" and call the onValidate prop with null.

```tsx
<View style={{gap: sizing.size_240}}>
    <ControlledMultiSelect
        isFilterable={false}
        error={false}
        opened={false}
        disabled={false}
        readOnly={false}
        shortcuts
        implicitAllEnabled={false}
        id=""
        testId=""
        aria-label="Planets"
        label="Validation example (try picking jupiter)"
    >
        {items}
    </ControlledMultiSelect>
    <ControlledMultiSelect
        label="Validation example (on mount)"
        selectedValues={["jupiter"]}
    >
        {items}
    </ControlledMultiSelect>
</View>
```

---

## Shortcuts

This example starts with one item selected and has selection shortcuts for
select all and select none. This one does not have a predefined placeholder.

```tsx
<MultiSelect
    isFilterable={false}
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label={"Planets"}
    onChange={setSelectedValues}
    selectedValues={selectedValues}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</MultiSelect>
```

---

## Dropdown in a modal

Sometimes we want to include Dropdowns inside a Modal, and these controls can
be accessed only by scrolling down. This example help us to demonstrate that
`MultiSelect` components can correctly be displayed within the visible
scrolling area.

```tsx
<DropdownInModalWrapper isFilterable={false} error={false} opened={false} disabled={false} readOnly={false} shortcuts={false} implicitAllEnabled={false} id="" testId="" aria-label="Planets" />
```

---

## Disabled

`MultiSelect` can be disabled by passing `disabled={true}`. This can be
useful when you want to disable a control temporarily. It is also disabled
when:
- there are no items
- there are items and they are all disabled
Note: The `disabled` prop sets the `aria-disabled` attribute to `true`
instead of setting the `disabled` attribute. This is so that the component
remains focusable while communicating to screen readers that it is disabled.

```tsx
<View style={{gap: sizing.size_320}}>
    <LabeledField
        isFilterable={false}
        error={false}
        opened={false}
        readOnly={false}
        shortcuts={false}
        implicitAllEnabled={false}
        id=""
        testId=""
        aria-label="Planets"
        label="Disabled prop is set to true"
        field={
            <MultiSelect disabled={true} onChange={() => {}}>
                <OptionItem label="Mercury" value="1" />
                <OptionItem label="Venus" value="2" />
            </MultiSelect>
        }
    />
    <LabeledField
        label="No items"
        field={<MultiSelect onChange={() => {}} />}
    />

    <LabeledField
        label="All items are disabled"
        field={
            <MultiSelect onChange={() => {}}>
                <OptionItem label="Mercury" value="1" disabled={true} />
                <OptionItem label="Venus" value="2" disabled={true} />
            </MultiSelect>
        }
    />
</View>
```

---

## Read Only

A MultiSelect can be set to read-only by passing `readOnly` to `true`.
When `true`, read-only styling is applied and the aria-disabled attribute is
set to "true". A user won't be able to open the dropdown or change the
selected values.
We recommend using the MultiSelect with `LabeledField`. The
`readOnlyMessage` prop in `LabeledField` can be set so that users know why
the field is marked as read only.
Note: We set `aria-disabled` instead of `aria-readonly` due to low
browser + screen reader support for `aria-readonly`.
If it is expected that the user will select multiple values, consider using
a custom opener to display the selected values.

```tsx
<LabeledField
    isFilterable={false}
    error={false}
    opened={false}
    disabled={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label="Planets"
    field={
        <MultiSelect
            readOnly={true}
            onChange={setSelectedValue}
            selectedValues={selectedValue}
        >
            {items}
        </MultiSelect>
    }
    label="Example Label"
    readOnlyMessage="Message about why it is read only"
/>
```

---

## Implicit All Enabled

When nothing is selected, show the menu text as "All selected". Note that the
actual selection logic doesn't change. (Only the menu text)

```tsx
<MultiSelect
    isFilterable={false}
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label={"Planets"}
    onChange={setSelectedValues}
    selectedValues={selectedValues}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</MultiSelect>
```

---

## Virtualized (isFilterable)

When there are many options, you could use a search filter in the
`MultiSelect`. The search filter will be performed toward the labels of the
option items. Note that this example shows how we can add custom styles to
the dropdown as well.

```tsx
<VirtualizedMultiSelect opened={true} />
```

---

## With custom opener

In case you need to use a custom opener with the `MultiSelect`, you can use
the opener property to achieve this. In this example, the opener prop accepts
a function with the following arguments:
 - `eventState`: lets you customize the style for different states, such as
   pressed, hovered and focused.
 - `text`: Passes the menu value defined in the parent component. This value
 is passed using the placeholder prop set in the `MultiSelect` component.
 - `opened`: Whether the dropdown is opened.
**Note:** If you need to use a custom ID for testing the opener, make sure to
pass the testId prop inside the opener component/element.
**Accessibility:** When a custom opener is used, the following attributes are
added automatically: `aria-expanded`, `aria-haspopup`, and `aria-controls`.
With a custom opener, you are still responsible for labeling the `MultiSelect`
by wrapping it in a `<LabeledField>` or using `aria-label` on the parent component
to describe the purpose of the control. Because it is a combobox, the value
can't also be used for the label.

```tsx
<MultiSelect
    isFilterable={false}
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label={"Planets"}
    onChange={setSelectedValues}
    selectedValues={selectedValues}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</MultiSelect>
```

---

## Custom Labels

This example illustrates how you can pass custom labels to the MultiSelect
component.

```tsx
<View style={styles.wrapper}>
    <MultiSelect
        error={false}
        disabled={false}
        readOnly={false}
        implicitAllEnabled={false}
        id=""
        testId=""
        aria-label="Escuelas"
        shortcuts={true}
        isFilterable={true}
        onChange={setSelectedValues}
        selectedValues={selectedValues}
        labels={labels}
        opened={opened}
        onToggle={setOpened}
    >
        {translatedItems}
    </MultiSelect>
</View>
```

---

## Custom Option Items

Custom option items

This example illustrates how you can use the `OptionItem` component to
display a list with custom option items. Note that in this example, we are
using `leftAccessory` to display a custom icon for each option item,
`subtitle1` to optionally display a pill and `subtitle2` to display the
email.
**Note:** As these are custom option items, we strongly recommend to pass the
`labelAsText` prop to display a summarized label in the menu.

```tsx
<MultiSelect
    isFilterable={false}
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label="Users"
    onChange={handleChange}
    selectedValues={selectedValues}
    onToggle={handleToggle}
    opened={opened}
>
    {allProfilesWithPictures.map((user, index) => (
        <OptionItem
            key={user.id}
            value={user.id}
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
</MultiSelect>
```

---

## Custom Option Items With Node Label

This example illustrates how a JSX Element can appear as the label by setting
`showOpenerLabelAsText` to false. Note that in this example, we define
`labelAsText` on the OptionItems to ensure that filtering works correctly.

```tsx
<MultiSelect
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label="Languages"
    onChange={handleChange}
    selectedValues={selectedValues}
    onToggle={handleToggle}
    opened={opened}
    showOpenerLabelAsText={false}
    isFilterable={true}
>
    {locales.map((locale, index) => (
        <OptionItem
            key={index}
            value={String(index)}
            label={
                <span>
                    {chatIcon} {locale}
                </span>
            }
            labelAsText={locale}
        />
    ))}
</MultiSelect>
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
- [Multi Select Accessibility](multi-select-accessibility.md)
- [Option Item](option-item.md)
- [Single Select](single-select.md)
- [Single Select Accessibility](single-select-accessibility.md)
