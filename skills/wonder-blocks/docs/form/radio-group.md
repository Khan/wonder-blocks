# RadioGroup

> Package: `@khanacademy/wonder-blocks-form`

A radio group allows only single selection. Like CheckboxGroup, this
component auto-populates many props for its children Choice components. The
Choice component is exposed for the user to apply custom styles or to
indicate which choices are disabled. The use of the groupName prop is
important to maintain expected keyboard navigation behavior for
accessibility.
### Usage
```jsx
import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
const [selectedValue, setSelectedValue] = React.useState("");
<RadioGroup
    label="some-label"
    description="some-description"
    groupName="some-group-name"
    onChange={setSelectedValue}
    selectedValue={selectedValue}
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
</RadioGroup>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Array<React.ReactElement \| false \| null \| undefined>` | *required* | Children should be Choice components. |
| `groupName` | `string` | *required* | Group name for this checkbox or radio group. Should be unique for all |
| `label` | `React.ReactNode` |  | Optional label for the group. This label is optional to allow for |
| `description` | `React.ReactNode` |  | Optional description for the group. |
| `errorMessage` | `string` |  | Optional error message. If supplied, the group will be displayed in an |
| `style` | `StyleType` |  | Custom styling for this group of checkboxes. |
| `onChange` | `(selectedValue: string) => unknown` | *required* | Callback for when the selected value of the radio group has changed. |
| `selectedValue` | `string` | *required* | Value of the selected radio item. |
| `testId` | `string` |  | Test ID used for e2e testing. |

---

## Default

`RadioGroup` is a component that groups multiple `Choice` components
together. It is used to allow users to select a single option from a list.
Note that by using a `label` prop, the `RadioGroup` component will render
a `legend` as the first child of the `fieldset` element. This is important to
include as it ensures that Screen Readers can correctly identify and announce
the group of radio buttons.

```tsx
<RadioGroup>
    <Choice label="Bulbasaur" value="bulbasaur-1" />
    <Choice
        groupName="pokemon"
        selectedValue="bulbasaur-1"
        label="Charmander"
        value="charmander-1"
        description="Oops, we ran out of Charmanders"
        disabled
    />
    <Choice label="Squirtle" value="squirtle-1" />
    <Choice label="Pikachu" value="pikachu-1" />
</RadioGroup>
```

---

## Basic

```tsx
<RadioGroup
    groupName="pokemon"
    label="Pokemon"
    description="Your first Pokemon."
    onChange={setSelectedValue}
    selectedValue={selectedValue}
>
    <Choice label="Bulbasaur" value="bulbasaur-2" />
    <Choice
        label="Charmander"
        value="charmander-2"
        description="Oops, we ran out of Charmanders"
        disabled
    />
    <Choice label="Squirtle" value="squirtle-2" />
    <Choice label="Pikachu" value="pikachu-2" />
</RadioGroup>
```

---

## Error

```tsx
<RadioGroup
    groupName="pokemon"
    label="Pokemon"
    description="Your first Pokemon."
    onChange={handleChange}
    selectedValue={selectedValue}
    errorMessage={error}
>
    <Choice label="Bulbasaur" value="bulbasaur-3" />
    <Choice label="Charmander" value="charmander-3" />
    <Choice label="Squirtle" value="squirtle-3" />
    <Choice label="Pikachu" value="pikachu-3" />
</RadioGroup>
```

---

## Multiple Choice Styling

```tsx
<>
    <BodyText weight="bold" tag="span" style={styles.prompt}>
        Select your blood type
    </BodyText>
    <RadioGroup
        groupName="science-classes"
        onChange={setSelectedValue}
        selectedValue={selectedValue}
    >
        <Choice label="A" value="1" style={styles.choice} />
        <Choice label="B" value="2" style={styles.choice} />
        <Choice label="AB" value="3" style={styles.choice} />
        <Choice
            label="O"
            value="4"
            style={[styles.choice, styles.lastChoice]}
        />
    </RadioGroup>
</>
```

---

## Filters Out Falsy Children

```tsx
<RadioGroup
    groupName="pokemon"
    onChange={setSelectedValue}
    selectedValue={selectedValue}
    label="Pokemon"
    description="Your first Pokemon."
>
    <Choice label="Bulbasaur" value="bulbasaur-4" />
    <Choice
        label="Charmander"
        value="charmander-4"
        description="Oops, we ran out of Charmanders"
        disabled
    />
    <Choice label="Squirtle" value="squirtle-4" />
    {/* eslint-disable-next-line no-constant-condition */}
    {false ? <Choice label="Pikachu" value="pikachu-4" /> : null}
</RadioGroup>
```

---

## Custom Label

There are specific situations where you might want to use a custom label
component. This example demonstrates how to use a custom label component
that can be passed in as a prop to the `RadioGroup` component.

```tsx
<RadioGroup label={<View
                style={{
                    border: `1px dashed ${semanticColor.core.border.neutral.default}`,
                    padding: spacing.medium_16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <BodyText weight="bold" tag="span">
                    Pokemon
                </BodyText>
                <BodyText tag="span">(optional)</BodyText>
            </View>} />
```



---

## Related docs

- [Overview](overview.md)
- [Checkbox](checkbox.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
- [Checkbox Group](checkbox-group.md)
- [Choice](choice.md)
- [Labeled Text Field Deprecated](labeled-text-field-deprecated.md)
- [Radio Internal](radio-internal.md)
- [Text Area](text-area.md)
- [Text Area Accessibility](text-area-accessibility.md)
- [Text Field](text-field.md)
