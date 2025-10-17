import {useMemo, useSyncExternalStore} from "react";

import {RenderState, useRenderState} from "@khanacademy/wonder-blocks-core";

/**
 * A hook that returns a boolean indicating whether the current viewport
 * matches a given media query.
 */
export const useMediaQuery = (query: string) => {
    const renderState = useRenderState();

    const {subscribe, checkMatches} = useMemo(() => {
        if (renderState === RenderState.Initial) {
            // This is an initial render and so needs to be SSR safe.
            // We don't have access to window in this scenario.
            return {
                subscribe: () => () => {},
                checkMatches: () => false,
            };
        }

        // If we get here, we can assume we're client-side and have access to `window`.
        const media = window.matchMedia(query);
        return {
            subscribe: (fn: () => void) => {
                media.addEventListener("change", fn);
                return () => media.removeEventListener("change", fn);
            },
            checkMatches: () => media.matches,
        };
    }, [query, renderState]);

    return useSyncExternalStore(subscribe, checkMatches);
};
