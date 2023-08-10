import * as React from "react";

/**
 * A React Context that holds a reference to the selected theme. It should use
 * default as the initial value as we expect that any theme-able component
 * should define its initial theme as default.
 *
 * @param theme The theme name to be used. It should be one of the themes
 * defined in the themes object. Defaults to `default`.
 */
export const ThemeSwitcherContext = React.createContext<string>("default");
