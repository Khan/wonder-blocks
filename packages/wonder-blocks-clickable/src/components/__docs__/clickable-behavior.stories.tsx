import * as React from "react";
import {StyleSheet} from "aphrodite";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-clickable";
import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";
import ComponentInfo from "../../../../../.storybook/components/component-info";
import {name, version} from "../../../package.json";
// @ts-expect-error [FEI-5019] - TS7016 - Could not find a declaration file for module './clickable-behavior.argtypes'. '/Users/kevinbarabash/khan/wonder-blocks/packages/wonder-blocks-clickable/src/components/__docs__/clickable-behavior.argtypes.js' implicitly has an 'any' type.
import argTypes from "./clickable-behavior.argtypes";

const ClickableBehavior = getClickableBehavior();

export default {
    title: "Clickable / ClickableBehavior",
    component: ClickableBehavior,
    argTypes: argTypes,
    args: {
        disabled: false,
    },
    parameters: {
        componentSubtitle: (
            <ComponentInfo name={name} version={version} />
        ) as any,
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
};

// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const Default: StoryComponentType = (args) => {
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

// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const WrappingButton: StoryComponentType = (args) => {
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
    docs: {
        storyDescription: `This is an example of a \`<ClickableBehavior>\`
            wrapping a button. Since buttons have a built in tabIndex,
            a tabIndex does not need to be added to \`<ClickableBehavior>\`
            here.`,
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
        storyDescription: `A \`<ClickableBehavior>\` element does not have
            a tabIndex by default, as many elements it could wrap may have
            their own built in tabIndex attribute, such as buttons. If this
            is not the case, a tabIndex should be passed in using the
            \`tabIndex\` prop.`,
    },
};

const styles = StyleSheet.create({
    clickable: {
        cursor: "pointer",
        padding: Spacing.medium_16,
        textAlign: "center",
    },
    newButton: {
        border: "none",
        backgroundColor: Color.white,
        width: "100%",
    },
    hovered: {
        textDecoration: "underline",
        backgroundColor: Color.blue,
        color: Color.white,
    },
    pressed: {
        backgroundColor: Color.darkBlue,
    },
    focused: {
        outline: `solid 4px ${Color.lightBlue}`,
    },
});