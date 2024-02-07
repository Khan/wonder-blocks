import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {Meta, StoryObj} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";
import Button from "@khanacademy/wonder-blocks-button";

import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import packageConfig from "../../packages/wonder-blocks-layout/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

type StoryComponentType = StoryObj<typeof Spring>;

export default {
    title: "Layout / Spring",
    component: Spring,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: {
        style: {
            control: {
                type: "object",
            },
        },
    },
} as Meta<typeof Spring>;

export const Default: StoryComponentType = {
    render: (args) => (
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Spring {...args} />
            <Button color="destructive">Hello, world!</Button>
        </View>
    ),
};

export const Simple: StoryComponentType = {
    render: () => (
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
    ),
};

export const WithStyle: StoryComponentType = () => (
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

WithStyle.parameters = {
    docs: {
        description: {story: "`<Spring/>` can have a style."},
    },
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
        backgroundColor: color.darkBlue,
    },
    thin: {
        height: "4px",
    },
    thick: {
        height: "8px",
    },
});
