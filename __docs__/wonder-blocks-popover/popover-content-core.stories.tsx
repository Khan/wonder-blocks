import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {Meta, StoryObj} from "@storybook/react";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    Body,
    HeadingSmall,
    LabelLarge,
} from "@khanacademy/wonder-blocks-typography";

import {PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import packageConfig from "../../packages/wonder-blocks-popover/package.json";
import ComponentInfo from "../components/component-info";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

// NOTE: We are reusing an existing Cell SB Story to test how Popovers can be
// composed by Cells.
import {ClickableDetailCell} from "../wonder-blocks-cell/detail-cell.stories";
import popoverContentCoreArgtypes from "./popover-content-core.argtypes";

export default {
    title: "Packages / Popover / PopoverContentCore",
    component: PopoverContentCore,
    argTypes: popoverContentCoreArgtypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    decorators: [
        (Story: any): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>{Story()}</View>
        ),
    ],
} as Meta<typeof PopoverContentCore>;

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    popoverWithIcon: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.medium_16,
    },
    popoverWithCell: {
        padding: 0,
    },
    customPopover: {
        maxWidth: spacing.medium_16 * 25,
        width: spacing.medium_16 * 25,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        padding: `${spacing.small_12}px 0`,
    },
    action: {
        backgroundColor: "transparent",
        border: "none",
        color: color.white,
        cursor: "pointer",
        margin: spacing.small_12,
        padding: spacing.xxSmall_6,
        alignItems: "center",
        justifyContent: "center",
    },
});

type StoryComponentType = StoryObj<typeof PopoverContentCore>;

export const WithIcon: StoryComponentType = {
    args: {
        children: (
            <>
                <PhosphorIcon size="large" icon={IconMappings.article} />
                <View>
                    <LabelLarge id="custom-popover-title">
                        This is an article
                    </LabelLarge>
                    <Body id="custom-popover-content">With the content</Body>
                </View>
            </>
        ),
        closeButtonVisible: true,
        style: styles.popoverWithIcon,
    },
    render: (args) => <PopoverContentCore {...args} />,
};

// NOTE: Adding a wrapper to cast the component so Storybook doesn't complain.
const ClickableDetailCellWrapper = ClickableDetailCell as React.ElementType;

/**
 * Using DetailCell as the content
 */
export const WithDetailCell: StoryComponentType = {
    args: {
        // use the composed DetailCell component
        children: <ClickableDetailCellWrapper {...ClickableDetailCell.args} />,
        style: styles.popoverWithCell,
    },
    render: (args) => <PopoverContentCore {...args} />,
};

WithDetailCell.parameters = {
    docs: {
        description: {
            story: "Popovers can also benefit from other Wonder Blocks components. In this example, we are using the DetailCell component embedded as part of the popover contents.",
        },
    },
};

/**
 * Dark custom popover
 */
const CustomPopoverContent = (
    <>
        <HeadingSmall>Custom popover title</HeadingSmall>
        <View style={styles.row}>
            <Clickable style={styles.action} onClick={close} id="btn-1">
                {() => (
                    <>
                        <PhosphorIcon
                            icon={IconMappings.pencilSimple}
                            color={color.gold}
                            size="large"
                        />
                        <LabelLarge>Option 1</LabelLarge>
                    </>
                )}
            </Clickable>
            <Clickable style={styles.action} onClick={close} id="btn-2">
                {() => (
                    <>
                        <PhosphorIcon
                            icon={IconMappings.pencilSimple}
                            color={color.green}
                            size="large"
                        />
                        <LabelLarge>Option 2</LabelLarge>
                    </>
                )}
            </Clickable>
            <Clickable style={styles.action} onClick={close} id="btn-3">
                {() => (
                    <>
                        <PhosphorIcon
                            icon={IconMappings.pencilSimple}
                            color={color.blue}
                            size="large"
                        />
                        <LabelLarge>Option 3</LabelLarge>
                    </>
                )}
            </Clickable>
        </View>
    </>
);

export const Dark: StoryComponentType = {
    args: {
        children: CustomPopoverContent,
        color: "darkBlue",
        style: styles.customPopover,
    },
    render: (args) => <PopoverContentCore {...args} />,
};

Dark.parameters = {
    docs: {
        description: {
            story: "This component provides a flexible variant that can be used for example, for our Confidence Prompt in test prep and popovers that don't fit into other categories. If you want to use a different background, you can set `color` as part of `PopoverContentCore`.",
        },
    },
};
