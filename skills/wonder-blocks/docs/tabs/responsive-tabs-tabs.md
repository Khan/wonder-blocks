# Tabs

> Package: `@khanacademy/wonder-blocks-tabs`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` |  | A unique id to use as the base of the ids for the elements within the |
| `testId` | `string` |  | Optional test ID for e2e testing. Here is how the test id is used for the |
| `tabs` | `Array<TabItem>` | *required* | The tabs to render. The Tabs component will wire up the tab and panel |
| `selectedTabId` | `string` | *required* | The id of the tab that is selected. |
| `onTabSelected` | `(id: string) => unknown` | *required* | Called when a tab is selected. |
| `activationMode` | `"manual" \| "automatic"` |  | The mode of activation for the tabs for keyboard navigation. Defaults to |
| `animated` | `boolean` |  | Whether to include animation in the `Tabs` component. This should be |
| `styles` | `{ root?: StyleType; tablist?: StyleType; tab?: StyleType; tabPanel?: StyleType }` |  | Custom styles for the `Tabs` component. |
| `mountAllPanels` | `boolean` |  | Whether to mount all tab panels when the component mounts. |
| `scrollableElementRef` | `React.RefObject` |  | Optional ref to the scrollable wrapper element. |

---

## Default

```tsx
<Tabs />
```

---

## Manual Activation

When `activationMode` is set to `manual`, the tab will only be activated
via keyboard when a tab receives focus and is selected by pressing `Space`
or `Enter`.

```tsx
<Tabs activationMode="manual" />
```

---

## Automatic Activation

When `activationMode` is set to `automatic`, the tab will be activated via
keyboard when a tab receives focus.

```tsx
<Tabs activationMode="automatic" />
```

---

## With Icons

Tab items support an `icon` prop to display in the tab. This should use a
`PhosphorIcon` or `Icon` component. Prefer using the `icon`
prop over providing a custom element in the `label` prop.

```tsx
<Tabs tabs={[
            {
                label: "Tab 1",
                id: "tab-1",
                panel: <Placeholder>Tab contents 1</Placeholder>,
                icon: <PhosphorIcon icon={IconMappings.cookie} />,
            },
            {
                label: "Tab 2",
                id: "tab-2",
                panel: <Placeholder>Tab contents 2</Placeholder>,
                icon: <PhosphorIcon icon={IconMappings.iceCream} />,
            },
            {
                label: "Tab 3",
                id: "tab-3",
                panel: <Placeholder>Tab contents 3</Placeholder>,
                icon: (
                    <Icon>
                        <img src="logo.svg" alt="Wonder Blocks" />
                    </Icon>
                ),
            },
        ]} selectedTabId="tab-1" />
```

---

## With Focusable Content

When a tab panel has focusable elements, pressing `Tab` from the tablist
will move focus to the first focusable element in the tab panel. If there
are no focusable elements in the active tab panel, the tab panel will be
focusable instead.
Note: When any descendant elements of the tab panel change, the focusability
of the tab panel will be updated to reflect if it has focusable elements.
This applies to when the tab panel changes from having no
focusable elements in a loading state to having focusable elements once loading
is complete.

```tsx
<Tabs
    aria-label="Tabs Example"
    tabs={tabs}
    selectedTabId={selectedTabId}
    onTabSelected={setSelectedTabId}
/>
```

---

## Animated

The `animated` prop can be set to `true` to animate the current underline
indicator. By default, `animated` is set to `false`.

```tsx
<Tabs animated />
```

---

## Animations Disabled

When the `animated` prop is `false`, there is no animation when the current
tab changes.  By default, `animated` is set to `false`.

```tsx
<Tabs animated={false} />
```

---

## Panel Caching

When `mountAllPanels` is `false` or not set, the tab panels are cached and
only mounted once a tab is selected to prevent unnecessary mounting/unmounting
of tab panel contents.
In this example, the panels contain components that print out a message in
the Storybook actions panel whenever it is mounted. Notice that a panel is
only mounted when it is selected the first time. Visiting a tab that has
already been selected will not cause the tab panel to be mounted again.

```tsx
<Tabs tabs={[
            {
                label: "Tab 1",
                id: "tab-1",
                panel: <PanelExample label="Tab 1" />,
            },
            {
                label: "Tab 2",
                id: "tab-2",
                panel: <PanelExample label="Tab 2" />,
            },
            {
                label: "Tab 3",
                id: "tab-3",
                panel: <PanelExample label="Tab 3" />,
            },
        ]} />
```

---

## Mount All Panels

If you need to ensure that all tab panels are always in the DOM, you can
set the `mountAllPanels` prop to `true`. By default, `mountAllPanels` is
set to `false`.
This is helpful for tabbed content that needs to be available in the DOM for
SEO purposes.
In this example, the panels contain components that print out a message in
the Storybook actions panel whenever it is mounted. Notice that all panels
are mounted when the component mounts. And panels are not remounted when
switching tabs. When inspecting the DOM, you will also see that all the
panel contents are there.

```tsx
<Tabs mountAllPanels tabs={[
            {
                label: "Tab 1",
                id: "tab-1",
                panel: <PanelExample label="Tab 1" />,
            },
            {
                label: "Tab 2",
                id: "tab-2",
                panel: <PanelExample label="Tab 2" />,
            },
            {
                label: "Tab 3",
                id: "tab-3",
                panel: <PanelExample label="Tab 3" />,
            },
        ]} />
```

---

## Custom Styles

The following example shows how the `styles` prop can be used to apply
custom styles to different elements in the `Tabs` component.

```tsx
<Tabs styles={{
            root: {border: "2px solid lightpink"},
            tablist: {backgroundColor: "lavender"},
            tabPanel: {backgroundColor: "lavenderblush"},
            tab: {backgroundColor: "lightcyan"},
        }} tabs={[
            {
                label: "Tab 1",
                id: "tab-1",
                panel: <div>Tab contents 1</div>,
            },
            {
                label: "Tab 2",
                id: "tab-2",
                panel: <div>Tab contents 2</div>,
            },
            {
                label: (
                    <View
                        style={{
                            backgroundColor: "honeydew",
                            fontStyle: "italic",
                        }}
                    >
                        Tab with custom style
                    </View>
                ),
                id: "tab-3",
                panel: (
                    <View
                        style={{
                            backgroundColor: "honeydew",
                            fontStyle: "italic",
                        }}
                    >
                        Tab contents with custom style
                    </View>
                ),
            },
        ]} />
```

---

## Tab Label Render Function

For specific use cases where the underlying tab element is wrapped
by another component (like a `Tooltip` or `Popover`), a render function
can be used with the `Tab` component instead. The render function
provides the tab props that should be applied to the `Tab` component.
You will also need to set a `key` on the root element of the render function
since the tabs are rendered in a loop.
This story demonstrates how a render function could be used to wrap a `Tab`
component in a `Tooltip` and a `Popover`. Please test the accessibility for
your use case, especially around focus management, keyboard interactions, and
screenreader support!
#### Current screenreader behaviour
##### Tooltips
###### ** Expected behaviour: ** The tooltip content is announced when the tab is focused.
- Chrome + NVDA, Firefox + NVDA: Works as expected - the tooltip content is
announced when the tab is focused (both when a tooltip is already opened and
when it is not yet opened)
- Safari + VoiceOver: Only announces the tooltip content if the tooltip on
the tab was already opened. It does not announce the tooltip content when
focusing on a tab that opens a tooltip.
##### Popovers
###### ** Expected behaviour: ** Focusing on a tab with a popover will announce that it is expanded or collapsed.
- Chrome + NVDA,Firefox + NVDA, Safari + VoiceOver: Works as expected - it is
announced that the tab is expanded or collapsed when it is focused.
###### ** Expected behaviour: ** A popover that is already opened is in the tab order
- Chrome + NVDA, Firefox + NVDA, Safari + VoiceOver: The popover contents can
be tabbed to.
- The popover focus management is handled by the `Popover` component, see the
`Popover Accessibility` docs for more details.
###### ** Expected behaviour: ** Selecting a tab with a popover (using `Space` or `Enter`) will open the popover and update the selected tab.
- Chrome + NVDA, Firefox + NVDA, Safari + VoiceOver: Works as expected - the
popover is opened and the selected tab is updated. The popover contents are
announced and can be interacted with.
- The popoverfocus management is handled by the `Popover` component, see the
`Popover Accessibility` docs for more details.

```tsx
<ControlledTabs
    aria-label="Test"
    tabs={tabs}
    selectedTabId={"tab-1"}
    styles={{
        root: {
            paddingBlock: sizing.size_960,
            marginBlock: sizing.size_960,
        },
    }}
/>
```

---

## Right To Left

If an ancestor element of the `Tabs` component has `dir="rtl"`, the
keyboard arrow navigation will be reversed:
- `{ArrowRight}` will move focus to the previous tab
- `{ArrowLeft}` will move focus to the next tab
`{Home}` continues to move focus to the first tab. `{End}` continues to move
focus to the last tab.

```tsx
<Tabs tabs={generateTabs(3, "Tab", false)} selectedTabId="tab-1" />
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
- [Responsive Tabs Tabs Accessibility](responsive-tabs-tabs-accessibility.md)
- [Responsive Tabs Tabs Dropdown](responsive-tabs-tabs-dropdown.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
