# TabsDropdown

> Package: `../../packages/wonder-blocks-tabs/src/components/tabs-dropdown`

---

## Default

```tsx
<TabsDropdown tabs={tabs} selectedTabId="tab-1" />
```

---

## Opened

The TabsDropdown component supports explicitly setting the opened state of
the dropdown.

```tsx
<TabsDropdown tabs={tabs} selectedTabId="tab-1" opened styles={{
            root: {
                paddingBlockEnd: sizing.size_800,
            },
        }} />
```

---

## Invalid Selected Tab Id

Normally, the label of the selected tab is displayed in the opener. However,
if the selected tab id is invalid, the `labels.defaultOpenerLabel` will be
used to label the opener. If the `labels.defaultOpenerLabel` is not set, a
default untranslated string is used.

```tsx
<TabsDropdown tabs={tabs} selectedTabId="invalid-tab-id" labels={{
            defaultOpenerLabel: "Custom Tabs Label",
        }} />
```

---

## Tab Aria Label

The tab items can be provided with an aria-label.

```tsx
<TabsDropdown tabs={[
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
        ]} selectedTabId="tab-1" />
```

---

## Tab Icons

The tab items can be provided with an icon.

```tsx
<TabsDropdown tabs={[
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
        ]} selectedTabId="tab-1" />
```



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
- [Responsive Tabs Tabs Accessibility](responsive-tabs-tabs-accessibility.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
