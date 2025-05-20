import * as React from "react";
import type {StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-badge/package.json";
import {StatusBadge} from "@khanacademy/wonder-blocks-badge";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {
    multiColoredIcon,
    singleColoredIcon,
} from "../components/icons-for-testing";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import badgeArgtypes from "./badge.argtypes";

export default {
    title: "Packages / Badge / StatusBadge",
    component: StatusBadge,
    argTypes: badgeArgtypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disable snapshots since they're covered by the testing snapshots
            disableSnapshot: true,
        },
    },
    render: (
        args: Omit<PropsFor<typeof StatusBadge>, "icon"> & {icon: string},
    ) => {
        return (
            <View style={styles.container}>
                {kinds.map((kind) => {
                    return (
                        <StatusBadge
                            key={kind}
                            {...args}
                            kind={kind}
                            label={args.label || ""}
                            icon={
                                args.icon ? (
                                    <PhosphorIcon
                                        icon={args.icon}
                                        aria-label={"Example icon"}
                                    />
                                ) : undefined
                            }
                        />
                    );
                })}
            </View>
        );
    },
};

type StoryComponentType = StoryObj<
    // Omit original icon type and replace with string so we can use the IconMapping
    // for PhosphorIcons
    Omit<PropsFor<typeof StatusBadge>, "icon"> & {icon?: string}
>;

const kinds = ["info", "success", "warning", "critical"] as const;

export const Default = {
    args: {
        label: "Badge",
        icon: "cookie",
    },
    render: (
        args: Omit<PropsFor<typeof StatusBadge>, "icon"> & {icon: string},
    ) => (
        <StatusBadge
            {...args}
            label={args.label || ""}
            icon={
                args.icon ? (
                    <PhosphorIcon icon={args.icon} aria-label="Example icon" />
                ) : undefined
            }
        />
    ),
};

/**
 * The different kinds of status badges.
 */
export const Kinds = {
    args: {
        icon: "cookie",
    },
    render(args: Omit<PropsFor<typeof StatusBadge>, "icon"> & {icon: string}) {
        return (
            <View style={styles.container}>
                {kinds.map((kind) => {
                    const kindLabel =
                        kind.charAt(0).toUpperCase() + kind.slice(1);
                    return (
                        <StatusBadge
                            key={kind}
                            kind={kind}
                            label={kindLabel}
                            icon={
                                <PhosphorIcon
                                    icon={args.icon}
                                    aria-label="Cookie"
                                />
                            }
                        />
                    );
                })}
            </View>
        );
    },
};

/**
 * A badge can be used with only a label.
 */
export const LabelOnly: StoryComponentType = {
    args: {
        label: "Badge",
    },
};

/**
 * A badge can be used with only an icon.
 */
export const IconOnly: StoryComponentType = {
    args: {
        icon: "cookie",
    },
};

/**
 * A badge can be used with a custom svg. Here are some examples of custom icons:
 * - A single colored svg icon - If the svg has `fill="currentColor"` then the
 * icon will use the color specified by the Badge component.
 * - A multi-colored svg icon - An svg that defines it's own fill can be used
 * - An icon using an img tag - The `img` element should have a height and width
 * of 100% to ensure it scales to the size of the badge icon.
 *
 * If the icon conveys meaning, it should have alt text.
 */
export const CustomIcons: StoryComponentType = {
    render: () => {
        return (
            <View style={{gap: sizing.size_240}}>
                <HeadingLarge>Custom single colored svg icon</HeadingLarge>
                <View style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <StatusBadge
                                key={kind}
                                kind={kind}
                                icon={singleColoredIcon}
                                label="Custom Icon"
                            />
                        );
                    })}
                </View>
                <HeadingLarge>Custom multi-colored svg icon</HeadingLarge>
                <View style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <StatusBadge
                                key={kind}
                                kind={kind}
                                icon={multiColoredIcon}
                                label="Custom Icon"
                            />
                        );
                    })}
                </View>
                <HeadingLarge>Custom icon using img tag</HeadingLarge>
                <View style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <StatusBadge
                                key={kind}
                                kind={kind}
                                icon={
                                    <img
                                        src={"/favicon.ico"}
                                        alt="Wonder Blocks"
                                        style={{height: "100%", width: "100%"}}
                                    />
                                }
                                label="Custom Icon"
                            />
                        );
                    })}
                </View>
            </View>
        );
    },
};

/**
 * A badge can be used with custom styles. The following parts can be styled:
 * - `root`: Styles the root element
 * - `icon`: Styles the icon element
 *
 * Here is an example of custom styles using semantic tokens.
 */
export const CustomStyles: StoryComponentType = {
    args: {
        label: "Badge",
        icon: "cookie",
    },
    render: (args) => {
        return (
            <StatusBadge
                {...args}
                label={args.label || ""}
                icon={
                    args.icon ? (
                        <PhosphorIcon
                            icon={args.icon}
                            aria-label={"Example icon"}
                        />
                    ) : undefined
                }
                styles={{
                    root: {
                        backgroundColor: semanticColor.surface.inverse,
                        borderColor: semanticColor.border.inverse,
                        color: semanticColor.text.inverse,
                    },
                    icon: {color: semanticColor.icon.inverse},
                }}
            />
        );
    },
    parameters: {
        chromatic: {
            // Enable snapshots for this story so we can verify custom styles
            // are applied correctly
            disableSnapshot: false,
        },
    },
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: sizing.size_120,
        flexWrap: "wrap",
    },
});
