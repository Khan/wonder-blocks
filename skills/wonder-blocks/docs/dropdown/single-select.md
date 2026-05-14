# SingleSelect

---

## Default

```tsx
<SingleSelect
    error={false}
    isFilterable
    disabled={false}
    readOnly={false}
    placeholder="Choose a fruit"
    aria-label={"Fruit"}
    onChange={setSelectedValue}
    selectedValue={selectedValue}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</SingleSelect>
```

---

## With Initial Value

This example demonstrates how SingleSelect behaves with an initial value.
The screen reader will not announce the initial value on mount, but will
announce when the value changes through user interaction.

```tsx
<SingleSelect
    error={false}
    isFilterable
    disabled={false}
    readOnly={false}
    placeholder="Choose a fruit"
    aria-label={"Fruit"}
    onChange={setSelectedValue}
    selectedValue={selectedValue}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</SingleSelect>
```

---

## With Labeled Field

The field can be used with the LabeledField component to provide a label,
description, required indicator, and/or error message for the field.
Using the field with the LabeledField component will ensure that the field
has the relevant accessibility attributes set.

```tsx
<LabeledField
    error={false}
    isFilterable
    opened={false}
    disabled={false}
    readOnly={false}
    aria-label="Fruit"
    placeholder="Choose a fruit"
    label="Label"
    field={
        <SingleSelect
            selectedValue={value}
            onChange={setValue}
            onValidate={setErrorMessage}
            required={true}
        >
            {optionItems}
        </SingleSelect>
    }
    description="Description"
    errorMessage={errorMessage}
    contextLabel="required"
/>
```

---

## Controlled (opened)

Sometimes you'll want to trigger a dropdown programmatically. This can be
done by setting a value to the `opened` prop (`true` or `false`). In this
situation the `SingleSelect` is a controlled component. The parent is
responsible for managing the opening/closing of the dropdown when using this
prop.
This means that you'll also have to update `opened` to the value triggered by
the `onToggle` prop.

```tsx
<ControlledOpenedWrapper error={false} isFilterable opened={false} disabled={false} readOnly={false} aria-label="Fruit" placeholder="Choose a fruit" selectedValue="" />
```

---

## Long Option Labels

If the label for the opener or the OptionItem(s) is longer than its bounding
box, it will be truncated with an ellipsis at the end.

```tsx
<SingleSelect
    error={false}
    isFilterable
    disabled={false}
    readOnly={false}
    aria-label="Fruit"
    onChange={setSelectedValue}
    selectedValue={selectedValue}
    opened={opened}
    onToggle={setOpened}
    placeholder="Fruit placeholder is also long"
    style={smallWidthStyle}
>
    <OptionItem
        label="Bananas are the most amazing fruit I've ever had in my entire life."
        value="banana"
        key={0}
        style={smallWidthStyle}
    />
    <OptionItem
        label="Strawberries are the most amazing fruit I've ever had in my entire life."
        value="strawberry"
        disabled
        key={1}
        style={smallWidthStyle}
    />
    <OptionItem
        label="Pears are the most amazing fruit I've ever had in my entire life."
        value="pear"
        key={2}
        style={smallWidthStyle}
    />
    <OptionItem
        label="Oranges are the most amazing fruit I've ever had in my entire life."
        value="orange"
        key={3}
        style={smallWidthStyle}
    />
    <OptionItem
        label="Watermelons are the most amazing fruit I've ever had in my entire life."
        value="watermelon"
        key={4}
        style={smallWidthStyle}
    />
    <OptionItem
        label="Apples are the most amazing fruit I've ever had in my entire life."
        value="apple"
        key={5}
        style={smallWidthStyle}
    />
    <OptionItem
        label="Grapes are the most amazing fruit I've ever had in my entire life."
        value="grape"
        key={6}
        style={smallWidthStyle}
    />
    <OptionItem
        label="Lemons are the most amazing fruit I've ever had in my entire life."
        value="lemon"
        key={7}
        style={smallWidthStyle}
    />
    <OptionItem
        label="Mangos are the most amazing fruit I've ever had in my entire life."
        value="mango"
        key={8}
        style={smallWidthStyle}
    />
</SingleSelect>
```

---

## Disabled

`SingleSelect` can be disabled by passing `disabled={true}`. This can be
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
        error={false}
        isFilterable
        opened={false}
        readOnly={false}
        aria-label="Fruit"
        label="Disabled prop is set to true"
        field={
            <SingleSelect
                placeholder="Choose a fruit"
                onChange={() => {}}
                selectedValue=""
                disabled={true}
            >
                {items}
            </SingleSelect>
        }
    />
    <LabeledField
        label="No items"
        field={
            <SingleSelect
                placeholder="Choose a fruit"
                onChange={() => {}}
            />
        }
    />
    <LabeledField
        label="All items are disabled"
        field={
            <SingleSelect
                placeholder="Choose a fruit"
                onChange={() => {}}
            >
                <OptionItem label="Apple" value="1" disabled={true} />
                <OptionItem label="Orange" value="2" disabled={true} />
            </SingleSelect>
        }
    />
</View>
```

---

## Read Only

A SingleSelect can be set to read-only by passing `readOnly` to `true`.
When `true`, read-only styling is applied and the aria-disabled attribute is
set to "true". A user won't be able to open the dropdown or change the
selected value.
We recommend using the SingleSelect with `LabeledField`. The
`readOnlyMessage` prop in `LabeledField` can be set so that users know why
the field is marked as read only.
Note: We set `aria-disabled` instead of `aria-readonly` due to low
browser + screen reader support for `aria-readonly`.

```tsx
<LabeledField
    error={false}
    isFilterable
    opened={false}
    disabled={false}
    aria-label="Fruit"
    label="Example Label"
    field={
        <SingleSelect
            placeholder="Choose a fruit"
            readOnly={true}
            onChange={setSelectedValue}
            selectedValue={selectedValue}
        >
            {items}
        </SingleSelect>
    }
    readOnlyMessage="Message about why it is read only"
/>
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
    error
    isFilterable
    disabled={false}
    readOnly={false}
    aria-label="Fruit"
    label={label || "SingleSelect"}
    errorMessage={
        errorMessage || (true && "Error from error prop")
    }
    field={
        <SingleSelect
            opened={opened}
            onToggle={setOpened}
            selectedValue={selectedValue}
            onChange={setSelectedValue}
            placeholder="Choose a fruit"
            validate={(value) => {
                if (value === "lemon") {
                    return "Pick another option!";
                }
            }}
            onValidate={setErrorMessage}
        >
            {items}
        </SingleSelect>
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
    error={false}
    isFilterable
    disabled={false}
    readOnly={false}
    aria-label="Fruit"
    required="Custom required error message"
    label={label || "SingleSelect"}
    errorMessage={
        errorMessage || (false && "Error from error prop")
    }
    field={
        <SingleSelect
            opened={opened}
            onToggle={setOpened}
            selectedValue={selectedValue}
            onChange={setSelectedValue}
            placeholder="Choose a fruit"
            validate={(value) => {
                if (value === "lemon") {
                    return "Pick another option!";
                }
            }}
            onValidate={setErrorMessage}
        >
            {items}
        </SingleSelect>
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
- When an option is selected
Validation errors are cleared when a valid value is selected. The component
will set aria-invalid to "false" and call the onValidate prop with null.

```tsx
<View style={{gap: sizing.size_240}}>
    <ControlledSingleSelect
        error={false}
        isFilterable
        opened={false}
        disabled={false}
        readOnly={false}
        aria-label="Fruit"
        placeholder="Choose a fruit"
        label="Validation example (try picking lemon to trigger an error)"
        validate={(value) => {
            if (value === "lemon") {
                return "Pick another option!";
            }
        }}
    >
        {items}
    </ControlledSingleSelect>
    <ControlledSingleSelect
        label="Validation example (on mount)"
        validate={(value) => {
            if (value === "lemon") {
                return "Pick another option!";
            }
        }}
        selectedValue="lemon"
    >
        {items}
    </ControlledSingleSelect>
</View>
```

---

## Two With Text

This story has two selects nested inline within text.

```tsx
<div>
    Here is some text to nest the dropdown
    <SingleSelect
        error={false}
        isFilterable
        disabled={false}
        readOnly={false}
        aria-label="Fruit"
        placeholder="Choose a fruit"
        onChange={setSelectedValue}
        selectedValue={selectedValue}
        opened={opened}
        onToggle={setOpened}
        style={{display: "inline-block"}}
    >
        {[...items, <OptionItem label="" value="" key={9} />]}
    </SingleSelect>
    . And here is more text to compare!
    <SingleSelect
        onChange={setSecondSelectedValue}
        selectedValue={secondSelectedValue}
        opened={secondOpened}
        onToggle={setSecondOpened}
        style={{display: "inline-block"}}
    >
        {[...items, <OptionItem label="" value="" key={9} />]}
    </SingleSelect>
</div>
```

---

## Virtualized (isFilterable:true, enableTypeAhead:false)

When there are many options, you could use a search filter in the
SingleSelect. The search filter will be performed toward the labels of the
option items. Note that this example shows how we can add custom styles to
the dropdown as well.

```tsx
<VirtualizedSingleSelect enableTypeAhead={false} selectedValue={"ZW"} />
```

---

## Virtualized (isFilterable:true, enableTypeAhead:true)

When there are many options, you could use a search filter in the
SingleSelect. The search filter will be performed toward the labels of the
option items. The enableTypeAhead will focus on the first dropdown item
whose label starts with the search filter.
Note that this example shows how we can add custom styles to the dropdown
as well.

```tsx
<VirtualizedSingleSelect enableTypeAhead={true} />
```

---

## Virtualized (opened)

This example shows how to use the `opened` prop to open the dropdown.

```tsx
<VirtualizedSingleSelect opened={true} />
```

---

## Virtualized (opened, no selection)

This example shows how the focus is set to the search field if there's no
current selection.

```tsx
<VirtualizedSingleSelect opened={true} selectedValue={null} />
```

---

## Dropdown in a modal

Sometimes we want to include Dropdowns inside a Modal, and these controls can
be accessed only by scrolling down. This example help us to demonstrate that
`SingleSelect` components can correctly be displayed within the visible
scrolling area.

```tsx
<View style={styles.centered}>
    <ModalLauncher modal={modal}>
        {({openModal}) => (
            <Button onClick={openModal}>Click here!</Button>
        )}
    </ModalLauncher>
</View>
```

---

## With custom opener

In case you need to use a custom opener with the `SingleSelect`, you can use
the opener property to achieve this. In this example, the opener prop accepts
a function with the following arguments:
 - `eventState`: lets you customize the style for different states, such as
   pressed, hovered and focused.
 - `text`: Passes the menu label defined in the parent component. This value
  is passed using the placeholder prop set in the `SingleSelect` component.
 - `opened`: Whether the dropdown is opened.
**Note:** If you need to use a custom ID for testing the opener, make sure to
pass the testId prop inside the opener component/element.
**Accessibility:** When a custom opener is used, the following attributes are
added automatically: `aria-expanded`, `aria-haspopup`, and `aria-controls`.

```tsx
<SingleSelect
    error={false}
    isFilterable
    disabled={false}
    readOnly={false}
    placeholder="Choose a fruit"
    aria-label={"Fruit"}
    onChange={setSelectedValue}
    selectedValue={selectedValue}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</SingleSelect>
```

---

## Right to Left

When in the right-to-left direction, the single select is mirrored.

---

## Custom Labels

This example illustrates how you can pass custom labels to the `SingleSelect`
component.

```tsx
<View style={styles.wrapper}>
    <SingleSelect
        error={false}
        disabled={false}
        readOnly={false}
        aria-label="Fruta"
        isFilterable={true}
        onChange={setValue}
        selectedValue={value}
        labels={translatedLabels}
        opened={opened}
        onToggle={setOpened}
        placeholder="Selecciona una fruta"
    >
        {translatedItems}
    </SingleSelect>
</View>
```

---

## Auto Focus Disabled

This example illustrates how you can disable the auto focus of the
`SingleSelect` component. Note that for this example, we are using a
`TextField` component as a custom opener to ilustrate how the focus remains
on the opener.
**Note:** We also disabled the `enableTypeAhead` prop to be able to use the
textbox properly.

```tsx
<View style={styles.wrapper}>
    <SingleSelect
        error={false}
        isFilterable
        disabled={false}
        readOnly={false}
        aria-label="Fruit"
        autoFocus={false}
        enableTypeAhead={false}
        onChange={setValue}
        selectedValue={value}
        opened={opened}
        onToggle={setOpened}
        placeholder="Choose a time"
        opener={({focused, hovered, pressed, text}) => (
            <View style={styles.row}>
                <TextField
                    placeholder="Choose a time"
                    id="single-select-opener"
                    onChange={setValue}
                    value={value ?? ""}
                    ref={textFieldRef}
                    autoComplete="off"
                    style={styles.fullBleed}
                />
                <PhosphorIcon
                    color={semanticColor.status.notice.foreground}
                    icon={IconMappings.clockBold}
                    size="small"
                    style={styles.icon}
                />
            </View>
        )}
    >
        {timeSlotOptions}
    </SingleSelect>
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
<View style={styles.wrapper}>
    <SingleSelect
        error={false}
        isFilterable
        disabled={false}
        readOnly={false}
        aria-label="Profile"
        placeholder="Select a profile"
        onChange={handleChange}
        selectedValue={selectedValue}
        onToggle={handleToggle}
        opened={opened}
    >
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
    </SingleSelect>
</View>
```

---

## Custom Option Item With Node Label

This example illustrates how a JSX Element can appear as the label if
`labelAsText` is undefined. Note that in this example, we define `labelAsText`
on the OptionItems to ensure that filtering works correctly.

```tsx
<View style={styles.wrapper}>
    <SingleSelect
        error={false}
        disabled={false}
        readOnly={false}
        aria-label="Currency"
        placeholder="Select your currency"
        onChange={handleChange}
        selectedValue={selectedValue}
        onToggle={handleToggle}
        opened={opened}
        showOpenerLabelAsText={false}
        isFilterable={true}
    >
        {currencies.map((currency, index) => (
            <OptionItem
                key={index}
                value={String(index)}
                horizontalRule="full-width"
                label={
                    <span>
                        <PhosphorIcon
                            icon={currency.icon}
                            size={"small"}
                        />
                        {currency.name}
                    </span>
                }
                labelAsText={currency.name}
            />
        ))}
    </SingleSelect>
</View>
```

---

## Custom option items (virtualized)

This example illustrates how you can use the `OptionItem` component to
display a virtualized list with custom option items. Note that in this
example, we are using `leftAccessory` to display a custom icon for each
option item.
**Note:** The virtualized version doesn't support custom option items with
multiple lines at the moment. This is a known issue and we are working on
fixing it.

```tsx
<SingleSelect
    error={false}
    disabled={false}
    readOnly={false}
    aria-label="Country"
    placeholder="Select a country"
    isFilterable={true}
    onChange={handleChange}
    selectedValue={selectedValue}
    onToggle={handleToggle}
    opened={opened}
>
    {allCountries.map(([code, translatedName]) => (
        <OptionItem
            key={code}
            value={code}
            label={translatedName}
            leftAccessory={
                <PhosphorIcon
                    icon={planetIcon}
                    role="img"
                    size="medium"
                    aria-hidden={true}
                />
            }
        />
    ))}
</SingleSelect>
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
- [Option Item](option-item.md)
- [Single Select Accessibility](single-select-accessibility.md)
