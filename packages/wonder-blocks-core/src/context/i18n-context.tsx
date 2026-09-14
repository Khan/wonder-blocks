import * as React from "react";
import {useContext, useMemo} from "react";

import {defaultEnStrings} from "../strings";

import type {WonderBlocksStrings} from "../strings";

export type I18nContextType = {
    strings: WonderBlocksStrings;
    locale: string;
};

/**
 * Context for strings and locale information for Wonder Blocks components.
 *
 * Defaults to English translations if not provided.
 */
export const WonderBlocksI18nContext = React.createContext<I18nContextType>({
    strings: defaultEnStrings,
    locale: "en",
});
WonderBlocksI18nContext.displayName = "WonderBlocksI18nContext";

type Props = React.PropsWithChildren<I18nContextType>;

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
