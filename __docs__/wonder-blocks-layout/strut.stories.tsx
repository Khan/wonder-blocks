import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

import {Strut} from "@khanacademy/wonder-blocks-layout";
import packageConfig from "../../packages/wonder-blocks-layout/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

export default {
    title: "Packages / Layout / Strut",
    component: Strut,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ) as any,
    },
    argTypes: {
        style: {
            control: {
                type: "object",
            },
        },
    },
} as Meta<typeof Strut>;

type StoryComponentType = StoryObj<typeof Strut>;

export const Default: StoryComponentType = {
    render: (args) => (
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Strut {...args} />
            <Button color="destructive">Hello, world!</Button>
        </View>
    ),
    args: {
        size: spacing.xxxLarge_64,
        style: {},
    },
};

const smallSize = spacing.medium_16;
const largeSize = spacing.xxxLarge_64;

export const Simple: StoryComponentType = {
    render: (args) => (
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
    ),
};

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
        backgroundColor: color.darkBlue,
    },
    thin: {
        height: "4px",
    },
    thick: {
        height: "8px",
    },
});
