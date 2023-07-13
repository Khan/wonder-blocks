import {ThemeContext} from "./theme-context";
import theme from "./theme";
import tokens from "./tokens";
import useStyles from "./use-styles";
import useTheme from "./use-theme";
import withTheme from "./with-theme";
import {mergeTheme} from "./utils/util";

import type {WithThemeProps, WithoutTheme} from "./with-theme";
import type {ThemeContract, ThemedStylesFn} from "./types";

export type {ThemedStylesFn, ThemeContract, WithThemeProps, WithoutTheme};
export {ThemeContext as default};
export {
    mergeTheme,
    theme as themeDefault,
    tokens,
    useStyles,
    useTheme,
    withTheme,
};
