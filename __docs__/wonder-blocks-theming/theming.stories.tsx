import * as React from "react";
import type {ComponentStory, ComponentMeta} from "@storybook/react";
import {css} from "aphrodite";

import ThemeContext, {
    themeDefault,
    tokens,
    useStyles,
    useTheme,
    withTheme,
    WithThemeProps,
} from "@khanacademy/wonder-blocks-theming";
import type {ThemeContract} from "@khanacademy/wonder-blocks-theming";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {StyleSheet} from "aphrodite";

export default {
    title: "Theming",
} as ComponentMeta<any>;

// type StoryComponentType = ComponentStory<typeof ThemeContext>;

const themeBrand: ThemeContract = {
    color: {
        primary: tokens.colors.lightBlue,
        secondary: tokens.colors.red,
        tertiary: tokens.colors.teal,
        background: tokens.colors.offWhite,
        text: tokens.colors.offBlack,
        textInverted: tokens.colors.white,
    },
    spacing: {
        small: tokens.spacing.medium_16,
        medium: tokens.spacing.large_24,
        large: tokens.spacing.xxLarge_48,
    },
    fontSize: {
        small: `${tokens.fontSizes.xSmall}px`,
        medium: `${tokens.fontSizes.medium}px`,
        large: `${tokens.fontSizes.xxxLarge}px`,
    },
    font: tokens.fonts,
    fontWeight: tokens.fontWeights,
    lineHeight: {
        small: `${tokens.lineHeights.small}px`,
        medium: `${tokens.lineHeights.medium}px`,
        large: `${tokens.lineHeights.large}px`,
    },
};

type Props = {
    children: string;
    onClick?: () => void;
};

function CustomButton(props: WithThemeProps & Props) {
    const theme = useTheme();

    return (
        <>
            <button
                onClick={props.onClick}
                className={css(props.wbThemeStyles.button)}
                style={{
                    padding: theme.spacing.medium,
                }}
            >
                {props.children}
            </button>
        </>
    );
}

const styles = (theme: ThemeContract) =>
    StyleSheet.create({
        button: {
            background: theme.color.primary,
            fontSize: theme.fontSize.large,
            position: "relative",
        },
    });

// TODO(juan): Check if I should curry the function or not.
const ThemedButton = withTheme(styles)(CustomButton);

export const Default = () => {
    const [theme, setTheme] = React.useState("default");

    const currentTheme = theme === "brand" ? themeBrand : themeDefault;

    const changeTheme = () => {
        const newTheme = theme === "brand" ? "default" : "brand";
        setTheme(newTheme);
    };

    return (
        <View>
            <View style={{gap: Spacing.medium_16, flexDirection: "row"}}>
                <ThemedButton onClick={changeTheme}>Switch theme</ThemedButton>
                <ThemedButton>Outside (doesn't affect new theme)</ThemedButton>
            </View>
            <ThemeContext.Provider value={currentTheme}>
                <h1>Theming demo using: {theme}</h1>
                <ThemedButton>Themed button</ThemedButton>
            </ThemeContext.Provider>
        </View>
    );
};

export const WithThemedButton = () => {
    const [theme, setTheme] = React.useState("default");

    const currentTheme = theme === "brand" ? themeBrand : themeDefault;

    const changeTheme = () => {
        const newTheme = theme === "brand" ? "default" : "brand";
        setTheme(newTheme);
    };

    return (
        <>
            <View style={{gap: Spacing.medium_16, flexDirection: "row"}}>
                <Button onClick={changeTheme}>Switch theme</Button>
                <Button>Outside (doesn't affect new theme)</Button>
            </View>
            <ThemeContext.Provider value={currentTheme}>
                <h1>Theming demo using: {theme}</h1>
                <Button>Themed button</Button>
            </ThemeContext.Provider>
        </>
    );
};

function CustomStyledButton(props: Props) {
    const theme = useTheme();
    const wbThemeStyles = useStyles(stylesObject);

    return (
        <>
            <button
                onClick={props.onClick}
                className={css(wbThemeStyles.button)}
                style={{
                    padding: theme.spacing.medium,
                }}
            >
                {props.children}
            </button>
        </>
    );
}

const stylesObject = (theme: ThemeContract) => ({
    button: {
        background: theme.color.primary,
        fontSize: theme.fontSize.large,
        position: "relative",
    },
    text: {
        fontWeight: theme.fontWeight.bold,
    },
});

export const WithAphroditeStyles = () => {
    const [theme, setTheme] = React.useState("default");

    const currentTheme = theme === "brand" ? themeBrand : themeDefault;

    const changeTheme = () => {
        const newTheme = theme === "brand" ? "default" : "brand";
        setTheme(newTheme);
    };

    return (
        <>
            <View style={{gap: Spacing.medium_16, flexDirection: "row"}}>
                <CustomStyledButton onClick={changeTheme}>
                    Switch theme
                </CustomStyledButton>
                <CustomStyledButton>
                    Outside (doesn't affect new theme)
                </CustomStyledButton>
            </View>
            <ThemeContext.Provider value={currentTheme}>
                <h1>Theming demo using: {theme}</h1>
                <CustomStyledButton>Themed button</CustomStyledButton>
            </ThemeContext.Provider>
        </>
    );
};
