# wonder-blocks-tabs

There are 2 types of components available to implement a tabbed layout:
**ResponsiveTabs** and **ResponsiveNavigationTabs**.

## ResponsiveNavigationTabs

If the tabs in the layout are links, use [ResponsiveNavigationTabs](./?path=/docs/packages-tabs-responsivenavigationtabs--docs).

```tsx
<ResponsiveNavigationTabs
    tabs={[
            {
                label: "Navigation Tab 1",
                id: "tab-1",
                href: "#tab-1",
            },
            {
                label: "Navigation Tab 2",
                id: "tab-2",
                href: "#tab-2",
            },
            {
                label: "Navigation Tab 3",
                id: "tab-3",
                href: "#tab-3",
            },
            {
                label: "Navigation Tab 4",
                id: "tab-4",
                href: "#tab-4",
            },
            {
                label: "Navigation Tab 5",
                id: "tab-5",
                href: "#tab-5",
            },
            {
                label: "Navigation Tab 6",
                id: "tab-6",
                href: "#tab-6",
            },
        ]}
    showDivider
    selectedTabId={selectedTabId}
    onTabSelected={setSelectedTabId}
/>
```

## ResponsiveTabs

If the tabs are not links, use [ResponsiveTabs](./?path=/docs/packages-tabs-responsivetabs--docs).

It follows the
[ARIA APG Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
and uses elements with `role=”tab”` and handles keyboard navigation for
switching between tabs.

```tsx
<View>
    <ResponsiveTabs
        tabs={[
            {label: "Tab 1", id: "tab-1", panel: <div>Tab contents 1</div>},
            {label: "Tab 2", id: "tab-2", panel: <div>Tab contents 2</div>},
            {label: "Tab 3", id: "tab-3", panel: <div>Tab contents 3</div>},
            {label: "Tab 4", id: "tab-4", panel: <div>Tab contents 4</div>},
            {label: "Tab 5", id: "tab-5", panel: <div>Tab contents 5</div>},
            {label: "Tab 6", id: "tab-6", panel: <div>Tab contents 6</div>},
        ]}
        selectedTabId={selectedTabId}
        onTabSelected={setSelectedTabId}
    />
</View>
```

## Responsive Behaviour

As described by the names of these components, `ResponsiveTabs` and
`ResponsiveNavigationTabs` will change its layout based on if there is enough
space for the traditional horizontal tabs layout. If there is not enough space,
it will render the tabs in a dropdown instead using the Wonder Blocks
ActionMenu component.

Some things that could trigger the component to change layouts are:
- zoom level
- screen width or parent element width
- the length of the tab labels
- the number of labels

Note: Be sure to test out both layouts when implementing these responsive
components. For automated tests, note that the interactions and semantics to
trigger tabs will be different in the dropdown layout since the dropdown needs
to be opened before a tab can be selected.

### Customization

If you need to configure the behaviour of the tabs or dropdown layout, use the
`tabsProps` or `dropdownProps` props for `ResponsiveTabs` and
`ResponsiveNavigationTabs`. These props will configure the underlying tabs and
dropdown components. For more details about what can be configured, see docs for
[Tabs](./?path=/docs/packages-tabs-responsivetabs-subcomponents-tabs--docs)
and [NavigationTabs](./?path=/docs/packages-tabs-responsivenavigationtabs-subcomponents-navigationtabs--docs)

### Opting out of responsive behaviour

For most cases, we strongly suggest using the `ResponsiveTabs` and `ResponsiveNavigationTabs`
components. If there is a specific case where the tabs should not be responsive,
use the `NavigationTabs` or `Tabs` components directly. Reach out to the
Wonder Blocks team if you are running into limitations with the responsive
components!


---

## Components & Guides

- [Responsive Navigation Tabs](responsive-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs](responsive-navigation-tabs-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs Accessibility](responsive-navigation-tabs-navigation-tabs-accessibility.md)
- [Responsive Navigation Tabs Navigation Tabs Dropdown](responsive-navigation-tabs-navigation-tabs-dropdown.md)
- [Responsive Navigation Tabs Navigation Tabs Navigation Tab Item](responsive-navigation-tabs-navigation-tabs-navigation-tab-item.md)
- [Responsive Tabs](responsive-tabs.md)
- [Responsive Tabs Tabs](responsive-tabs-tabs.md)
- [Responsive Tabs Tabs Accessibility](responsive-tabs-tabs-accessibility.md)
- [Responsive Tabs Tabs Dropdown](responsive-tabs-tabs-dropdown.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
