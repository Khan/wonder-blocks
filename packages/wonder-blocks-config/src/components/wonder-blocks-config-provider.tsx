import * as React from "react";

import {WonderBlocksI18nContextProvider} from "../context/i18n-context";

import type {I18nConfig} from "../context/i18n-context";

type Props = React.PropsWithChildren<{
    /**
     * The strings for Wonder Blocks components to render, and the locale they
     * are translated into.
     */
    i18n: I18nConfig;
}>;

/**
 * Configures the Wonder Blocks components rendered beneath it.
 */
export function WonderBlocksConfigProvider({children, i18n}: Props) {
    const {strings, locale} = i18n;

    return (
        <WonderBlocksI18nContextProvider strings={strings} locale={locale}>
            {children}
        </WonderBlocksI18nContextProvider>
    );
}
