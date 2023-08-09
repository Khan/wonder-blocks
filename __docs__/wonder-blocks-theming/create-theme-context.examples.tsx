import * as React from "react";

import {
    createThemeContext,
    mergeTheme,
    tokens,
} from "@khanacademy/wonder-blocks-theming";

const buttonDefaultTheme = {
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

const buttonCustomTheme = mergeTheme(buttonDefaultTheme, {
    color: {
        bg: {
            primary: tokens.color.pink,
        },
    },
    border: {
        radius: tokens.border.radius.large_6,
    },
});

const ButtonThemeContext = createThemeContext(buttonDefaultTheme);

// TODO(WB-1577): Replace this with the actual WB Button component.
const ThemedButton = () => {
    const theme = React.useContext(ButtonThemeContext);
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

const ThemeWrapper = ({theme}: {theme: any}) => {
    return (
        <ButtonThemeContext.Provider value={theme}>
            <ThemedButton />
        </ButtonThemeContext.Provider>
    );
};

export const ButtonWithTheme = () => (
    <ThemeWrapper theme={buttonDefaultTheme} />
);

export const ButtonWithCustomTheme = () => (
    <ThemeWrapper theme={buttonCustomTheme} />
);
