import * as React from "react";
import type {StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-badge/package.json";
import {Badge} from "@khanacademy/wonder-blocks-badge";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {
    multiColoredIcon,
    singleColoredIcon,
} from "../components/icons-for-testing";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import badgeArgtypes from "./badge.argtypes";

export default {
    title: "Packages / Badge / Badge",
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
            <Badge
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
            />
        );
    },
};

type StoryComponentType = StoryObj<
    // Omit original icon type and replace with string so we can use the IconMapping
    // for PhosphorIcons
    Omit<PropsFor<typeof Badge>, "icon"> & {icon?: string}
>;

/**
 * The badge takes an icon and/or a label:
 * - `icon`: The icon to display in the badge. It can be a PhosphorIcon, a custom svg,
 *   or `img` element. Considerations:
 *   - If the icon conveys meaning, set the alt text on the icon being used
 *   - If the icon is an `img` element, it may need width: 100% and height: 100%
 *     to render properly in the badge.
 * - `label`: The label to display in the badge.
 */
export const Default = {
    args: {
        label: "Badge",
        icon: "cookie",
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
                <Badge icon={singleColoredIcon} label="Custom Icon" />
                <HeadingLarge>Custom multi-colored svg icon</HeadingLarge>
                <Badge icon={multiColoredIcon} label="Custom Icon" />
                <HeadingLarge>Custom icon using img tag</HeadingLarge>
                <Badge
                    icon={
                        <img
                            src={"/favicon.ico"}
                            alt="Wonder Blocks"
                            style={{height: "100%", width: "100%"}}
                        />
                    }
                    label="Custom Icon"
                />
            </View>
        );
    },
};

/**
 * A badge can be used with custom styles. The following parts can be styled:
 * - `root`: Styles the root element
 * - `icon`: Styles the icon element
 */
export const CustomStyles: StoryComponentType = {
    args: {
        label: "Badge",
        icon: "cookie",
    },
    render: (args) => {
        return (
            <Badge
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
                        backgroundColor: "lightblue",
                        borderColor: "lightblue",
                        color: "black",
                    },
                    icon: {color: "darkblue"},
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
