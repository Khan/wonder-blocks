// @flow
import React from "react";

import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Body} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Clickable",
};

export const keyboardNavigation = () => (
    <View>
        <Clickable href="https://khanacademy.org" skipClientNav={true}>
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
