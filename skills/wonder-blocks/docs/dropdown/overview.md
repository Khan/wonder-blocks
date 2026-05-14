# Wonder Blocks Dropdown

Wonder Blocks Dropdown provides a comprehensive collection of dropdown components for creating interactive selection interfaces. These components offer various selection patterns, accessibility support, and performance optimizations for handling large datasets.

The `@khanacademy/wonder-blocks-dropdown` package includes several types of dropdown components, each designed for specific use cases:

## SingleSelect

A dropdown that allows selection of one item from a list. The dropdown closes after selection and is perfect for traditional select inputs.

**Key Features:**
- Single item selection
- Automatic virtualization for 125+ items using react-window
- Searchable/filterable options
- Full accessibility support
- Keyboard navigation
- Uses the `combobox` role with a button opener

```tsx
<SingleSelect
    error={false}
    isFilterable
    disabled={false}
    readOnly={false}
    placeholder="Choose a fruit"
    aria-label={"Fruit"}
    onChange={setSelectedValue}
    selectedValue={selectedValue}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</SingleSelect>
```

## MultiSelect

A dropdown that allows selection of multiple items with built-in shortcuts for "Select All" and "Select None" operations.

**Key Features:**
- Multiple item selection with checkboxes
- Select All/Select None shortcuts
- Filterable options
- Selected items moved to top when reopened
- Customizable labels for internationalization
- Uses the `combobox` role with a button opener

```tsx
<MultiSelect
    isFilterable={false}
    error={false}
    disabled={false}
    readOnly={false}
    shortcuts={false}
    implicitAllEnabled={false}
    id=""
    testId=""
    aria-label={"Planets"}
    onChange={setSelectedValues}
    selectedValues={selectedValues}
    opened={opened}
    onToggle={setOpened}
>
    {items}
</MultiSelect>
```

## Combobox (experimental)

An input field with an associated listbox that can be filtered by typing. Supports both single and multiple selection modes.

**Key Features:**
- Text input with dropdown suggestions
- Single or multiple selection modes
- Real-time filtering as you type
- Keyboard navigation and accessibility
- Multiple selection pills for selected items
- Uses the `combobox` role with an input textfield

```tsx
<Combobox
    selectionType="single"
    key={prevSelectionTypeRef.current}
    value={value}
    onChange={(newValue) => {
        updateArgs({value: newValue});
    }}
/>
```

## Listbox

A standalone list component that provides selection functionality without a trigger button or input field.

**Key Features:**
- Standalone list selection
- Single or multiple selection modes
- Keyboard navigation
- ARIA-compliant listbox role
- Can be used as building block for custom dropdowns

```tsx
<Listbox>
  {items}
</Listbox>
```

## ActionMenu

A dropdown menu containing actionable items like buttons or links. Perfect for context menus and action buttons.

**Key Features:**
- Contains ActionItem components
- Support for icons and descriptions
- Keyboard navigation
- Customizable menu positioning
- Can include separators for grouping

<!-- Could not resolve: ActionMenuStories.Default -->

## Supporting Components

### ActionItem

Individual action items used within ActionMenu components. Supports onClick handlers, icons, and descriptions.

```tsx
<ActionItem label="Action Item" />
```

### OptionItem

Individual option items used within selection components (SingleSelect, MultiSelect, etc.). Supports labels, values, and custom content.

```tsx
<OptionItem label="Option Item" />
```

## Performance Features

- **Automatic Virtualization**: Components automatically use react-window for lists with 125+ items
- **Efficient Rendering**: Optimized for handling hundreds of items without performance issues
- **Lazy Loading**: Support for asynchronous data loading (coming soon)

## Accessibility

All dropdown components are built with accessibility as a core principle:

- Full keyboard navigation support
- ARIA-compliant markup
- Screen reader announcements
- Focus management
- High contrast support

For detailed examples, props, and advanced usage patterns, refer to the individual component documentation pages.


---

## Components & Guides

- [Action Item](action-item.md)
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
