# ResponsiveNavigationTabs

> Package: `@khanacademy/wonder-blocks-tabs`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` |  | A unique id for the component. |
| `testId` | `string` |  | Optional test ID for e2e testing. |
| `tabs` | `ResponsiveNavigationTabItem[]` | *required* | The navigation tabs to render. |
| `selectedTabId` | `string` | *required* | The id of the tab that is selected (current page). |
| `onTabSelected` | `(id: string) => void` |  | Called when a navigation tab is selected. |
| `onLayoutChange` | `(layout: "tabs" \| "dropdown") => void` |  | Called when the layout changes between NavigationTabs and |
| `tabsProps` | `Omit<NavigationTabsProps, "children" \| "aria-label" \| "aria-labelledby" \| "tag">` |  | Additional props to pass to the NavigationTabs component when it is used. |
| `dropdownProps` | `Omit<NavigationTabsDropdownProps, "tabs" \| "selectedTabId" \| "onTabSelected" \| "aria-label" \| "aria-labelledby" \| "tag">` |  | Additional props to pass to the NavigationTabsDropdown component when it |
| `styles` | `{ root?: StyleType }` |  | Custom styles for the ResponsiveNavigationTabs component. |
| `aria-label` | `string` |  | Accessible label for the navigation element. |
| `aria-labelledby` | `string` |  | If there is a visual label for the navigation tabs already, set |
| `tag` | `keyof JSX.IntrinsicElements` |  | The HTML tag to use. Defaults to `nav` in both layouts. |
| `showDivider` | `boolean` |  | Whether to show a divider under the tabs. Defaults to `false`. |

---

## Default

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

---

## Interactive

ResponsiveNavigationTabs will switch between the NavigationTabs and
NavigationTabsDropdown layouts based on if there is enough horizontal space
to display the tabs.
Some things that can affect this are:
- the length of tab labels, especially with translated text
- the number of tabs
- the width of the container or screen
- the zoom level

```tsx
<View
    style={{
        gap: sizing.size_360,
    }}
>
    <View
        style={{width: containerWidth, zoom: zoomLevel ?? "100%"}}
    >
        <ControlledResponsiveNavigationTabs
            selectedTabId="tab-1"
            onTabSelected={() => {}}
            tabs={tabs}
        />
    </View>
    <View
        style={{
            flexDirection: "row",
            gap: sizing.size_160,
            flexWrap: "wrap",
        }}
    >
        <Button onClick={() => setShowLongLabels(!showLongLabels)}>
            Update tab labels
        </Button>
        <Button onClick={() => setTabsCount(tabsCount + 1)}>
            Add a tab
        </Button>
        <Button
            onClick={() => {
                if (tabsCount > 1) {
                    setTabsCount(tabsCount - 1);
                }
            }}
        >
            Remove a tab
        </Button>
        <Button
            onClick={() => {
                setContainerWidth(
                    containerWidth === undefined
                        ? "200px"
                        : undefined,
                );
            }}
        >
            Change container width
        </Button>
        <Button
            onClick={() => {
                setZoomLevel(
                    zoomLevel === undefined ? 4 : undefined,
                );
            }}
        >
            Simulate zoom
        </Button>

        <Button onClick={() => setShowIcons(!showIcons)}>
            Toggle icons
        </Button>
    </View>
</View>
```

---

## Custom Styles

Custom styles can be applied to ResponsiveNavigationTabs using the `styles`
prop.
The following parts can be styled:
- `root`: Styles the root container element.
To customize the styles of the navigation tabs or dropdown, set the `styles`
prop on the `tabsProps` or `dropdownProps` props.
See the `NavigationTabs` and `NavigationTabsDropdown` docs for more details.

```tsx
<ResponsiveNavigationTabs styles={{
            root: {
                outline: `${border.width.medium} dashed ${semanticColor.core.border.instructive.subtle}`,
                outlineOffset: border.width.medium,
            },
        }} tabsProps={{
            styles: {
                root: {
                    outline: `${border.width.medium} solid ${semanticColor.core.border.success.subtle}`,
                },
            },
        }} dropdownProps={{
            styles: {
                root: {
                    outline: `${border.width.medium} solid ${semanticColor.core.border.critical.subtle}`,
                },
            },
        }} />
```

---

## Tab Item Aria Label

The tab items can be provided with an aria-label.

```tsx
<ResponsiveNavigationTabs
    tabs={[
            {
                label: "Navigation tab 1",
                id: "tab-1",
                href: "#tab-1",
                "aria-label": "Tab 1 aria-label",
            },
            {
                label: "Navigation tab 2",
                id: "tab-2",
                href: "#tab-2",
                "aria-label": "Tab 2 aria-label",
            },
            {
                label: "Navigation tab 3",
                id: "tab-3",
                href: "#tab-3",
                "aria-label": "Tab 3 aria-label",
            },
        ]}
    selectedTabId={selectedTabId}
    onTabSelected={setSelectedTabId}
/>
```

---

## Tab Icons

ResponsiveNavigationTabs can include icons to provide visual context.
Icons are displayed in both tabs and dropdown layouts.

```tsx
<ResponsiveNavigationTabs
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
            {
                label: "Tab 4 with no icon",
                id: "tab-4",
                href: "#tab-4",
            },
        ]}
    selectedTabId={selectedTabId}
    onTabSelected={setSelectedTabId}
/>
```

---

## Show Divider

Use the `showDivider` prop to show a divider under the tabs. `showDivider` is
`false` by default.

```tsx
<ResponsiveNavigationTabs
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
    selectedTabId={selectedTabId}
    onTabSelected={setSelectedTabId}
/>
```

---

## Customizing Tabs And Dropdown Props

Use the `tabsProps` and `dropdownProps` props to customize the tabs and
dropdown. For example, you can enable animation for the tabs layout.
See the `NavigationTabs` and `NavigationTabsDropdown` docs for more details.

```tsx
<ResponsiveNavigationTabs
    tabs={[
            {label: "Navigation Tab 1", id: "tab-1", href: "#tab-1"},
            {label: "Navigation Tab 2", id: "tab-2", href: "#tab-2"},
            {label: "Navigation Tab 3", id: "tab-3", href: "#tab-3"},
        ]}
    tabsProps={{
            animated: true,
        }}
    selectedTabId={selectedTabId}
    onTabSelected={setSelectedTabId}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Responsive Navigation Tabs Navigation Tabs](responsive-navigation-tabs-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs Accessibility](responsive-navigation-tabs-navigation-tabs-accessibility.md)
- [Responsive Navigation Tabs Navigation Tabs Dropdown](responsive-navigation-tabs-navigation-tabs-dropdown.md)
- [Responsive Navigation Tabs Navigation Tabs Navigation Tab Item](responsive-navigation-tabs-navigation-tabs-navigation-tab-item.md)
- [Responsive Tabs](responsive-tabs.md)
- [Responsive Tabs Tabs](responsive-tabs-tabs.md)
- [Responsive Tabs Tabs Accessibility](responsive-tabs-tabs-accessibility.md)
- [Responsive Tabs Tabs Dropdown](responsive-tabs-tabs-dropdown.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
