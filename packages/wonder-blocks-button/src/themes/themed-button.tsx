import * as React from "react";
import {
    createThemeContext,
    Themes,
    ThemeSwitcherContext,
} from "@khanacademy/wonder-blocks-theming";

import defaultTheme from "./default.module.css";
import khanmigoTheme from "./khanmigo.module.css";

type Props = {
    children: React.ReactNode;
};

// export type ButtonThemeContract = typeof defaultTheme;

/**
 * The themes available to the Button component.
 */
const themes: Themes<any> = {
    default: defaultTheme.theme,
    khanmigo: khanmigoTheme.theme,
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

    const theme =
        currentTheme !== "default"
            ? // HACK(juan): There's no way to merge themes, so we're just
              // concatenating the class names. This case is for when the button
              // is using a different theme than the default one (like
              // `khanmigo`).
              themes.default + " " + themes[currentTheme]
            : themes.default;

    return (
        <ButtonThemeContext.Provider value={theme}>
            {props.children}
        </ButtonThemeContext.Provider>
    );
}
