import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react-vite";

import {action} from "storybook/actions";
import {View} from "@khanacademy/wonder-blocks-core";
import {NodeIconButton} from "@khanacademy/wonder-blocks-icon-button";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {Icon} from "@khanacademy/wonder-blocks-icon";

import khanmigoIcon from "./images/mini-khanmigo.svg";

export default {
    title: "Packages / IconButton / NodeIconButton",
    component: NodeIconButton,
    decorators: [(Story): React.ReactElement => <View>{Story()}</View>],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling all snapshots because we are testing all the variants
            // in `node-icon-button-testing-snapshots.stories.tsx`.
            disableSnapshot: true,
        },
        docs: {
            source: {
                type: "code",
            },
        },
    },
    argTypes: {
        icon: {
            control: {
                type: "select",
            },
            mapping: IconMappings,
            options: Object.keys(IconMappings),
            table: {
                type: {
                    // NOTE: We document `Icon` instead of `ReactElement`
                    // because we want to encourage the use of `Icon` components
                    // for custom icons.
                    summary: "PhosphorIconAsset | Icon",
                },
            },
        },
    },
    args: {
        "aria-label": "Node path",
        actionType: "notStarted",
    },
} as Meta<typeof NodeIconButton>;

type StoryComponentType = StoryObj<typeof NodeIconButton>;

/**
 * Minimal node icon button. The only props specified in this example are
 * `icon`, `onClick`, and `aria-label`. Note that `aria-label` is required for
 * accessibility, as it provides a text alternative for the icon button.
 */
export const Default: StoryComponentType = {
    args: {
        icon: IconMappings.pencilSimple,
        disabled: false,
        onClick: (e: React.SyntheticEvent) => {
            action("clicked")(e);
        },
    },
};

const actionTypes = ["notStarted", "attempted", "complete"] as const;
/**
 * NodeIconButton has an `actionType` prop that is either `notStarted` (the
 * default, as shown above) or `attempted` or `complete`:
 */
export const ActionType: StoryComponentType = {
    name: "ActionType",
    render: (args) => (
        <View style={{gap: sizing.size_160}}>
            {actionTypes.map((actionType, index) => (
                <View
                    key={index}
                    style={{gap: sizing.size_160, flexDirection: "row"}}
                >
                    <NodeIconButton
                        icon={IconMappings.arrowUpBold}
                        aria-label="navigate"
                        onClick={() => {}}
                        actionType={actionType}
                        key={`${actionType}-${index}`}
                    />

                    <NodeIconButton
                        disabled={true}
                        icon={IconMappings.arrowUpBold}
                        aria-label="search"
                        onClick={(e) => action("clicked")(e)}
                        actionType={actionType}
                        key={`disabled-${actionType}-${index}`}
                    />
                </View>
            ))}
        </View>
    ),
};

const sizes = ["small", "large"] as const;

/**
 * NodeIconButton has a `size` prop that is either `small` (16 icon, 24 target)
 * or `medium` (48 icon, 48 target).
 *
 * - `small` is used for smaller buttons that are used in smaller contexts, such
 *   as in a menu.
 * - `large` is used for larger buttons that are used in larger contexts, such
 *   as in a header.
 *
 * Defaults to `large`.
 */
export const Size: StoryComponentType = {
    render: (args) => (
        <View style={{gap: sizing.size_160}}>
            {sizes.map((size, index) => (
                <NodeIconButton
                    key={index}
                    icon={IconMappings.arrowUpBold}
                    aria-label="navigate"
                    onClick={() => {}}
                    actionType="notStarted"
                    size={size}
                />
            ))}
        </View>
    ),
};

/**
 * This example has an `href` prop in addition to the `onClick` prop. `href`
 * takes a URL or path, and clicking the icon button will result in a navigation
 * to the specified page. Note that `onClick` is not required if `href` is
 * defined. The `target="_blank"` prop will cause the href page to open in a new
 * tab.
 */
export const UsingHref: StoryComponentType = {
    render: () => {
        return (
            <NodeIconButton
                icon={IconMappings.clock}
                aria-label="More information"
                href="/"
                target="_blank"
                onClick={(e) => action("clicked")(e)}
            />
        );
    },
};

/**
 * For non-Phosphor icons, you can use the Wonder Blocks Icon component to wrap
 * the custom icon.
 *
 * Note: The NodeIconButton component will handle the sizing for the icon.
 */
export const WithCustomIcon: StoryComponentType = {
    render: () => {
        return (
            <View
                style={{
                    gap: sizing.size_160,
                    flexDirection: "row",
                    alignItems: "flex-start",
                }}
            >
                <NodeIconButton
                    icon={
                        <Icon size="medium">
                            <img alt="" src={khanmigoIcon} />
                        </Icon>
                    }
                    onClick={(e) => action("clicked")(e)}
                    aria-label="Khanmigo"
                    actionType="notStarted"
                />
            </View>
        );
    },
};

/**
 * The recommended way to customize the appearance of the `NodeIconButton`
 * component is to use the `tokens` prop. This prop accepts a token object that
 * contains the CSS variables that can be overridden to customize the appearance
 * of the `NodeIconButton` component.
 *
 * The following tokens can be overridden:
 * - `boxForeground`: The foreground color of the "chonky" box element.
 * - `boxBackground`: The background color of the "chonky" box element.
 * - `boxShadowColor`: The color of the shadow of the "chonky" box element.
 * - `boxPadding`: The padding of the "chonky" box element.
 * - `boxShadowYRest`: The y-offset of the rest state shadow of the "chonky" box
 *   element.
 * - `boxShadowYHover`: The y-offset of the hover state shadow of the "chonky"
 *   box element.
 * - `boxShadowYPress`: The y-offset of the press state shadow of the "chonky"
 *   box element.
 * - `iconSize`: The size of the icon element.
 */
export const WithCustomTokens: StoryComponentType = {
    render: () => {
        return (
            <NodeIconButton
                icon={IconMappings.info}
                aria-label="More information"
                tokens={{
                    boxForeground:
                        semanticColor.learning.foreground.streaks.default,
                    boxBackground:
                        semanticColor.learning.background.streaks.default,
                    boxShadowColor: semanticColor.learning.math.foreground.pink,
                    boxPadding: sizing.size_120,
                    boxShadowYRest: sizing.size_080,
                    boxShadowYHover: sizing.size_100,
                    boxShadowYPress: sizing.size_0,
                    iconSize: sizing.size_960,
                }}
            />
        );
    },
};

/**
 * Alternatively, you can use the `styles` prop to apply custom styles to
 * speicific parts of the `NodeIconButton` component.
 *
 * The following parts can be styled:
 * - `root`: Styles the root element (button)
 * - `box`: Styles the "chonky" box element
 * - `icon`: Styles the icon element
 *
 * **Note:** The `styles` prop is not recommended for most use cases. Instead,
 * we recommend using the `tokens` prop to customize the appearance of the
 * `NodeIconButton` component. If you still need to provide more specific
 * styles, you can use the `styles` prop.
 */
export const WithCustomStyles: StoryComponentType = {
    render: () => {
        return (
            <NodeIconButton
                icon={IconMappings.info}
                aria-label="More information"
                styles={{
                    root: {
                        width: sizing.size_960,
                        height: sizing.size_960,
                    },
                    box: {
                        background:
                            semanticColor.learning.background.streaks.default,
                    },
                    icon: {
                        color: semanticColor.learning.foreground.streaks
                            .default,
                        margin: sizing.size_120,
                    },
                }}
            />
        );
    },
    parameters: {
        chromatic: {
            // Keep snapshots to confirm custom styles are working
            disableSnapshot: false,
        },
    },
};
