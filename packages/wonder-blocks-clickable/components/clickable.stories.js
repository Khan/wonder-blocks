// @flow
import * as React from "react";

import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Body} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Clickable",
};

export const keyboardNavigation: StoryComponentType<Empty> = () => (
    <View>
        <Clickable
            href="https://www.khanacademy.org/about/tos"
            skipClientNav={true}
        >
            {({hovered, focused, pressed}) => (
                <View
                    style={[
                        hovered && styles.hovered,
                        focused && styles.focused,
                        pressed && styles.pressed,
                    ]}
                >
                    <Body>This text should navigate using the keyboard</Body>
                </View>
            )}
        </Clickable>
    </View>
);

keyboardNavigation.story = {
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests behavior.
            disable: true,
        },
    },
};

const styles = StyleSheet.create({
    hovered: {
        textDecoration: "underline",
        backgroundColor: Color.teal,
    },
    pressed: {
        color: Color.blue,
    },
    focused: {
        outline: `solid 4px ${Color.lightBlue}`,
    },
});
