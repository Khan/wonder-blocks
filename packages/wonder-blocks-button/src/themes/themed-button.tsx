import * as React from "react";
import {
    createThemeContext,
    ThemeSwitcherContext,
} from "@khanacademy/wonder-blocks-theming";

type Props = {
    children: React.ReactNode;
};

/**
 * The context that provides the theme to the Button component.
 * This is generally consumed via the `useScopedTheme` hook.
 */
export const ButtonThemeContext = createThemeContext({theme: "buttonDefault"});

export type ButtonThemeContract = {theme: string};

/**
 * ThemedButton is a component that provides a theme to the <Button/> component.
 */
export default function ThemedButton(props: Props) {
    const currentTheme = React.useContext(ThemeSwitcherContext);
    const theme =
        // NOTE: This maps to the themes defined in panda.config.ts
        currentTheme === "default" ? "buttonDefault" : "buttonKhanmigo";

    return (
        <ButtonThemeContext.Provider value={{theme}}>
            {props.children}
        </ButtonThemeContext.Provider>
    );
}
