# LabeledTextField (Deprecated)

> Package: `@khanacademy/wonder-blocks-form`

---

## Default

```tsx
<LabeledTextField id="some-ltf-id" type="text" label="Label" description="Hello, this is the description for this field" value="" disabled={false} required={false} placeholder="Placeholder" readOnly={false} autoComplete="off" />
```

---

## Migration To Labeled Field

Please use the **LabeledField** component with the **TextField** component
instead of the `LabeledTextField` component.
LabeledField is more flexible since it is decoupled from specific field
components. It also allows use of everything supported by TextField since it
is used directly.
Note: Validation is now handled by the specific field component and an error
message is passed into LabeledField. For TextField validation, it is preferred
that validation occurs on blur once a user is done interacting with a field.
This can be done using `instantValidation=false` on `TextField`, see TextField
validation docs for more details!
This example shows how LabeledTextField functionality can be mapped to
LabeledField and TextField components.

```tsx
<View style={{gap: spacing.xxxLarge_64}}>
    <LabeledTextField
        label="Using LabeledTextField"
        description={description}
        value={labeledTextFieldValue}
        onChange={setLabeledTextFieldValue}
        required={required}
        placeholder={placeholder}
        validate={validate}
    />
    <LabeledField
        label="Using LabeledField with TextField (recommended)"
        description={description}
        errorMessage={textFieldErrorMessage}
        contextLabel="required"
        field={
            <TextField
                required={required}
                value={textFieldValue}
                onChange={setTextFieldValue}
                placeholder={placeholder}
                validate={validate}
                onValidate={setTextFieldErrorMessage}
                instantValidation={false}
            />
        }
    />
</View>
```

---

## Text

An input field with type `text` takes all kinds of characters.

```tsx
<LabeledTextField
    label="Name"
    description="Please enter your name"
    value={value}
    onChange={(newValue) => setValue(newValue)}
    placeholder="Name"
    onKeyDown={handleKeyDown}
/>
```

---

## Required With Default Text

```tsx
<LabeledTextField
    label="Name"
    description="Please enter your name"
    value={value}
    onChange={setValue}
    onKeyDown={handleKeyDown}
    required={true}
/>
```

---

## Required With Specified Text

```tsx
<LabeledTextField
    label="Name"
    description="Please enter your name"
    value={value}
    onChange={setValue}
    onKeyDown={handleKeyDown}
    required="This specific field is super required."
/>
```

---

## Number

```tsx
<View style={styles.column}>
    <LabeledTextField
        label="Age"
        id="tf-3"
        description="Please enter your age"
        type="number"
        value={value}
        placeholder="Number"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
    />
    <Strut size={spacing.small_12} />
    <LabeledTextField
        id="tf-3a"
        label={`The following text field has a min of 0, a max of 15,
            and a step of 3`}
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

## Password

```tsx
<LabeledTextField
    label="Password"
    type="password"
    description="Please enter a secure password"
    value={value}
    onChange={setValue}
    placeholder="Password"
    validate={validate}
    onKeyDown={handleKeyDown}
/>
```

---

## Email

```tsx
<LabeledTextField
    label="Email"
    type="email"
    value={value}
    onChange={setValue}
    description="Please provide your personal email"
    placeholder="Email"
    validate={validate}
    onKeyDown={handleKeyDown}
/>
```

---

## Email Required

```tsx
<LabeledTextField
    label="Email"
    type="email"
    onChange={setValue}
    description="Please provide your personal email"
    value={value}
    validate={validate}
    onKeyDown={handleKeyDown}
    required={true}
/>
```

---

## Telephone

```tsx
<LabeledTextField
    label="Telephone"
    type="tel"
    value={value}
    onChange={setValue}
    description="Please provide your personal phone number"
    placeholder="Telephone"
    validate={validate}
    onKeyDown={handleKeyDown}
/>
```

---

## Error

If an input value fails validation, `LabeledTextField` will have error
styling.
Note that we will internally set the correct `aria-invalid` attribute to the
`input` element:
- aria-invalid="true" if there is an error message.
- aria-invalid="false" if there is no error message.

---

## Disabled

If the disabled prop is set to `true`, LabeledTextField will have disabled styling
and will not be interactable.
Note: The `disabled` prop sets the `aria-disabled` attribute to `true`
instead of setting the `disabled` attribute. This is so that the component
remains focusable while communicating to screen readers that it is disabled.
This `disabled` prop will also set the `readonly` attribute to prevent
typing in the field.

```tsx
<LabeledTextField
    label="Name"
    description="Please enter your name"
    value=""
    onChange={() => {}}
    placeholder="Name"
    disabled={true}
/>
```

---

## Custom Style

```tsx
<View style={styles.row}>
    <LabeledTextField
        label="First name"
        description="Please enter your first name"
        value={firstName}
        onChange={setFirstName}
        placeholder="Khan"
        style={styles.grow}
        onKeyDown={handleKeyDown}
    />
    <Strut size={spacing.xLarge_32} />
    <LabeledTextField
        label="Last name"
        description="Please enter your last name"
        value={lastName}
        onChange={setLastName}
        placeholder="Academy"
        style={styles.grow}
        onKeyDown={handleKeyDown}
    />
</View>
```

---

## With Markup

```tsx
<LabeledTextField
    label="Name"
    description={
        <span>
            Description with <strong>strong</strong> text and a{" "}
            <Link href="/path/to/resource" inline={true}>
                link example
            </Link>
        </span>
    }
/>
```

---

## Ref

```tsx
<View>
    <LabeledTextField
        label="Name"
        description="Please enter your name"
        value={value}
        onChange={setValue}
        placeholder="Name"
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

```tsx
<LabeledTextField
    label="Read Only"
    description="This is a read-only field."
    value={value}
    onChange={setValue}
    placeholder="Name"
    onKeyDown={handleKeyDown}
    readOnly={true}
/>
```

---

## Auto Complete

```tsx
<form>
    <LabeledTextField
        label="Name"
        description="Please enter your name."
        value={value}
        onChange={setValue}
        placeholder="Name"
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
- [Radio Group](radio-group.md)
- [Radio Internal](radio-internal.md)
- [Text Area](text-area.md)
- [Text Area Accessibility](text-area-accessibility.md)
- [Text Field](text-field.md)
