import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {Description, Stories, Title} from "@storybook/addon-docs/blocks";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";

import {Strut} from "@khanacademy/wonder-blocks-layout";
import Banner from "@khanacademy/wonder-blocks-banner";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Layout / Strut",
    component: Strut,
    parameters: {
        chromatic: {
            // We no longer support this component.
            disableSnapshot: true,
        },
        docs: {
            page: () => (
                <>
                    <Title />
                    <Banner
                        kind="warning"
                        text={
                            <BodyText>
                                Strut is deprecated! We recommend using
                                css&apos;s <code>gap</code> property whenever
                                possible!
                            </BodyText>
                        }
                        actions={[
                            {
                                type: "custom",
                                node: (
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap">
                                        View gap docs
                                    </a>
                                ),
                            },
                        ]}
                    />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        style: {
            control: {
                type: "object",
            },
        },
    },
    tags: ["deprecated"],
} as Meta<typeof Strut>;

type StoryComponentType = StoryObj<typeof Strut>;

export const Default: StoryComponentType = {
    render: (args) => (
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Strut {...args} />
            <Button actionType="destructive">Hello, world!</Button>
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
                <Button actionType="destructive">Hello, world!</Button>
                <Strut size={largeSize} />
                <Button actionType="destructive">Hello, world!</Button>
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
            <Button actionType="destructive">Hello, world!</Button>
            <Strut size={largeSize} style={[styles.strut, styles.thick]} />
            <Button actionType="destructive">Hello, world!</Button>
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
        backgroundColor: semanticColor.core.background.instructive.strong,
    },
    thin: {
        height: "4px",
    },
    thick: {
        height: "8px",
    },
});
