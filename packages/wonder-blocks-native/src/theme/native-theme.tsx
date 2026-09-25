import * as React from "react";
import {StyleCollection} from "react-native-css/native";

import {stylesheet} from "../generated/stylesheet";
import {themes} from "../generated/themes";

/**
 * The themes compiled for native. Mirrors the web `data-wb-theme` values.
 */
export type NativeThemeName = keyof typeof themes;

let injectedTheme: NativeThemeName | null = null;

/**
 * Register the compiled component rules and a theme's variables with
 * `react-native-css`.
 *
 * This is the code `react-native-css`'s Metro transformer would generate for
 * an imported `.css` file; we call it ourselves so mobile's Metro config
 * doesn't need to change. Components that read the variables re-render
 * automatically: `react-native-css` tracks them as observables.
 */
const injectTheme = (theme: NativeThemeName) => {
    if (injectedTheme === theme) {
        return;
    }
    StyleCollection.inject(
        injectedTheme === null
            ? {...stylesheet, vr: themes[theme]}
            : {vr: themes[theme]},
    );
    injectedTheme = theme;
};

/**
 * Make sure the component rules are registered, using the default theme if
 * no `NativeThemeProvider` has rendered yet. Components call this during
 * render (it's idempotent), the way web falls back to the `:root` tokens.
 */
export const ensureStyles = () => {
    if (injectedTheme === null) {
        injectTheme("thunderblocks");
    }
};

type Props = {
    /** The theme to use. Defaults to `thunderblocks` (Shape Your Learning). */
    theme?: NativeThemeName;
    children: React.ReactNode;
};

/**
 * Selects the active Wonder Blocks theme for native components.
 *
 * Unlike web's `data-wb-theme`, this is **app-wide**, not scoped to the
 * subtree: `react-native-css` keeps `:root` variables in a global registry.
 * (Scoping would need its `VariableContextProvider`, which uses React 19's
 * `<Context value>` syntax and so doesn't work on React 18.) Render one
 * provider near the app root.
 */
export const NativeThemeProvider = ({
    theme = "thunderblocks",
    children,
}: Props) => {
    // The first injection happens during render, so the very first render
    // of the children already sees the rules. Later theme changes notify
    // mounted components, which must not happen mid-render.
    if (injectedTheme === null) {
        injectTheme(theme);
    }
    React.useLayoutEffect(() => injectTheme(theme), [theme]);
    return <>{children}</>;
};
