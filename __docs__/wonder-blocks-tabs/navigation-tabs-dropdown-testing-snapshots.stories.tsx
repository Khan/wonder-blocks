import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {NavigationTabsDropdown} from "../../packages/wonder-blocks-tabs/src/components/navigation-tabs-dropdown";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {allModes, themeModes} from "../../.storybook/modes";

export default {
    title: "Packages / Tabs / NavigationTabs / Subcomponents / NavigationTabsDropdown / Testing / NavigationTabsDropdown - Snapshots",
    component: NavigationTabsDropdown,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: {...themeModes, small: allModes.small},
        },
    },
} as Meta<typeof NavigationTabsDropdown>;

type Story = StoryObj<typeof NavigationTabsDropdown>;

const ControlledNavigationTabsDropdown = (
    props: React.ComponentProps<typeof NavigationTabsDropdown>,
) => {
    const [selectedTabId, setSelectedTabId] = React.useState(
        props.selectedTabId,
    );

    return (
        <NavigationTabsDropdown
            {...props}
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
        />
    );
};

export const Scenarios: Story = {
    render: () => {
        const scenarios = [
            {
                name: "With custom styles",
                props: {
                    tabs: [
                        {
                            label: "Tab 1",
                            id: "tab-1",
                            href: "#tab-1",
                        },
                    ],
                    selectedTabId: "tab-1",
                    styles: {
                        root: {
                            border: `${border.width.thin} solid ${semanticColor.core.border.instructive.subtle}`,
                        },
                        opener: {
                            textTransform: "uppercase",
                        },
                        actionMenu: {
                            backgroundColor:
                                semanticColor.core.background.base.subtle,
                        },
                    },
                },
            },
        ];

        return (
            <ScenariosLayout
                scenarios={scenarios}
                styles={{root: {width: "100%", alignItems: "stretch"}}}
            >
                {(props, name) => (
                    <ControlledNavigationTabsDropdown
                        {...props}
                        aria-label={name}
                    />
                )}
            </ScenariosLayout>
        );
    },
};

export const SmallScreenScenarios = {
    render: Scenarios.render,
    globals: {
        viewport: {
            value: "small",
        },
    },
    parameters: {
        chromatic: {
            // Disabling snapshots for this because small screen is covered by
            // the modes for the main Scenarios story
            disableSnapshot: true,
        },
    },
};
