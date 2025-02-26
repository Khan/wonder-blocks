import * as React from "react";

import {SupportedThemes} from "../types";

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
export default function ThemeSwitcher({theme, children}: Props) {
    // Attach the CSS variables to a local scope so that they only work within
    // this component
    return <div className={`wb-theme-${theme}`}>{children}</div>;
}
