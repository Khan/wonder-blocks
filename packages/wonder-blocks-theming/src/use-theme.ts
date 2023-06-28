import * as React from "react";
import {ThemeContext} from "./theme-context";

/**
 * A hook that returns the current theme.
 */
export default function useTheme() {
    const theme = React.useContext(ThemeContext);
    return theme;
}
