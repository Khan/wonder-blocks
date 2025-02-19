import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {
    border,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import {AllVariants} from "../components/all-variants";

const rows = [
    {name: "Default", props: {}},
    {
        name: "Inline",
        props: {inline: true},
    },
];

const columns = [
    {
        name: "Primary",
        props: {},
    },
    {
        name: "Visitable",
        props: {visitable: true},
    },
];

const themes: Array<string> = ["default", "dark"];

type Story = StoryObj<typeof Link>;

/**
 * The following stories are used to generate the pseudo states for the Radio
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Link / Link - All Variants",
    render: (args) => (
        <View style={styles.container}>
            {themes.map((theme, idx) => (
                <View style={[styles.theme, styles[theme]]} key={idx}>
                    <HeadingLarge style={styles.title}>{theme}</HeadingLarge>
                    <AllVariants rows={rows} columns={columns}>
                        {(props) => (
                            <>
                                {theme === "dark" &&
                                props.kind === "secondary" ? null : (
                                    <Link
                                        {...args}
                                        {...props}
                                        light={theme === "dark"}
                                        href="https://www.khanacademy.org"
                                    >
                                        This is a Link
                                    </Link>
                                )}
                            </>
                        )}
                    </AllVariants>
                </View>
            ))}
        </View>
    ),
    args: {
        children: "This is a Link",
        href: "https://www.khanacademy.org",
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Link>;

export default meta;

export const Default: Story = {};

export const Hover: Story = {
    parameters: {pseudo: {hover: true}},
};

export const Focus: Story = {
    parameters: {pseudo: {focusVisible: true}},
};

export const HoverFocus: Story = {
    name: "Hover + Focus",
    parameters: {pseudo: {hover: true, focusVisible: true}},
};

export const HoverVisited: Story = {
    name: "Hover + Visited",
    parameters: {pseudo: {visited: true, hover: true}},
};

export const Press: Story = {
    parameters: {pseudo: {active: true}},
};

export const PressFocus: Story = {
    name: "Press + Focus",
    parameters: {pseudo: {focusVisible: true, active: true}},
};

export const PressVisited: Story = {
    name: "Press + Visited",
    parameters: {pseudo: {visited: true, active: true}},
};

const styles = StyleSheet.create({
    container: {
        maxWidth: 700,
        gap: spacing.medium_16,
    },
    theme: {
        border: `1px solid ${semanticColor.border.subtle}`,
        borderRadius: border.radius.medium_4,
        padding: spacing.large_24,
    },
    dark: {
        backgroundColor: semanticColor.surface.inverse,
        color: semanticColor.text.inverse,
    },
    title: {
        textTransform: "capitalize",
    },
});
