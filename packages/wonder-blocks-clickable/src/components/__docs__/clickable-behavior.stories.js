// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {StoryComponentType} from "@storybook/react";
import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import argTypes from "./clickable-behavior.argtypes.js";

const ClickableBehavior: React.ComponentType<
    React.ElementConfig<typeof ClickableBehavior>,
> = getClickableBehavior();

export default {
    title: "Clickable / ClickableBehavior",
    component: ClickableBehavior,
    argTypes: argTypes,
    args: {
        disabled: false,
    },
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
};

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

const styles = StyleSheet.create({
    clickable: {
        cursor: "pointer",
        padding: Spacing.medium_16,
        textAlign: "center",
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
