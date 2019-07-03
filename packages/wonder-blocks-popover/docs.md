A popover is a transient view that shows on a content screen commonly displayed
when a user clicks on a control button or within a defined area. It can also
appear programmatically, meaning that will be cases where there is no need of
user interactions to shows the popover. It is commonly used to display
additional information or actions.

## Accessibility

The Popover component should follow these guidelines:

**Trigger Element:**

- It should have a role of button (e.g. `<button>`).
- When the content is visible, it's recommended to set
  [aria-expanded](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) to true.
  When content is hidden,
  [aria-expanded](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) is set to
  false.
- It should reference the content using the
  [aria-controls](https://www.w3.org/TR/wai-aria-1.1/#aria-controls) attribute.

**Popover Dialog:**

The popover component will populate the
[aria-describedby](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)
attribute automatically, unless the user sets an `id` prop inside the Popover
instance. Internally, it will be set on the trigger element.

### Keyboard Interaction

#### Initial focus

**NOTE:** This only applies when the popover is opened by clicking on a trigger
element.

When a popover is opened via a button, focus moves to an element inside the
Popover. The initial focus placement depends on the following scenarios:

1. initialFocusId (default): Popover exposes this prop as a string. The popover
   itself will try to find this element into the DOM. If it's found, focus is
   initially set on this element.

2. focusable elements: This is the second scenario, where the popover tries to
   find the first occurrence of possible focusable elements.

3. Popover: If the first two conditions are not met, then focus is initially set
   to the popover container.

#### Focus management

Once focus is in the popover, users can access controls within the popover
using:

1. **`tab`**: Moves focus to the next focusable element.

    **NOTE:** If the focus has reached the last focusable element inside the
   popover, the next tab will set focus on the next focusable element that
   exists after the PopoverAnchor.

2. **`shift + tab`**: Moves focus to the previous focusable element.

    **NOTE:** If the focus is set to the first focusable element inside the
   popover, the next shift + tab will set focus on the PopoverAnchor element.

#### Dismissing the popover

When a popover dialog closes, focus should return to the anchor element defined
in the Popover children prop.