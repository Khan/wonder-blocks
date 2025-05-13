import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {Badge} from "@khanacademy/wonder-blocks-badge";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {
    multiColoredIcon,
    singleColoredIcon,
} from "../components/icons-for-testing";
import {addStyle, PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import badgeArgtypes from "./badge.argtypes";

export default {
    title: "Packages / Badge",
    component: Badge,
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
    render: (args: Omit<PropsFor<typeof Badge>, "icon"> & {icon: string}) => {
        return (
            <StyledDiv style={styles.container}>
                {kinds.map((kind) => {
                    return (
                        <Badge
                            key={kind}
                            {...args}
                            kind={kind}
                            icon={
                                args.icon && (
                                    <PhosphorIcon
                                        icon={args.icon}
                                        aria-label={"Example icon"}
                                    />
                                )
                            }
                        />
                    );
                })}
            </StyledDiv>
        );
    },
} as Meta<typeof Badge>;

type StoryComponentType = StoryObj<typeof Badge>;

const StyledDiv = addStyle("div");
const kinds = ["info", "success", "warning", "critical"] as const;

export const Default = {
    args: {
        label: "Badge",
        icon: "cookie",
    },
    render: (args: Omit<PropsFor<typeof Badge>, "icon"> & {icon: string}) => (
        <Badge {...args} icon={<PhosphorIcon icon={args.icon} />} />
    ),
    argTypes: {
        icon: {
            control: {type: "select"},
            options: Object.keys(IconMappings),
            mapping: IconMappings,
            table: {
                type: {
                    summary: "ReactNode",
                },
            },
        },
    },
};

/**
 * The different kinds of badges.
 */
export const Kinds: StoryComponentType = {
    args: {
        label: "Badge",
        icon: <PhosphorIcon icon={IconMappings.cookie} aria-label="Cookie" />,
    },
    render(args) {
        return (
            <StyledDiv style={styles.container}>
                {kinds.map((kind) => {
                    const kindLabel =
                        kind.charAt(0).toUpperCase() + kind.slice(1);
                    return (
                        <Badge
                            key={kind}
                            {...args}
                            kind={kind}
                            label={kindLabel}
                        />
                    );
                })}
            </StyledDiv>
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
 * icon will use the color specified by the Badge component..
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
                <StyledDiv style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <Badge
                                key={kind}
                                kind={kind}
                                icon={singleColoredIcon}
                                label="Custom Icon"
                            />
                        );
                    })}
                </StyledDiv>
                <HeadingLarge>Custom multi-colored svg icon</HeadingLarge>
                <StyledDiv style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <Badge
                                key={kind}
                                kind={kind}
                                icon={multiColoredIcon}
                                label="Custom Icon"
                            />
                        );
                    })}
                </StyledDiv>
                <HeadingLarge>Custom icon using img tag</HeadingLarge>
                <StyledDiv style={styles.container}>
                    {kinds.map((kind) => {
                        return (
                            <Badge
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
                </StyledDiv>
            </View>
        );
    },
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: sizing.size_120,
    },
});
