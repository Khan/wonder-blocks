// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import DetailCellArgTypes from "./detail-cell.argtypes.js";

import DetailCell from "../detail-cell.js";

export default {
    title: "Cell / DetailCell",
    component: DetailCell,
    argTypes: DetailCellArgTypes,
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
 * Default DetailCell example. It will be rendered as the first/default story and
 * it can be interacted with the controls panel in the Browser.
 */
const Template = (args) => <DetailCell {...args} />;

export const DefaultDetailCell: StoryComponentType = Template.bind({});

DefaultDetailCell.args = {
    title: "Title for article item",
    subtitle1: "Subtitle 1 for article item",
    subtitle2: "Subtitle 2 for article item",
    leftAccessory: <Icon icon={icons.contentVideo} size="medium" />,
    rightAccessory: <Icon icon={icons.caretRight} />,
};

/**
 * Active detail cell example.
 */
export const DetailCellActive: StoryComponentType = () => (
    <DetailCell
        title="Title for article item"
        subtitle1="Subtitle for article item"
        subtitle2="Subtitle for article item"
        leftAccessory={<Icon icon={icons.contentVideo} size="medium" />}
        rightAccessory={<Icon icon={icons.caretRight} size="small" />}
        active={true}
    />
);

DetailCellActive.parameters = {
    docs: {
        storyDescription:
            "For more complex scenarios where we need to use more content such as subtitles, we provide a DetailCell component that can be used to cover these cases. The following example shows how to include a subtitle and use the active state.",
    },
};

/**
 * Disabled detail cell example.
 */
export const DetailCellDisabled: StoryComponentType = () => (
    <DetailCell
        title="Title for article item"
        subtitle1="Subtitle for article item"
        subtitle2="Subtitle for article item"
        leftAccessory={<Icon icon={icons.contentVideo} size="medium" />}
        rightAccessory={<Icon icon={icons.caretRight} size="small" />}
        disabled={true}
    />
);

DetailCellDisabled.parameters = {
    docs: {
        storyDescription:
            "For more complex scenarios where we need to use more content such as subtitles, we provide a DetailCell component that can be used to cover these cases. The following example shows how to include a subtitle and use the active state.",
    },
};

/**
 * Using custom styles.
 */
export const DetailCellWithCustomStyles: StoryComponentType = () => (
    <DetailCell
        title="Title for article item"
        subtitle1="Subtitle for article item"
        subtitle2="Subtitle for article item"
        leftAccessory={<Icon icon={icons.caretLeft} size="small" />}
        leftAccessoryStyle={{
            alignSelf: "flex-start",
        }}
        rightAccessory={<Icon icon={icons.caretRight} size="small" />}
        rightAccessoryStyle={{
            alignSelf: "flex-start",
        }}
        style={{
            textAlign: "center",
        }}
    />
);

DetailCellWithCustomStyles.parameters = {
    docs: {
        storyDescription:
            "Accessories can also be customized to adapt to different sizes and alignments. In this example, we can see how a cell can be customized for both accessories.            ",
    },
};

export const ClickableDetailCell: StoryComponentType = () => (
    <DetailCell
        title="Title for article item"
        subtitle1="Subtitle for article item"
        subtitle2="Subtitle for article item"
        leftAccessory={<Icon icon={icons.contentVideo} size="medium" />}
        rightAccessory={<Icon icon={icons.caretRight} />}
        onClick={() => {}}
        aria-label="Press to navigate to the article"
    />
);

ClickableDetailCell.parameters = {
    chromatic: {
        // This only includes interactions with the clickable cell, so no need
        // to capture screenshots.
        disableSnapshot: true,
    },
};

export const DetailCellNavigation: StoryComponentType = () => (
    <MemoryRouter>
        <View>
            <DetailCell
                title="Data"
                subtitle2="Subtitle for article item"
                leftAccessory={<Icon icon={icons.contentVideo} size="medium" />}
                rightAccessory={<Icon icon={icons.caretRight} />}
                href="/math/algebra"
                aria-label="Press to navigate to the article"
            />
            <DetailCell
                title="Geometry"
                subtitle2="Subtitle for article item"
                leftAccessory={<Icon icon={icons.contentVideo} size="medium" />}
                rightAccessory={<Icon icon={icons.caretRight} />}
                href="/math/geometry"
                aria-label="Press to navigate to the article"
                horizontalRule="none"
            />
        </View>

        <View style={styles.navigation}>
            <Switch>
                <Route path="/math/algebra">Navigates to /math/algebra</Route>
                <Route path="/math/geometry">Navigates to /math/geometry</Route>
                <Route path="*">See navigation changes here</Route>
            </Switch>
        </View>
    </MemoryRouter>
);

DetailCellNavigation.storyName = "Client-side navigation with DetailCell";

DetailCellNavigation.parameters = {
    chromatic: {
        // This only includes interactions with the clickable cell, so no need
        // to capture screenshots.
        disableSnapshot: true,
    },
    docs: {
        storyDescription:
            "Cells accept an `href` prop to be able to navigate to a different URL. Note that this will use client-side navigation if the Cell component is within a React-Router environment.",
    },
};

const styles = StyleSheet.create({
    example: {
        backgroundColor: Color.offWhite,
        padding: Spacing.large_24,
        width: 376,
    },
    navigation: {
        border: `1px dashed ${Color.lightBlue}`,
        marginTop: Spacing.large_24,
        padding: Spacing.large_24,
    },
});
