import * as React from "react";
import type {StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-badge/package.json";
import {StatusBadge} from "@khanacademy/wonder-blocks-badge";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import singleColoredIcon from "../components/single-colored-icon.svg";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import badgeArgtypes, {iconArgType} from "./badge.argtypes";
import {multiColoredIcon} from "../components/icons-for-testing";

export default {
    title: "Packages / Badge / StatusBadge",
    component: StatusBadge,
    argTypes: {
        ...badgeArgtypes,
        ...iconArgType,
        kind: {
            table: {
                type: {
                    summary: "info | success | warning | critical",
                },
            },
        },
    },
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
 * For more details about using custom icons, see the Badge docs for custom icons.
 */
export const CustomIcons: StoryComponentType = {
    render: () => {
        return (
            <View style={{gap: sizing.size_240}}>
                <HeadingLarge>
                    Custom single colored svg icon using PhosphorIcon
                </HeadingLarge>
                <View style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <StatusBadge
                                key={kind}
                                kind={kind}
                                icon={
                                    <PhosphorIcon
                                        icon={singleColoredIcon}
                                        aria-label="Crown"
                                    />
                                }
                                label="Custom Icon"
                            />
                        );
                    })}
                </View>
                <HeadingLarge>
                    Custom single colored svg icon using PhosphorIcon and color
                    prop
                </HeadingLarge>
                <View style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <StatusBadge
                                key={kind}
                                kind={kind}
                                icon={
                                    <PhosphorIcon
                                        icon={singleColoredIcon}
                                        aria-label="Crown"
                                        color={semanticColor.icon.primary}
                                    />
                                }
                                label="Custom Icon"
                            />
                        );
                    })}
                </View>
                <HeadingLarge>
                    Custom multi-colored inline svg using the Icon component
                </HeadingLarge>
                <View style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <StatusBadge
                                key={kind}
                                kind={kind}
                                icon={<Icon>{multiColoredIcon}</Icon>}
                                label="Custom Icon"
                            />
                        );
                    })}
                </View>
                <HeadingLarge>
                    Custom img element using the Icon component with a svg src
                </HeadingLarge>
                <View style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <StatusBadge
                                key={kind}
                                kind={kind}
                                icon={
                                    <Icon>
                                        <img
                                            src={"/logo.svg"}
                                            alt="Wonder Blocks"
                                        />
                                    </Icon>
                                }
                                label="Custom Icon"
                            />
                        );
                    })}
                </View>
                <HeadingLarge>
                    Custom img element using the Icon component with a png src
                </HeadingLarge>
                <View style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <StatusBadge
                                key={kind}
                                kind={kind}
                                icon={
                                    <Icon>
                                        <img
                                            src={"/avatar.png"}
                                            alt="Example avatar"
                                        />
                                    </Icon>
                                }
                                label="Custom Icon"
                            />
                        );
                    })}
                </View>
            </View>
        );
    },
    parameters: {
        chromatic: {
            // Enable snapshots for this story so we can verify custom icons
            // are used correctly
            disableSnapshot: false,
        },
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
