import * as React from "react";
import {StyleSheet} from "aphrodite";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {color, semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import packageConfig from "../../packages/wonder-blocks-cell/package.json";

import ComponentInfo from "../components/component-info";
import DetailCellArgTypes from "./detail-cell.argtypes";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

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
    parameters: {
        chromatic: {
            // This is already covered in
            // detail-cell-testing-snapshots.stories.tsx.
            disableSnapshot: true,
        },
    },
};

/**
 * For more complex scenarios where we need to use more content such as
 * subtitles, we provide a DetailCell component that can be used to cover these
 * cases. The following example shows how to include a subtitle and use the
 * active state.
 */
export const DetailCellActive: StoryComponentType = {
    render: () => (
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
    ),
    parameters: {
        chromatic: {
            // This is already covered in
            // detail-cell-testing-snapshots.stories.tsx.
            disableSnapshot: true,
        },
    },
};

/**
 * For more complex scenarios where we need to use more content such as
 * subtitles, we provide a DetailCell component that can be used to cover these
 * cases. The following example shows how to include a subtitle and use the
 * active state.
 */
export const DetailCellDisabled: StoryComponentType = {
    render: () => (
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
    ),
    parameters: {
        chromatic: {
            // This is already covered in
            // detail-cell-testing-snapshots.stories.tsx.
            disableSnapshot: true,
        },
    },
};

/**
 * Accessories and the main content container can also be customized to adapt to
 * different sizes and alignments. In this example, we can see how a cell can be
 * customized for both accessories and the content.
 */
export const DetailCellWithCustomStyles: StoryComponentType = {
    render: () => (
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
    ),
};

/**
 * Cell components can also also be clickable. This is done by passing a
 * `onClick` prop to the component.
 */
export const ClickableDetailCell: StoryComponentType = {
    render: () => (
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
    ),
    parameters: {
        chromatic: {
            // This only includes interactions with the clickable cell, so no need
            // to capture screenshots.
            disableSnapshot: true,
        },
    },
};

/**
 * Cells accept an `href` prop to be able to navigate to a different URL. Note
 * that this will use client-side navigation if the Cell component is within a
 * React-Router environment.
 */
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
    parameters: {
        chromatic: {
            // This only includes interactions with the clickable cell, so no need
            // to capture screenshots.
            disableSnapshot: true,
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

const styles = StyleSheet.create({
    example: {
        backgroundColor: semanticColor.surface.secondary,
        padding: spacing.large_24,
        width: 376,
    },
    navigation: {
        border: `1px dashed ${color.purple}`,
        marginTop: spacing.large_24,
        padding: spacing.large_24,
    },
});
