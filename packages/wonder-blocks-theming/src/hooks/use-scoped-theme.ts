import * as React from "react";
import {ThemeSwitcherContext} from "../utils/theme-switcher-context";

type ScopedTheme<T> = {
    /**
     * The theme object.
     */
    theme: T;
    /**
     * The theme name.
     */
    themeName: string;
};

export default function useScopedTheme<T extends object>(
    themeContext: React.Context<T>,
): ScopedTheme<T> {
    const theme = React.useContext(themeContext);
    const themeName = React.useContext(ThemeSwitcherContext) ?? "default";
    return {theme, themeName};
}
