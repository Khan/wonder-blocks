import * as React from "react";

import {StyleSheet} from "aphrodite";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    createThemeContext,
    mergeTheme,
    tokens,
    useScopedTheme,
    useStyles,
    ThemedStylesFn,
    ThemeSwitcherContext,
    withScopedTheme,
    WithThemeProps,
    SupportedThemes,
} from "@khanacademy/wonder-blocks-theming";

const defaultTheme = {
    color: {
        bg: {
            primary: tokens.color.blue,
        },
        text: {
            light: tokens.color.white,
        },
    },
    border: {
        radius: tokens.border.radius.medium_4,
    },
};

const customTheme = mergeTheme(defaultTheme, {
    color: {
        bg: {
            primary: tokens.color.pink,
        },
    },
    border: {
        radius: tokens.border.radius.large_6,
    },
});

const ThemeContext = createThemeContext(defaultTheme);

type ButtonProps = {
    children?: string;
    onClick?: (e: React.SyntheticEvent) => unknown;
};

const ThemedButton = ({
    children = "This is a themed button!",
    onClick,
}: ButtonProps) => {
    const {theme} = useScopedTheme(ThemeContext);

    return (
        <Button
            style={{
                background: theme.color.bg.primary,
                color: theme.color.text.light,
                borderRadius: theme.border.radius,
                padding: tokens.spacing.medium_16,
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

const ThemedView = () => {
    const {theme, themeName} = useScopedTheme(ThemeContext);

    return (
        <View
            style={{
                background: theme.color.bg.primary,
                color: theme.color.text.light,
                borderRadius: theme.border.radius,
                padding: tokens.spacing.medium_16,
            }}
        >
            This is a themed view! The theme name is {themeName}.
        </View>
    );
};

/**
 * A wrapper component that provides a theme to the button.
 */
const ThemeWrapper = ({
    theme,
    children,
}: {
    theme: any;
    children: React.ReactNode;
}) => {
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

/**
 * NOTE: The following components are meant to be used in the Storybook docs
 * only.
 */
export const ButtonWithTheme = () => (
    <ThemeWrapper theme={defaultTheme}>
        <ThemedButton />
    </ThemeWrapper>
);

export const ButtonWithCustomTheme = () => (
    <ThemeWrapper theme={customTheme}>
        <ThemedButton />
    </ThemeWrapper>
);

/**
 * useScopedTheme example
 */
export const ViewWithTheme = () => (
    <ThemeWrapper theme={defaultTheme}>
        <ThemedView />
    </ThemeWrapper>
);

/**
 * withScopedTheme example
 */
type ThemeContract = typeof defaultTheme;

function ThemedComponent(props: WithThemeProps) {
    const {wbThemeStyles} = props;

    return <View style={wbThemeStyles.wrapper}>This is themed!</View>;
}

const styles: ThemedStylesFn<ThemeContract> = (theme) =>
    StyleSheet.create({
        wrapper: {
            background: theme.color.bg.primary,
            color: theme.color.text.light,
        },
    });

export const WithScopedThemeExample = withScopedTheme(
    styles,
    ThemeContext,
)(ThemedComponent);

/**
 * useStyles example
 */

const ThemedViewWithUseStyles = () => {
    const {theme} = useScopedTheme(ThemeContext);
    const themedStyles = useStyles(stylesExample, theme);

    return <View style={themedStyles.wrapper}>This is themed!</View>;
};

export const UseStylesExample = () => (
    <ThemeWrapper theme={defaultTheme}>
        <ThemedViewWithUseStyles />
    </ThemeWrapper>
);

const stylesExample: ThemedStylesFn<ThemeContract> = (theme) => ({
    wrapper: {
        background: theme.color.bg.primary,
        color: theme.color.text.light,
    },
});

/**
 * ThemeSwitcherContext example
 */

// Define the themes that will be available to the consumer(s).
const themes = {
    default: defaultTheme,
    custom: customTheme,
};

export const ButtonThemeContext = createThemeContext(themes.default);

function ThemedButtonContainer(props: ButtonProps) {
    const currentTheme = React.useContext(ThemeSwitcherContext);
    const theme = themes[currentTheme as keyof typeof themes] ?? themes.default;

    return (
        <ThemeContext.Provider value={theme}>
            <ThemedButton {...props} />
        </ThemeContext.Provider>
    );
}

export const ThemeSwitcherContextExample = () => {
    const [theme, setTheme] = React.useState<SupportedThemes>("default");

    const changeTheme = () => {
        const newTheme = theme === "khanmigo" ? "default" : "khanmigo";
        setTheme(newTheme);
    };

    return (
        <>
            <View style={{gap: tokens.spacing.medium_16, flexDirection: "row"}}>
                <ThemedButtonContainer onClick={changeTheme}>
                    Switch theme
                </ThemedButtonContainer>
                <ThemedButtonContainer>
                    Outside (doesn&apos;t affect new theme)
                </ThemedButtonContainer>
            </View>
            <ThemeSwitcherContext.Provider value={theme}>
                <p>Theming demo using: {theme}</p>
                <ThemedButtonContainer>Themed button</ThemedButtonContainer>
            </ThemeSwitcherContext.Provider>
        </>
    );
};
