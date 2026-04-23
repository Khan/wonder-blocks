# Accessibility

The `ActionMenu` component is designed to be accessible and follows the
[WAI-ARIA Menu Button
links](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/)
pattern. It enables both mouse and keyboard users to efficiently interact with
complex menus and action items.

## Keyboard interactions

| Key            | Action                          |
| -------------- | ------------------------------- |
| Enter or Space | Opens the menu                   |
| ArrowDown      | Moves focus to the next item     |
| ArrowUp        | Moves focus to the previous item |
| Escape         | Closes the menu                  |

## Attributes

### Menu button (opener)

| Attribute            | Usage                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| role="button"        | Indicates that the element is a button.                                                                                                                  |
| aria-label="value"   | Defines a string value that labels the UsingOpenerAriaLabel element. Use it in case the opener element doesn't include any descriptive text (e.g. Icons, images) |
| aria-expanded="true" | Indicates that the element is expanded.                                                                                                                  |
| aria-haspopup="menu" | Indicates that the element has a popup menu.                                                                                                             |
| aria-controls="value" | Indicates that the element controls the popup menu with the given id.                                                                                   |
| aria-disabled="true" | Indicates that the element is disabled.                                                                                                                  |

### Menu (items)

| Attribute            | Usage                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| role="menu"          | Indicates that the element is a menu.                                                                                                                    |
| aria-labelledby="opener-id"   | Indicates that the element is labelled by the element with the given id.                                                                        |

## Labeling the ActionMenu component

In certain situations where the menu button text doesn't provide enough context
about the menu's purpose, you can use the `aria-label` prop to provide a more
descriptive label.

**NOTE:** `ActionMenu` internally associates the `menu` element with the
`opener` element using the `aria-labelledby` attribute, that way Screenreaders
will announce the menu text when the menu is opened.

```tsx
<ActionMenu
    aria-label={
        selectedItem
            ? `${selectedItem} - List of classes`
            : "List of classes"
    }
    opener={() => (
        <Button endIcon={IconMappings.caretDown}>
            {selectedItem ? selectedItem : "List of classes"}
        </Button>
    )}
>
    {classOptions.map((opt) => (
        <ActionItem
            key={opt.label}
            label={opt.label}
            aria-label={opt.ariaLabel}
            onClick={() => {
                setSelectedItem(opt.label);
            }}
        />
    ))}
</ActionMenu>
```


---

## Related docs

- [Overview](overview.md)
- [Action Item](action-item.md)
- [Action Menu](action-menu.md)
- [Combobox](combobox.md)
- [Combobox Accessibility](combobox-accessibility.md)
- [Listbox](listbox.md)
- [Multi Select](multi-select.md)
- [Multi Select Accessibility](multi-select-accessibility.md)
- [Option Item](option-item.md)
- [Single Select](single-select.md)
- [Single Select Accessibility](single-select-accessibility.md)
