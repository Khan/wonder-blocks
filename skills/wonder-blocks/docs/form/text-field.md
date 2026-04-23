# TextField

> Package: `@khanacademy/wonder-blocks-form`

A TextField is an element used to accept a single line of text from the user.

---

## Default

This example shows the default layout of the TextField component.
NOTE: We recommend using the LabeledField component to provide a label,
description, required indicator, and/or error message for the field.
See the WithLabeledField story for an example.

```tsx
<TextField type="text" value="" disabled={false} placeholder="" required={false} testId="" readOnly={false} autoComplete="off" aria-label="Default Text Field" />
```

---

## With Labeled Field

The field can be used with the LabeledField component to provide a label,
description, required indicator, and/or error message for the field.
Using the field with the LabeledField component will ensure that the field
has the relevant accessibility attributes set.

```tsx
<LabeledField
    label="Label"
    field={
        <TextField
            value={value}
            onChange={setValue}
            onValidate={setErrorMessage}
            required={true}
        />
    }
    description="Description"
    errorMessage={errorMessage}
    contextLabel="required"
/>
```

---

## Text

An input field with type `text` takes all kinds of characters.

```tsx
<TextField
    id="tf-1"
    type="text"
    value={value}
    placeholder="Text"
    onChange={handleChange}
    onKeyDown={handleKeyDown}
/>
```

---

## Required

A required field will have error styling if the field is left blank. To
observe this, type something into the field, backspace all the way,
and then shift focus out of the field.

```tsx
<LabeledField
    required
    label={label || "Text Field"}
    errorMessage={error || (error && "Error from error prop")}
    field={
        <TextField
            value={value}
            onChange={handleChange}
            onValidate={setError}
        />
    }
/>
```

---

## Number

An input field with type `number` will only take numeric characters as input.
Number inputs have a few props that other input types don't have - `min`,
`max`, and `step`. In this example, the first number input has no
restrictions, while the second number input has a minimum value of 0, a
maximum value of 15, and a step of 3. Observe that using the arrow keys will
automatically snap to the step, and stop at the min and max values.

```tsx
<View>
    <TextField
        id="tf-3"
        type="number"
        value={value}
        placeholder="Number"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
    />
    <Strut size={spacing.small_12} />
    <Body>
        The following text field has a min of 0, a max of 15, and a
        step of 3
    </Body>
    <TextField
        id="tf-3a"
        type="number"
        value={value2}
        placeholder="Number"
        onChange={setValue2}
        onKeyDown={handleKeyDown}
        min={0}
        max={15}
        step={3}
    />
</View>
```

---

## Whole Number

An input field with type `whole-number` is identical to a number input, but it
will only take positive whole number characters as input.

```tsx
<View>
    <TextField
        id="tf-3"
        type="whole-number"
        value={value}
        placeholder="Whole Number"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
    />
</View>
```

---

## Password

An input field with type `password` will obscure the input value. It also
often contains validation. In this example, the password must be over 8
characters long and must contain a numeric value.

```tsx
<LabeledField
    label="Password"
    errorMessage={errorMessage}
    field={
        <TextField
            id="tf-4"
            type="password"
            value={value}
            placeholder="Password"
            validate={validate}
            onValidate={handleValidate}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    }
/>
```

---

## Email

An input field with type `email` will automatically validate an input on
submit to ensure it's either formatted properly or blank. `TextField` will
run validation on change if the `validate` prop is passed in, as in this
example.

```tsx
<LabeledField
    label="Email"
    errorMessage={errorMessage}
    field={
        <TextField
            id="tf-5"
            type="email"
            value={value}
            placeholder="Email"
            validate={validateEmail}
            onValidate={handleValidate}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    }
/>
```

---

## Telephone

An input field with type `tel` will NOT validate an input on submit by
default as telephone numbers can vary considerably. `TextField` will run
validation on blur if the `validate` prop is passed in, as in this example.

```tsx
<LabeledField
    label="Telephone"
    errorMessage={errorMessage}
    field={
        <TextField
            id="tf-6"
            type="tel"
            value={value}
            placeholder="Telephone"
            validate={validatePhoneNumber}
            onValidate={handleValidate}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    }
/>
```

---

## Error

If the `error` prop is set to true, the TextField will have error styling and
`aria-invalid` set to `true`.
This is useful for scenarios where we want to show an error on a
specific field after a form is submitted (server validation).
Note: The `required` and `validate` props can also put the TextField in an
error state.

```tsx
<LabeledField
    error
    validate={undefined}
    label={label || "Text Field"}
    errorMessage={error || (true && "Error from error prop")}
    field={
        <TextField
            value={value}
            onChange={handleChange}
            onValidate={setError}
        />
    }
/>
```

---

## Error From Validation

If an input value fails validation, `TextField` will have error styling.
This is useful for scenarios where we want to show errors while a
user is filling out a form (client validation).
Note that we will internally set the correct `aria-invalid` attribute to the
`input` element:
- aria-invalid="true" if there is an error.
- aria-invalid="false" if there is no error.

```tsx
<LabeledField
    validate={validateEmail}
    label={label || "Text Field"}
    errorMessage={error || (error && "Error from error prop")}
    field={
        <TextField
            value={value}
            onChange={handleChange}
            onValidate={setError}
        />
    }
/>
```

---

## Error From Prop And Validation

This example shows how the `error` and `validate` props can both be used to
put the field in an error state. This is useful for scenarios where we want
to show errors while a user is filling out a form (client validation)
and after a form is submitted (server validation).
In this example:
1. It starts with an invalid email. The error message shown is the message returned
by the `validate` function prop
2. Once the email is fixed to `test@test.com`, the validation error message
goes away since it is a valid email.
3. When the Submit button is pressed, another error message is shown (this
simulates backend validation).
4. When you enter any other email address, the error message is
cleared.

```tsx
<View style={{gap: spacing.medium_16}}>
    <LabeledField
        label="Error state from prop and validation"
        errorMessage={errorMessage}
        field={
            <TextField
                value={value}
                onChange={handleChange}
                validate={validateEmail}
                onValidate={setValidationErrorMessage}
                error={!!errorMessage}
            />
        }
    />
    <Button
        onClick={() => {
            if (value === "test@test.com") {
                setBackendErrorMessage(
                    "This email is already being used, please try another email.",
                );
            } else {
                setBackendErrorMessage(null);
            }
        }}
    >
        Submit
    </Button>
</View>
```

---

## Instant Validation

The `instantValidation` prop controls when validation is triggered. Validation
is triggered if the `validate` or `required` props are set.
It is preferred to set `instantValidation` to `false` so that the user isn't
shown an error until they are done with a field. Note: if `instantValidation`
is not explicitly set, it defaults to `true` since this is the current
behaviour of existing usage. Validation on blur needs to be opted in.
Validation is triggered:
- On mount if the `value` prop is not empty
- If `instantValidation` is `true`, validation occurs `onChange` (default)
- If `instantValidation` is `false`, validation occurs `onBlur`
When `required` is set to `true`:
- If `instantValidation` is `true`, the required error message is shown after
a value is cleared
- If `instantValidation` is `false`, the required error message is shown
whenever the user tabs away from the required field

```tsx
<View style={{gap: spacing.small_12}}>
    <ControlledTextField
        label="Validation on mount if there is a value"
        value="invalid"
    />
    <ControlledTextField
        label="Error shown immediately (instantValidation: true, required:
        false)"
        instantValidation={true}
    />
    <ControlledTextField
        label="Error shown onBlur (instantValidation: false, required:
        false)"
        instantValidation={false}
    />
    <ControlledTextField
        label="Error shown immediately after clearing the value
        (instantValidation: true, required: true)"
        validate={undefined}
        value="T"
        id="instant-validation-true-required"
        instantValidation={true}
        required="Required"
    />
    <ControlledTextField
        label="Error shown on blur if it is empty (instantValidation:
        false, required: true)"
        validate={undefined}
        instantValidation={false}
        required="Required"
    />
</View>
```

---

## Disabled

If the disabled prop is set to `true`, TextField will have disabled styling
and will not be interactable.
Note: The `disabled` prop sets the `aria-disabled` attribute to `true`
instead of setting the `disabled` attribute. This is so that the component
remains focusable while communicating to screen readers that it is disabled.
This `disabled` prop will also set the `readonly` attribute to prevent
typing in the field.

```tsx
<TextField id="tf-8" value="" placeholder="This field is disabled." disabled />
```

---

## Custom Style

TextField can take in custom styles that override the default styles. This
example has custom styles for the `backgroundColor`, `color`, `border`,
`maxWidth`, and placeholder `color` properties.

```tsx
<TextField
    id="tf-10"
    style={styles.customField}
    type="text"
    value={value}
    placeholder="Text"
    onChange={handleChange}
    onKeyDown={handleKeyDown}
/>
```

---

## Ref

If you need to save a reference to the input field, you can do so by using
the `ref` prop. In this example, we want the input field to receive focus
when the button is pressed. We can do this by creating a React ref of type
`HTMLInputElement` and passing it into `TextField`'s `ref` prop. Now we can
use the ref variable in the `handleSubmit` function to shift focus to the
field.

```tsx
<View>
    <TextField
        id="tf-11"
        type="text"
        value={value}
        placeholder="Text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
    />
    <Strut size={spacing.medium_16} />
    <Button style={styles.button} onClick={handleSubmit}>
        Focus Input
    </Button>
</View>
```

---

## Read Only

An input field with the prop `readOnly` set to true is not interactable. It
looks the same as if it were not read only, and it can still receive focus,
but the interaction point will not appear and the input will not change.

```tsx
<TextField
    id="tf-12"
    type="text"
    value={value}
    placeholder="Text"
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    readOnly={true}
/>
```

---

## With Autofocus

TextField takes an `autoFocus` prop, which makes it autofocus on page load.
Try to avoid using this if possible as it is bad for accessibility.
Press the button to view this example. Notice that the text field
automatically receives focus. Upon pressing the botton, try typing and notice
that the text appears directly in the text field. There is another focusable
element present to demonstrate that focus skips that element and goes
straight to the text field.

```tsx
<View>
    <LabelLarge style={{marginBottom: spacing.small_12}}>
        Press the button to view the text field with autofocus.
    </LabelLarge>
    <Button
        onClick={handleShowDemo}
        style={{width: 300, marginBottom: spacing.large_24}}
    >
        Toggle autoFocus demo
    </Button>
    {showDemo && <AutoFocusDemo />}
</View>
```

---

## Auto Complete

If the `autoComplete` prop is set, the browser can predict values for the
input. When the user starts to type in the field, a list of options will show
up based on values that may have been submitted at a previous time. In this
example, the text field provides options after you input a value, press the
submit button, and refresh the page.

```tsx
<form>
    <TextField
        id="tf-14"
        type="text"
        value={value}
        placeholder="Name"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={styles.fieldWithButton}
        autoComplete="name"
    />
    <Button type="submit">Submit</Button>
</form>
```



---

## Related docs

- [Overview](overview.md)
- [Checkbox](checkbox.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
- [Checkbox Group](checkbox-group.md)
- [Choice](choice.md)
- [Labeled Text Field Deprecated](labeled-text-field-deprecated.md)
- [Radio Group](radio-group.md)
- [Radio Internal](radio-internal.md)
- [Text Area](text-area.md)
- [Text Area Accessibility](text-area-accessibility.md)
