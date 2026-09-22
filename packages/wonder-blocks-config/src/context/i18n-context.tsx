import * as React from "react";
import {useContext, useMemo} from "react";

import {defaultStringsEn} from "../strings";

import type {WonderBlocksStrings} from "../strings";

/**
 * The i18n configuration for Wonder Blocks components: the strings they
 * render, and the locale those strings are translated into.
 *
 * This is both what `WonderBlocksConfigProvider` takes as its `i18n` prop and
 * what `useWonderBlocksI18n` returns.
 */
export type I18nConfig = {
    /**
     * The translated strings that Wonder Blocks components render.
     */
    strings: WonderBlocksStrings;
    /**
     * The locale `strings` are translated into, as a BCP 47 language tag
     * (e.g. `es`, `pt-PT`).
     */
    locale: string;
};

/**
 * Context for strings and locale information for Wonder Blocks components.
 *
 * Defaults to English translations if not provided.
 */
export const WonderBlocksI18nContext = React.createContext<I18nConfig>({
    strings: defaultStringsEn,
    locale: "en",
});
WonderBlocksI18nContext.displayName = "WonderBlocksI18nContext";

type Props = React.PropsWithChildren<I18nConfig>;

/**
 * Provides i18n to Wonder Blocks components.
 */
export function WonderBlocksI18nContextProvider({
    children,
    strings,
    locale,
}: Props) {
    // Memoize so consumers don't re-render every time this provider's parent
    // renders; a fresh object literal would be a new context value each time.
    const value = useMemo(() => ({strings, locale}), [strings, locale]);

    return (
        <WonderBlocksI18nContext.Provider value={value}>
            {children}
        </WonderBlocksI18nContext.Provider>
    );
}

export const useWonderBlocksI18n = () => useContext(WonderBlocksI18nContext);
