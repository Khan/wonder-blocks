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

export type ModalDialogThemeContract = typeof defaultTheme;

/**
 * The themes available to the ModalDialog component.
 */
const themes: Themes<ModalDialogThemeContract> = {
    default: defaultTheme,
    khanmigo: khanmigoTheme,
};

/**
 * The context that provides the theme to the ModalDialog component.
 * This is generally consumed via the `useScopedTheme` hook.
 */
export const ModalDialogThemeContext = createThemeContext(defaultTheme);

/**
 * ThemeModalDialog is a component that provides a theme to the <ModalDialog/>
 * component.
 */
export default function ThemeModalDialog(props: Props) {
    const currentTheme = React.useContext(ThemeSwitcherContext);

    const theme = themes[currentTheme] || defaultTheme;
    return (
        <ModalDialogThemeContext.Provider value={theme}>
            {props.children}
        </ModalDialogThemeContext.Provider>
    );
}
