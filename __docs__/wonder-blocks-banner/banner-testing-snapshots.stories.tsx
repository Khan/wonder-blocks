import * as React from "react";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import {allModes} from "../../.storybook/modes";

import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {
    commonStates,
    defaultPseudoStates,
    StateSheet,
} from "../components/state-sheet";
import Banner from "@khanacademy/wonder-blocks-banner";
import {longText, reallyLongText} from "../components/text-for-testing";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {ScenariosLayout} from "../components/scenarios-layout";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import Link from "@khanacademy/wonder-blocks-link";
import Button from "@khanacademy/wonder-blocks-button";
import crownIcon from "../wonder-blocks-icon/icons/crown.svg";

/**
 * The following stories are used to generate the pseudo states for the
 * Banner component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Banner / Testing / Snapshots / Banner",
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
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

export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: (args) => {
        return (
            <View>
                <StateSheet
                    rows={rows}
                    columns={columns}
                    title="Kind / Action Type"
                    states={[commonStates.rest]}
                >
                    {({props, name}) => (
                        <View key={name} style={{gap: sizing.size_120}}>
                            <Banner {...props} text={longText} />
                            <Banner
                                {...props}
                                text={`Custom Icon. ${longText}`}
                                icon={IconMappings.cookie}
                            />
                            <Banner
                                {...props}
                                text={`Floating. ${longText}`}
                                layout="floating"
                            />
                        </View>
                    )}
                </StateSheet>
                <StateSheet
                    rows={[
                        {
                            name: "With interactive elements (onDismiss, actions, inline link)",
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
                                    },
                                ],
                            },
                        },
                    ]}
                    columns={columns}
                >
                    {({props, name}) => (
                        <View key={name} style={{gap: sizing.size_120}}>
                            {kinds.map((kind) => (
                                <Banner
                                    {...props}
                                    text={
                                        <BodyText size="small">
                                            Example text with an{" "}
                                            <Link href="/" inline={true}>
                                                Inline Link
                                            </Link>
                                            .
                                        </BodyText>
                                    }
                                    key={kind}
                                    kind={kind}
                                />
                            ))}
                        </View>
                    )}
                </StateSheet>
            </View>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
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
                {title: "Link 1", href: "/"},
                {title: "Link 2", href: "/"},
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
                {title: "Link 1", href: "/"},
                {title: "Link 2", href: "/"},
            ],
            onDismiss: action("onDismiss"),
        },
    },
    {
        name: "With custom action",
        props: {
            actions: [
                {
                    type: "custom",
                    node: (
                        <Button
                            aria-label="Loading"
                            kind="tertiary"
                            size="small"
                            onClick={action("onClick")}
                            spinner={true}
                        >
                            Spinner Button
                        </Button>
                    ),
                },
            ],
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
                {
                    type: "custom",
                    node: (
                        <Button
                            kind="tertiary"
                            size="small"
                            onClick={() => {}}
                            spinner={true}
                        >
                            Spinner Button
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
                <BodyText size="small">
                    Example text with an{" "}
                    <Link href="/" inline={true}>
                        Inline Link
                    </Link>
                    .
                </BodyText>
            ),
        },
    },
    {
        name: "With custom Phosphor icon",
        props: {
            icon: IconMappings.cookie,
        },
    },
    {
        name: "With custom icon",
        props: {
            icon: crownIcon,
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
