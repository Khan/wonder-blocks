// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Button from "@khanacademy/wonder-blocks-button";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Layout / Strut",
    component: Strut,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
    argTypes: {
        style: {
            control: {
                type: "object",
            },
        },
    },
};

export const Default: StoryComponentType = (args) => (
    <View style={styles.row}>
        <Button>Hello, world!</Button>
        <Strut {...args} />
        <Button color="destructive">Hello, world!</Button>
    </View>
);

Default.args = {size: Spacing.xxxLarge_64, style: {}};

const smallSize = Spacing.medium_16;
const largeSize = Spacing.xxxLarge_64;

export const Simple: StoryComponentType = (args) => (
    <View style={styles.column}>
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Strut size={smallSize} />
            <Button color="destructive">Hello, world!</Button>
            <Strut size={largeSize} />
            <Button color="destructive">Hello, world!</Button>
            <Strut size={smallSize} />
            <Button>Hello, world!</Button>
        </View>
        <View style={styles.row}>
            Hello
            <Strut size={smallSize} />
            world!
            <Strut size={largeSize} />
            Hello
            <Strut size={smallSize} />
            world!
        </View>
    </View>
);

export const WithStyle: StoryComponentType = () => (
    <View style={styles.column}>
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Strut size={smallSize} style={[styles.strut, styles.thick]} />
            <Button color="destructive">Hello, world!</Button>
            <Strut size={largeSize} style={[styles.strut, styles.thick]} />
            <Button color="destructive">Hello, world!</Button>
            <Strut size={smallSize} style={[styles.strut, styles.thick]} />
            <Button>Hello, world!</Button>
        </View>
        <Strut size={largeSize} />
        <View style={styles.row}>
            Hello
            <Strut size={smallSize} style={[styles.strut, styles.thin]} />
            remarkably
            <Strut size={largeSize} style={[styles.strut, styles.thin]} />
            wonderful
            <Strut size={smallSize} style={[styles.strut, styles.thin]} />
            world!
        </View>
    </View>
);

Simple.parameters = {
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

WithStyle.parameters = {
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    column: {
        flexDirection: "column",
    },
    strut: {
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
