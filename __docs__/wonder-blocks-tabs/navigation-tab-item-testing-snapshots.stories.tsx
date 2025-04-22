import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {StyleSheet} from "aphrodite";

import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import Link from "@khanacademy/wonder-blocks-link";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import {
    longText,
    longTextWithNoWordBreak,
    rtlText,
} from "../components/text-for-testing";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {ScenariosLayout} from "../components/scenarios-layout";

const StyledA = addStyle("a");
const generateRows = (rtl: boolean = false) => {
    return [
        {
            name: "Default",
            props: {
                children: (
                    <Link href="#link">
                        {rtl ? rtlText : "Navigation Tab Item"}
                    </Link>
                ),
            },
        },
        {
            name: "External Link",
            props: {
                children: (
                    <Link href="https://khanacademy.org" target="_blank">
                        {rtl ? rtlText : "External link"}
                    </Link>
                ),
            },
        },
        {
            name: "Start Icon",
            props: {
                children: (
                    <Link
                        href="#link"
                        startIcon={
                            <PhosphorIcon
                                icon={IconMappings.cookie}
                                size="small"
                            />
                        }
                    >
                        {rtl ? rtlText : "Start Icon"}
                    </Link>
                ),
            },
        },
        {
            name: "End Icon",
            props: {
                children: (
                    <Link
                        href="#link"
                        endIcon={
                            <PhosphorIcon
                                icon={IconMappings.iceCream}
                                size="small"
                            />
                        }
                    >
                        {rtl ? rtlText : "End Icon"}
                    </Link>
                ),
            },
        },
        {
            name: "Start and End Icons",
            props: {
                children: (
                    <Link
                        href="#link"
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
                ),
            },
        },
        {
            name: "Icon only",
            props: {
                children: (
                    <IconButton
                        kind="tertiary"
                        href="#link"
                        aria-label="Ice cream"
                        icon={IconMappings.iceCream}
                    />
                ),
            },
        },
        {
            name: "Native anchor tag",
            props: {
                children: (
                    <StyledA href="#link">
                        {rtl ? rtlText : "Anchor tag"}
                    </StyledA>
                ),
            },
        },
    ];
};

const rows = generateRows();
const rtlRows = generateRows(true);
const columns = [
    {
        name: "Default",
        props: {},
    },
    {
        name: "Current",
        props: {current: true},
    },
];

type Story = StoryObj<typeof NavigationTabItem>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Tabs / NavigationTabs / Subcomponents / NavigationTabItem / Testing / NavigationTabItem - Snapshots",
    component: NavigationTabItem,
    tags: ["!autodocs"],
} satisfies Meta<typeof NavigationTabItem>;

export default meta;

export const Default: Story = {
    render: (args) => (
        <>
            <StateSheet rows={rows} columns={columns}>
                {({props, className}) => (
                    <View
                        style={styles.container}
                        tag="ul"
                        className={className}
                    >
                        <NavigationTabItem {...args} {...props} />
                    </View>
                )}
            </StateSheet>
            <div dir="rtl">
                <HeadingLarge>RTL</HeadingLarge>
                <StateSheet rows={rtlRows} columns={columns}>
                    {({props, className}) => (
                        <View
                            style={styles.container}
                            tag="ul"
                            className={className}
                        >
                            <NavigationTabItem {...args} {...props} />
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
        <>
            <StateSheet rows={rows} columns={columns} layout="list">
                {({props}) => (
                    <View style={styles.container} tag="ul">
                        <NavigationTabItem {...args} {...props} />
                    </View>
                )}
            </StateSheet>
            <div dir="rtl">
                <HeadingLarge>RTL</HeadingLarge>
                <StateSheet rows={rtlRows} columns={columns} layout="list">
                    {({props}) => (
                        <View style={styles.container} tag="ul">
                            <NavigationTabItem {...args} {...props} />
                        </View>
                    )}
                </StateSheet>
            </div>
        </>
    ),
    globals: {
        zoom: "400%",
    },
    parameters: {
        chromatic: {
            // Disabling because Chromatic crops the story when zoom is used
            disableSnapshot: true,
        },
        pseudo: defaultPseudoStates,
    },
};

/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {
                name: "Long Text",
                props: {
                    current: true,
                    children: <Link href="#link">{longText}</Link>,
                },
            },
            {
                name: "Long Text with No Word Break",
                props: {
                    current: true,
                    children: (
                        <Link href="#link">{longTextWithNoWordBreak}</Link>
                    ),
                },
            },
            {
                name: "Long Text (icons)",
                props: {
                    current: true,
                    children: (
                        <Link
                            href="#link"
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
                            {longText}
                        </Link>
                    ),
                },
            },
            {
                name: "Long Text with No Word Break (icons)",
                props: {
                    current: true,
                    children: (
                        <Link
                            href="#link"
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
                            {longTextWithNoWordBreak}
                        </Link>
                    ),
                },
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => <NavigationTabItem {...props} />}
            </ScenariosLayout>
        );
    },
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_160,
        alignItems: "flex-start",
    },
});
