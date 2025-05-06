import * as React from "react";

import {SupportedThemes} from "../types";
import {THEME_DATA_ATTRIBUTE} from "../utils/constants";

type Props = {
    /**
     * The theme to use.
     */
    theme: SupportedThemes;
    /**
     * The children where the theme will be applied.
     */
    children: React.ReactNode;
};

/**
 * ThemeSwitcher is a component that allows users to switch between themes.
 */
export function ThemeSwitcher({theme, children}: Props) {
    // If no theme is provided, return the children as is
    if (!theme) {
        return children;
    }

    const props = {
        [THEME_DATA_ATTRIBUTE]: theme,
    };
    // Attach the CSS variables to a local scope so that they only work within
    // this component
    return <div {...props}>{children}</div>;
}
