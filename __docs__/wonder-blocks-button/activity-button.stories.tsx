import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react";

import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";

import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";
import Button, {ActivityButton} from "@khanacademy/wonder-blocks-button";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import activityButtonArgtypes from "./activity-button.argtypes";

export default {
    title: "Packages / Button / ActivityButton",
    component: ActivityButton,
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
    argTypes: activityButtonArgtypes,
    args: {
        children: "Search",
        kind: "primary",
        onClick: (e: React.SyntheticEvent) => {
            action("clicked")(e);
        },
    },
} as Meta<typeof ActivityButton>;

type Story = StoryObj<typeof ActivityButton>;

/**
 * Minimal activity button which only includes a label and an `onClick`
 * handler. The `kind` prop is set to `primary` by default.
 */
export const Default: Story = {
    args: {
        disabled: false,
        kind: "primary",
    },
};

/**
 * This example includes a start icon, which is specified using the
 * `startIcon` prop. The `endIcon` prop can also be used to specify an icon
 * that appears at the end of the button.
 */
export const WithStartIcon: Story = {
    args: {
        children: "Search",
        startIcon: magnifyingGlass,
        disabled: false,
        kind: "primary",
    },
};

/**
 * In this example, we have `primary (default), `secondary`, `tertiary` and
 * `disabled` `ActivityButton`'s from left to right.
 */
export const Kinds: Story = {
    render: (args) => {
        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <ActivityButton {...args} />
                <ActivityButton {...args} kind="secondary" />
                <ActivityButton {...args} kind="tertiary" />
                <ActivityButton {...args} disabled={true} />
            </View>
        );
    },
};

/**
 * Sometimes you may want to apply custom styles to the button. In this
 * example, we apply this by passing a `style` prop to the button.
 *
 * Note that we recommend using the default styles, but if you need to
 * customize the button, we encourage to use it for layout purposes only.
 *
 * The following parts can be styled:
 * - `root`: Styles the root element (button)
 * - `box`: Styles the "chonky" box element
 * - `startIcon`: Styles the start icon element
 * - `endIcon`: Styles the end icon element
 * - `label`: Styles the text in the button
 */
export const WithCustomStyles: Story = {
    args: {
        children: "Search",
        startIcon: magnifyingGlass,
        endIcon: caretRight,
        styles: {
            root: {
                gap: sizing.size_200,
            },
            box: {
                gap: sizing.size_320,
            },
            startIcon: {
                alignSelf: "flex-start",
            },
            endIcon: {
                alignSelf: "flex-end",
            },
            label: {
                border: `${border.width.thin} solid ${semanticColor.core.border.instructive.subtle}`,
                padding: sizing.size_120,
            },
        },
    },
    parameters: {
        chromatic: {
            // Enable snapshots for this story so we can verify custom styles
            // are used correctly
            disableSnapshot: false,
        },
    },
};

export const RecievingFocusProgrammatically: Story = {
    render: function Render(args) {
        // This story is used to test the focus ring when the button receives
        // focus programmatically. The button is focused when the story is
        // rendered.
        const buttonRef = React.useRef<HTMLButtonElement | null>(null);

        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <ActivityButton
                    {...args}
                    ref={buttonRef}
                    onClick={(e) => action("clicked")(e)}
                />
                <Button
                    onClick={() => {
                        // Focus the button when the button is clicked.
                        if (buttonRef.current) {
                            buttonRef.current.focus();
                        }
                    }}
                    kind="secondary"
                >
                    Focus on the Activity Button (left)
                </Button>
            </View>
        );
    },
    args: {
        children: "Search",
        startIcon: magnifyingGlass,
        endIcon: caretRight,
    },
};
