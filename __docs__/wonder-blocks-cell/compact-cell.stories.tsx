import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import packageConfig from "../../packages/wonder-blocks-cell/package.json";
import {CompactCell} from "@khanacademy/wonder-blocks-cell";

import ComponentInfo from "../../.storybook/components/component-info";
import CompactCellArgTypes, {AccessoryMappings} from "./compact-cell.argtypes";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

type StoryComponentType = StoryObj<typeof CompactCell>;

export default {
    title: "Cell / CompactCell",
    component: CompactCell,
    argTypes: CompactCellArgTypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        design: {
            type: "figma",
            url: "https://www.figma.com/file/VbVu3h2BpBhH80niq101MHHE/%F0%9F%92%A0-Main-Components?type=design&node-id=4337-2487&mode=design&t=h4nok7uwaPYDOkz6-4",
        },
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
 * Only including an accessory on the left.
 */
export const CompactCellLeft: StoryComponentType = () => (
    <CompactCell
        title="Intro to rational & irrational numbers"
        leftAccessory={
            <PhosphorIcon icon={IconMappings.article} size="medium" />
        }
    />
);

CompactCellLeft.parameters = {
    docs: {
        description: {
            story: "You can create a minimal cell that only uses a title and an PhosphorIcon that can be placed on the left or right (or both). In this case, we will place the icon on the left to show you how cell is flexible. Note that you can pass any of the existing WB components such as `PhosphorIcon`, `IconButton`, `Tooltip`, etc.",
        },
    },
};

/**
 * Only including an accessory on the right.
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
};

CompactCellRight.parameters = {
    docs: {
        description: {
            story: "You can also create a cell with an accessory placed on the right. Note that you can pass any of the existing WB components such as `PhosphorIcon`.",
        },
    },
};

/**
 * Adding multiline title to verify that the cell's height is correct.
 */
export const CompactCellWithDifferentHeights: StoryComponentType = () => (
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
);

CompactCellWithDifferentHeights.parameters = {
    docs: {
        description: {
            story: "Cells should keep a consistent height no matter the content passed in the title prop. It should also respect a `minHeight` of 48px",
        },
    },
};

/**
 * A CompactCell example adding both accessories (left and right)
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
                <PhosphorIcon
                    icon={IconMappings.calendar}
                    size="medium"
                    color={Color.blue}
                />
            }
        />
    ),
};

CompactCellBoth.parameters = {
    docs: {
        description: {
            story: "You can also create a more complex cell with accessories placed on both sides. Note that you can extend the PhosphorIcon component with custom paths such as the following example.",
        },
    },
};

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

CompactCellAccessoryStyles.parameters = {
    docs: {
        description: {
            story: "Accessories can also be customized to adapt to different sizes and alignments. In this example, we can see how a cell can be customized for both accessories.",
        },
    },
};

/**
 * Defining horizontal rule variants
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

CompactCellHorizontalRules.parameters = {
    docs: {
        description: {
            story: "Cell components can use the `horizontalRule` prop to use a set of predefined variants that we can use to match our needs.",
        },
    },
};

export const CompactCellWithCustomStyles: StoryComponentType = () => (
    <CompactCell
        title="CompactCell with a darkBlue background"
        leftAccessory={
            <PhosphorIcon icon={IconMappings.article} size="medium" />
        }
        rightAccessory={
            <PhosphorIcon icon={IconMappings.calendar} color={Color.white} />
        }
        style={{
            background: Color.darkBlue,
            color: Color.white,
        }}
        onClick={() => {}}
    />
);

CompactCellWithCustomStyles.parameters = {
    docs: {
        description: {
            story: "Cell components can also adapt to different visual needs. One example of this can be done by passing a custom style object to the `style` prop.",
        },
    },
};

/*
 * CompactCell with onClick set

 */

export const ClickableCompactCell: StoryComponentType = () => (
    <CompactCell
        title="Intro to rational & irrational numbers"
        rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} />}
        onClick={() => {}}
        aria-label="Press to navigate to the article"
    />
);

ClickableCompactCell.parameters = {
    chromatic: {
        // This only includes interactions with the clickable cell, so no need
        // to capture screenshots.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: "Cell components can also also be clickable. This is done by passing a `onClick` prop to the component.",
        },
    },
};

export const CompactCellActive: StoryComponentType = () => (
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
);

CompactCellActive.parameters = {
    docs: {
        description: {
            story: "The cell also supports different states within itself. The different styles are defined internally (e.g hover, focused, pressed, active, disabled) and we allow passing some props to use the `active` or `disabled` state.",
        },
    },
};

export const CompactCellDisabled: StoryComponentType = () => (
    <CompactCell
        title="Title for article item"
        leftAccessory={AccessoryMappings.withImage}
        rightAccessory={
            <PhosphorIcon icon={IconMappings.calendarBold} size="small" />
        }
        disabled={true}
        onClick={() => {}}
    />
);

CompactCellDisabled.parameters = {
    docs: {
        description: {
            story: "In the following example we can see how the `disabled` state works. Note that we apply an opacity to all the elements to make it more apparent that the cell is disabled. This includes text, SVG icons, images, etc.",
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
                    style={{background: Color.offBlack50}}
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
                    style={{background: Color.pink}}
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
        backgroundColor: Color.offWhite,
        padding: spacing.large_24,
        width: 320 + spacing.xxLarge_48,
    },
});
