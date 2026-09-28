import * as React from "react";
import {DRAWER_ENTER_DURATION_MS} from "./drawer-animation";
import type {DrawerAlignment, DrawerEasing} from "./types";

/**
 * Centralized default values for the drawer system.
 *
 * These constants provide the default behavior for all drawer components
 * and can be imported by consumers who need to reference or override defaults.
 */

/**
 * The drawer's enter duration in milliseconds. Each phase has its own duration —
 * see `DRAWER_ENTER_DURATION_MS` and `DRAWER_EXIT_DURATION_MS` in
 * `./drawer-animation`.
 */
export const DEFAULT_DRAWER_TIMING_DURATION_MS = DRAWER_ENTER_DURATION_MS;

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
    /** Overrides the duration of both the enter and exit animations. */
    timingDuration?: number;
    /** Per-phase overrides for the slide easing. */
    easing?: DrawerEasing;
}

// `timingDuration` and `easing` are omitted so that, when unset, the drawer
// components fall back to the per-phase values in `./drawer-animation`.
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
