import * as React from "react";
import {StyleSheet} from "aphrodite";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import packageConfig from "../../packages/wonder-blocks-cell/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import DetailCellArgTypes from "./detail-cell.argtypes";

export default {
    title: "Cell / DetailCell",
    component: DetailCell,
    // TODO(FEI-5000):
    argTypes: DetailCellArgTypes as any,
    design: {
        type: "figma",
        url: "https://www.figma.com/file/VbVu3h2BpBhH80niq101MHHE/%F0%9F%92%A0-Main-Components?type=design&node-id=4337-2033&mode=design&t=h4nok7uwaPYDOkz6-4",
    },
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
} as Meta<typeof DetailCell>;

/**
 * Default DetailCell example. It will be rendered as the first/default story and
 * it can be interacted with the controls panel in the Browser.
 */
type StoryComponentType = StoryObj<typeof DetailCell>;

export const DefaultDetailCell: StoryComponentType = {
    args: {
        title: "Title for article item",
        subtitle1: "Subtitle 1 for article item",
        subtitle2: "Subtitle 2 for article item",
        leftAccessory: <Icon icon={icons.contentVideo} size="medium" />,
        rightAccessory: <Icon icon={icons.caretRight} />,
    },
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
        description: {
            story: "For more complex scenarios where we need to use more content such as subtitles, we provide a DetailCell component that can be used to cover these cases. The following example shows how to include a subtitle and use the active state.",
        },
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
        description: {
            story: "For more complex scenarios where we need to use more content such as subtitles, we provide a DetailCell component that can be used to cover these cases. The following example shows how to include a subtitle and use the active state.",
        },
    },
};

/**
 * Using custom styles.
 */
export const DetailCellWithCustomStyles: StoryComponentType = () => (
    <DetailCell
        title="Title for article item"
        contentStyle={{
            alignSelf: "flex-start",
        }}
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
            minHeight: 88,
        }}
    />
);

DetailCellWithCustomStyles.parameters = {
    docs: {
        description: {
            story: "Accessories can also be customized to adapt to different sizes and alignments. In this example, we can see how a cell can be customized for both accessories.",
        },
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
    docs: {
        description: {
            story: "Cell components can also also be clickable. This is done by passing a `onClick` prop to the component.",
        },
    },
};

export const DetailCellNavigation: StoryComponentType = {
    name: "Client-side navigation with DetailCell",
    render: () => (
        <MemoryRouter>
            <View>
                <DetailCell
                    title="Data"
                    subtitle2="Subtitle for article item"
                    leftAccessory={
                        <Icon icon={icons.contentVideo} size="medium" />
                    }
                    rightAccessory={<Icon icon={icons.caretRight} />}
                    href="/math/algebra"
                    aria-label="Press to navigate to the article"
                />
                <DetailCell
                    title="Geometry"
                    subtitle2="Subtitle for article item"
                    leftAccessory={
                        <Icon icon={icons.contentVideo} size="medium" />
                    }
                    rightAccessory={<Icon icon={icons.caretRight} />}
                    href="/math/geometry"
                    aria-label="Press to navigate to the article"
                    horizontalRule="none"
                />
            </View>

            <View style={styles.navigation}>
                <Switch>
                    <Route path="/math/algebra">
                        Navigates to /math/algebra
                    </Route>
                    <Route path="/math/geometry">
                        Navigates to /math/geometry
                    </Route>
                    <Route path="*">See navigation changes here</Route>
                </Switch>
            </View>
        </MemoryRouter>
    ),
};

DetailCellNavigation.parameters = {
    chromatic: {
        // This only includes interactions with the clickable cell, so no need
        // to capture screenshots.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: "Cells accept an `href` prop to be able to navigate to a different URL. Note that this will use client-side navigation if the Cell component is within a React-Router environment.",
        },
    },
};

/**
 * These are `DetailCell` instances with custom background colors. Note that we
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
export const DetailCellsAsListItems: StoryComponentType = {
    render: () => (
        <View role="list">
            <View role="listitem">
                <DetailCell
                    title="Active Cell"
                    rightAccessory={
                        <Icon icon={icons.caretRight} size="medium" />
                    }
                    active={true}
                    href="https://khanacademy.org"
                    horizontalRule="full-width"
                />
            </View>
            <View role="listitem">
                <DetailCell
                    title="Cell with default bg color"
                    rightAccessory={
                        <Icon icon={icons.caretRight} size="medium" />
                    }
                    href="https://khanacademy.org"
                    horizontalRule="full-width"
                />
            </View>
            <View role="listitem">
                <DetailCell
                    title="Disabled Cell"
                    rightAccessory={
                        <Icon icon={icons.caretRight} size="medium" />
                    }
                    disabled={true}
                    href="https://khanacademy.org"
                    horizontalRule="full-width"
                />
            </View>
            <View role="listitem">
                <DetailCell
                    title="Cell with a faded background color"
                    rightAccessory={
                        <Icon icon={icons.caretRight} size="medium" />
                    }
                    href="https://khanacademy.org"
                    horizontalRule="full-width"
                    style={{background: Color.offBlack50}}
                />
            </View>
            <View role="listitem">
                <DetailCell
                    title="Cell with a solid background color"
                    rightAccessory={
                        <Icon icon={icons.caretRight} size="medium" />
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
        padding: Spacing.large_24,
        width: 376,
    },
    navigation: {
        border: `1px dashed ${Color.lightBlue}`,
        marginTop: Spacing.large_24,
        padding: Spacing.large_24,
    },
});
