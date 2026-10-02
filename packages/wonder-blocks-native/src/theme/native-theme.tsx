import * as React from "react";

import {themeVars} from "../generated/theme-vars";
import {resolveStyle} from "../css-runtime/resolve";
import type {ResolveInput, ResolvedStyle} from "../css-runtime/resolve";
import type {RNStyle} from "../css-runtime/css-to-rn";
import type {NativeStyleSheet, NativeThemeVars} from "../css-runtime/types";

/**
 * The themes compiled for native. Mirrors the web `data-wb-theme` values.
 */
export type NativeThemeName = keyof typeof themeVars;

/**
 * Maps a CSS font family + weight to what the app has registered. On
 * Android, custom fonts are usually registered once per weight
 * (`PlusJakartaSans-Bold`), and `fontWeight` must then be omitted.
 */
export type FontMapper = (
    family: string,
    weight: string | undefined,
) => {fontFamily?: string; fontWeight?: string};

type NativeThemeContextValue = {
    name: NativeThemeName;
    vars: NativeThemeVars;
    hover: boolean;
    mapFont?: FontMapper;
};

const NativeThemeContext = React.createContext<NativeThemeContextValue>({
    name: "thunderblocks",
    vars: themeVars.thunderblocks,
    hover: false,
});

type Props = {
    /** The theme to use. Defaults to `thunderblocks` (Shape Your Learning). */
    theme?: NativeThemeName;
    /**
     * Whether the device has a hover-capable pointer (e.g. iPad with a
     * trackpad, or react-native-web on desktop). Enables `(hover: hover)`
     * rules. Defaults to `false`.
     */
    hover?: boolean;
    mapFont?: FontMapper;
    children: React.ReactNode;
};

/**
 * Provides the active Wonder Blocks theme to native components. The native
 * equivalent of setting `data-wb-theme` on a web container.
 */
export const NativeThemeProvider = ({
    theme = "thunderblocks",
    hover = false,
    mapFont,
    children,
}: Props) => {
    const value = React.useMemo(
        () => ({name: theme, vars: themeVars[theme], hover, mapFont}),
        [theme, hover, mapFont],
    );
    return (
        <NativeThemeContext.Provider value={value}>
            {children}
        </NativeThemeContext.Provider>
    );
};

export const useNativeTheme = (): NativeThemeContextValue =>
    React.useContext(NativeThemeContext);

const applyFontMapper = (style: RNStyle, mapFont?: FontMapper): RNStyle => {
    if (!mapFont || typeof style.fontFamily !== "string") {
        return style;
    }
    const {fontFamily, fontWeight, ...rest} = style;
    return {
        ...rest,
        ...mapFont(
            fontFamily as string,
            fontWeight == null ? undefined : String(fontWeight),
        ),
    };
};

/**
 * Resolve compiled CSS for one element against the active theme.
 */
export const useNativeStyle = (
    sheets: ReadonlyArray<NativeStyleSheet>,
    input: ResolveInput,
): ResolvedStyle => {
    const theme = useNativeTheme();
    // `input` is a fresh object each render; key the memo on its content.
    const key = JSON.stringify(input);
    return React.useMemo(() => {
        const resolved = resolveStyle(sheets, input, {
            themeVars: theme.vars,
            hover: theme.hover,
        });
        return {
            ...resolved,
            style: applyFontMapper(resolved.style, theme.mapFont),
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sheets, key, theme]);
};
