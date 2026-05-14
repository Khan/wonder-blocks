# NavigationTabs

> Package: `@khanacademy/wonder-blocks-tabs`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactElement \| Array<React.ReactElement>` | *required* | The NavigationTabItem components to render. |
| `id` | `string` |  | An id for the navigation element. |
| `testId` | `string` |  | Optional test ID for e2e testing. |
| `aria-label` | `string` |  | Accessible label for the navigation element. |
| `aria-labelledby` | `string` |  | If there is a visual label for the navigation tabs already, set |
| `styles` | `{ root?: StyleType; list?: StyleType }` |  | Custom styles for the elements in NavigationTabs. |
| `animated` | `boolean` |  | Whether to include animation in the `NavigationTabs`. This should be false |
| `tag` | `keyof JSX.IntrinsicElements` |  | The HTML tag to render. Defaults to `nav`. |
| `showDivider` | `boolean` |  | Whether to show a divider under the tabs. Defaults to `false`. |

---

## Default

```tsx
<NavigationTabs>
  {navigationTabItems}
</NavigationTabs>
```

---

## With Icons

Use the `Link` props for setting things like icons.

```tsx
<NavigationTabs>
  {[
            <NavigationTabItem key="with-icons-1">
                <Link href="https://khanacademy.org" target="_blank">
                    External Link
                </Link>
            </NavigationTabItem>,
            <NavigationTabItem key="with-icons-2">
                <Link
                    href="#link2"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.cookie} size="small" />
                    }
                >
                    Start Icon
                </Link>
            </NavigationTabItem>,
            <NavigationTabItem key="with-icons-3">
                <Link
                    href="#link3"
                    endIcon={
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            size="small"
                        />
                    }
                >
                    End Icon
                </Link>
            </NavigationTabItem>,
            <NavigationTabItem current={true} key="with-icons-4">
                <Link
                    href="#link4"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.cookie} size="small" />
                    }
                    endIcon={
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            size="small"
                        />
                    }
                >
                    Start and End Icons
                </Link>
            </NavigationTabItem>,
        ]}
</NavigationTabs>
```

---

## Custom Styles

Custom styles can be set for the elements in NavigationTabs using the
`styles` prop.
If there is a specific use case where the styling needs to be
overridden, please reach out to the Wonder Blocks team!

```tsx
<NavigationTabs styles={{
            root: {
                padding: sizing.size_160,
            },
            list: {
                gap: sizing.size_400,
            },
        }}>
  {navigationTabItems}
</NavigationTabs>
```

---

## Header With Navigation Tabs Example

Here is an example of the `NavigationTabs` component used within a header.
Note: To line up the header bottom border with the NavigationTabs underline
styling, a negative vertical margin is set on the `NavigationTabs`.

```tsx
<StyledDiv style={styles.pageStyle}>
    <StyledHeader style={styles.headerStyle}>
        <img
            animated
            src="logo-with-text.svg"
            width="80px"
            alt="Wonder Blocks logo"
        />
        <SingleSelect
            aria-label="Example select"
            placeholder="Placeholder"
            selectedValue={"item-1"}
            onChange={() => {}}
            style={{width: "200px"}}
        >
            <OptionItem value="item-1" label="Item 1" />
            <OptionItem value="item-2" label="Item 2" />
        </SingleSelect>
        <NavigationTabs
            aria-label="Secondary navigation"
            styles={{root: styles.navigationTabsRoot}}
        >
            {tabs}
        </NavigationTabs>
    </StyledHeader>
</StyledDiv>
```

---

## Animated

The `animated` prop can be set to `true` to animate the current underline
indicator. By default, `animated` is set to `false`.

```tsx
<NavigationTabs animated >{tabs}</NavigationTabs>
```

---

## Animations Disabled

When the `animated` prop is `false`, there is no animation when the current
tab changes.  By default, `animated` is set to `false`.

```tsx
<NavigationTabs animated={false} />
```

---

## No Current Tab

This story shows the behaviour when none of the tabs are the current page
initially.

```tsx
<NavigationTabs animated >{tabs}</NavigationTabs>
```

---

## Children Render Function

When a `Link` component is passed in for the `children` prop,
`NavigationTabItem` will inject props for the `Link`.
For specific use cases where the `Link` component is wrapped by another
component (like a `Tooltip` or `Popover`), a render function can be used
instead. The render function provides the Link props that should be applied
to the Link component. The Link props contains styles and attributes for
accessibility like `aria-current`.
This story demonstrates how a render function could be used to wrap a `Link`
in a `NavigationTabItem` with a `Tooltip` and a `Popover`. Please test for
accessibility for your use case, especially around focus management,
keyboard interactions, and screenreader support!
#### Current screenreader behaviour
##### Tooltips
###### ** Expected behaviour: ** The tooltip content is announced when a Link in the NavigationTabs is focused
- Chrome + NVDA: Works as expected - the tooltip content is announced
- Firefox + NVDA: Only announces the tooltip contents if the tooltip is
already opened
- Safari + VoiceOver: Does not consistently read the tooltip contents when
the link is focused
##### Popovers
###### ** Expected behaviour: ** Focusing on a link with a popover will announce that it is expanded or collapsed.
- Chrome + NVDA, Firefox + NVDA: Works as expected - it is
announced that the tab is expanded or collapsed when it is focused.
- Safari + VoiceOver: Does not communicate expanded or collapsed state.
###### ** Expected behaviour: ** A popover that is already opened is in the tab order
- Chrome + NVDA, Firefox + NVDA, Safari + VoiceOver: The popover contents can
be tabbed to.
- The popover focus management is handled by the `Popover` component, see the
`Popover Accessibility` docs for more details.
###### ** Expected behaviour: ** Selecting a tab with a popover (using `Space` or `Enter`) will open the popover and navigate the user
- Chrome + NVDA, Firefox + NVDA, Safari + VoiceOver: Works as expected - the
popover is opened and the browser navigates. The popover contents are
announced and can be interacted with.
- The popover focus management is handled by the `Popover` component, see the
`Popover Accessibility` docs for more details.

```tsx
<View
    style={{
        // Need to set the height so tooltip/popover are captured in chromatic
        minHeight: 400,
        gap: sizing.size_240,
    }}
>
    <View
        style={{
            flexDirection: "row",
            gap: sizing.size_800,
        }}
    >
        <NavigationTabs aria-label="With tooltip and popover not shown by default">
            <NavigationTabItem current={true}>
                {(linkProps) => (
                    <Tooltip content="Contents for the tooltip">
                        <Link href="#link-1" {...linkProps}>
                            Link with Tooltip
                        </Link>
                    </Tooltip>
                )}
            </NavigationTabItem>
            <NavigationTabItem>
                {(linkProps) => (
                    <Popover
                        content={
                            <PopoverContent
                                title="Title"
                                content="The popover content."
                                closeButtonVisible
                            />
                        }
                    >
                        <Link href="#link-1" {...linkProps}>
                            Link with Popover
                        </Link>
                    </Popover>
                )}
            </NavigationTabItem>
        </NavigationTabs>
    </View>
    <HeadingMedium>Opened state</HeadingMedium>
    <View
        style={{
            flexDirection: "row",
            gap: sizing.size_960,
        }}
    >
        <NavigationTabs aria-label="With tooltip and popover shown by default">
            <NavigationTabItem current={true}>
                {(linkProps) => (
                    <Tooltip
                        content="Contents for the tooltip"
                        opened={true}
                        placement="bottom"
                    >
                        <Link href="#link-1" {...linkProps}>
                            Link with Opened Tooltip
                        </Link>
                    </Tooltip>
                )}
            </NavigationTabItem>
            <NavigationTabItem>
                {(linkProps) => (
                    <Popover
                        content={
                            <PopoverContent
                                title="Title"
                                content="The popover content."
                                closeButtonVisible
                            />
                        }
                        placement="bottom"
                        opened={true}
                    >
                        <Link href="#link-1" {...linkProps}>
                            Link with Opened Popover
                        </Link>
                    </Popover>
                )}
            </NavigationTabItem>
        </NavigationTabs>
    </View>
</View>
```

---

## Tag

By default, the `NavigationTabs` component renders as a `nav` element. If
the underlying element needs to be changed, the `tag` prop can be used to
specify the HTML tag to render.

```tsx
<NavigationTabs tag="div">
  {navigationTabItems}
</NavigationTabs>
```

---

## Show Divider

Use the `showDivider` prop to show a divider under the tabs. `showDivider` is
`false` by default.

```tsx
<NavigationTabs showDivider>
  {navigationTabItems}
</NavigationTabs>
```



---

## Related docs

- [Overview](overview.md)
- [Responsive Navigation Tabs](responsive-navigation-tabs.md)
- [Responsive Navigation Tabs Navigation Tabs Accessibility](responsive-navigation-tabs-navigation-tabs-accessibility.md)
- [Responsive Navigation Tabs Navigation Tabs Dropdown](responsive-navigation-tabs-navigation-tabs-dropdown.md)
- [Responsive Navigation Tabs Navigation Tabs Navigation Tab Item](responsive-navigation-tabs-navigation-tabs-navigation-tab-item.md)
- [Responsive Tabs](responsive-tabs.md)
- [Responsive Tabs Tabs](responsive-tabs-tabs.md)
- [Responsive Tabs Tabs Accessibility](responsive-tabs-tabs-accessibility.md)
- [Responsive Tabs Tabs Dropdown](responsive-tabs-tabs-dropdown.md)
- [Responsive Tabs Tabs Dropdown Accessibility](responsive-tabs-tabs-dropdown-accessibility.md)
