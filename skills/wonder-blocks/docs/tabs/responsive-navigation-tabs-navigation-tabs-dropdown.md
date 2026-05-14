# NavigationTabsDropdown

> Package: `../../packages/wonder-blocks-tabs/src/components/navigation-tabs-dropdown`

---

## Default

```tsx
<NavigationTabsDropdown
    aria-label="Navigation Tabs Dropdown Component"
    tabs={[
            {
                id: "tab-1",
                label: "Navigation tab 1",
                href: "#tab-1",
            },
            {
                id: "tab-2",
                label: "Navigation tab 2",
                href: "#tab-2",
            },
            {
                id: "tab-3",
                label: "Navigation tab 3",
                href: "#tab-3",
            },
        ]}
    {...restProps}
    selectedTabId={selectedTabId}
    onTabSelected={setSelectedTabId}
/>
```

---

## Tab Icons

The navigation tab items can be provided with an icon.

```tsx
<NavigationTabsDropdown
    aria-label="Navigation Tabs Dropdown Component"
    tabs={[
            {
                label: "Tab 1 with Phosphor icon",
                id: "tab-1",
                href: "#tab-1",
                icon: (
                    <PhosphorIcon
                        icon={IconMappings.cookieBold}
                        aria-label="Cookie"
                    />
                ),
            },
            {
                label: "Tab 2 with custom icon",
                id: "tab-2",
                href: "#tab-2",
                icon: (
                    <Icon>
                        <img src="logo.svg" alt="Wonder Blocks" />
                    </Icon>
                ),
            },
            {
                label: "Tab 3 with presentational icon",
                id: "tab-3",
                href: "#tab-3",
                icon: (
                    <PhosphorIcon
                        icon={IconMappings.iceCream}
                        aria-hidden={true}
                    />
                ),
            },
        ]}
    {...restProps}
    selectedTabId={selectedTabId}
    onTabSelected={setSelectedTabId}
/>
```

---

## Show Divider

Use the `showDivider` prop to show a divider under the tabs. `showDivider` is
`false` by default.

```tsx
<NavigationTabsDropdown
    aria-label="Navigation Tabs Dropdown Component"
    tabs={[
            {
                label: "Navigation tab 1",
                id: "tab-1",
                href: "#tab-1",
            },
            {
                label: "Navigation tab 2",
                id: "tab-2",
                href: "#tab-2",
            },
            {
                label: "Navigation tab 3",
                id: "tab-3",
                href: "#tab-3",
            },
        ]}
    showDivider
    {...restProps}
    selectedTabId={selectedTabId}
    onTabSelected={setSelectedTabId}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Responsive Navigation Tabs](responsive-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs](responsive-navigation-tabs-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs Accessibility](responsive-navigation-tabs-navigation-tabs-accessibility.md)
- [Responsive Navigation Tabs Navigation Tabs Navigation Tab Item](responsive-navigation-tabs-navigation-tabs-navigation-tab-item.md)
- [Responsive Tabs](responsive-tabs.md)
- [Responsive Tabs Tabs](responsive-tabs-tabs.md)
- [Responsive Tabs Tabs Accessibility](responsive-tabs-tabs-accessibility.md)
- [Responsive Tabs Tabs Dropdown](responsive-tabs-tabs-dropdown.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
