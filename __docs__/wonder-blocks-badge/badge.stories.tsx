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
    render: (args) => {
        return (
            <StyledDiv style={styles.container}>
                {kinds.map((kind) => {
                    return <Badge key={kind} {...args} kind={kind} />;
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

export const LabelOnly: StoryComponentType = {
    args: {
        label: "Badge",
    },
};

export const IconOnly: StoryComponentType = {
    args: {
        icon: <PhosphorIcon icon={IconMappings.cookie} aria-label="Cookie" />,
    },
};

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
