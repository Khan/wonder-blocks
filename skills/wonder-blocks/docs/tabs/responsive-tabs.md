# ResponsiveTabs

> Package: `@khanacademy/wonder-blocks-tabs`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` |  | A unique id for the component. |
| `testId` | `string` |  | Optional test ID for e2e testing. |
| `tabs` | `ResponsiveTabItem[]` | *required* | The tabs to render. |
| `selectedTabId` | `string` | *required* | The id of the tab that is selected. |
| `onTabSelected` | `(id: string) => void` | *required* | Called when a tab is selected. |
| `onLayoutChange` | `(layout: "tabs" \| "dropdown") => void` |  | Called when the layout changes. |
| `tabsProps` | `Omit<TabsProps, "tabs" \| "selectedTabId" \| "onTabSelected" \| "aria-label" \| "aria-labelledby">` |  | Additional props to pass to the Tabs component when it is used. |
| `dropdownProps` | `Omit<TabsDropdownProps, "tabs" \| "selectedTabId" \| "onTabSelected" \| "aria-label" \| "aria-labelledby">` |  | Additional props to pass to the TabsDropdown component when it is used. |
| `styles` | `{ root?: StyleType }` |  | Custom styles for the ResponsiveTabs component. |

---

## Default

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

---

## Interactive

ResponsiveTabs will switch between the tabs and dropdown layouts based on if
there is enough horizontal space to display the tabs.
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
        <ControlledResponsiveTabs
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
        <Button
            onClick={() => {
                setShowIcons(!showIcons);
            }}
        >
            Toggle icons
        </Button>
    </View>
</View>
```

---

## Custom Styles

Custom styles can be set for the ResponsiveTabs component using the `styles` prop.
The following parts can be styled:
- `root`: Styles the root `div` element.
To customize the styles of the tabs or dropdown, set the `styles` prop on
the `tabsProps` or `dropdownProps` props. See the `Tabs` and `TabsDropdown`
docs for more details.

```tsx
<ResponsiveTabs styles={{
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
<View>
    <ResponsiveTabs
        tabs={[
            {
                label: "Tab 1",
                id: "tab-1",
                panel: <div>Tab contents 1</div>,
                "aria-label": "Tab 1 aria-label",
            },
            {
                label: "Tab 2",
                id: "tab-2",
                panel: <div>Tab contents 2</div>,
                "aria-label": "Tab 2 aria-label",
            },
            {
                label: "Tab 3",
                id: "tab-3",
                panel: <div>Tab contents 3</div>,
                "aria-label": "Tab 3 aria-label",
            },
        ]}
        selectedTabId={selectedTabId}
        onTabSelected={setSelectedTabId}
    />
</View>
```

---

## Tab Icons

Tab items can be provided with an icon. They can be a `PhosphorIcon` or
`Icon` component.

```tsx
<View>
    <ResponsiveTabs
        tabs={[
            {
                label: "Tab 1 with Phosphor icon",
                id: "tab-1",
                panel: <div>Tab contents 1</div>,
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
                panel: <div>Tab contents 2</div>,
                icon: (
                    <Icon>
                        <img src="logo.svg" alt="Wonder Blocks" />
                    </Icon>
                ),
            },
            {
                label: "Tab 3 with presentational icon",
                id: "tab-3",
                panel: <div>Tab contents 3</div>,
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
                panel: <div>Tab contents 4</div>,
            },
        ]}
        selectedTabId={selectedTabId}
        onTabSelected={setSelectedTabId}
    />
</View>
```

---

## Customizing Tabs And Dropdown Props

Use the `tabsProps` and `dropdownProps` props to customize the tabs and
dropdown. For example, you can enable animation or change the activation mode
for the tabs layout.
See the `Tabs` and `TabsDropdown` docs for more details.

```tsx
<View>
    <ResponsiveTabs
        tabs={[
            {label: "Tab 1", id: "tab-1", panel: <div>Tab contents 1</div>},
            {label: "Tab 2", id: "tab-2", panel: <div>Tab contents 2</div>},
            {label: "Tab 3", id: "tab-3", panel: <div>Tab contents 3</div>},
        ]}
        tabsProps={{
            animated: true,
            activationMode: "automatic",
        }}
        selectedTabId={selectedTabId}
        onTabSelected={setSelectedTabId}
    />
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Responsive Navigation Tabs](responsive-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs](responsive-navigation-tabs-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs Accessibility](responsive-navigation-tabs-navigation-tabs-accessibility.md)
- [Responsive Navigation Tabs Navigation Tabs Dropdown](responsive-navigation-tabs-navigation-tabs-dropdown.md)
- [Responsive Navigation Tabs Navigation Tabs Navigation Tab Item](responsive-navigation-tabs-navigation-tabs-navigation-tab-item.md)
- [Responsive Tabs Tabs](responsive-tabs-tabs.md)
- [Responsive Tabs Tabs Accessibility](responsive-tabs-tabs-accessibility.md)
- [Responsive Tabs Tabs Dropdown](responsive-tabs-tabs-dropdown.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
