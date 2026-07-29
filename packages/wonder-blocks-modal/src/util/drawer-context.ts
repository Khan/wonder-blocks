import * as React from "react";
import type {DrawerAlignment} from "./types";

/**
 * Centralized default values for the drawer system.
 *
 * These constants provide the default behavior for all drawer components
 * and can be imported by consumers who need to reference or override defaults.
 */

/**
 * Default duration in milliseconds for drawer slide animations and focus timing.
 *
 * NOTE: Drawer timing now comes from the `docked` animation tokens by default
 * (enter `xLong` = 400ms, exit `medium` = 200ms). This constant is retained for
 * backward compatibility (it still matches the enter duration) and as the value
 * a consumer's explicit `timingDuration` override is compared against, but it is
 * no longer applied as the context default — an unset `timingDuration` means
 * "use the token durations".
 */
export const DEFAULT_DRAWER_TIMING_DURATION_MS = 400;

/** Default setting for whether drawer animations are enabled. */
export const DEFAULT_DRAWER_ANIMATED = true;

/** Default setting for whether clicking the backdrop dismisses the drawer. */
export const DEFAULT_DRAWER_BACKDROP_DISMISS_ENABLED = true;

/** Default value for internal exit animation state. */
export const DEFAULT_DRAWER_IS_EXITING = false;

export interface DrawerContextProps {
    alignment?: DrawerAlignment;
    animated?: boolean;
    isExiting?: boolean;
    timingDuration?: number;
}

// Default values for the drawer context - using centralized defaults from DrawerLauncher.
// `timingDuration` is intentionally omitted: when unset, the drawer components
// fall back to the `docked` animation tokens (asymmetric enter/exit durations).
const defaultDrawerContextValue: DrawerContextProps = {
    animated: DEFAULT_DRAWER_ANIMATED,
    isExiting: DEFAULT_DRAWER_IS_EXITING,
};

export const DrawerContext = React.createContext<DrawerContextProps>(
    defaultDrawerContextValue,
);

export const useDrawerContext = (): DrawerContextProps => {
    return React.useContext(DrawerContext);
};
