import {ThemeContext} from "./theme-context";
import {ThemeSwitcherContext} from "./theme-switcher";
import theme, {createTheme} from "./theme";
import tokens from "./tokens";
import useStyles from "./use-styles";
// Components that use the theme context.
import useScopedTheme from "./use-scoped-theme";
import withScopedTheme from "./with-scoped-theme";
// Global theme context.
import useTheme from "./use-theme";
import withTheme from "./with-theme";
import {mergeTheme} from "./utils/util";

import type {WithThemeProps, WithoutTheme} from "./with-theme";
import type {ThemeContract, ThemedStylesFn} from "./types";

export type {ThemedStylesFn, ThemeContract, WithThemeProps, WithoutTheme};
export {ThemeContext as default};
export {
    createTheme,
    mergeTheme,
    ThemeSwitcherContext,
    theme as themeDefault,
    tokens,
    useStyles,
    useScopedTheme,
    useTheme,
    withScopedTheme,
    withTheme,
};
