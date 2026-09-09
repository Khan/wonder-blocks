/**
 * WonderBlocksI18nContext provides a way to set the strings and locale that
 * are used inside the Wonder Blocks packages.
 *
 * This mirrors `PerseusI18nContext` and `MathInputI18nContext`, with one
 * deliberate difference: the context defaults to English strings rather than
 * to `null`. Perseus can throw outside a provider because webapp pre-wraps
 * every renderer, but Wonder Blocks is published to npm, rendered in its own
 * Storybook, used inside Perseus, and mounted in thousands of consumer tests —
 * all places where no provider exists and never will. Components have to
 * render there, in English, rather than crash.
 */
import * as React from "react";
import {useContext, useMemo} from "react";

import {defaultStrings} from "../strings";

import type {WonderBlocksStrings} from "../strings";

/**
 * The information Wonder Blocks components need from the app around them, and
 * that is the same for every component on the page.
 *
 * Both fields change at most once per page load, so a component reading this
 * context costs a `useContext` and nothing more.
 *
 * Things that CSS can read for itself do not belong here — theme has
 * `data-wb-theme`, writing direction is the inherited `dir` attribute —
 * because putting them in the context would make it a re-render surface for
 * values that are free, and would break for consumers who never mount the
 * provider.
 */
export type I18nContextType = {
    /**
     * The complete set of translated strings Wonder Blocks components render.
     *
     * Every key is required. In Khan's webapp this is produced by the string
     * extraction tooling from the English source in
     * `@khanacademy/wonder-blocks-core/strings`.
     */
    strings: WonderBlocksStrings;
    /**
     * The BCP-47 language tag for the current locale, e.g. `"es"`, `"pt-PT"`.
     *
     * Components that format dates and numbers use this for `Intl`.
     */
    locale: string;
};

export const WonderBlocksI18nContext = React.createContext<I18nContextType>({
    strings: defaultStrings,
    locale: "en",
});
WonderBlocksI18nContext.displayName = "WonderBlocksI18nContext";

type Props = React.PropsWithChildren<I18nContextType>;

/**
 * Supplies translated strings and the current locale to the Wonder Blocks
 * components below it.
 *
 * Mount this once, near the root of the app, above everything that renders
 * Wonder Blocks components — including libraries that render them internally,
 * such as Perseus. Nesting a second provider inside a library would let the
 * two drift.
 *
 * Both props are required and complete, the same contract
 * `MathInputI18nContextProvider` takes. A consumer that does not mount the
 * provider at all still renders — components fall back to English — so
 * adopting this is not all-or-nothing.
 *
 * ### Usage
 *
 * ```tsx
 * import {WonderBlocksI18nContextProvider} from "@khanacademy/wonder-blocks-core";
 *
 * // `wonderBlocksStrings()` returns a new object per call, so memoize it
 * // rather than calling it inline — otherwise the context value gets a fresh
 * // identity on every render. The locale is fixed per page load, so an empty
 * // dependency list is correct.
 * const strings = React.useMemo(() => wonderBlocksStrings(), []);
 *
 * <WonderBlocksI18nContextProvider strings={strings} locale={kaLocale}>
 *     {app}
 * </WonderBlocksI18nContextProvider>
 * ```
 *
 * Per-instance wording still belongs on the component: a component's own
 * `labels` prop overrides the configured string, which is how the same
 * `MultiSelect` says "No classes found" on one screen and "No students found"
 * on the next.
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

/**
 * Returns the translated strings and locale Wonder Blocks components render
 * with.
 *
 * For use inside Wonder Blocks components. Where no
 * `WonderBlocksI18nContextProvider` is mounted this returns English strings
 * and the `"en"` locale, so a component reading a string this way works in
 * every environment.
 *
 * A component's own `labels` prop takes precedence over what this returns:
 *
 * ```tsx
 * const {strings} = useWonderBlocksI18n();
 * const label = labels?.externalIconAriaLabel ?? strings.iconExternalLink;
 * ```
 *
 * When a string goes into a `useCallback` or `useMemo` dependency list, depend
 * on the individual string rather than on the object this returns.
 */
export const useWonderBlocksI18n = () => useContext(WonderBlocksI18nContext);
