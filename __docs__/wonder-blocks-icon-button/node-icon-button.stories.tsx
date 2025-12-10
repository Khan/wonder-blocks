import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react-vite";

import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";

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
            // in `activity-icon-button-testing-snapshots.stories.tsx`.
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
            options: IconMappings as any,
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
        "aria-label": "Search",
        actionType: "notStarted",
    },
} as Meta<typeof NodeIconButton>;

type StoryComponentType = StoryObj<typeof NodeIconButton>;

/**
 * Minimal activity icon button. The only props specified in this example are
 * `icon` and `onClick`.
 */
export const Default: StoryComponentType = {
    args: {
        icon: magnifyingGlass,
        actionType: "notStarted",
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

const sizes = ["small", "medium"] as const;

/**
 * NodeIconButton has a `size` prop that is either `small` (16 icon, 24 target) or `medium` (48 icon, 48 target).
 *
 * - `small` is used for smaller buttons that are used in smaller contexts, such as in a menu.
 * - `medium` is used for larger buttons that are used in larger contexts, such as in a header.
 *
 * Defaults to `medium`.
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
                icon={IconMappings.info}
                aria-label="More information"
                href="/"
                target="_blank"
                onClick={(e) => action("clicked")(e)}
            />
        );
    },
};

/**
 * There are two ways to provide accessible names to `NodeIconButton`. One
 * approach is using the `aria-label` prop that can be used to explain the
 * function of the button. Remember to keep the description concise but
 * understandable.
 */
export const WithAriaLabel: StoryComponentType = {
    render: () => {
        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <NodeIconButton
                    icon={IconMappings.caretLeftBold}
                    onClick={(e) => action("clicked")(e)}
                    aria-label="Previous page"
                />
                <NodeIconButton
                    icon={IconMappings.caretRightBold}
                    onClick={(e) => action("clicked")(e)}
                    aria-label="Next page"
                />
            </View>
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
 * You can use the `styles` prop to apply custom styles to speicific parts of
 * the NodeIconButton component.
 *
 * The following parts can be styled:
 * - `root`: Styles the root element (button)
 * - `box`: Styles the "chonky" box element
 * - `label`: Styles the text in the button
 */
export const WithStyles: StoryComponentType = {
    render: () => {
        return (
            <NodeIconButton
                icon={IconMappings.info}
                aria-label="More information"
                styles={{
                    box: {
                        backgroundColor:
                            semanticColor.learning.background.gems.default,
                        color: semanticColor.learning.foreground.gems.default,
                    },
                    tokens: {
                        "--box-foreground":
                            semanticColor.learning.foreground.gems.default,
                        "--box-background":
                            semanticColor.learning.background.gems.default,
                        "--box-shadow-color":
                            semanticColor.learning.math.foreground.pink,
                        "--icon-inline-size": sizing.size_960,
                        "--icon-block-size": sizing.size_960,
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
