import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {TabsDropdown} from "../../packages/wonder-blocks-tabs/src/components/tabs-dropdown";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import tabsDropdownArgTypes from "./tabs-dropdown.argtypes";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    title: "Packages / Tabs / Tabs / Subcomponents / TabsDropdown",
    component: TabsDropdown,
    parameters: {
        chromatic: {
            // Visual regression testing is done in the testing snapshots stories
            disableSnapshot: true,
        },
    },
    argTypes: tabsDropdownArgTypes,
    args: {
        "aria-label": "Tabs Dropdown Component",
    },
} as Meta<typeof TabsDropdown>;

type Story = StoryObj<typeof TabsDropdown>;

const tabs = [
    {
        label: "Tab Dropdown Item 1",
        id: "tab-1",
        panel: <div>Tab contents 1</div>,
    },
    {
        label: "Tab Dropdown Item 2",
        id: "tab-2",
        panel: <div>Tab contents 2</div>,
    },
];

function ControlledTabsDropdown(props: PropsFor<typeof TabsDropdown>) {
    const [selectedTabId, setSelectedTabId] = React.useState(
        props.selectedTabId,
    );

    const [opened, setOpened] = React.useState<boolean | undefined>(undefined);
    React.useEffect(() => {
        // Update opened after initial render so that the dropdown popper is
        // placed correctly
        if (props.opened !== undefined) {
            setOpened(props.opened);
        }
    }, [props.opened]);

    return (
        <TabsDropdown
            {...props}
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
            opened={opened}
        />
    );
}

export const Default: Story = {
    args: {
        tabs,
        selectedTabId: "tab-1",
    },
    render: ControlledTabsDropdown,
};

/**
 * The TabsDropdown component supports explicitly setting the opened state of
 * the dropdown.
 */
export const Opened: Story = {
    args: {
        tabs,
        selectedTabId: "tab-1",
        opened: true,
        styles: {
            root: {
                paddingBlockEnd: sizing.size_800,
            },
        },
    },
    render: ControlledTabsDropdown,
};

/**
 * Normally, the label of the selected tab is displayed in the opener. However,
 * if the selected tab id is invalid, the `labels.defaultOpenerLabel` will be
 * used to label the opener. If the `labels.defaultOpenerLabel` is not set, a
 * default untranslated string is used.
 */
export const InvalidSelectedTabId: Story = {
    args: {
        tabs,
        selectedTabId: "invalid-tab-id",
        labels: {
            defaultOpenerLabel: "Custom Tabs Label",
        },
    },
    render: ControlledTabsDropdown,
};

/**
 * The tab items can be provided with an aria-label.
 */
export const TabAriaLabel: Story = {
    args: {
        tabs: [
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
        ],
        selectedTabId: "tab-1",
    },
    render: ControlledTabsDropdown,
};

/**
 * The tab items can be provided with an icon.
 */
export const TabIcons: Story = {
    args: {
        tabs: [
            {
                label: "Tab 1 with Phosphor icon",
                id: "tab-1",
                panel: <div>Tab contents 1</div>,
                icon: (
                    <PhosphorIcon
                        size="medium"
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
                    <Icon size="medium">
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
                        size="medium"
                        icon={IconMappings.iceCream}
                        aria-hidden={true}
                    />
                ),
            },
        ],
        selectedTabId: "tab-1",
    },
    render: ControlledTabsDropdown,
};
