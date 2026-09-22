import * as React from "react";

import {WonderBlocksI18nContextProvider} from "../context/i18n-context";

import type {I18nConfig} from "../context/i18n-context";

type Props = React.PropsWithChildren<{
    /**
     * The strings for Wonder Blocks components to render, and the locale they
     * are translated into. `strings` and `locale` are set together so that
     * the strings a component renders always match the locale it reports.
     */
    i18n: I18nConfig;
}>;

/**
 * Configures the Wonder Blocks components rendered beneath it.
 *
 * Mount this once, as high in the tree as it can go. It currently configures
 * i18n, and is where other Wonder Blocks configuration will be added, so
 * reach for this rather than for the individual providers behind it.
 *
 * Components use the nearest enclosing provider's configuration. Wonder
 * Blocks components render the default English strings without a provider, so
 * mount one to render them in any other locale.
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
    const {strings, locale} = i18n;

    return (
        <WonderBlocksI18nContextProvider strings={strings} locale={locale}>
            {children}
        </WonderBlocksI18nContextProvider>
    );
}
