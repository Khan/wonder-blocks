import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import packageConfig from "../../packages/wonder-blocks-cell/package.json";
import {CompactCell} from "@khanacademy/wonder-blocks-cell";

import ComponentInfo from "../components/component-info";
import CompactCellArgTypes, {AccessoryMappings} from "./compact-cell.argtypes";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

type StoryComponentType = StoryObj<typeof CompactCell>;

export default {
    title: "Packages / Cell / CompactCell",
    component: CompactCell,
    argTypes: CompactCellArgTypes,
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
        (Story): React.ReactElement => (
            <View style={styles.example}>{Story()}</View>
        ),
    ],
} as Meta<typeof CompactCell>;

/**
 * Default CompactCell example. It will be rendered as the first/default story and
 * it can be interacted with the controls panel in the Browser.
 */
export const DefaultCompactCell: StoryComponentType = {
    args: {
        title: "Basic Cell",
        rightAccessory: <PhosphorIcon icon={IconMappings.caretRight} />,
    },
    parameters: {
        chromatic: {
            // We have screenshots of other stories that cover other variants.
            disableSnapshot: true,
        },
    },
};

/**
 * You can create a minimal cell that only uses a title and an PhosphorIcon that
 * can be placed on the left or right (or both). In this case, we will place the
 * icon on the left to show you how cell is flexible. Note that you can pass any
 * of the existing WB components such as `PhosphorIcon`, `IconButton`,
 * `Tooltip`, etc.
 */
export const CompactCellLeft: StoryComponentType = {
    render: () => (
        <CompactCell
            title="Intro to rational & irrational numbers"
            leftAccessory={
                <PhosphorIcon icon={IconMappings.article} size="medium" />
            }
        />
    ),
    parameters: {
        chromatic: {
            // This is already tested in the StateSheet story.
            disableSnapshot: true,
        },
    },
};

/**
 * You can also create a cell with an accessory placed on the right. Note that
 * you can pass any of the existing WB components such as `PhosphorIcon`.
 */
export const CompactCellRight: StoryComponentType = {
    render: () => (
        <CompactCell
            title="Intro to rational & irrational numbers"
            rightAccessory={
                <PhosphorIcon icon={IconMappings.caretRight} size="medium" />
            }
        />
    ),
    parameters: {
        chromatic: {
            // This is already tested in the StateSheet story.
            disableSnapshot: true,
        },
    },
};

/**
 * Cells should keep a consistent height no matter the content passed in the
 * title prop. It should also respect a `minHeight` of 48px.
 */
export const CompactCellWithDifferentHeights: StoryComponentType = {
    render: () => (
        <>
            <CompactCell
                title="Single line with short accessory."
                rightAccessory={AccessoryMappings.withCaret}
            />
            <Strut size={spacing.xSmall_8} />
            <CompactCell
                title="Single line with tall accessory."
                rightAccessory={AccessoryMappings.withIconText}
            />
            <Strut size={spacing.xSmall_8} />
            <CompactCell
                title="Multi line title with tall accessory. Content should fit within the container and the cell height should be consistent no matter the content length."
                rightAccessory={AccessoryMappings.withIconText}
            />
        </>
    ),
};

/**
 * You can also create a more complex cell with accessories placed on both
 * sides. Note that you can extend the PhosphorIcon component with custom paths
 * such as the following example.
 */
export const CompactCellBoth: StoryComponentType = {
    name: "CompactCell with both accessories",
    render: () => (
        <CompactCell
            title="Intro to rational & irrational numbers"
            leftAccessory={
                <PhosphorIcon icon={IconMappings.article} size="medium" />
            }
            rightAccessory={
                <PhosphorIcon icon={IconMappings.calendar} size="medium" />
            }
        />
    ),
    parameters: {
        chromatic: {
            // This is already tested in the StateSheet story.
            disableSnapshot: true,
        },
    },
};

/**
 * Accessories can also be customized to adapt to different sizes and
 * alignments. In this example, we can see how a cell can be customized for both
 * accessories.
 */
export const CompactCellAccessoryStyles: StoryComponentType = {
    name: "CompactCell accessories with custom styles",
    render: () => (
        <CompactCell
            title="CompactCell with custom accessory styles"
            leftAccessory={
                <PhosphorIcon icon={IconMappings.article} size="medium" />
            }
            leftAccessoryStyle={{
                minWidth: spacing.xxLarge_48,
                alignSelf: "flex-start",
                alignItems: "flex-start",
            }}
            rightAccessory={
                <PhosphorIcon icon={IconMappings.caretRightBold} size="small" />
            }
            rightAccessoryStyle={{
                minWidth: spacing.large_24,
                alignSelf: "flex-end",
                alignItems: "flex-end",
            }}
        />
    ),
};

/**
 * Cell components can use the `horizontalRule` prop to use a set of predefined
 * variants that we can use to match our needs.
 */
export const CompactCellHorizontalRules: StoryComponentType = {
    name: "Defining horizontal rule variants",
    render: () => (
        <>
            <CompactCell
                title="This is a basic cell with an 'inset' horizontal rule"
                leftAccessory={
                    <PhosphorIcon icon={IconMappings.article} size="medium" />
                }
                horizontalRule="inset"
            />
            <CompactCell
                title="This is a basic cell with a 'full-width' horizontal rule"
                leftAccessory={
                    <PhosphorIcon icon={IconMappings.article} size="medium" />
                }
                horizontalRule="full-width"
            />
            <CompactCell
                title="This is a basic cell without a horizontal rule"
                leftAccessory={
                    <PhosphorIcon icon={IconMappings.article} size="medium" />
                }
                horizontalRule="none"
            />
        </>
    ),
};

/**
 * Cell components can also adapt to different visual needs. One example of this
 * can be done by passing a custom style object to the `style` prop.
 */
export const CompactCellWithCustomStyles: StoryComponentType = {
    render: () => (
        <CompactCell
            title="CompactCell with a darkBlue background"
            leftAccessory={
                <PhosphorIcon icon={IconMappings.article} size="medium" />
            }
            rightAccessory={
                <PhosphorIcon
                    icon={IconMappings.calendar}
                    color={semanticColor.core.foreground.knockout.default}
                />
            }
            style={{
                background: semanticColor.surface.inverse,
                color: semanticColor.core.foreground.knockout.default,
            }}
            onClick={() => {}}
        />
    ),
};

/*
 * Cell components can also also be clickable. This is done by passing an
 * `onClick` prop to the component.
 */
export const ClickableCompactCell: StoryComponentType = {
    render: () => (
        <CompactCell
            title="Intro to rational & irrational numbers"
            rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} />}
            onClick={() => {}}
            aria-label="Press to navigate to the article"
        />
    ),
    parameters: {
        chromatic: {
            // This only includes interactions with the clickable cell, so no
            // need to capture screenshots.
            disableSnapshot: true,
        },
    },
};

/**
 * The cell also supports different states within itself. The different styles
 * are defined internally (e.g hover, focused, pressed, active, disabled) and we
 * allow passing some props to use the `active` or `disabled` state.
 */
export const CompactCellActive: StoryComponentType = {
    render: () => (
        <CompactCell
            title="Title for article item"
            leftAccessory={
                <PhosphorIcon
                    icon={IconMappings.playCircle}
                    size="medium"
                    color="black"
                />
            }
            rightAccessory={
                <PhosphorIcon icon={IconMappings.calendarBold} size="small" />
            }
            active={true}
            onClick={() => {}}
        />
    ),
    parameters: {
        chromatic: {
            // This is already tested in the StateSheet story.
            disableSnapshot: true,
        },
    },
};

/**
 * In the following example we can see how the `disabled` state works. Note that
 * we apply an opacity to all the elements to make it more apparent that the
 * cell is disabled. This includes text, SVG icons, images, etc.
 */
export const CompactCellDisabled: StoryComponentType = {
    render: () => (
        <CompactCell
            title="Title for article item"
            leftAccessory={AccessoryMappings.withImage}
            rightAccessory={
                <PhosphorIcon icon={IconMappings.calendarBold} size="small" />
            }
            disabled={true}
            onClick={() => {}}
        />
    ),
    parameters: {
        chromatic: {
            // This is already tested in the StateSheet story.
            disableSnapshot: true,
        },
    },
};

/**
 * These are `CompactCell` instances with custom background colors. Note that we
 * use the `style` prop to pass a custom style object to the cell.
 *
 * We recommend using a faded background color (third cell) to make the cell
 * look as expected with different states (e.g. hover, focus, active).
 *
 * If you use a solid background color (last cell), the cell states will not
 * change the background color.
 *
 * _NOTE:_ We use custom roles here to make sure that the cell focus ring is
 * displayed correctly while using `View` elements as parent containers. We
 * encourage using semantic HTML elements (e.g. `ul`, `li`) when possible (via
 * `addStyle("ul")` if you need to add Aphrodite Styles).
 */
export const CompactCellsAsListItems: StoryComponentType = {
    render: () => (
        <View role="list">
            <View role="listitem">
                <CompactCell
                    title="Active Cell"
                    leftAccessory={
                        <PhosphorIcon
                            icon={IconMappings.article}
                            size="medium"
                        />
                    }
                    active={true}
                    href="https://khanacademy.org"
                    horizontalRule="full-width"
                />
            </View>
            <View role="listitem">
                <CompactCell
                    title="Cell with default bg color"
                    leftAccessory={
                        <PhosphorIcon
                            icon={IconMappings.article}
                            size="medium"
                        />
                    }
                    href="https://khanacademy.org"
                    horizontalRule="full-width"
                />
            </View>
            <View role="listitem">
                <CompactCell
                    title="Cell with a faded background color"
                    leftAccessory={
                        <PhosphorIcon
                            icon={IconMappings.article}
                            size="medium"
                        />
                    }
                    href="https://khanacademy.org"
                    horizontalRule="full-width"
                    style={{background: color.offBlack50}}
                />
            </View>
            <View role="listitem">
                <CompactCell
                    title="Cell with a solid background color"
                    leftAccessory={
                        <PhosphorIcon
                            icon={IconMappings.article}
                            size="medium"
                        />
                    }
                    onClick={() => {}}
                    style={{background: color.fadedPurple24}}
                    horizontalRule="full-width"
                />
            </View>
        </View>
    ),
    parameters: {
        chromatic: {
            // This includes tests with custom background colors via the `style`
            // prop, so no need to capture screenshots.
            disableSnapshot: true,
        },
    },
};

const styles = StyleSheet.create({
    example: {
        backgroundColor: semanticColor.core.background.base.subtle,
        padding: spacing.large_24,
        width: 320 + spacing.xxLarge_48,
    },
});
