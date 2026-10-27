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
 * `WonderBlocksConfigProvider` configures the Wonder Blocks components rendered
 * within it. Render it once near the root of your app.
 *
 * Right now it provides i18n: the translated strings that Wonder Blocks
 * components render and the locale they are translated into. Components
 * rendered outside of a provider fall back to the default English strings.
 *
 * ```tsx
 * import {WonderBlocksConfigProvider} from "@khanacademy/wonder-blocks-config";
 *
 * <WonderBlocksConfigProvider i18n={{strings: translatedStrings, locale}}>
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
