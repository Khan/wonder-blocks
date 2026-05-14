# Accessibility

## Using `LabeledField` with `MultiSelect`

To associate a `MultiSelect` with another visible element (e.g. a `<label>`),
wrap it in a `LabeledField` component. The label will apply to the `MultiSelect`
opener. With `LabeledField`, you can supply label text (or a JSX node)
using the `label` prop to generate a paired `<label>` element. It comes with
field validation and other features baked in!

If for some reason you can't use `LabeledField` for a visible label, you can still
make `MultiSelect` accessible in a screen reader by associating it with `<label for="">`.
Pass the `id` of the `MultiSelect` to the `for` attribute.

Alternatively, you can create an accessible name for `MultiSelect` using `aria-labelledby`.
Put `aria-labelledby` on `MultiSelect` pointing to the `id` of any other element.
It won't give you the same enhanced click target as a paired `<label>`, but it still
helps to create a more accessible experience.

```tsx
<View>
    <LabeledField
        label="Associated label element"
        field={
            <MultiSelect selectedValues={["one"]} onChange={() => {}}>
                <OptionItem label="First element" value="one" />
                <OptionItem label="Second element" value="two" />
            </MultiSelect>
        }
    />
</View>
```

## Using `aria-label` for the opener and/or child options

A visible label with `<LabeledField>` is preferred. However, for specific cases
where the `MultiSelect` is not paired with a `LabeledField` or other visible
`<label>` element, you **must** supply an `aria-label` attribute for an
accessible name on the opener.

This will ensure the `MultiSelect` as a whole has a name that describes its purpose.

Also, if you need screen readers to understand relevant information on
option items, you can use `aria-label` on each item. e.g. You can use it to let
screen readers know the current selected/unselected status of the item when it
receives focus. This can be useful when the options contain icons or other information
that would need to be omitted from the visible label.

```tsx
<View>
    <MultiSelect
        aria-label="Class options"
        id="unique-multi-select"
        selectedValues={["one"]}
        onChange={() => {}}
    >
        <OptionItem
            label="First element"
            aria-label="First element, selected"
            value="one"
        />
        <OptionItem
            label="Second element"
            aria-label="Second element, unselelected"
            value="two"
        />
    </MultiSelect>
</View>
```

## Automatic screen reader announcements in `MultiSelect`

`MultiSelect` uses the [Wonder Blocks Announcer](/?path=/docs/packages-announcer--docs)
under the hood for content updates in screen readers, such as the number of items
and the selected value.

This integration works around 2 bugs in VoiceOver and Safari on Mac OSX 14 and 15
where the combobox opener value is cut off and cached incorrectly. The value is
buggy when announced, differing from its current visual presentation and DOM content.

Bugs filed in WebKit include:

1. AX: combobox button value text clipped https://bugs.webkit.org/show_bug.cgi?id=285047
2. AX: VoiceOver does not perceive changes to combobox value in an opener
https://bugs.webkit.org/show_bug.cgi?id=286828

### Testing the Announcer

To observe the affect of the Announcer, you have a few options:

1. Turn on a screen reader such as VoiceOver or NVDA while using the `MultiSelect`
2. Inspect the DOM in the browser and look at the `#wbAnnounce` DIV element
3. Look at the `With visible Announcer` story to see messages appended
visually to the DOM

```tsx
<View>
    <MultiSelect
        aria-label="Country"
        onChange={setSelectedValues}
        isFilterable={true}
        selectedValues={selectedValues}
    >
        {optionItems}
    </MultiSelect>
</View>
```

## Read only state

We recommend using `MultiSelect` with `LabeledField` so that `LabeledField`'s
`readOnlyMessage` prop can be used to provide context for users on why the field
is in a read only state.

Note: The component uses `aria-disabled` instead of `aria-readonly` to indicate
that the user can't change the value. This is because `aria-readonly` has low
browser + screen reader support currently with `combobox` roles. Using
`aria-disabled` and the `readOnlyMessage` provides contextual information to
users (`LabeledField`'s `readOnlyMessage` is included in the combobox element's
`aria-describedby` attribute)

```tsx
<LabeledField
    field={
        <MultiSelect
            readOnly={true}
            onChange={() => {}}
            selectedValues={["1"]}
        >
            <OptionItem label="item 1" value="1" />
            <OptionItem label="item 2" value="2" />
            <OptionItem label="item 3" value="3" />
        </MultiSelect>
    }
    label="Example Label"
    readOnlyMessage="Message about why it is read only"
/>
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
- [Option Item](option-item.md)
- [Single Select](single-select.md)
- [Single Select Accessibility](single-select-accessibility.md)
