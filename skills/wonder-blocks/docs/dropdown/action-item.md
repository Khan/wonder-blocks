# ActionItem

> Package: `@khanacademy/wonder-blocks-dropdown`

---

## Default

The default action item with a `label` and an `onClick` handler. This is used
to trigger actions, such as opening a modal.

```tsx
<ActionItem label="Action Item" />
```

---

## With Href

The action item with a `label` and an `href` prop. This is used to trigger
navigation to a different page.

```tsx
<ActionItem label="Action Item" href="https://khanacademy.org" />
```

---

## Disabled

ActionItem can be `disabled`. This is used to indicate that the action is not
available.

```tsx
<ActionItem label="Action Item" disabled />
```

---

## Custom Action Item

ActionItem can have more complex content, such as icons and subtitles.
This can be done by passing in a `subtitle1`, `subtitle2`, `leftAccessory`
and/or `rightAccessory` props. These can be any React node, and internally
use the WB `DetailCell` component to render.

```tsx
<ActionItem label="Action Item" subtitle1="Subtitle 1" subtitle2="Subtitle 2" leftAccessory={<PhosphorIcon icon={IconMappings.calendar} size="medium" />} rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} size="medium" />} />
```

---

## Custom Action Item Multi Line

Another example of a custom action item with a larger label

```tsx
<ActionItem label={<View>
                <BodyText weight="bold">Title</BodyText>
                <BodyText>Subtitle</BodyText>
            </View>} leftAccessory={<PhosphorIcon icon={IconMappings.calendar} size="medium" />} rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} size="medium" />} />
```

---

## Horizontal Rule

`horizontalRule` can be used to separate items within ActionMenu instances.
It defaults to `none`, but can be set to `inset` or `full-width` to add a
horizontal rule at the bottom of the cell.

```tsx
<View style={styles.items}>
    <ActionItem
        label="full-width"
        horizontalRule="full-width"
    />
    <ActionItem label="inset" horizontalRule="inset" />
    <ActionItem label="none" />
    <ActionItem />
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Action Menu](action-menu.md)
- [Action Menu Accessibility](action-menu-accessibility.md)
- [Combobox](combobox.md)
- [Combobox Accessibility](combobox-accessibility.md)
- [Listbox](listbox.md)
- [Multi Select](multi-select.md)
- [Multi Select Accessibility](multi-select-accessibility.md)
- [Option Item](option-item.md)
- [Single Select](single-select.md)
- [Single Select Accessibility](single-select-accessibility.md)
