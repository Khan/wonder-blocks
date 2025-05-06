import * as React from "react";
import {StyleSheet} from "aphrodite";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";
import type {Meta, StoryObj} from "@storybook/react";

import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    color,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import packageConfig from "../../packages/wonder-blocks-cell/package.json";

import ComponentInfo from "../components/component-info";
import DetailCellArgTypes from "./detail-cell.argtypes";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Cell / DetailCell",
    component: DetailCell,
    argTypes: DetailCellArgTypes,
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
        leftAccessory: (
            <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
        ),
        rightAccessory: <PhosphorIcon icon={IconMappings.caretRight} />,
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
        leftAccessory={
            <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
        }
        rightAccessory={
            <PhosphorIcon icon={IconMappings.caretRightBold} size="small" />
        }
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
        leftAccessory={
            <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
        }
        rightAccessory={
            <PhosphorIcon icon={IconMappings.caretRightBold} size="small" />
        }
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
        leftAccessory={
            <PhosphorIcon icon={IconMappings.caretLeftBold} size="small" />
        }
        leftAccessoryStyle={{
            alignSelf: "flex-start",
        }}
        rightAccessory={
            <PhosphorIcon icon={IconMappings.caretRightBold} size="small" />
        }
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
            story: "Accessories and the main content container can also be customized to adapt to different sizes and alignments. In this example, we can see how a cell can be customized for both accessories and the content.",
        },
    },
};

export const ClickableDetailCell: StoryComponentType = () => (
    <DetailCell
        title="Title for article item"
        subtitle1="Subtitle for article item"
        subtitle2="Subtitle for article item"
        leftAccessory={
            <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
        }
        rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} />}
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
            <CompatRouter>
                <View>
                    <DetailCell
                        title="Data"
                        subtitle2="Subtitle for article item"
                        leftAccessory={
                            <PhosphorIcon
                                icon={IconMappings.playCircle}
                                size="medium"
                            />
                        }
                        rightAccessory={
                            <PhosphorIcon icon={IconMappings.caretRight} />
                        }
                        href="/math/algebra"
                        aria-label="Press to navigate to the article"
                    />
                    <DetailCell
                        title="Geometry"
                        subtitle2="Subtitle for article item"
                        leftAccessory={
                            <PhosphorIcon
                                icon={IconMappings.playCircle}
                                size="medium"
                            />
                        }
                        rightAccessory={
                            <PhosphorIcon icon={IconMappings.caretRight} />
                        }
                        href="/math/geometry"
                        aria-label="Press to navigate to the article"
                        horizontalRule="none"
                    />
                </View>

                <View style={styles.navigation}>
                    <Routes>
                        <Route
                            path="/math/algebra"
                            element={<View>Navigates to /math/algebra</View>}
                        />
                        <Route
                            path="/math/geometry"
                            element={<View>Navigates to /math/geometry</View>}
                        />
                        <Route
                            path="*"
                            element={<View>See navigation changes here</View>}
                        />
                    </Routes>
                </View>
            </CompatRouter>
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
                        <PhosphorIcon
                            icon={IconMappings.caretRight}
                            size="medium"
                        />
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
                        <PhosphorIcon
                            icon={IconMappings.caretRight}
                            size="medium"
                        />
                    }
                    href="https://khanacademy.org"
                    horizontalRule="full-width"
                />
            </View>
            <View role="listitem">
                <DetailCell
                    title="Disabled Cell"
                    rightAccessory={
                        <PhosphorIcon
                            icon={IconMappings.caretRight}
                            size="medium"
                        />
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
                        <PhosphorIcon
                            icon={IconMappings.caretRight}
                            size="medium"
                        />
                    }
                    href="https://khanacademy.org"
                    horizontalRule="full-width"
                    style={{background: color.offBlack50}}
                />
            </View>
            <View role="listitem">
                <DetailCell
                    title="Cell with a solid background color"
                    rightAccessory={
                        <PhosphorIcon
                            icon={IconMappings.caretRight}
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

export const Scenarios = () => {
    const longText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";
    const longTextWithNoWordBreak =
        "Loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtemporincididuntutlaboreetdoloremagnaaliqua";

    const defaultProps = {
        title: "Title for article item",
        subtitle1: "Subtitle 1 for article item",
        subtitle2: "Subtitle 2 for article item",
        leftAccessory: (
            <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
        ),
        rightAccessory: <PhosphorIcon icon={IconMappings.caretRight} />,
    };

    const scenarios = [
        {
            label: "Default",
            props: defaultProps,
        },
        {
            label: "No Icons",
            props: {
                ...defaultProps,
                leftAccessory: undefined,
                rightAccessory: undefined,
            },
        },
        {
            label: "Left Icon Only",
            props: {
                ...defaultProps,
                rightAccessory: undefined,
            },
        },
        {
            label: "Right Icon Only",
            props: {
                ...defaultProps,
                leftAccessory: undefined,
            },
        },
        {
            label: "No Subtitles",
            props: {
                ...defaultProps,
                subtitle1: undefined,
                subtitle2: undefined,
            },
        },
        {
            label: "Subtitle 1 only",
            props: {
                ...defaultProps,
                subtitle2: undefined,
            },
        },
        {
            label: "Subtitle 2 only",
            props: {
                ...defaultProps,
                subtitle1: undefined,
            },
        },
        {
            label: "Title only",
            props: {
                title: defaultProps.title,
            },
        },
        {
            label: "Long Text",
            props: {
                ...defaultProps,
                title: longText,
                subtitle1: longText,
                subtitle2: longText,
            },
        },
        {
            label: "Long Text No Word Break",
            props: {
                ...defaultProps,
                title: longTextWithNoWordBreak,
                subtitle1: longTextWithNoWordBreak,
                subtitle2: longTextWithNoWordBreak,
            },
        },
        {
            label: "Long Text (no icons)",
            props: {
                ...defaultProps,
                title: longText,
                subtitle1: longText,
                subtitle2: longText,
                leftAccessory: undefined,
                rightAccessory: undefined,
            },
        },
        {
            label: "Long Text No Word Break (no icons)",
            props: {
                ...defaultProps,
                title: longTextWithNoWordBreak,
                subtitle1: longTextWithNoWordBreak,
                subtitle2: longTextWithNoWordBreak,
                leftAccessory: undefined,
                rightAccessory: undefined,
            },
        },
    ];
    return (
        <View style={{gap: spacing.large_24}}>
            {scenarios.map((scenario, index) => (
                <React.Fragment key={index}>
                    <LabelSmall>{scenario.label}</LabelSmall>
                    <DetailCell {...scenario.props} />
                </React.Fragment>
            ))}
        </View>
    );
};

/**
 * Custom styling can be applied to the component using the `rootStyle` or
 * `style` props.
 */
export const CustomRootStyle = {
    args: {
        title: "Title for article item",
        subtitle1: "Subtitle for article item",
        subtitle2: "Subtitle for article item",
        leftAccessory: (
            <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
        ),
    },
    render(args: PropsFor<typeof DetailCell>) {
        return (
            <View style={{gap: spacing.large_24}}>
                Active (with rootStyle prop):
                <DetailCell
                    {...args}
                    rootStyle={{borderRadius: border.radius.radius_120}}
                    active={true}
                />
                Pressed (with rootStyle prop):
                <DetailCell
                    {...args}
                    rootStyle={{borderRadius: border.radius.radius_120}}
                />
                Different content heights (with style prop)
                <View
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "16px",
                    }}
                >
                    <DetailCell
                        title="Title"
                        subtitle1="Subtitle 1"
                        subtitle2="Subtitle2"
                        onClick={() => {}}
                        style={[
                            {
                                border: `1px solid ${semanticColor.border.primary}`,
                            },
                        ]}
                        horizontalRule={"none"}
                    />
                    <DetailCell
                        title="Title"
                        onClick={() => {}}
                        style={[
                            args.rootStyle,
                            {
                                border: `1px solid ${semanticColor.border.primary}`,
                            },
                        ]}
                        horizontalRule={"none"}
                    />
                    <DetailCell
                        title="Title"
                        onClick={() => {}}
                        style={[
                            args.rootStyle,
                            {
                                border: `1px solid ${semanticColor.border.primary}`,
                            },
                        ]}
                        horizontalRule={"none"}
                    />
                </View>
            </View>
        );
    },
    parameters: {pseudo: {active: true}},
};

const styles = StyleSheet.create({
    example: {
        backgroundColor: color.offWhite,
        padding: spacing.large_24,
        width: 376,
    },
    navigation: {
        border: `1px dashed ${color.purple}`,
        marginTop: spacing.large_24,
        padding: spacing.large_24,
    },
});
