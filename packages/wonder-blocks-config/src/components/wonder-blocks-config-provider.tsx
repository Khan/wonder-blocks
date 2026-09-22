import * as React from "react";

import {
    useWonderBlocksI18n,
    WonderBlocksI18nContextProvider,
} from "../context/i18n-context";

import type {I18nContextType} from "../context/i18n-context";

type Props = React.PropsWithChildren<{
    /**
     * The strings for Wonder Blocks components to render, and the locale they
     * are translated into. `strings` and `locale` are set together so that
     * the strings a component renders always match the locale it reports.
     *
     * Leave this off to keep the i18n configuration from an enclosing
     * `WonderBlocksConfigProvider`, or the default English strings when there
     * is no enclosing provider.
     */
    i18n?: I18nContextType;
}>;

/**
 * Configures the Wonder Blocks components rendered beneath it.
 *
 * Mount this once, as high in the tree as it can go. It currently configures
 * i18n, and is where other Wonder Blocks configuration will be added, so
 * reach for this rather than for the individual providers behind it.
 *
 * Each configuration is independent: one that is left off keeps whatever an
 * enclosing provider set for it, falling back to the Wonder Blocks default.
 * That lets a subtree override only the configuration it cares about.
 *
 * Example:
 * ```tsx
 * <WonderBlocksConfigProvider
 *     i18n={{strings: translatedStrings, locale: "es"}}
 * >
 *     <App />
 * </WonderBlocksConfigProvider>
 * ```
 */
export function WonderBlocksConfigProvider({children, i18n}: Props) {
    // Read the enclosing configuration so that anything left off here keeps
    // the value an outer provider set instead of resetting it to the default.
    // Without an outer provider, this is the Wonder Blocks default.
    const inheritedI18n = useWonderBlocksI18n();
    const {strings, locale} = i18n ?? inheritedI18n;

    return (
        <WonderBlocksI18nContextProvider strings={strings} locale={locale}>
            {children}
        </WonderBlocksI18nContextProvider>
    );
}
