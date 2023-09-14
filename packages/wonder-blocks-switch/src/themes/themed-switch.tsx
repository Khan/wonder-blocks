import * as React from "react";
import {
    createThemeContext,
    ThemeSwitcherContext,
} from "@khanacademy/wonder-blocks-theming";

import defaultTheme from "./default";
import khanmigoTheme from "./khanmigo";

type Props = {
    children: React.ReactNode;
};

/**
 * The themes available to the Switch component.
 */
const themes = {
    default: defaultTheme,
    khanmigo: khanmigoTheme,
};

export type SwitchThemeContract = typeof defaultTheme;

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

    const theme = themes[currentTheme as keyof typeof themes] || defaultTheme;
    return (
        <SwitchThemeContext.Provider value={theme}>
            {props.children}
        </SwitchThemeContext.Provider>
    );
}
