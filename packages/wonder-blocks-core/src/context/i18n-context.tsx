/**
 * WonderBlocksI18nContext provides a way to set the strings and locale that
 * are used inside the Wonder Blocks packages.
 *
 */
import * as React from "react";
import {useContext, useMemo} from "react";

import {mockStrings} from "../strings";

import type {WonderBlocksStrings} from "../strings";

export type I18nContextType = {
    strings: WonderBlocksStrings;
    /** BCP-47 tag, e.g. `"pt-PT"`. */
    locale: string;
};

// @ts-expect-error - TS2322 - Type 'Context<{ strings: {}; locale: string; }>' is not assignable to type 'Context<I18nContextType>'.
export const WonderBlocksI18nContext: React.Context<I18nContextType> =
    React.createContext(
        process.env.NODE_ENV === "test" || process.env.STORYBOOK
            ? {
                  strings: mockStrings,
                  locale: "en",
              }
            : // We want to return null here, not an empty object, so that we
              // are will throw an error when attempting to access the
              // undefined locale or strings, making it easier to debug.
              null,
    );
WonderBlocksI18nContext.displayName = "WonderBlocksI18nContext";

type Props = React.PropsWithChildren<I18nContextType>;

/**
 * Mount once near the root of the app, above everything that renders Wonder
 * Blocks components — including libraries such as Perseus that render them
 * internally, or the two providers drift.
 *
 * Pass a `strings` object with a stable identity. A generated binding returns a
 * new one per call, so hoist or memoize it; the locale is fixed per page load,
 * so `useMemo(() => wonderBlocksStrings(), [])` is safe.
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
