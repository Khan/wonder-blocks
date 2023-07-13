import * as React from "react";
import type {ComponentMeta} from "@storybook/react";
import {css, StyleSheet} from "aphrodite";

import ThemeContext, {
    ThemedStylesFn,
    themeDefault,
    tokens,
    useStyles,
    useTheme,
    withTheme,
    WithThemeProps,
    ThemeContract,
    mergeTheme,
} from "@khanacademy/wonder-blocks-theming";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";

export default {
    title: "Theming",
} as ComponentMeta<any>;

const themeBrand: ThemeContract = mergeTheme(themeDefault, {
    color: {
        bg: {
            primary: tokens.colors.lightBlue,
            action: tokens.colors.red,
        },
    },
});

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
                    padding: theme.spacing.medium_16,
                }}
            >
                {props.children}
            </button>
        </>
    );
}

const styles: ThemedStylesFn = (theme) =>
    StyleSheet.create({
        button: {
            background: theme.color.bg.action,
            fontSize: theme.fontSize.large,
            position: "relative",
        },
    });

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
                <ThemedButton>
                    Outside (doesn&apos;t affect new theme)
                </ThemedButton>
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
                <Button>Outside (doesn&apos;t affect new theme)</Button>
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
    const wbThemeStyles = useStyles(themedStyles);

    return (
        <>
            <button
                onClick={props.onClick}
                className={css(wbThemeStyles.button)}
                style={{
                    padding: theme.spacing.medium_16,
                }}
            >
                {props.children}
            </button>
        </>
    );
}

const themedStyles: ThemedStylesFn = (theme) => ({
    button: {
        background: theme.color.bg.action,
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
                    Outside (doesn&apos;t affect new theme)
                </CustomStyledButton>
            </View>
            <ThemeContext.Provider value={currentTheme}>
                <h1>Theming demo using: {theme}</h1>
                <CustomStyledButton>Themed button</CustomStyledButton>
            </ThemeContext.Provider>
        </>
    );
};
