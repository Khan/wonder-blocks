# Accessibility for NavigationTabs

## Guidelines

- Provide a meaningful and unique accessible label for the `NavigationTabs`
component, especially if there are multiple `<nav>` elements on the page.
    - If there is already a visual label for the tabs, set the `aria-labelledby`
    prop to the id of the visual label
    - Otherwise, set the `aria-label` prop.
- When enabling animations in the component using the `animated` prop, consider
setting it to `false` for users who have their prefered reduced motion setting
on. By default, animations are disabled.
    - Note: We have an `animated` prop to enable animations so that this can be
    configured based on both the OS and user's site settings

## About the Implementation

### HTML Semantics and Attributes

The following semantics are used:
- `<nav>` specifies that the contents of `NavigationTabs` are for navigation
- `<ul>` and `<li>` defines a list for the `NavigationTabItems`
- `<a>` is used for links when `Link` is used with `NavigationTabItem`

The following attributes are implemented:
- `aria-current` is set to `page` when a `NavigationTabItem` has the `current`
prop set to `true`
- `aria-label` or `aria-labelledby` can be set on the `NavigationTabs` component
- `NavigationTabs` and `NavigationTabItem` components will use aria attributes
passed to it

### Keyboard Interactions

The links in `NavigationTabs` can be navigated to using `Tab` and `Shift+Tab`.


---

## Related docs

- [Overview](overview.md)
- [Responsive Navigation Tabs](responsive-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs](responsive-navigation-tabs-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs Dropdown](responsive-navigation-tabs-navigation-tabs-dropdown.md)
- [Responsive Navigation Tabs Navigation Tabs Navigation Tab Item](responsive-navigation-tabs-navigation-tabs-navigation-tab-item.md)
- [Responsive Tabs](responsive-tabs.md)
- [Responsive Tabs Tabs](responsive-tabs-tabs.md)
- [Responsive Tabs Tabs Accessibility](responsive-tabs-tabs-accessibility.md)
- [Responsive Tabs Tabs Dropdown](responsive-tabs-tabs-dropdown.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
