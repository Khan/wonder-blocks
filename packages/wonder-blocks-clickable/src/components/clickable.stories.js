// @flow
import * as React from "react";

import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Navigation/Clickable",
};

export const basic: StoryComponentType = () => (
    <View>
        <View style={styles.centerText}>
            <Clickable
                href="https://www.khanacademy.org/about/tos"
                skipClientNav={true}
            >
                {({hovered, focused, pressed}) => (
                    <View
                        style={[
                            hovered && styles.hovered,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Body>This text is clickable!</Body>
                    </View>
                )}
            </Clickable>
        </View>
        <Strut size={Spacing.xLarge_32} />
        <View style={[styles.centerText, styles.dark]}>
            <Clickable
                href="https://www.khanacademy.org/about/tos"
                skipClientNav={true}
                light={true}
            >
                {({hovered, focused, pressed}) => (
                    <View
                        style={[
                            hovered && styles.hovered,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Body>This text is clickable!</Body>
                    </View>
                )}
            </Clickable>
        </View>
    </View>
);

export const keyboardNavigation: StoryComponentType = () => (
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

keyboardNavigation.parameters = {
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

export const keyboardNavigationTab: StoryComponentType = () => (
    <View>
        <Clickable role="tab" aria-controls="panel-1" id="tab-1">
            {({hovered, focused, pressed}) => (
                <View
                    style={[
                        hovered && styles.hovered,
                        focused && styles.focused,
                        pressed && styles.pressed,
                    ]}
                >
                    <Body>Open School Info</Body>
                </View>
            )}
        </Clickable>
        <View id="panel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
            This is the information for the school.
        </View>
    </View>
);

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
    centerText: {
        textAlign: "center",
    },
    dark: {
        backgroundColor: Color.darkBlue,
        color: Color.white,
        padding: Spacing.xSmall_8,
    },
});
