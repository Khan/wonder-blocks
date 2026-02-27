# Choice

> Package: `@khanacademy/wonder-blocks-form`

This is a labeled 🔘 or ☑️ item. Choice is meant to be used as children of
CheckboxGroup and RadioGroup because many of its props are auto-populated
and not shown in the documentation here. See those components for usage
examples.
If you wish to use just a single field, use Checkbox or Radio with the
optional label and description props.
### Checkbox Usage
```jsx
import {Choice, CheckboxGroup} from "@khanacademy/wonder-blocks-form";
const [selectedValues, setSelectedValues] = React.useState([]);
// Checkbox usage
<CheckboxGroup
    label="some-label"
    description="some-description"
    groupName="some-group-name"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
/>
    // Add as many choices as necessary
    <Choice
       label="Choice 1"
       value="some-choice-value"
       description="Some choice description."
    />
    <Choice
       label="Choice 2"
       value="some-choice-value-2"
       description="Some choice description."
    />
</CheckboxGroup>
```
### Radio Usage
```jsx
import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
const [selectedValue, setSelectedValue] = React.useState("");
<RadioGroup
    label="some-label"
    description="some-description"
    groupName="some-group-name"
    onChange={setSelectedValue}>
    selectedValues={selectedValue}
/>
    // Add as many choices as necessary
    <Choice
       label="Choice 1"
       value="some-choice-value"
       description="Some choice description."
    />
    <Choice
       label="Choice 2"
       value="some-choice-value-2"
       description="Some choice description."
    />
</RadioGroup>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `React.ReactNode` | *required* | User-defined. Label for the field. |
| `description` | `React.ReactNode` |  | User-defined. Optional description for the field. |
| `value` | `string` | *required* | User-defined. Should be distinct for each item in the group. |
| `disabled` | `boolean` |  | User-defined. Whether this choice option is disabled. Default false. |
| `testId` | `string` |  | User-defined. Optional id for testing purposes. |
| `style` | `StyleType` |  | User-defined. Optional additional styling. |
| `checked` | `boolean` |  | Auto-populated by parent. Whether this choice is checked. |
| `error` | `boolean` |  | Auto-populated by parent. Whether this choice is in error mode (everything |
| `id` | `string` |  | Auto-populated by parent. Used for accessibility purposes, where the label |
| `groupName` | `string` |  | Auto-populated by parent's groupName prop. |
| `onChange` | `(newCheckedState: boolean) => unknown` |  | Auto-populated by parent. Returns the new checked state of the component. |
| `variant` | `"radio" \| "checkbox"` |  | Auto-populated by parent. |

---

## Default

```tsx
<ChoiceWrapper label="Pineapple (Control)" description="Does in fact belong on pizzas" />
```



---

## Related docs

- [Overview](overview.md)
- [Checkbox](checkbox.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
- [Checkbox Group](checkbox-group.md)
- [Labeled Text Field Deprecated](labeled-text-field-deprecated.md)
- [Radio Group](radio-group.md)
- [Radio Internal](radio-internal.md)
- [Text Area](text-area.md)
- [Text Area Accessibility](text-area-accessibility.md)
- [Text Field](text-field.md)
