import * as React from "react";

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
 * `data-wb-theme`, writing direction is the inherited `dir` attribute — because
 * putting them in the context would make it a re-render surface for values that
 * are free, and would break for consumers who never mount the provider.
 */
export type WonderBlocksConfig = {
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

/**
 * The configuration Wonder Blocks components read during render.
 *
 * Unlike Perseus's equivalent context, this defaults to a real value rather
 * than `null`. Wonder Blocks is published to npm, rendered in its own
 * Storybook, used inside Perseus, and mounted in thousands of consumer tests —
 * all places where no provider exists and never will. Components must render
 * correctly there, in English, rather than crash.
 *
 * @see WonderBlocksConfigProvider to supply translated strings and a locale.
 */
const ConfigContext = React.createContext<WonderBlocksConfig>({
    strings: defaultStrings,
    locale: "en",
});
ConfigContext.displayName = "WonderBlocksConfigContext";

export {ConfigContext};
