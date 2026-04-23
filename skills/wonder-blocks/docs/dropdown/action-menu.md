# ActionMenu

---

## Default

---

## Right Aligned

This menu shows different type of possible items in this type of menu:
 1. leads to a different page (the profile).
 2. leads to the teacher dashboard.
 3. has an onClick callback, which could be used for conversion logging.
 4. is a disabled item.
 5. is a separator.
 6. leads to the logout link.
This menu is also left-aligned.

---

## Truncated Opener

The text in the menu opener should be truncated with ellipsis at the end and
the down caret should be the same size as it is for the other examples.

---

## With Option Items

The following menu demonstrates a hybrid menu with both action items and
items that can toggle to change the state of the application. The user of
this menu must keep track of the state of the selected items.

```tsx
<ActionMenu
    menuText="Assignments"
    onChange={handleChange}
    selectedValues={selectedValues}
>
    <ActionItem
        label="Create..."
        onClick={() => console.log("create action")}
    />
    <ActionItem
        label="Edit..."
        disabled={true}
        onClick={() => console.log("edit action")}
    />
    <ActionItem
        label="Delete"
        disabled={true}
        onClick={() => console.log("delete action")}
    />
    {showHiddenOption && (
        <ActionItem
            label="Hidden menu for class"
            disabled={!showHiddenOption}
            onClick={() => console.log("hidden menu is clicked!")}
        />
    )}
    <SeparatorItem />
    <OptionItem
        label="Show homework assignments"
        value="homework"
        onClick={() =>
            console.log(`Show homework assignments toggled`)
        }
    />
    <OptionItem
        label="Show in-class assignments"
        value="in-class"
        onClick={() =>
            console.log(`Show in-class assignments toggled`)
        }
    />
</ActionMenu>
```

---

## Empty Menu

Empty menus are disabled automatically.

```tsx
<ActionMenu menuText="Empty" />
```

---

## Custom dropdownStyle

This example shows how we can add custom styles to the dropdown menu.

---

## Controlled

Sometimes you'll want to trigger a dropdown programmatically. This can be
done by setting a value to the opened prop (true or false). In this situation
the ActionMenu is a controlled component. The parent is responsible for
managing the opening/closing of the dropdown when using this prop.
This means that you'll also have to update opened to the value triggered by
the onToggle prop.

```tsx
<View style={styles.row}>
    <Checkbox
        label="Click to toggle"
        onChange={setOpened}
        checked={opened}
    />
    <ActionMenu
        menuText="Betsy Appleseed"
        opened={opened}
        onToggle={setOpened}
    >
        {actionItems.map((actionItem, index) => actionItem)}
    </ActionMenu>
</View>
```

---

## With custom opener

In case you need to use a custom opener, you can use the opener property to
achieve this. In this example, the opener prop accepts a function with the
following arguments:
 - `eventState`: lets you customize the style for different states, such as
   pressed, hovered and focused.
 - `text`: Passes the menu label defined in the parent component. This value
   is passed using the placeholder prop set in the ActionMenu component.
 - `opened`: Whether the dropdown is opened.
**Note:** If you need to use a custom ID for testing the opener, make sure to
pass the testId prop inside the opener component/element.
**Accessibility:** When a custom opener is used, the following attributes are
added automatically: `aria-expanded`, `aria-haspopup`, and `aria-controls`.

---

## With popper placement

Sometimes you may want to align the dropdown somewhere besides below the
opener. In these cases, you can specify any valid popper placement as the
alignment.

```tsx
<ActionMenu opened={opened} onToggle={setOpened}>
    {actionItems.map((actionItem, index) => actionItem)}
</ActionMenu>
```

---

## Using the lang attribute

You can use the `lang` attribute to specify the language of the action
item(s). This is useful if you want to avoid issues with Screen Readers
trying to read the proper language for the rendered text.

```tsx
<ActionMenu menuText="Locales">
    {locales.map((locale) => (
        <ActionItem
            key={locale.locale}
            label={locale.localName}
            lang={locale.locale}
            testId={"language_picker_" + locale.locale}
        />
    ))}
</ActionMenu>
```

---

## Custom Action Items

ActionMenu can be used with custom action items. This is useful when you
want to use more rich action items, such as the ones used in context menus.
ActionItem internally uses the `DetailCell` component, which is a component
that allows you to pass:
- `subtitle1`: a subtitle before the label
- `subtitle2`: a subtitle after the label
- `leftAccessory`: An accessory at the start of the item.
- `rightAccessory`: An accessory at the end of the item.

```tsx
<ActionMenu
    menuText="Custom Action Items"
    onChange={handleChange}
    selectedValues={selectedValues}
/>
```

---

## Opening a Modal

This example shows how to use the ActionMenu with a modal. The modal is
opened when the user presses the "Open modal" action item. This could be done
by pressing `Enter`/`Space` when the opener is focused.
Use the keyboard to navigate to the "Open modal" action item and press
`Enter` or `Space` to open the modal.
Then navigate on the modal by pressing Tab and `Shift` + `Tab`.

```tsx
<>
    <ActionMenu>
        <ActionItem
            key="1"
            label="Profile"
            href="http://khanacademy.org/profile"
            target="_blank"
            testId="profile"
        />
        <ActionItem
            key="2"
            label="Open modal"
            testId="modal"
            onClick={() => {
                console.log("open modal");
                setOpened(true);
            }}
        />
    </ActionMenu>
    <ModalLauncher
        onClose={() => {
            setOpened(false);
        }}
        opened={opened}
        modal={({closeModal}) => (
            <OnePaneDialog
                title="Are you sure?"
                content="This is just a test"
                style={{maxHeight: "fit-content"}}
                footer={
                    <View
                        style={{
                            flexDirection: "row",
                            gap: sizing.size_160,
                        }}
                    >
                        <Button
                            kind="tertiary"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            actionType="destructive"
                            onClick={closeModal}
                        >
                            Delete
                        </Button>
                    </View>
                }
            />
        )}
    />
</>
```

---

## Aria Label

This example shows how to use `aria-label` on the ActionMenu opener and
`ActionItem` children. This is especially useful if you do **not** have a
visible label component but want to ensure accessibility. For more details,
see the [accessibility documentation](./?path=/docs/packages-dropdown-actionmenu-accessibility--docs).
As you can see, the `ActionMenu` opener visually shows the selected item, but
the `aria-label` attribute on the opener provides a more descriptive label
for the action menu.
**NOTE:** Make sure to include relevant information in `aria-label` if the
ActionMenu is used to select an item from a list.

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
- [Action Menu Accessibility](action-menu-accessibility.md)
- [Combobox](combobox.md)
- [Combobox Accessibility](combobox-accessibility.md)
- [Listbox](listbox.md)
- [Multi Select](multi-select.md)
- [Multi Select Accessibility](multi-select-accessibility.md)
- [Option Item](option-item.md)
- [Single Select](single-select.md)
- [Single Select Accessibility](single-select-accessibility.md)
