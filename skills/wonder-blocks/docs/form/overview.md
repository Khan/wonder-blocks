# Form

`wonder-blocks-form` provides building blocks for Form components, including
TextField, TextArea, Choice, Checkbox, RadioButton, etc.

## Best Practices

### Form Field Labels

- Use form field components with the `LabeledField` component. `LabeledField`
provides a consistent pattern for things like the label,
description, required indicator, and error message for a field. It will also
provide unique ids automatically and wire up the proper attributes for
accessibility. Use `LabeledField` for the following components:
  - `TextField`
  - `TextArea`
  - `SingleSelect`
  - `MultiSelect`
  - `SearchField`
- If you are using the `CheckboxGroup` or `RadioGroup` components, use the
`label` prop for an accessible field label. This uses `<fieldset>` and
`<legend>` elements instead of a `<label>` since the label is for a group of
related controls. See [Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/)
for more details!
- For custom implementations of field labels:
  - Make sure the id of the form field element is unique to the page
  - When using Wonder Blocks typography components for the form field label,
  set the `tag` prop to `label` to change the underlying element to render and
  use the `htmlFor` prop. Here is an example of a form field label using Wonder
  Blocks components `LabelMedium` and `TextArea`:

```tsx
<View style={styles.container}>
    <LabelMedium tag="label" htmlFor="description-field">
        Description
    </LabelMedium>
    <TextArea
        value={value}
        onChange={(value) => setValue(value)}
        id="description-field"
    />
</View>
```

### Error Validation

- For fields like `TextField`, `TextArea`, and `SearchField` prefer setting
`instantValidation=false`. This makes it so validation occurs on blur after a
user is done interacting with a field.
- Avoid disabling form submission buttons. There could be exceptions if the
button is for one field.
- If there are errors after a form is submitted, programatically move the user's
focus to the first field with an error.
- Accessibility: When using a `<form>` element to wrap form fields, avoid using
event handlers (such as key events) directly on the `<form>` element since it
is non-interactive. To submit a form when the `Enter` key is pressed,
include a `Button` with `type="submit"` inside the form and handle submission
using the `onSubmit` prop on the `<form>` element. The "Enter to submit" functionality
is handled by the browser.

Here is an example of validation behaviour in a form. It validates when a
user is done filling out a field and also shows a validation error once
the form is submitted (this simulates a backend validation error). When the form
is submitted, the focus is also moved to the first field with an error.

```tsx
<StyledForm
    shouldValidateInStory
    showSubmitButtonInStory
    onSubmit={handleSubmit}
    style={{
        display: "flex",
        flexDirection: "column",
        gap: sizing.size_240,
    }}
>
    <LabeledField
        errorMessage={textFieldErrorMessage}
        label="Text Field"
        description={textDescription}
        field={
            <TextField
                ref={textFieldRef}
                value={textFieldValue}
                onChange={setTextFieldValue}
                onValidate={setTextFieldErrorMessage}
                validate={
                    shouldValidateInStory ? textValidate : undefined
                }
                instantValidation={false}
                disabled={disabled}
                required={required}
            />
        }
    />
    <LabeledField
        errorMessage={textAreaErrorMessage}
        label="Text Area"
        description={textDescription}
        field={
            <TextArea
                ref={textAreaRef}
                value={textAreaValue}
                onChange={setTextAreaValue}
                onValidate={setTextAreaErrorMessage}
                validate={
                    shouldValidateInStory ? textValidate : undefined
                }
                instantValidation={false}
                disabled={disabled}
                required={required}
            />
        }
    />

    <LabeledField
        errorMessage={singleSelectErrorMessage}
        label="Single Select"
        description={selectDescription}
        field={
            <SingleSelect
                // ref={singleSelectRef} // TODO(WB-1841) once SingleSelect supports ref
                placeholder="Choose a fruit"
                selectedValue={singleSelectValue}
                onChange={setSingleSelectValue}
                onValidate={setSingleSelectErrorMessage}
                validate={singleSelectValidate}
                disabled={disabled}
                required={required}
            >
                <OptionItem label="Mango" value="mango" />
                <OptionItem label="Strawberry" value="strawberry" />
                <OptionItem label="Banana" value="banana" />
            </SingleSelect>
        }
    />

    <LabeledField
        errorMessage={multiSelectErrorMessage}
        label="Multi Select"
        description={selectDescription}
        field={
            <MultiSelect
                // ref={multiSelectRef} // TODO(WB-1841) once MultiSelect supports ref
                selectedValues={multiSelectValue}
                onChange={setMultiSelectValue}
                onValidate={setMultiSelectErrorMessage}
                validate={
                    shouldValidateInStory
                        ? multiSelectValidate
                        : undefined
                }
                disabled={disabled}
                required={required}
            >
                <OptionItem label="Mango" value="mango" />
                <OptionItem label="Strawberry" value="strawberry" />
                <OptionItem label="Banana" value="banana" />
            </MultiSelect>
        }
    />

    <LabeledField
        errorMessage={searchErrorMessage}
        label="Search"
        description={textDescription}
        field={
            <SearchField
                ref={searchRef}
                value={searchValue}
                onChange={setSearchValue}
                validate={
                    shouldValidateInStory ? textValidate : undefined
                }
                onValidate={setSearchErrorMessage}
                instantValidation={false}
                disabled={disabled}
            />
        }
    />

    {showSubmitButtonInStory && <Button type="submit">Submit</Button>}
</StyledForm>
```


---

## Components & Guides

- [Checkbox](checkbox.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
- [Checkbox Group](checkbox-group.md)
- [Choice](choice.md)
- [Labeled Text Field Deprecated](labeled-text-field-deprecated.md)
- [Radio Group](radio-group.md)
- [Radio Internal](radio-internal.md)
- [Text Area](text-area.md)
- [Text Area Accessibility](text-area-accessibility.md)
- [Text Field](text-field.md)
