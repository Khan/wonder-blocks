import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {Floating} from "@khanacademy/wonder-blocks-floating";
import packageConfig from "../../packages/wonder-blocks-floating/package.json";

import ComponentInfo from "../components/component-info";
import FloatingArgTypes from "./floating.argtypes";

type StoryComponentType = StoryObj<typeof Floating>;

export default {
    title: "Packages / Floating / Floating",
    component: Floating,
    argTypes: FloatingArgTypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {delay: 500},
    },
    decorators: [
        (Story): React.ReactElement => (
            <View style={styles.storyCanvas}>{Story()}</View>
        ),
    ],
} as Meta<typeof Floating>;

/**
 * Default example showing a floating tooltip that appears on hover.
 */
export const Default: StoryComponentType = {
    args: {
        content: "This is a floating element!",
        placement: "top",
        children: <Button>Hover me</Button>,
    },
};

/**
 * Examples showing different placement options for the floating element.
 */
export const Placements: StoryComponentType = {
    render: () => (
        <View style={styles.placementsContainer}>
            <View style={styles.row}>
                <Floating content="Tooltip on top" placement="top">
                    <Button>Top</Button>
                </Floating>
            </View>
            <View style={styles.row}>
                <Floating content="Tooltip on right" placement="right">
                    <Button>Right</Button>
                </Floating>
                <Floating content="Tooltip on left" placement="left">
                    <Button>Left</Button>
                </Floating>
            </View>
            <View style={styles.row}>
                <Floating content="Tooltip on bottom" placement="bottom">
                    <Button>Bottom</Button>
                </Floating>
            </View>
        </View>
    ),
};

Placements.parameters = {
    docs: {
        description: {
            story: "The floating element can be positioned in four directions: top, right, bottom, or left.",
        },
    },
};

/**
 * Floating elements can wrap different types of trigger elements.
 */
export const DifferentTriggers: StoryComponentType = {
    render: () => (
        <View style={styles.row}>
            <Floating content="Tooltip on a button">
                <Button kind="primary">Primary Button</Button>
            </Floating>
            <Floating content="Tooltip on a secondary button">
                <Button kind="secondary">Secondary Button</Button>
            </Floating>
            <Floating content="Tooltip on text" placement="bottom">
                <BodyText style={styles.interactiveText}>
                    Hover this text
                </BodyText>
            </Floating>
        </View>
    ),
};

DifferentTriggers.parameters = {
    docs: {
        description: {
            story: "The Floating component can wrap any React element and will position the floating content relative to it.",
        },
    },
};

/**
 * Example with longer content to show how the floating element handles wrapping.
 */
export const LongContent: StoryComponentType = {
    render: () => (
        <View style={styles.centered}>
            <Floating
                content="This is a much longer tooltip with multiple lines of text. It demonstrates how the floating element handles text wrapping and maintains readability even with more content."
                placement="right"
            >
                <Button>Hover for long tooltip</Button>
            </Floating>
        </View>
    ),
};

LongContent.parameters = {
    docs: {
        description: {
            story: "The floating element has a maximum width and will wrap text content accordingly.",
        },
    },
};

/**
 * The floating element automatically flips to the opposite side if there's
 * not enough space.
 */
export const AutoFlip: StoryComponentType = {
    render: () => (
        <View>
            <BodyText style={{marginBottom: spacing.medium_16}}>
                Try scrolling to see how the tooltip automatically adjusts its
                position when there&apos;s not enough space.
            </BodyText>
            <View style={styles.edgeContainer}>
                <Floating content="I'll flip to stay in view!" placement="top">
                    <Button>Near the edge</Button>
                </Floating>
            </View>
        </View>
    ),
};

AutoFlip.parameters = {
    docs: {
        description: {
            story: "The floating element uses smart positioning with flip and shift middleware to ensure it stays visible within the viewport.",
        },
    },
};

/**
 * Multiple floating elements can be used on the same page.
 */
export const MultipleTriggers: StoryComponentType = {
    render: () => (
        <View style={styles.grid}>
            {Array.from({length: 6}, (_, i) => {
                const key = `floating-${i}`;
                const itemNumber = i + 1;
                return (
                    <Floating
                        key={key}
                        content={`Tooltip ${itemNumber}`}
                        placement="top"
                    >
                        <Button>{`Item ${itemNumber}`}</Button>
                    </Floating>
                );
            })}
        </View>
    ),
};

MultipleTriggers.parameters = {
    docs: {
        description: {
            story: "Multiple Floating components can coexist on the same page without conflicts.",
        },
    },
};

/**
 * Example with custom styled content.
 */
export const CustomContent: StoryComponentType = {
    render: () => (
        <View style={styles.centered}>
            <Floating
                content={
                    <View>
                        <BodyText
                            style={{
                                color: semanticColor.core.foreground.knockout
                                    .default,
                                marginBottom: spacing.xSmall_8,
                                fontWeight: "bold",
                            }}
                        >
                            Custom Content
                        </BodyText>
                        <BodyText
                            style={{
                                color: semanticColor.core.foreground.knockout
                                    .default,
                            }}
                        >
                            You can pass any React element as content!
                        </BodyText>
                    </View>
                }
                placement="right"
            >
                <Button>Hover for custom content</Button>
            </Floating>
        </View>
    ),
};

CustomContent.parameters = {
    docs: {
        description: {
            story: "The content prop accepts any React node, allowing for rich, custom content.",
        },
    },
};

const styles = StyleSheet.create({
    storyCanvas: {
        minHeight: 300,
        padding: spacing.xxxLarge_64,
        justifyContent: "center",
        alignItems: "center",
    },
    placementsContainer: {
        gap: spacing.xxLarge_48,
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        gap: spacing.medium_16,
        alignItems: "center",
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xxLarge_48,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.medium_16,
    },
    interactiveText: {
        cursor: "pointer",
        textDecoration: "underline",
        color: semanticColor.mastery.primary,
    },
    edgeContainer: {
        paddingTop: spacing.xxxLarge_64,
    },
});
