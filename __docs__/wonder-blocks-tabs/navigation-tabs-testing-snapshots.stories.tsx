import type {Meta, StoryObj} from "@storybook/react-vite";
import * as React from "react";

import {StyleSheet} from "aphrodite";

import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {
    NavigationTabItem,
    NavigationTabs,
} from "@khanacademy/wonder-blocks-tabs";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import Link from "@khanacademy/wonder-blocks-link";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {
    longText,
    longTextWithNoWordBreak,
    rtlText,
} from "../components/text-for-testing";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {generateChildren} from "./navigation-tabs-utils";
import {ScenariosLayout} from "../components/scenarios-layout";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {themeModes} from "../../.storybook/modes";

const StyledA = addStyle("a");
const generateRows = (rtl: boolean = false) => [
    {
        name: "Default",
        props: {
            "aria-label": "Default navigation tabs",
            children: [
                <NavigationTabItem current={true}>
                    <Link href="#link1">
                        {rtl ? rtlText : "Navigation Tab Item 1"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link href="#link2">
                        {rtl ? rtlText : "Navigation Tab Item 2"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link href="#link3">
                        {rtl ? rtlText : "Navigation Tab Item 3"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link href="#link4">
                        {rtl ? rtlText : "Navigation Tab Item 4"}
                    </Link>
                </NavigationTabItem>,
            ],
        },
    },
    {
        name: "Link Capabilities",
        props: {
            "aria-label": "Navigation tabs with link capabilities",
            children: [
                <NavigationTabItem>
                    <Link href="https://khanacademy.org" target="_blank">
                        {rtl ? rtlText : "External Link"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link
                        href="#link2"
                        startIcon={
                            <PhosphorIcon
                                icon={IconMappings.cookie}
                                size="small"
                            />
                        }
                    >
                        {rtl ? rtlText : "Start Icon"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link
                        href="#link3"
                        endIcon={
                            <PhosphorIcon
                                icon={IconMappings.iceCream}
                                size="small"
                            />
                        }
                    >
                        {rtl ? rtlText : "End Icon"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem current={true}>
                    <Link
                        href="#link4"
                        startIcon={
                            <PhosphorIcon
                                icon={IconMappings.cookie}
                                size="small"
                            />
                        }
                        endIcon={
                            <PhosphorIcon
                                icon={IconMappings.iceCream}
                                size="small"
                            />
                        }
                    >
                        {rtl ? rtlText : "Start and End Icons"}
                    </Link>
                </NavigationTabItem>,
            ],
        },
    },
    {
        name: "Icon Only",
        props: {
            children: [
                <NavigationTabItem current={true}>
                    <IconButton
                        icon={IconMappings.iceCream}
                        aria-label="Ice cream"
                        kind="tertiary"
                        size="medium"
                        href="#link-1"
                    />
                </NavigationTabItem>,
                <NavigationTabItem>
                    <IconButton
                        icon={IconMappings.cookie}
                        aria-label="Cookie"
                        kind="tertiary"
                        size="medium"
                        href="#link-2"
                    />
                </NavigationTabItem>,
            ],
        },
    },
    {
        name: "Native anchor links",
        props: {
            children: [
                <NavigationTabItem current={true}>
                    <StyledA href="#link-1">
                        {rtl ? rtlText : "Anchor tag 1"}
                    </StyledA>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <StyledA href="#link-2">
                        {rtl ? rtlText : "Anchor tag 2"}
                    </StyledA>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <StyledA href="#link-3">
                        {rtl ? rtlText : "Anchor tag 3"}
                    </StyledA>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <StyledA href="#link-4">
                        {rtl ? rtlText : "Anchor tag 4"}
                    </StyledA>
                </NavigationTabItem>,
            ],
        },
    },
];

const rows = generateRows();
const rtlRows = generateRows(true);

const columns = [
    {
        name: "Default",
        props: {},
    },
];

type Story = StoryObj<typeof NavigationTabs>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Tabs / NavigationTabs / Testing / NavigationTabs - Snapshots ",
    component: NavigationTabs,
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof NavigationTabs>;

export default meta;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => (
        <>
            <StateSheet rows={rows} columns={columns} title="">
                {({props, name}) => (
                    <View style={styles.container}>
                        <NavigationTabs
                            {...args}
                            {...props}
                            aria-label={name}
                        />
                    </View>
                )}
            </StateSheet>
            <div dir="rtl">
                <StateSheet rows={rtlRows} columns={columns}>
                    {({props, name}) => (
                        <View style={styles.container}>
                            <NavigationTabs
                                {...args}
                                {...props}
                                aria-label={`${name} RTL`}
                            />
                        </View>
                    )}
                </StateSheet>
            </div>
        </>
    ),
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

export const Zoom: Story = {
    render: (args) => (
        <StateSheet rows={rows} columns={columns} layout="list">
            {({props, name}) => (
                <View style={styles.container}>
                    <NavigationTabs {...args} {...props} aria-label={name} />
                </View>
            )}
        </StateSheet>
    ),
    parameters: {
        a11y: {
            config: {
                rules: [
                    // Disabling warning: "Element's background color could not
                    // be determined because it's partially obscured by another
                    // element" since these examples can cause the horizontal
                    // scrollbar to show. Color contrast check is enabled for
                    // other stories (including the NavigationTabItem - Snapshots)
                    {id: "color-contrast", enabled: false},
                ],
            },
        },
        pseudo: defaultPseudoStates,
    },
    globals: {
        zoom: "400%",
    },
};

/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {
                name: "Many items",
                props: {children: generateChildren(10, "Navigation Tab Item")},
            },
            {
                name: "Long text",
                props: {children: generateChildren(4, longText)},
            },
            {
                name: "Long text with no word break",
                props: {
                    children: generateChildren(4, longTextWithNoWordBreak),
                },
            },
            {
                name: "Long text (with icons)",
                props: {children: generateChildren(4, longText, true)},
            },
            {
                name: "Long text with no word break (with icons)",
                props: {
                    children: generateChildren(
                        4,
                        longTextWithNoWordBreak,
                        true,
                    ),
                },
            },
            {
                name: "Varying lengths",
                props: {
                    children: [
                        <NavigationTabItem current={true}>
                            <Link href="#link-long">{longText}</Link>
                        </NavigationTabItem>,
                        <NavigationTabItem>
                            <Link href="#link-short">Short text</Link>
                        </NavigationTabItem>,
                        <NavigationTabItem>
                            <Link href="#link-long-no-break">
                                {longTextWithNoWordBreak}
                            </Link>
                        </NavigationTabItem>,
                    ],
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props, name) => (
                    <NavigationTabs {...props} aria-label={name} />
                )}
            </ScenariosLayout>
        );
    },
    parameters: {
        a11y: {
            config: {
                rules: [
                    // Disabling warning: "Element's background color could not
                    // be determined because it's partially obscured by another
                    // element" since these examples can cause the horizontal
                    // scrollbar to show. Color contrast check is enabled for
                    // other stories (including the NavigationTabItem - Snapshots)
                    {id: "color-contrast", enabled: false},
                ],
            },
        },
    },
};

/**
 * The following story shows how the component handles specific scenarios at a
 * small screen size.
 */
export const ScenariosSmallScreen: Story = {
    ...Scenarios,
    parameters: {
        ...Scenarios.parameters,
        viewport: {
            defaultViewport: "small",
        },
    },
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_160,
    },
});
