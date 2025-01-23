import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import magnifyingGlassIcon from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";
import {StyleSheet} from "aphrodite";
import Switch from "@khanacademy/wonder-blocks-switch";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {
    SupportedThemes,
    ThemeSwitcherContext,
} from "@khanacademy/wonder-blocks-theming";
import {
    border,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import {AllVariants} from "../components/all-variants";

const rows = [
    {name: "Off", props: {checked: false}},
    {name: "On", props: {checked: true}},
];

const columns = [
    {
        name: "Default",
        props: {},
    },
    {
        name: "Disabled",
        props: {disabled: true},
    },
    {
        name: "With icon",
        props: {icon: <PhosphorIcon icon={magnifyingGlassIcon} />},
    },
    {
        name: "Disabled (with icon)",
        props: {
            disabled: true,
            icon: <PhosphorIcon icon={magnifyingGlassIcon} />,
        },
    },
];

const themes: Array<SupportedThemes> = ["default", "khanmigo"];

type Story = StoryObj<typeof Switch>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Switch / Switch - All Variants",
    component: Switch,
    render: (args) => (
        <View style={styles.container}>
            {themes.map((theme) => (
                <ThemeSwitcherContext.Provider value={theme}>
                    <View style={[styles.theme, styles[theme]]}>
                        <HeadingLarge style={styles.title}>
                            {theme} theme
                        </HeadingLarge>
                        <AllVariants rows={rows} columns={columns}>
                            {(props) => <Switch {...args} {...props} />}
                        </AllVariants>
                    </View>
                </ThemeSwitcherContext.Provider>
            ))}
        </View>
    ),
    args: {
        onChange: () => {},
        "aria-label": "Switch",
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

export const Default: Story = {};

export const Hover: Story = {
    parameters: {pseudo: {hover: true}},
};

export const Focus: Story = {
    parameters: {pseudo: {focusWithin: true}},
};

export const HoverFocus: Story = {
    name: "Hover + Focus",
    parameters: {pseudo: {hover: true, focusWithin: true}},
};

export const Active: Story = {
    parameters: {pseudo: {hover: true, active: true}},
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
    khanmigo: {
        backgroundColor: semanticColor.khanmigo.primary,
        color: semanticColor.text.inverse,
    },
    title: {
        textTransform: "capitalize",
    },
});
