import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-clickable";
import packageConfig from "../../packages/wonder-blocks-clickable/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import argTypes from "./clickable-behavior.argtypes";

const ClickableBehavior = getClickableBehavior();

export default {
    title: "Packages / Clickable / ClickableBehavior",
    component: ClickableBehavior,
    argTypes: argTypes,
    args: {
        disabled: false,
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
} as Meta<typeof ClickableBehavior>;

type StoryComponentType = StoryObj<typeof ClickableBehavior>;

export const Default: StoryComponentType = (args: any) => {
    const ClickableBehavior = getClickableBehavior();

    return (
        <ClickableBehavior role="button" {...args}>
            {(state, childrenProps) => {
                const {pressed, hovered, focused} = state;
                return (
                    <View
                        style={[
                            styles.clickable,
                            hovered && styles.hovered,
                            focused && styles.focused,
                            pressed && styles.pressed,
                        ]}
                        {...childrenProps}
                    >
                        This is an element wrapped with ClickableBehavior
                    </View>
                );
            }}
        </ClickableBehavior>
    );
};

Default.parameters = {
    chromatic: {
        // we don't need screenshots because this story only displays the
        // resting/default state.
        disableSnapshot: true,
    },
};

/**
 * This is an example of a `<ClickableBehavior>` wrapping a button. Since
 * buttons have a built in tabIndex, a tabIndex does not need to be added to
 * `<ClickableBehavior>` here.
 */
export const WrappingButton: StoryComponentType = (args: any) => {
    const ClickableBehavior = getClickableBehavior();
    const StyledButton = addStyle("button");

    return (
        <ClickableBehavior {...args}>
            {(state, childrenProps) => {
                const {pressed, hovered, focused} = state;
                return (
                    <StyledButton
                        style={[
                            styles.clickable,
                            styles.newButton,
                            hovered && styles.hovered,
                            focused && styles.focused,
                            pressed && styles.pressed,
                        ]}
                        {...childrenProps}
                    >
                        This is an element wrapped with ClickableBehavior
                    </StyledButton>
                );
            }}
        </ClickableBehavior>
    );
};

WrappingButton.parameters = {
    chromatic: {
        // we don't need screenshots because this story only displays the
        // resting/default state.
        disableSnapshot: true,
    },
};

export const WithTabIndex: StoryComponentType = () => {
    const ClickableBehavior = getClickableBehavior();

    return (
        <ClickableBehavior role="button" tabIndex={0}>
            {(state, childrenProps) => {
                const {pressed, hovered, focused} = state;
                return (
                    <View
                        style={[
                            styles.clickable,
                            hovered && styles.hovered,
                            focused && styles.focused,
                            pressed && styles.pressed,
                        ]}
                        {...childrenProps}
                    >
                        This is an element wrapped with ClickableBehavior
                    </View>
                );
            }}
        </ClickableBehavior>
    );
};

WithTabIndex.parameters = {
    chromatic: {
        // we don't need screenshots because this story only displays the
        // resting/default state.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: `A \`<ClickableBehavior>\` element does not have
            a tabIndex by default, as many elements it could wrap may have
            their own built in tabIndex attribute, such as buttons. If this
            is not the case, a tabIndex should be passed in using the
            \`tabIndex\` prop.`,
        },
    },
};

const styles = StyleSheet.create({
    clickable: {
        cursor: "pointer",
        padding: spacing.medium_16,
        textAlign: "center",
    },
    newButton: {
        border: "none",
        backgroundColor: color.white,
        width: "100%",
    },
    hovered: {
        textDecoration: "underline",
        backgroundColor: color.blue,
        color: color.white,
    },
    pressed: {
        backgroundColor: color.darkBlue,
    },
    focused: {
        outline: `solid 4px ${color.lightBlue}`,
    },
});
