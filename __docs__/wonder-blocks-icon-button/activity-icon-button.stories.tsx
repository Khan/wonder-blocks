import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react";

import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";
import {ActivityIconButton} from "@khanacademy/wonder-blocks-icon-button";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import iconButtonSharedArgtypes from "./icon-button-shared.argtypes";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    title: "Packages / IconButton / ActivityIconButton",
    component: ActivityIconButton,
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
    argTypes: iconButtonSharedArgtypes,
    args: {
        "aria-label": "Search",
        kind: "primary",
        actionType: "progressive",
    },
} as Meta<typeof ActivityIconButton>;

type StoryComponentType = StoryObj<typeof ActivityIconButton>;

/**
 * Minimal activity icon button. The only props specified in this example are
 * `icon` and `onClick`.
 */
export const Default: StoryComponentType = {
    args: {
        icon: magnifyingGlass,
        actionType: "progressive",
        disabled: false,
        kind: "primary",
        onClick: (e: React.SyntheticEvent) => {
            action("clicked")(e);
        },
    },
};

/**
 * In this example, we have `primary`, `secondary`, `tertiary` and `disabled`
 * `ActivityIconButton`s from left to right.
 */
export const Kinds: StoryComponentType = {
    render: () => {
        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <ActivityIconButton
                    icon={magnifyingGlass}
                    aria-label="search"
                    onClick={(e) => action("clicked")(e)}
                />
                <ActivityIconButton
                    icon={magnifyingGlass}
                    aria-label="search"
                    kind="secondary"
                    onClick={(e) => action("clicked")(e)}
                />
                <ActivityIconButton
                    icon={magnifyingGlass}
                    aria-label="search"
                    kind="tertiary"
                    onClick={(e) => action("clicked")(e)}
                />
                <ActivityIconButton
                    disabled={true}
                    icon={magnifyingGlass}
                    aria-label="search"
                    onClick={(e) => action("clicked")(e)}
                />
            </View>
        );
    },
};

const kinds = ["primary", "secondary", "tertiary"] as const;
const actionTypes = ["progressive", "neutral"] as const;
/**
 * ActivityIconButton has an `actionType` prop that is either `progressive` (the
 * default, as shown above) or `neutral`:
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
                    {kinds.map((kind, index) => (
                        <ActivityIconButton
                            icon={IconMappings.arrowUpBold}
                            aria-label="navigate"
                            onClick={() => {}}
                            actionType={actionType}
                            kind={kind}
                            key={`${kind}-${actionType}-${index}`}
                        />
                    ))}
                    <ActivityIconButton
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
            <ActivityIconButton
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
 * There are two ways to provide accessible names to `ActivityIconButton`. One
 * approach is using the `aria-label` prop that can be used to explain the
 * function of the button. Remember to keep the description concise but
 * understandable.
 */
export const WithAriaLabel: StoryComponentType = {
    render: () => {
        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <ActivityIconButton
                    icon={IconMappings.caretLeftBold}
                    onClick={(e) => action("clicked")(e)}
                    aria-label="Previous page"
                />
                <ActivityIconButton
                    icon={IconMappings.caretRightBold}
                    onClick={(e) => action("clicked")(e)}
                    aria-label="Next page"
                />
            </View>
        );
    },
};

/**
 * Another way to provide accessible names to `ActivityIconButton` is by
 * providing a label for the button using the `label` prop. This is
 * recommended when the button is used as a navigation item in the context
 * of a menu, for example.
 */
export const WithLabel: StoryComponentType = {
    render: () => {
        return (
            <View
                style={{
                    gap: sizing.size_160,
                    flexDirection: "row",
                    alignItems: "flex-start",
                }}
            >
                <ActivityIconButton
                    icon={IconMappings.check}
                    onClick={(e) => action("clicked")(e)}
                    label="Check"
                />
                <ActivityIconButton
                    icon={IconMappings.magnifyingGlass}
                    onClick={(e) => action("clicked")(e)}
                    label="Search"
                />
            </View>
        );
    },
};
