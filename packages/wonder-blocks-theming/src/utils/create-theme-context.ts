import * as React from "react";

/**
 * An utility that allow us to create a given theme that contains the component
 * tokens associated to it.
 *
 * @param theme The theme object to create the context.
 * @returns
 */
export default function createThemeContext<T>(theme: T) {
    return React.createContext(theme);
}
