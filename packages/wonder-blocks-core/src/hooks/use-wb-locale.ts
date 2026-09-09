import * as React from "react";

import {ConfigContext} from "../components/config-context";

/**
 * Returns the BCP-47 language tag for the current locale, e.g. `"es"`.
 *
 * For use inside Wonder Blocks components that format dates or numbers with
 * `Intl`. Defaults to `"en"` where no `WonderBlocksConfigProvider` is mounted.
 *
 * Components with their own `locale` prop should keep it as an override that
 * wins over this value.
 */
export const useWbLocale = (): string => React.useContext(ConfigContext).locale;
