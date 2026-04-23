# Radio (internal)

> Package: `../../packages/wonder-blocks-form/src/components/radio`

---

## Default

```tsx
<Radio aria-label="Example" checked={false} />
```

---

## Controlled

```tsx
<Radio aria-label="Example" checked={checked} onChange={setChecked} />
```

---

## Variants

```tsx
<View style={styles.row}>
    <Radio aria-label="Example" checked={false} onChange={() => {}} />
    <Radio
        aria-label="Checked Example"
        checked={true}
        onChange={() => {}}
    />
    <Radio
        aria-label="Error Example"
        error={true}
        checked={false}
        onChange={() => {}}
    />
    <Radio
        aria-label="Checked Error Example"
        error={true}
        checked={true}
        onChange={() => {}}
    />
    <Radio
        aria-label="Disabled Example"
        disabled={true}
        checked={false}
        onChange={() => {}}
    />
    <Radio
        aria-label="Disabled Checked Example"
        disabled={true}
        checked={true}
        onChange={() => {}}
    />
</View>
```

---

## With Label

```tsx
<Radio
    label="Easy"
    description="Opt for a less difficult exercise set."
    checked={checked}
    onChange={setChecked}
/>
```

---

## Additional Click Target

```tsx
<View style={styles.wrapper}>
    <View style={styles.topic}>
        <label htmlFor="topic-123">
            <BodyText tag="span">{headingText}</BodyText>
        </label>
        <BodyText size="small">{descriptionText}</BodyText>
    </View>
    <Radio checked={checked} id="topic-123" onChange={setChecked} />
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
- [Text Area](text-area.md)
- [Text Area Accessibility](text-area-accessibility.md)
- [Text Field](text-field.md)
