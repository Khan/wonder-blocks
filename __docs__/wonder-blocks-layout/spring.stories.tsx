import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {StoryComponentType} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Button from "@khanacademy/wonder-blocks-button";

// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import {name, version} from "../../packages/wonder-blocks-layout/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

export default {
    title: "Layout / Spring",
    component: Spring,
    parameters: {
        componentSubtitle: (
            <ComponentInfo name={name} version={version} />
        ) as any,
    },
    argTypes: {
        style: {
            control: {
                type: "object",
            },
        },
    },
};

// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const Default: StoryComponentType = (args) => (
    <View style={styles.row}>
        <Button>Hello, world!</Button>
        <Spring {...args} />
        <Button color="destructive">Hello, world!</Button>
    </View>
);

Default.args = {style: {}};

export const Simple: StoryComponentType = () => (
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
        storyDescription: "`<Spring/>` can have a style.",
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
        backgroundColor: Color.darkBlue,
    },
    thin: {
        height: "4px",
    },
    thick: {
        height: "8px",
    },
});
