// @flow
import * as React from "react";

import {useOnMountEffect} from "./use-on-mount-effect";

/**
 * Hook to provide a function for determining component mounted state.
 *
 * NOTE: Based on https://github.com/juliencrn/usehooks-ts/blob/d5f3de88cc319c790f2a4e90ba6a8904298957a5/src/useIsMounted/useIsMounted.ts
 *
 * @returns {() => boolean} A function that returns the component mounted state.
 */
export const useIsMounted = (): (() => boolean) => {
    const isMounted = React.useRef<boolean>(false);
    useOnMountEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    });

    return React.useCallback(() => isMounted.current, []);
};
