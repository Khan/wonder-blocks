export {mergeTheme} from "./utils/merge-theme";
export {default as createThemeContext} from "./utils/create-theme-context";
export {default as useScopedTheme} from "./hooks/use-scoped-theme";
// HOC
export {
    default as withScopedTheme,
    type WithThemeProps,
    type WithoutTheme,
} from "./components/with-scoped-theme";
export {type ThemedStylesFn, type SupportedThemes, type Themes} from "./types";
export {default as useStyles} from "./hooks/use-styles";
export {ThemeSwitcherContext} from "./utils/theme-switcher-context";
