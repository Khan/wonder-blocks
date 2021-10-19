// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Button from "@khanacademy/wonder-blocks-button";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Layout / Spring",
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    column: {
        flexDirection: "column",
    },
    spring: {
        alignSelf: "center",
        backgroundColor: Color.darkBlue,
    },
    thin: {
        height: "4px",
    },
    thick: {
        height: "8px",
    },
});

export const simple: StoryComponentType = () => (
    <View style={styles.column}>
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Spring />
            <Button color="destructive">Hello, world!</Button>
        </View>
        <Strut size={16} />
        <View style={styles.row}>
            Hello
            <Spring />
            world!
        </View>
    </View>
);

export const withStyle: StoryComponentType = () => (
    <View style={styles.column}>
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Spring style={[styles.spring, styles.thick]} />
            <Button color="destructive">Hello, world!</Button>
            <Spring style={[styles.spring, styles.thick]} />
            <Button>Hello, world!</Button>
        </View>
        <Strut size={32} />
        <View style={styles.row}>
            Hello
            <Spring style={[styles.spring, styles.thin]} />
            wonderful
            <Spring style={[styles.spring, styles.thin]} />
            world!
        </View>
    </View>
);

simple.parameters = {
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

withStyle.parameters = {
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};
