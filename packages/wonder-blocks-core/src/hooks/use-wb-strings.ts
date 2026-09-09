import * as React from "react";

import {ConfigContext} from "../components/config-context";
import type {WonderBlocksStrings} from "../strings";

/**
 * Returns the translated strings Wonder Blocks components should render.
 *
 * For use inside Wonder Blocks components. Where no `WonderBlocksConfigProvider`
 * is mounted this returns English defaults, so a component reading a string
 * this way works in every environment.
 *
 * A component's own `labels` prop takes precedence over what this returns:
 *
 * ```tsx
 * const strings = useWbStrings();
 * const label = labels?.externalIconAriaLabel ?? strings.linkExternalIcon;
 * ```
 *
 * When a string goes into a `useCallback` or `useMemo` dependency list, depend
 * on the individual string rather than on the object this returns.
 */
export const useWbStrings = (): WonderBlocksStrings =>
    React.useContext(ConfigContext).strings;
