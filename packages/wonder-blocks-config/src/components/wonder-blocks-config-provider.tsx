import * as React from "react";

import {
    useWonderBlocksI18n,
    WonderBlocksI18nContextProvider,
} from "../context/i18n-context";

import type {WonderBlocksStrings} from "../strings";

type Props = React.PropsWithChildren<{
    /**
     * The translated strings for Wonder Blocks components to render.
     *
     * Leave this off to keep the strings from an enclosing
     * `WonderBlocksConfigProvider`, or the default English strings when there
     * is no enclosing provider.
     */
    strings?: WonderBlocksStrings;
    /**
     * The locale that `strings` are translated into, as a BCP 47 language tag
     * (e.g. `es`, `pt-PT`).
     *
     * Leave this off to keep the locale from an enclosing
     * `WonderBlocksConfigProvider`, or `en` when there is no enclosing
     * provider.
     */
    locale?: string;
}>;

/**
 * Configures the Wonder Blocks components rendered beneath it.
 *
 * Mount this once, as high in the tree as it can go. It currently configures
 * i18n, and is where other Wonder Blocks configuration will be added, so
 * reach for this rather than for the individual providers behind it.
 *
 * Each prop is independent: one that is left off keeps whatever an enclosing
 * provider set for it, falling back to the Wonder Blocks default. That lets a
 * subtree override only the configuration it cares about.
 *
 * Example:
 * ```tsx
 * <WonderBlocksConfigProvider strings={translatedStrings} locale="es">
 *     <App />
 * </WonderBlocksConfigProvider>
 * ```
 */
export function WonderBlocksConfigProvider({children, strings, locale}: Props) {
    // Read the enclosing configuration so that a prop left off here keeps the
    // value an outer provider set instead of resetting it to the default.
    // Without an outer provider, this is the Wonder Blocks default.
    const inherited = useWonderBlocksI18n();

    return (
        <WonderBlocksI18nContextProvider
            strings={strings ?? inherited.strings}
            locale={locale ?? inherited.locale}
        >
            {children}
        </WonderBlocksI18nContextProvider>
    );
}
