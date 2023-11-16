import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {Meta, StoryObj} from "@storybook/react";
import Color from "@khanacademy/wonder-blocks-color";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {
    Body,
    HeadingSmall,
    LabelLarge,
} from "@khanacademy/wonder-blocks-typography";

import {PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import packageConfig from "../../packages/wonder-blocks-popover/package.json";
import ComponentInfo from "../../.storybook/components/component-info";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

// NOTE: We are reusing an existing Cell SB Story to test how Popovers can be
// composed by Cells.
import {ClickableDetailCell} from "../wonder-blocks-cell/detail-cell.stories";
import popoverContentCoreArgtypes from "./popover-content-core.argtypes";

export default {
    title: "Popover/PopoverContentCore",
    component: PopoverContentCore,
    argTypes: popoverContentCoreArgtypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
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
        gap: Spacing.medium_16,
    },
    popoverWithCell: {
        padding: 0,
    },
    customPopover: {
        maxWidth: Spacing.medium_16 * 25,
        width: Spacing.medium_16 * 25,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        padding: `${Spacing.small_12}px 0`,
    },
    action: {
        backgroundColor: "transparent",
        border: "none",
        color: Color.white,
        cursor: "pointer",
        margin: Spacing.small_12,
        padding: Spacing.xxSmall_6,
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
                    <LabelLarge>This is an article</LabelLarge>
                    <Body>With the content</Body>
                </View>
            </>
        ),
        closeButtonVisible: true,
        style: styles.popoverWithIcon,
    },
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
                            color={Color.gold}
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
                            color={Color.green}
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
                            color={Color.blue}
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
};

Dark.parameters = {
    docs: {
        description: {
            story: "This component provides a flexible variant that can be used for example, for our Confidence Prompt in test prep and popovers that don't fit into other categories. If you want to use a different background, you can set `color` as part of `PopoverContentCore`.",
        },
    },
};
