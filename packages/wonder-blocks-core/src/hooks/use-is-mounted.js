// @flow
import * as React from "react";

/**
 * Returns a function that can be called to check if the current component is still
 * mounted or not.
 *
 * NOTE: Based on https://github.com/juliencrn/usehooks-ts/blob/d5f3de88cc319c790f2a4e90ba6a8904298957a5/src/useIsMounted/useIsMounted.ts
 *
 * @returns {() => boolean}
 */
export const useIsMounted = (): (() => boolean) => {
    const isMounted = React.useRef<boolean>(false);
    React.useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return React.useCallback(() => isMounted.current, []);
};
