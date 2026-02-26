import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {Meta, StoryObj} from "@storybook/react-vite";
import {Description, Stories, Title} from "@storybook/addon-docs/blocks";

import Banner from "@khanacademy/wonder-blocks-banner";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

type StoryComponentType = StoryObj<typeof Spring>;

export default {
    title: "Packages / Layout / Spring",
    component: Spring,
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
                                Spring is deprecated! We recommend using css
                                flexbox/grid properties like{" "}
                                <code>justify-content: space-between</code>{" "}
                                (row) or{" "}
                                <code>align-content: space-between</code>{" "}
                                (column) whenever possible!
                            </BodyText>
                        }
                        actions={[
                            {
                                type: "custom",
                                node: (
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content">
                                        View justify-content docs
                                    </a>
                                ),
                            },
                            {
                                type: "custom",
                                node: (
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-content">
                                        View align-content docs
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
} as Meta<typeof Spring>;

export const Default: StoryComponentType = {
    render: (args) => (
        <View style={styles.row}>
            <Button>Hello, world!</Button>
            <Spring {...args} />
            <Button actionType="destructive">Hello, world!</Button>
        </View>
    ),
};

export const Simple: StoryComponentType = {
    render: () => (
        <View style={styles.column}>
            <View style={styles.row}>
                <Button>Hello, world!</Button>
                <Spring />
                <Button actionType="destructive">Hello, world!</Button>
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
            <Button actionType="destructive">Hello, world!</Button>
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
        backgroundColor: semanticColor.core.background.instructive.strong,
    },
    thin: {
        height: "4px",
    },
    thick: {
        height: "8px",
    },
});
