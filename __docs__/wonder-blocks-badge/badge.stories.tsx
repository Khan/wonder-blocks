import * as React from "react";
import type {StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-badge/package.json";
import {Badge} from "@khanacademy/wonder-blocks-badge";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import singleColoredIcon from "../components/single-colored-icon.svg";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {font, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import badgeArgtypes, {iconArgType} from "./badge.argtypes";
import {multiColoredIcon} from "../components/icons-for-testing";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {themeModes} from "../../.storybook/modes";

export default {
    title: "Packages / Badge / Badge",
    component: Badge,
    argTypes: {...badgeArgtypes, ...iconArgType},
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
            modes: themeModes,
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
 * - `icon`: The icon to display in the badge. It can be a `PhosphorIcon` or a
 * `Icon` for custom icons (see Custom Icons docs for more details). If the icon
 * conveys meaning, set the alt text on the icon being used
 * - `label`: The label to display in the badge.
 */
export const Default = {
    args: {
        label: "Badge",
        icon: "cookieBold",
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
        icon: "cookieBold",
    },
};

/**
 * A badge can be used with a custom icon using the `PhosphorIcon` or `Icon`
 * components. Here are some examples with custom icons:
 * - A custom single colored svg icon
 *   - Use with the `PhosphorIcon` component
 *   - If the svg has `fill="currentColor"` and the `color` prop for
 *     `PhosphorIcon` is not set, then the icon will use the color specified by
 *     the `Badge` component.
 * - A multi-colored inline svg
 *   - Use with the `Icon` component
 *   - The `Icon` component supports svg assets that define their own fill
 * - An `img` element
 *   - Use with the `Icon` component
 *   - The `Icon` component supports `img` elements
 * - For icons that are from the Phosphor library, continue using the
 * `PhosphorIcon` component.
 *
 * If the icon conveys meaning, it should have alt text.
 */
export const CustomIcons: StoryComponentType = {
    render: () => {
        return (
            <View style={{gap: sizing.size_240}}>
                <HeadingLarge>
                    Custom single colored svg icon using PhosphorIcon
                </HeadingLarge>
                <Badge
                    icon={
                        <PhosphorIcon
                            icon={singleColoredIcon}
                            aria-label="Crown"
                        />
                    }
                    label="Custom Icon"
                />
                <HeadingLarge>
                    Custom single colored svg icon using PhosphorIcon and color
                    prop
                </HeadingLarge>
                <Badge
                    icon={
                        <PhosphorIcon
                            icon={singleColoredIcon}
                            aria-label="Crown"
                            color={semanticColor.status.success.foreground}
                        />
                    }
                    label="Custom Icon"
                />
                <HeadingLarge>
                    Custom multi-colored inline svg using the Icon component
                </HeadingLarge>
                <Badge
                    icon={<Icon>{multiColoredIcon}</Icon>}
                    label="Custom Icon"
                />
                <HeadingLarge>
                    Custom img element using the Icon component with a svg src
                </HeadingLarge>
                <Badge
                    icon={
                        <Icon>
                            <img src={"logo.svg"} alt="Wonder Blocks" />
                        </Icon>
                    }
                    label="Custom Icon"
                />
                <HeadingLarge>
                    Custom img element using the Icon component with a png src
                </HeadingLarge>
                <Badge
                    icon={
                        <Icon>
                            <img src="avatar.png" alt="Example avatar" />
                        </Icon>
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
 * - `label`: Styles the text in the element
 *
 * Here is an example of custom styles using semantic tokens.
 */
export const CustomStyles: StoryComponentType = {
    args: {
        label: "Badge",
        icon: "cookieBold",
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
                        backgroundColor: semanticColor.surface.inverse,
                        borderColor: semanticColor.core.border.knockout.default,
                        color: semanticColor.core.foreground.knockout.default,
                    },
                    icon: {
                        color: semanticColor.core.foreground.knockout.default,
                    },
                    label: {
                        fontWeight: font.weight.medium,
                    },
                }}
            />
        );
    },
};

/**
 * When the `tag` prop is provided, the badge will render as the specified tag.
 *
 * For example, if a badge should have emphasis, use a `strong` tag.
 */
export const Tag: StoryComponentType = {
    args: {
        label: "Badge",
        icon: "cookieBold",
        tag: "strong",
    },
};

/**
 * When using a `Badge` with a `Tooltip`, make sure to add `role="button"` on the
 * `Badge`. This is so that it is interactive and the tooltip contents can be
 * read out properly via the `aria-describedby` attribute on the `Badge` added
 * by the Tooltip component.
 *
 * Note: The `Tooltip` component also sets the `tabIndex` of the `Badge` so that
 * it is focusable.
 */
export const BadgeWithTooltip: StoryComponentType = {
    render: (args) => {
        return (
            <Tooltip content="This is a tooltip" opened={true}>
                <Badge
                    {...args}
                    label={args.label || ""}
                    icon={
                        args.icon ? (
                            <PhosphorIcon icon={args.icon} />
                        ) : undefined
                    }
                    role="button"
                />
            </Tooltip>
        );
    },
    args: {
        label: "Badge",
        icon: "cookieBold",
    },
};

/**
 * By default, the label is truncated after `30ch` (approximately 30 characters).
 * If you have long lines of text to communicate information, this badge pattern
 * is not the right component for that purpose.
 */
export const BadgeTruncation: StoryComponentType = {
    args: {
        label: "Badge with a long label that should be truncated",
        icon: "cookieBold",
    },
};
