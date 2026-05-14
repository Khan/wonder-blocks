# Accessibility for Tabs

## Guidelines
- If there is a visible label for the tabs, set the `aria-labelledby` prop to
the id of the label. If there isn't, set the `aria-label` prop
- Make sure the ids for the tabs are unique. They are used to associate the tabs
and tab panels together
- When enabling animations in the component using the `animated` prop, consider
setting it to `false` for users who have their prefered reduced motion setting
on. By default, animations are disabled.
    - Note: We have an `animated` prop to enable animations so that this can be
    configured based on both the OS and user's site settings

## About the Implementation

The Tabs component follows the [ARIA Authoring Practices Guide (APG) Tabs
Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

### HTML Semantics and Attributes

The following semantics are used:
- A `button` element with `role=tab` is used to control which tab panel is shown
- An element with `role=tablist` holds a set of tab elements
- An element with `role=tabpanel` is specified on the tab content associated with
a tab

The following attributes are implemented:
- `aria-selected` is set to `true` on an element with `role=tab` if it is
selected
- `aria-controls` on the elements with `role=tab` is set to the id of the
associated element with `role=tabpanel`
- `aria-labelledby` on the elements with `role=tabpanel` is set to the id of
the associated element with `role=tab`
- `aria-label` or `aria-labelledby` is set on the `tablist` element using the
`Tabs` component props

### Keyboard Navigation

The following keyboard interactions are implemented:
- `Tab`
    - When focus moves into the `Tabs` component, the active tab is focused
    - When a tab is focused, pressing `Tab` will:
        - move focus to the tab panel if there are no focusable elements in the
        active tab panel, or
        - move focus to the first element in the tabpanel that is focusable
- `Left Arrow`
    - When focus is on a tab element, the `Left Arrow` will move focus to the
    previous tab
    - If focus is on the first tab, focus is moved to the last tab
    - If `activationMode=automatic`, the newly focused tab is also activated
- `Right Arrow`
    - When focus is on a tab element, the `Right Arrow` will move focus to the
    next tab
    - If focus is on the last tab, focus is moved to the first tab
    - If `activationMode=automatic`, the newly focused tab is also activated
- `Home`
    - When focus is on a tab element, the `Home` key will move focus to the first
    tab
    - If `activationMode=automatic`, the newly focused tab is also activated
- `End`
    - When focus is on a tab element, the `End` key will move focus to the last
    tab
    - If `activationMode=automatic`, the newly focused tab is also activated


---

## Related docs

- [Overview](overview.md)
- [Responsive Navigation Tabs](responsive-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs](responsive-navigation-tabs-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs Accessibility](responsive-navigation-tabs-navigation-tabs-accessibility.md)
- [Responsive Navigation Tabs Navigation Tabs Dropdown](responsive-navigation-tabs-navigation-tabs-dropdown.md)
- [Responsive Navigation Tabs Navigation Tabs Navigation Tab Item](responsive-navigation-tabs-navigation-tabs-navigation-tab-item.md)
- [Responsive Tabs](responsive-tabs.md)
- [Responsive Tabs Tabs](responsive-tabs-tabs.md)
- [Responsive Tabs Tabs Dropdown](responsive-tabs-tabs-dropdown.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
