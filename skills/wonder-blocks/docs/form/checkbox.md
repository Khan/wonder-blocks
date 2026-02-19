# Checkbox

> Package: `@khanacademy/wonder-blocks-form`

☑️ A nicely styled checkbox for all your checking needs. Can optionally take
label and description props.
If used by itself, a checkbox provides two options - checked and unchecked.
A group of checkboxes can be used to allow a user to select multiple values
from a list of options.
If you want a whole group of Checkbox[es] that are related, see the Choice
and CheckboxGroup components.
### Usage
```jsx
import {Checkbox} from "@khanacademy/wonder-blocks-form";
const [checked, setChecked] = React.useState(false);
<Checkbox checked={checked} onChange={setChecked} />
```

---

## Default

```tsx
<Checkbox checked={false} aria-label="Example" />
```

---

## Controlled

```tsx
<Checkbox
    aria-label="Example"
    checked={checked}
    onChange={handleChange}
/>
```

---

## Indeterminate

```tsx
<View style={[styles.row, styles.gap]}>
    <Checkbox
        aria-label="Default example"
        checked={null}
        disabled={false}
        error={false}
        onChange={() => {}}
    />
    <Checkbox
        aria-label="Disabled example"
        checked={undefined}
        disabled={true}
        error={false}
        onChange={() => {}}
    />
    <Checkbox
        aria-label="Error example"
        checked={null}
        disabled={false}
        error={true}
        onChange={() => {}}
    />
</View>
```

---

## Indeterminate With Group

```tsx
<View>
    <Checkbox
        checked={allSelected}
        label={"Topping(s)"}
        onChange={handleSelectAll}
    />
    <Strut size={spacing.small_12} />
    <View style={{marginInlineStart: spacing.large_24}}>
        <CheckboxGroup
            groupName="toppings"
            onChange={handleCheckboxGroupSelect}
            selectedValues={selectedValues}
        >
            {choices.map((choice) => (
                <Choice
                    key={choice.label}
                    label={choice.label}
                    value={choice.value}
                />
            ))}
        </CheckboxGroup>
    </View>
</View>
```

---

## Variants

The checkbox has various styles for clickable states. Here are sets of default checkboxes, checkboxes in an error state, and disabled checkboxes.

```tsx
<View style={[styles.row, styles.gap_240]}>
    <Checkbox
        aria-label="Default example"
        error={false}
        checked={false}
        onChange={() => {}}
    />
    <Checkbox
        aria-label="Checked example"
        error={false}
        checked={true}
        onChange={() => {}}
    />
    <Checkbox
        aria-label="Error example"
        error={true}
        checked={false}
        onChange={() => {}}
    />
    <Checkbox
        aria-label="Error checked example"
        error={true}
        checked={true}
        onChange={() => {}}
    />
    <Checkbox
        aria-label="Disabled example"
        disabled={true}
        checked={false}
        onChange={() => {}}
    />
    <Checkbox
        aria-label="Disabled checked example"
        disabled={true}
        checked={true}
        onChange={() => {}}
    />
</View>
```

---

## Variants Controlled

```tsx
<View style={[styles.row, styles.gap_240]}>
    <Checkbox
        aria-label="Checked example"
        checked={defaultChecked}
        onChange={defaultSetChecked}
        style={styles.marginRight}
    />
    <Checkbox
        aria-label="Error example"
        error={true}
        checked={errorChecked}
        onChange={errorSetChecked}
        style={styles.marginRight}
    />
    <Checkbox
        aria-label="Disabled checked example"
        checked={disabledChecked}
        disabled={true}
        onChange={disabledSetChecked}
        style={styles.marginRight}
    />
</View>
```

---

## With Label

The checkbox can have an optional label and description. This allows it to be used as a settings-like item. The user of this component is responsible for keeping track of checked state and providing an onChange callback.

```tsx
<Checkbox
    label="Receive assignment reminders for Algebra"
    description="You will receive a reminder 24 hours before each deadline"
    checked={checked}
    onChange={setChecked}
/>
```

---

## With Styled Label

The checkbox can have an optional label and description. This allows it to be used as a settings-like item. The user of this component is responsible for keeping track of checked state and providing an onChange callback.

```tsx
<Checkbox
    label={
        <BodyText
            weight="bold"
            tag="span"
            style={{lineHeight: font.body.lineHeight.small}}
        >
            Receive assignment reminders for Algebra
        </BodyText>
    }
    description="You will receive a reminder 24 hours before each deadline"
    checked={checked}
    onChange={() => handleChange()}
/>
```

---

## Additional Click Target

Sometimes one may wish to use a checkbox in a different context (label may not be right next to the checkbox), like in this example content item. Use a `<label htmlFor={id}>` element where the id matches the `id` prop of the Checkbox. This is for accessibility purposes, and doing this also automatically makes the label a click target for the checkbox.

```tsx
<View style={styles.wrapper}>
    <View style={styles.topic}>
        <label htmlFor="topic-123">
            <BodyText tag="span">{headingText}</BodyText>
        </label>
        <BodyText size="small">{descriptionText}</BodyText>
    </View>
    <Checkbox checked={checked} id="topic-123" onChange={setChecked} />
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
- [Checkbox Group](checkbox-group.md)
- [Choice](choice.md)
- [Labeled Text Field Deprecated](labeled-text-field-deprecated.md)
- [Radio Group](radio-group.md)
- [Radio Internal](radio-internal.md)
- [Text Area](text-area.md)
- [Text Area Accessibility](text-area-accessibility.md)
- [Text Field](text-field.md)
