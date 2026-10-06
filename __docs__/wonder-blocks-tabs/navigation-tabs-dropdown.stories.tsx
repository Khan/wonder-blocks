import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {NavigationTabsDropdown} from "../../packages/wonder-blocks-tabs/src/components/navigation-tabs-dropdown";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import navigationTabsDropdownArgTypes from "./navigation-tabs-dropdown.argtypes";

export default {
    title: "Packages / Tabs / ResponsiveNavigationTabs / Subcomponents / NavigationTabsDropdown",
    component: NavigationTabsDropdown,
    argTypes: navigationTabsDropdownArgTypes,
    parameters: {
        chromatic: {
            // Visual regression testing is done in the testing snapshots stories
            disableSnapshot: true,
        },
    },
    args: {
        "aria-label": "Navigation Tabs Dropdown Component",
    },
} as Meta<typeof NavigationTabsDropdown>;

type Story = StoryObj<typeof NavigationTabsDropdown>;

const ControlledNavigationTabsDropdown = (
    props: PropsFor<typeof NavigationTabsDropdown>,
) => {
    const {selectedTabId: initialSelectedTabId, ...restProps} = props;
    const [selectedTabId, setSelectedTabId] =
        React.useState(initialSelectedTabId);

    return (
        <NavigationTabsDropdown
            {...restProps}
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
        />
    );
};

export const Default: Story = {
    args: {
        tabs: [
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
        ],
        selectedTabId: "tab-1",
    },
    render: ControlledNavigationTabsDropdown,
};

/**
 * Normally, the label of the selected tab is displayed in the opener. However,
 * if the selected tab id is invalid, a built-in "Tabs" label is used for the
 * opener instead. It can be overridden using the `labels.defaultOpenerLabel`
 * prop.
 */
export const InvalidSelectedTabId: Story = {
    args: {
        tabs: [
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
        ],
        selectedTabId: "invalid-tab-id",
    },
    render: function Render(args) {
        const defaultLabelId = React.useId();
        const customLabelId = React.useId();

        return (
            <View style={{gap: sizing.size_200}}>
                <View style={{gap: sizing.size_080}}>
                    <BodyText id={defaultLabelId}>
                        Default opener label
                    </BodyText>
                    <ControlledNavigationTabsDropdown
                        tabs={args.tabs}
                        selectedTabId={args.selectedTabId}
                        aria-labelledby={defaultLabelId}
                    />
                </View>
                <View style={{gap: sizing.size_080}}>
                    <BodyText id={customLabelId}>
                        Custom opener label using labels.defaultOpenerLabel prop
                    </BodyText>
                    <ControlledNavigationTabsDropdown
                        tabs={args.tabs}
                        selectedTabId={args.selectedTabId}
                        aria-labelledby={customLabelId}
                        labels={{defaultOpenerLabel: "Custom Tabs Label"}}
                    />
                </View>
            </View>
        );
    },
};

/**
 * The navigation tab items can be provided with an icon.
 */
export const TabIcons: Story = {
    args: {
        tabs: [
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
        ],
        selectedTabId: "tab-1",
    },
    render: ControlledNavigationTabsDropdown,
};

/**
 * Use the `showDivider` prop to show a divider under the tabs. `showDivider` is
 * `false` by default.
 */
export const ShowDivider: Story = {
    args: {
        tabs: [
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
        ],
        selectedTabId: "tab-1",
        showDivider: true,
    },
    render: ControlledNavigationTabsDropdown,
};
