// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

import type {StoryComponentType} from "@storybook/react";

import type {IconAsset} from "@khanacademy/wonder-blocks-icon";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import BasicCellArgTypes, {AccessoryMappings} from "./basic-cell.argtypes.js";

import BasicCell from "../basic-cell.js";

export default {
    title: "Cell / BasicCell",
    component: BasicCell,
    argTypes: BasicCellArgTypes,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
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
        (Story: any): React.Node => (
            <View style={styles.example}>{Story()}</View>
        ),
    ],
};

/**
 * Default BasicCell example. It will be rendered as the first/default story and
 * it can be interacted with the controls panel in the Browser.
 */
const Template = (args) => <BasicCell {...args} />;

export const DefaultBasicCell: StoryComponentType = Template.bind({});

DefaultBasicCell.args = {
    title: "Basic Cell",
    rightAccessory: <Icon icon={icons.caretRight} />,
};

DefaultBasicCell.parameters = {
    chromatic: {
        // We have screenshots of other stories that cover other variants.
        disableSnapshot: true,
    },
};

/**
 * Only including an accessory on the left.
 */
export const BasicCellLeft: StoryComponentType = () => (
    <BasicCell
        title="Intro to rational & irrational numbers"
        leftAccessory={<Icon icon={icons.contentArticle} size="medium" />}
    />
);

BasicCellLeft.parameters = {
    docs: {
        storyDescription:
            "You can create a minimal cell that only uses a title and an Icon that can be placed on the left or right (or both). In this case, we will place the icon on the left to show you how cell is flexible. Note that you can pass any of the existing WB components such as `Icon`, `IconButton`, `Tooltip`, etc.",
    },
};

/**
 * Only including an accessory on the right.
 */
export const BasicCellRight: StoryComponentType = (args) => (
    <BasicCell
        title="Intro to rational & irrational numbers"
        rightAccessory={<Icon icon={icons.caretRight} size="medium" />}
    />
);

BasicCellRight.parameters = {
    docs: {
        storyDescription:
            "You can also create a cell with an accessory placed on the right. Note that you can pass any of the existing WB components such as `Icon`.",
    },
};

/**
 * Adding multiline title to verify that the cell's height is correct.
 */
export const BasicCellWithDifferentHeights: StoryComponentType = (args) => (
    <>
        <BasicCell
            title="Single line with short accessory."
            rightAccessory={AccessoryMappings.withCaret}
        />
        <Strut size={Spacing.xSmall_8} />
        <BasicCell
            title="Single line with tall accessory."
            rightAccessory={AccessoryMappings.withIconText}
        />
        <Strut size={Spacing.xSmall_8} />
        <BasicCell
            title="Multi line title with tall accessory. Content should fit within the container and the cell height should be consistent no matter the content length."
            rightAccessory={AccessoryMappings.withIconText}
        />
    </>
);

BasicCellWithDifferentHeights.parameters = {
    docs: {
        storyDescription:
            "Cells should keep a consistent height no matter the content passed in the title prop. It should also respect a `minHeight` of 48px",
    },
};

/**
 * A BasicCell example adding both accessories (left and right)
 */
const calendarIcon: IconAsset = {
    small: `M14.22 1.6H13.33V0H11.56V1.6H4.44V0H2.67V1.6H1.78C0.79 1.6 0.01 2.32 0.01 3.2L0 14.4C0 15.28 0.79 16 1.78 16H14.22C15.2 16 16 15.28 16 14.4V3.2C16 2.32 15.2 1.6 14.22 1.6ZM14.22 14.4H1.78V5.6H14.22V14.4ZM3.56 7.2H8V11.2H3.56V7.2Z`,
};

export const BasicCellBoth: StoryComponentType = () => (
    <BasicCell
        title="Intro to rational & irrational numbers"
        leftAccessory={<Icon icon={icons.contentArticle} size="medium" />}
        rightAccessory={
            <Icon icon={calendarIcon} size="medium" color={Color.blue} />
        }
    />
);

BasicCellBoth.storyName = "BasicCell with both accessories";

BasicCellBoth.parameters = {
    docs: {
        storyDescription:
            "You can also create a more complex cell with accessories placed on both sides. Note that you can extend the Icon component with custom paths such as the following example.",
    },
};

export const BasicCellAccessoryStyles: StoryComponentType = () => (
    <BasicCell
        title="BasicCell with custom accessory styles"
        leftAccessory={<Icon icon={icons.contentArticle} size="medium" />}
        leftAccessoryStyle={{
            minWidth: Spacing.xxLarge_48,
            alignSelf: "flex-start",
            alignItems: "flex-start",
        }}
        rightAccessory={<Icon icon={icons.caretRight} size="small" />}
        rightAccessoryStyle={{
            minWidth: Spacing.large_24,
            alignSelf: "flex-end",
            alignItems: "flex-end",
        }}
    />
);

BasicCellAccessoryStyles.storyName = "BasicCell accessories with custom styles";

BasicCellAccessoryStyles.parameters = {
    docs: {
        storyDescription:
            "Accessories can also be customized to adapt to different sizes and alignments. In this example, we can see how a cell can be customized for both accessories.",
    },
};

/**
 * Defining horizontal rule variants
 */
export const BasicCellHorizontalRules: StoryComponentType = () => (
    <>
        <BasicCell
            title="This is a basic cell with an 'inset' horizontal rule"
            leftAccessory={<Icon icon={icons.contentArticle} size="medium" />}
            horizontalRule="inset"
        />
        <BasicCell
            title="This is a basic cell with a 'full-width' horizontal rule"
            leftAccessory={<Icon icon={icons.contentArticle} size="medium" />}
            horizontalRule="full-width"
        />
        <BasicCell
            title="This is a basic cell without a horizontal rule"
            leftAccessory={<Icon icon={icons.contentArticle} size="medium" />}
            horizontalRule="none"
        />
    </>
);

BasicCellHorizontalRules.storyName = "Defining horizontal rule variants";

BasicCellHorizontalRules.parameters = {
    docs: {
        storyDescription:
            "Cell components can use the `horizontalRule` prop to use a set of predefined variants that we can use to match our needs.",
    },
};

export const BasicCellWithCustomStyles: StoryComponentType = () => (
    <BasicCell
        title="BasicCell with a darkBlue background"
        leftAccessory={<Icon icon={icons.contentArticle} size="medium" />}
        rightAccessory={<Icon icon={calendarIcon} color={Color.white} />}
        style={{
            background: Color.darkBlue,
            color: Color.white,
        }}
        onClick={() => {}}
    />
);

BasicCellHorizontalRules.parameters = {
    docs: {
        storyDescription:
            "Cell components can also adapt to different visual needs. One example of this can be done by passing a custom style object to the `style` prop.",
    },
};
/*
 * BasicCell with onClick set

 */

export const ClickableBasicCell: StoryComponentType = () => (
    <BasicCell
        title="Intro to rational & irrational numbers"
        rightAccessory={<Icon icon={icons.caretRight} />}
        onClick={() => {}}
        aria-label="Press to navigate to the article"
    />
);

ClickableBasicCell.parameters = {
    chromatic: {
        // This only includes interactions with the clickable cell, so no need
        // to capture screenshots.
        disableSnapshot: true,
    },
};

export const BasicCellActive: StoryComponentType = () => (
    <BasicCell
        title="Title for article item"
        leftAccessory={
            <Icon icon={icons.contentVideo} size="medium" color="black" />
        }
        rightAccessory={<Icon icon={calendarIcon} size="small" />}
        active={true}
        onClick={() => {}}
    />
);

export const BasicCellDisabled: StoryComponentType = () => (
    <BasicCell
        title="Title for article item"
        leftAccessory={<Icon icon={icons.contentVideo} size="medium" />}
        rightAccessory={<Icon icon={calendarIcon} size="small" />}
        disabled={true}
        onClick={() => {}}
    />
);

const styles = StyleSheet.create({
    example: {
        backgroundColor: Color.offWhite,
        padding: Spacing.large_24,
        width: 320 + Spacing.xxLarge_48,
    },
});
