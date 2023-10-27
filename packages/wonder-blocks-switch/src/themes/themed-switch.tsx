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

export type SwitchThemeContract = typeof defaultTheme;

/**
 * The themes available to the Switch component.
 */
const themes: Themes<SwitchThemeContract> = {
    default: defaultTheme,
    khanmigo: khanmigoTheme,
};

/**
 * The context that provides the theme to the Switch component.
 * This is generally consumed via the `useScopedTheme` hook.
 */
export const SwitchThemeContext = createThemeContext(defaultTheme);

/**
 * ThemedSwitch is a component that provides a theme to the <Switch/> component.
 */
export default function ThemedSwitch(props: Props) {
    const currentTheme = React.useContext(ThemeSwitcherContext);

    const theme = themes[currentTheme] || defaultTheme;
    return (
        <SwitchThemeContext.Provider value={theme}>
            {props.children}
        </SwitchThemeContext.Provider>
    );
}
