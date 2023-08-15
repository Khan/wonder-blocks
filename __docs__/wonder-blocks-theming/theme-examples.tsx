import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    createThemeContext,
    mergeTheme,
    tokens,
    useScopedTheme,
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

const ThemeContext = createThemeContext(customTheme);

// TODO(WB-1577): Replace this with the actual WB Button component.
const ThemedButton = () => {
    const theme = useScopedTheme(ThemeContext);

    return (
        <button
            style={{
                background: theme.color.bg.primary,
                color: theme.color.text.light,
                borderRadius: theme.border.radius,
                padding: tokens.spacing.medium_16,
            }}
        >
            This is a themed button!
        </button>
    );
};

const ThemedView = () => {
    const theme = useScopedTheme(ThemeContext);

    return (
        <View
            style={{
                background: theme.color.bg.primary,
                color: theme.color.text.light,
                borderRadius: theme.border.radius,
                padding: tokens.spacing.medium_16,
            }}
        >
            This is a themed view!
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

export const ViewWithTheme = () => (
    <ThemeWrapper theme={defaultTheme}>
        <ThemedView />
    </ThemeWrapper>
);
