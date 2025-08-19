import * as React from "react";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import {themeModes} from "../../.storybook/modes";

import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import Banner from "@khanacademy/wonder-blocks-banner";
import {longText, reallyLongText} from "../components/text-for-testing";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {ScenariosLayout} from "../components/scenarios-layout";
import Link from "@khanacademy/wonder-blocks-link";
import Button from "@khanacademy/wonder-blocks-button";
import crownIcon from "../wonder-blocks-icon/icons/crown.svg";
import {AllVariants} from "../components/all-variants";

/**
 * The following stories are used to generate the pseudo states for the
 * Banner component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Banner / Testing / Snapshots / Banner",
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs"],
} as Meta<typeof Banner>;

type StoryComponentType = StoryObj<typeof Banner>;

const kinds = ["info", "warning", "success", "critical"] as const;

const rows = [
    {name: "Info", props: {kind: "info"}},
    {name: "Warning", props: {kind: "warning"}},
    {name: "Success", props: {kind: "success"}},
    {name: "Critical", props: {kind: "critical"}},
];

const columns = [{name: "Default", props: {}}];

const stateSheetRows = [
    {
        name: "With interactive elements",
        props: {
            onDismiss: action("onDismiss"),
            actions: [
                {
                    title: "Button",
                    onClick: action("onClick"),
                },
                {
                    title: "Link",
                    href: "/",
                    type: "link",
                },
            ],
            text: "Example banner text.",
        },
    },
    {
        name: "With inline link and interactive elements",
        props: {
            onDismiss: action("onDismiss"),
            actions: [
                {
                    title: "Button",
                    onClick: action("onClick"),
                },
                {
                    title: "Link",
                    href: "/",
                    type: "link",
                },
            ],
            text: (
                <>
                    Example text with an{" "}
                    <Link href="/" inline={true}>
                        Inline Link
                    </Link>
                    .
                </>
            ),
        },
    },
];
export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={stateSheetRows} columns={columns}>
                {({props, name}) => (
                    <View key={name} style={{gap: sizing.size_120}}>
                        {kinds.map((kind) => (
                            <Banner {...props} key={kind} kind={kind} />
                        ))}
                    </View>
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

export const AllVariantsStory: StoryComponentType = {
    name: "All Variants",
    render: (args) => {
        return (
            <AllVariants
                rows={rows}
                columns={columns}
                title="Kind / Action Type"
            >
                {({props, name}) => (
                    <View key={name} style={{gap: sizing.size_120}}>
                        <Banner {...props} text={longText} />
                        <Banner
                            {...props}
                            text={`Custom Icon. ${longText}`}
                            icon={IconMappings.cookieBold}
                        />
                        <Banner
                            {...props}
                            text={`Floating. ${longText}`}
                            layout="floating"
                        />
                    </View>
                )}
            </AllVariants>
        );
    },
};

const scenarios = [
    {
        name: "Layout: Full-width",
        props: {
            layout: "full-width",
        },
    },
    {
        name: "Layout: Floating",
        props: {
            layout: "floating",
        },
    },
    {
        name: "Multiple lines of text",
        props: {
            text: reallyLongText,
        },
    },
    {
        name: "Multiple lines of text with buttons and onDismiss",
        props: {
            text: reallyLongText,
            actions: [
                {title: "Button 1", onClick: action("onClick")},
                {title: "Button 2", onClick: action("onClick")},
            ],
            onDismiss: action("onDismiss"),
        },
    },
    {
        name: "Multiple lines of text with links and onDismiss",
        props: {
            text: reallyLongText,
            actions: [
                {title: "Link 1", href: "/", type: "link"},
                {title: "Link 2", href: "/", type: "link"},
            ],
            onDismiss: action("onDismiss"),
        },
    },
    {
        name: "With Buttons and onDismiss",
        props: {
            actions: [
                {title: "Button 1", onClick: action("onClick")},
                {title: "Button 2", onClick: action("onClick")},
            ],
            onDismiss: action("onDismiss"),
        },
    },
    {
        name: "With Links and onDismiss",
        props: {
            actions: [
                {title: "Link 1", href: "/", type: "link"},
                {title: "Link 2", href: "/", type: "link"},
            ],
            onDismiss: action("onDismiss"),
        },
    },
    {
        name: "With custom action primary button",
        props: {
            actions: [
                {
                    type: "custom",
                    node: (
                        <Button size="small" onClick={action("onClick")}>
                            Custom Action
                        </Button>
                    ),
                },
            ],
        },
    },
    {
        name: "With mixed actions",
        props: {
            actions: [
                {
                    type: "button",
                    title: "Normal button",
                    onClick: () => {},
                },
                {
                    type: "custom",
                    node: (
                        <Button kind="tertiary" size="small" onClick={() => {}}>
                            Custom button
                        </Button>
                    ),
                },
                {
                    type: "custom",
                    node: (
                        <Button size="small" onClick={() => {}}>
                            Custom button 2
                        </Button>
                    ),
                },
            ],
        },
    },
    {
        name: "With inline link",
        props: {
            text: (
                <>
                    Example text with an{" "}
                    <Link href="/" inline={true}>
                        Inline Link
                    </Link>
                    .
                </>
            ),
        },
    },
    {
        name: "With custom Phosphor icon",
        props: {
            icon: IconMappings.cookieBold,
        },
    },
    {
        name: "With custom icon",
        props: {
            icon: crownIcon,
        },
    },
    {
        name: "With no icon",
        props: {
            icon: "none",
        },
    },
];

export const Scenarios: StoryComponentType = {
    render: (args) => {
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props, name) => (
                    <Banner text={longText} {...props} key={name} />
                )}
            </ScenariosLayout>
        );
    },
};
