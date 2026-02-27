# CheckboxGroup

> Package: `@khanacademy/wonder-blocks-form`

A checkbox group allows multiple selection. This component auto-populates
many props for its children Choice components. The Choice component is
exposed for the user to apply custom styles or to indicate which choices are
disabled.
### Usage
```jsx
import {Choice, CheckboxGroup} from "@khanacademy/wonder-blocks-form";
const [selectedValues, setSelectedValues] = React.useState([]);
<CheckboxGroup
    label="some-label"
    description="some-description"
    groupName="some-group-name"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
>
    // Add as many choices as necessary
    <Choice
       label="Choice 1"
       value="some-choice-value"
    />
    <Choice
       label="Choice 2"
       value="some-choice-value-2"
       description="Some choice description."
    />
</CheckboxGroup>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Array<React.ReactElement \| false \| null \| undefined>` | *required* | Children should be Choice components. |
| `groupName` | `string` | *required* | Group name for this checkbox or radio group. Should be unique for all |
| `label` | `React.ReactNode` |  | Optional label for the group. This label is optional to allow for |
| `description` | `React.ReactNode` |  | Optional description for the group. |
| `errorMessage` | `string \| null \| undefined` |  | Optional error message. If supplied, the group will be displayed in an |
| `style` | `StyleType` |  | Custom styling for this group of checkboxes. |
| `onChange` | `(selectedValues: Array<string>) => unknown` | *required* | Callback for when selection of the group has changed. Passes the newly |
| `selectedValues` | `Array<string>` | *required* | An array of the values of the selected values in this checkbox group. |
| `testId` | `string` |  | Test ID used for e2e testing. |

---

## Default

`CheckboxGroup` is a component that groups multiple `Choice` components
together. It is used to allow users to select multiple options from a list.
Note that by using a `label` prop, the `CheckboxGroup` component will render
a `legend` as the first child of the `fieldset` element. This is important to
include as it ensures that Screen Readers can correctly identify and announce
the group of checkboxes.

```tsx
<CheckboxGroup>
    <Choice label="Pepperoni" value="pepperoni-1" />
    <Choice
        groupName="toppings"
        selectedValues={["pepperoni-1", "sausage-1"]}
        label="Sausage"
        value="sausage-1"
        description="Imported from Italy"
    />
    <Choice label="Extra cheese" value="cheese-1" />
    <Choice label="Green pepper" value="pepper-1" />
    <Choice label="Mushroom" value="mushroom-1" />
</CheckboxGroup>
```

---

## Basic

```tsx
<CheckboxGroup
    groupName="toppings"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
>
    <Choice label="Pepperoni" value="pepperoni-2" />
    <Choice
        label="Sausage"
        value="sausage-2"
        description="Imported from Italy"
    />
    <Choice label="Extra cheese" value="cheese-2" />
    <Choice label="Green pepper" value="pepper-2" />
    <Choice label="Mushroom" value="mushroom-2" />
</CheckboxGroup>
```

---

## Error

```tsx
<CheckboxGroup
    label="Pizza order"
    groupName="toppings"
    description="You may choose at most three toppings"
    onChange={handleChange}
    errorMessage={error}
    selectedValues={selectedValues}
>
    <Choice label="Pepperoni" value="pepperoni-3" />
    <Choice
        label="Sausage"
        value="sausage-3"
        description="Imported from Italy"
    />
    <Choice label="Extra cheese" value="cheese-3" />
    <Choice label="Green pepper" value="pepper-3" />
    <Choice label="Mushroom" value="mushroom-3" />
</CheckboxGroup>
```

---

## Row Styling

```tsx
<View style={styles.wrapper}>
    <BodyText weight="bold" style={styles.title}>
        Science
    </BodyText>
    <CheckboxGroup
        groupName="science-classes"
        onChange={setSelectedValues}
        selectedValues={selectedValues}
        style={styles.group}
    >
        <Choice label="Biology" value="1" style={styles.choice} />
        <Choice label="AP®︎ Biology" value="2" style={styles.choice} />
        <Choice
            label="High school biology"
            value="3"
            style={styles.choice}
        />
        <Choice
            label="Cosmology and astronomy"
            value="4"
            style={styles.choice}
        />
        <Choice
            label="Electrical engineering"
            value="5"
            style={styles.choice}
        />
        <Choice
            label="Health and medicine"
            value="6"
            style={styles.choice}
        />
    </CheckboxGroup>
</View>
```

---

## Multiple Choice Styling

```tsx
<CheckboxGroup
    label={
        <BodyText weight="bold" tag="span">
            Select all prime numbers
        </BodyText>
    }
    description={
        <BodyText size="xsmall" tag="span" style={styles.description}>
            Hint: There is at least one prime number
        </BodyText>
    }
    groupName="science-classes"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
>
    <Choice
        label="1"
        value="1-mc-styling"
        style={styles.multipleChoice}
    />
    <Choice
        label="2"
        value="2-mc-styling"
        style={styles.multipleChoice}
    />
    <Choice
        label="3"
        value="3-mc-styling"
        style={styles.multipleChoice}
    />
    <Choice
        label="4"
        value="4-mc-styling"
        style={styles.multipleChoice}
    />
    <Choice
        label="5"
        value="5-mc-styling"
        style={[styles.multipleChoice, styles.last]}
    />
</CheckboxGroup>
```

---

## Filters Out Falsy Children

```tsx
<CheckboxGroup
    groupName="pizza"
    onChange={setSelectedValues}
    selectedValues={selectedValues}
    label="Pizza toppings"
>
    <Choice label="Pepperoni" value="pepperoni-4" />
    <Choice
        label="Sausage"
        value="sausage-4"
        description="Imported from Italy"
    />
    <Choice label="Extra cheese" value="cheese-4" />
    <Choice label="Green pepper" value="pepper-4" />
    {/* eslint-disable-next-line no-constant-condition */}
    {false ? <Choice label="Mushroom" value="mushroom-4" /> : null}
</CheckboxGroup>
```



---

## Related docs

- [Overview](overview.md)
- [Checkbox](checkbox.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
- [Choice](choice.md)
- [Labeled Text Field Deprecated](labeled-text-field-deprecated.md)
- [Radio Group](radio-group.md)
- [Radio Internal](radio-internal.md)
- [Text Area](text-area.md)
- [Text Area Accessibility](text-area-accessibility.md)
- [Text Field](text-field.md)
