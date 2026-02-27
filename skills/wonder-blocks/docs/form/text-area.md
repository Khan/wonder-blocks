# TextArea

> Package: `@khanacademy/wonder-blocks-form`

A TextArea is an element used to accept text from the user.
Make sure to provide a label for the field. This can be done by either:
- (recommended) Using the **LabeledField** component to provide a label,
description, and/or error message for the field
- Using a `label` html tag with the `htmlFor` prop set to the unique id of
the field
- Using an `aria-label` attribute on the field
- Using an `aria-labelledby` attribute on the field

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | *required* | The text area value. |
| `onChange` | `(newValue: string) => unknown` | *required* | Called when the value has changed. |
| `id` | `string` |  | An optional unique identifier for the TextArea. |
| `testId` | `string` |  | Optional test ID for e2e testing. |
| `style` | `StyleType` |  | Custom styles for the textarea element. |
| `rootStyle` | `StyleType` |  | Custom styles for the root node of the component. |
| `placeholder` | `string` |  | Provide hints or examples of what to enter. |
| `disabled` | `boolean` |  | Whether the text area should be disabled. |
| `readOnly` | `boolean` |  | Specifies if the text area is read-only. |
| `autoComplete` | `"on" \| "off"` |  | Specifies if the text area allows autocomplete. |
| `name` | `string` |  | The name for the text area control. This is submitted along with |
| `className` | `string` |  | CSS classes for the textarea element. It is recommended that the style prop is used instead where possible |
| `autoFocus` | `boolean` |  | Whether this textarea should autofocus on page load. |
| `rows` | `number` |  | The number of visible lines of text for the textarea. Defaults to 2. |
| `spellCheck` | `boolean` |  | Determines if the textarea should be checked for spelling by the browser/OS. |
| `wrap` | `"hard" \| "soft" \| "off"` |  | How the control should wrap the value for form submission. If not provided, |
| `minLength` | `number` |  | The minimum number of characters allowed in the textarea. |
| `maxLength` | `number` |  | The maximum number of characters allowed in the textarea. |
| `onClick` | `React.MouseEventHandler` |  | Called when the textarea is clicked. |
| `onKeyDown` | `React.KeyboardEventHandler` |  | Called when a key is pressed. |
| `onKeyUp` | `React.KeyboardEventHandler` |  | Called when a key is released. |
| `onFocus` | `React.FocusEventHandler` |  | Called when the element has been focused. |
| `onBlur` | `React.FocusEventHandler` |  | Called when the element has been focused. |
| `onPaste` | `React.ClipboardEventHandler` |  | Called when text is pasted into the element. |
| `validate` | `(value: string) => string \| null \| void` |  | Provide a validation for the textarea value. |
| `onValidate` | `(errorMessage: string \| null \| undefined) => unknown` |  | Called right after the textarea is validated. |
| `instantValidation` | `boolean` |  | If true, textarea is validated as the user types (onChange). If false, |
| `error` | `boolean` |  | Whether the textarea is in an error state. |
| `required` | `boolean \| string` |  | Whether this textarea is required to continue, or the error message to |
| `resizeType` | `"horizontal" \| "vertical" \| "both" \| "none"` |  | @deprecated This prop is deprecated in favour of the `autoResize` prop. |
| `autoResize` | `boolean` |  | Whether the textarea should automatically resize to fit the content. |
| `maxRows` | `number` |  | The maximum number of rows to show when `autoResize` is `true` to prevent |

---

## Default

```tsx
<TextArea value="" />
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
        <TextArea
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

## Controlled

When setting a value and onChange props, you can use it as a controlled
component.

```tsx
<LabeledField
    label={label || "Text Area"}
    errorMessage={error || (error && "Error from error prop")}
    field={
        <TextArea
            value={value}
            onChange={handleChange}
            onValidate={setError}
        />
    }
/>
```

---

## With Value

When the `value` prop is provided, the value is rendered in the text area.

```tsx
<LabeledField
    label={label || "Text Area"}
    errorMessage={error || (error && "Error from error prop")}
    field={
        <TextArea
            value={value}
            onChange={handleChange}
            onValidate={setError}
        />
    }
/>
```

---

## Auto Resize

The `autoResize` prop can be used to automatically resize the textarea to fit
the content. By default, `autoResize` is `false`.
There is also a `maxRows` prop that can be used to set the maximum number of
rows to show when `autoResize` is enabled. If the content exceeds the max
number of rows, the textarea will become scrollable. By default, `maxRows`
is 6.
When `autoResize` is enabled, the `rows` prop is used as the starting and
minimum height. If `rows > maxRows`, `rows` will be used for `maxRows`.

```tsx
<View style={{gap: spacing.large_24, maxWidth: "500px"}}>
    <ControlledTextArea
        autoResize={false}
        label="Auto resize is false"
        value={repeatText(reallyLongText, 3)}
    />
    <ControlledTextArea
        autoResize={true}
        label="Auto resize is true"
        value={repeatText(longText, 2)}
    />
    <ControlledTextArea
        autoResize={true}
        label="Auto resize is true with default maxRows"
        value={repeatText(reallyLongText, 3)}
    />
    <ControlledTextArea
        autoResize={true}
        label="Auto resize is true with maxRows = 30"
        value={repeatText(reallyLongText, 3)}
        maxRows={30}
    />
    <ControlledTextArea
        autoResize={true}
        label="Auto resize is true with rows = 30"
        value={repeatText(reallyLongText, 3)}
        rows={30}
    />
</View>
```

---

## Placeholder

Use the `placeholder` prop to provide hints or examples of what to enter.
- Placeholder text is not a replacement for labels. Assistive
technologies, such as screen readers, do not treat placeholder text as
labels.
- Placeholder text is not displayed when there is a value. Critical details
should not be in the placeholder text as they can be missed if the TextArea
is fille already.

```tsx
<TextArea placeholder="Placeholder text" />
```

---

## Disabled

If the disabled prop is set to `true`, TextArea will have disabled styling
and will not be interactable.
Note: The `disabled` prop sets the `aria-disabled` attribute to `true`
instead of setting the `disabled` attribute. This is so that the component
remains focusable while communicating to screen readers that it is disabled.
This `disabled` prop will also set the `readonly` attribute to prevent
typing in the field.

```tsx
<TextArea disabled />
```

---

## Read Only

A textarea with the prop `readOnly` set to `true` is not interactable. It
looks the same as if it were not read only, and it can still receive focus,
but the interaction point will not appear and the textarea will not change.

```tsx
<TextArea value="Readonly text" readOnly />
```

---

## Error

If the `error` prop is set to true, the TextArea will have error styling and
`aria-invalid` set to `true`.
This is useful for scenarios where we want to show an error on a
specific field after a form is submitted (server validation).
Note: The `required` and `validate` props can also put the TextArea in an
error state.

```tsx
<LabeledField
    error
    label={label || "Text Area"}
    errorMessage={error || (true && "Error from error prop")}
    field={
        <TextArea
            value={value}
            onChange={handleChange}
            onValidate={setError}
        />
    }
/>
```

---

## Error From Validation

If the textarea fails validation, `TextArea` will have error styling.
This is useful for scenarios where we want to show errors while a
user is filling out a form (client validation).
Note that we will internally set the correct `aria-invalid` attribute to the
`textarea` element:
- `aria-invalid="true"` if there is an error.
- `aria-invalid="false"` if there is no error.

```tsx
<LabeledField
    validate={validateEmail}
    label={label || "Text Area"}
    errorMessage={error || (error && "Error from error prop")}
    field={
        <TextArea
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
to show error while a user is filling out a form (client validation)
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
<View style={{gap: spacing.small_12}}>
    <LabeledField
        label="Error from prop and validation"
        field={
            <TextArea
                value={value}
                onChange={handleChange}
                validate={validateEmail}
                onValidate={setValidationErrorMessage}
                error={!!errorMessage}
            />
        }
        errorMessage={errorMessage}
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
    <ControlledTextArea
        label="Validation on mount if there is a value"
        value="invalid"
    />
    <ControlledTextArea
        label="Error shown immediately (instantValidation: true, required:
        false)"
        instantValidation={true}
    />
    <ControlledTextArea
        label="Error shown onBlur (instantValidation: false, required:
        false)"
        instantValidation={false}
    />

    <ControlledTextArea
        validate={undefined}
        value="T"
        label="Error shown immediately after clearing the value
        (instantValidation: true, required: true)"
        instantValidation={true}
        required="Required"
    />

    <ControlledTextArea
        label="Error shown on blur if it is empty (instantValidation:
        false, required: true)"
        validate={undefined}
        instantValidation={false}
        required="Required"
    />
</View>
```

---

## Required

A required field will have error styling if the field is left blank. To
observe this, type something into the field, backspace all the way,
and then shift focus out of the field.

```tsx
<LabeledField
    required
    label={label || "Text Area"}
    errorMessage={error || (error && "Error from error prop")}
    field={
        <TextArea
            value={value}
            onChange={handleChange}
            onValidate={setError}
        />
    }
/>
```

---

## Rows

The `rows` prop can be used to set the number of rows to show by default.

```tsx
<TextArea rows={10} />
```

---

## Auto Complete

If the `autoComplete` prop is set, the browser can predict values for the
textarea. For more details, see the
[MDN docs for the textarea attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes).

```tsx
<TextArea autoComplete="on" />
```

---

## Auto Focus

When the `autoFocus` prop is set, the TextArea will be focused on page load.
Try to avoid using this if possible as it is bad for accessibility.

```tsx
<View>
    <LabelLarge style={{marginBottom: spacing.small_12}}>
        Press the button to view the textarea with autofocus.
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

## Spell Check Enabled

Spell check can be enabled for the TextArea. It will be checked for spelling
when you try to edit it (ie. once the textarea is focused).
**Note**: Consider disabling `spellCheck` for
 sensitive information (see [Security and Privacy concerns](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck#security_and_privacy_concerns) for more details)

```tsx
<TextArea spellCheck value="This exampull will be checkd fur spellung when you try to edit it." />
```

---

## Spell Check Disabled

```tsx
<TextArea spellCheck={false} value="This exampull will nut be checkd fur spellung when you try to edit it." />
```

---

## Wrap

The `wrap` prop configures the wrapping behaviour of the value for form
submission.

```tsx
<div>
    <p>
        Once submitted, check the console to observe the wrapping
        behaviour in the form data
    </p>
    <form
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        method="POST"
        action="/submit"
        id="wrapForm"
        onSubmit={handleSubmit}
        style={{width: "300px"}}
    >
        <LabeledField
            label="Wrap: soft"
            field={
                <TextArea wrap="soft" name="soft-wrap" />
            }
        />
        <br />
        <LabeledField
            label="Wrap: hard"
            field={
                <TextArea wrap="hard" name="hard-wrap" />
            }
        />
        <br />
        <LabeledField
            label="Wrap: off"
            field={
                <TextArea wrap="off" name="off-wrap" />
            }
        />
        <br />
        <LabeledField
            label="Wrap: default (soft)"
            field={<TextArea name="default-wrap" />}
        />
        <br />
        <Button type="submit">Submit</Button>
    </form>
</div>
```

---

## Min Max Length

The `minlength` and `maxlength` textarea attributes can be set using the
`minLength` and `maxLength` props.
Note: At this time, character length requirements are not displayed as part of
the Text Area component. These props are only setting the underlying HTML
attributes ([minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength)
and [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength)).

```tsx
<TextArea minLength={2} maxLength={4} value="Text" />
```

---

## Resize Type

The behaviour of the built-in resize control can be configured using the
`resizeType` prop. Here are some tips:
- The initial size of the TextArea can be configured using the `rows` prop.
This size should be large enough for the expected user input.
- Avoid having too small of a TextArea and having `resizeType=none`. This
makes it difficult for users to scroll through their input.

```tsx
<div>
    <LabeledField
        label="Resize Type: both"
        field={<TextArea resizeType="both" />}
    />
    <br />
    <LabeledField
        label="Resize Type: vertical"
        field={<TextArea resizeType="vertical" />}
    />
    <br />
    <LabeledField
        label="Resize Type: horizontal"
        field={<TextArea resizeType="horizontal" />}
    />
    <br />
    <LabeledField
        label="Resize Type: none"
        field={<TextArea resizeType="none" />}
    />
    <br />
    <LabeledField
        label="Resize Type: default (both)"
        field={<TextArea />}
    />
</div>
```

---

## Custom Style

Custom styling can be passed to the TextArea component using the `style`
prop.

```tsx
<TextArea value="Text" />
```

---

## Root Style

Custom styling can be passed to the root node of the component using the
`rootStyle` prop. If possible, try to use this prop carefully and use the
`style` prop instead.
Note: The `rootStyle` prop adds styling to the root node, which is a `div`
that wraps the underlying `textarea` element, whereas the `style` prop adds styling
to the `textarea` element directly. There is a `div` that wraps the textarea
so that the layout of the component is still controlled by the TextArea component.
This will be useful for future work where the TextArea component could include
other elements such as a character counter.
The following example shows that applying root styles can enable the textarea
to fill in the remaining height:

```tsx
<View style={{height: "500px", gap: spacing.large_24}}>
    <div>Example flex item child </div>
    <TextArea
        style={{height: "100%"}}
        rootStyle={{flexGrow: 1}}
    />
</View>
```

---

## With Ref

A ref can be passed to the component to have access to the textarea element.

```tsx
<View style={{alignItems: "flex-start"}}>
    <TextArea value={value} onChange={setValue} ref={ref} />
    <Strut size={spacing.large_24} />
    <Button onClick={handleClick}>Focus using ref</Button>
</View>
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
- [Text Area Accessibility](text-area-accessibility.md)
- [Text Field](text-field.md)
