import * as React from "react";

import {ConfigContext} from "./config-context";
import type {WonderBlocksConfig} from "./config-context";

type Props = WonderBlocksConfig & {
    /**
     * The tree that reads this configuration.
     */
    children: React.ReactNode;
};

/**
 * Supplies translated strings and the current locale to the Wonder Blocks
 * components below it.
 *
 * Mount this once, near the root of the app, above everything that renders
 * Wonder Blocks components — including libraries that render them internally,
 * such as Perseus. Nesting a second provider inside a library would let the two
 * drift.
 *
 * Both props are required and complete: this is the same contract Perseus and
 * Math Input use, so an engineer moving between the three meets one shape. A
 * consumer that does not mount the provider at all still renders — components
 * fall back to English — so adopting this is not all-or-nothing.
 *
 * ### Usage
 *
 * ```tsx
 * import {WonderBlocksConfigProvider} from "@khanacademy/wonder-blocks-core";
 *
 * // `wonderBlocksStrings()` returns a new object per call, so memoize it
 * // rather than calling it inline — otherwise the context value gets a fresh
 * // identity on every render. The locale is fixed per page load, so an empty
 * // dependency list is correct.
 * const strings = React.useMemo(() => wonderBlocksStrings(), []);
 *
 * <WonderBlocksConfigProvider strings={strings} locale={kaLocale}>
 *     {app}
 * </WonderBlocksConfigProvider>
 * ```
 *
 * Per-instance wording still belongs on the component: a component's own
 * `labels` prop overrides the configured string, which is what lets the same
 * `MultiSelect` say "No classes found" on one screen and "No students found"
 * on the next.
 */
export function WonderBlocksConfigProvider({
    strings,
    locale,
    children,
}: Props): React.ReactElement {
    const config = React.useMemo(() => ({strings, locale}), [strings, locale]);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
}
