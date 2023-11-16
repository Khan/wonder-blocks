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

export type ButtonThemeContract = typeof defaultTheme;

/**
 * The themes available to the Button component.
 */
const themes: Themes<ButtonThemeContract> = {
    default: defaultTheme,
    khanmigo: khanmigoTheme,
};

/**
 * The context that provides the theme to the Button component.
 * This is generally consumed via the `useScopedTheme` hook.
 */
export const ButtonThemeContext = createThemeContext(defaultTheme);

/**
 * ThemedButton is a component that provides a theme to the <Button/> component.
 */
export default function ThemedButton(props: Props) {
    const currentTheme = React.useContext(ThemeSwitcherContext);

    const theme = themes[currentTheme] || defaultTheme;
    return (
        <ButtonThemeContext.Provider value={theme}>
            {props.children}
        </ButtonThemeContext.Provider>
    );
}
