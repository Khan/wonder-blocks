import * as React from "react";
import {
    createThemeContext,
    Themes,
    ThemeSwitcherContext,
} from "@khanacademy/wonder-blocks-theming";

import defaultTheme from "./default";
import khanmigoTheme from "./khanmigo";

type Props = {
    children: React.ReactNode;
};

export type IconButtonThemeContract = typeof defaultTheme;

/**
 * The themes available to the IconButton component.
 */
const themes: Themes<IconButtonThemeContract> = {
    default: defaultTheme,
    khanmigo: khanmigoTheme,
};

/**
 * The context that provides the theme to the IconButton component.
 * This is generally consumed via the `useScopedTheme` hook.
 */
export const IconButtonThemeContext = createThemeContext(defaultTheme);

/**
 * ThemedIconButton is a component that provides a theme to the <IconButton/>
 * component.
 */
export default function ThemedIconButton(props: Props) {
    const currentTheme = React.useContext(ThemeSwitcherContext);

    const theme = themes[currentTheme] ?? defaultTheme;
    return (
        <IconButtonThemeContext.Provider value={theme}>
            {props.children}
        </IconButtonThemeContext.Provider>
    );
}
