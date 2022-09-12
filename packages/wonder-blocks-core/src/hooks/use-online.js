// @flow
import {useForceUpdate} from "@khanacademy/wonder-blocks-core";
import {useEffect} from "react";

/**
 * Track the online status of the browser.
 *
 * This hook monitors the offline and online events, forcing the consuming
 * component to re-render when they fire.
 *
 * @returns {boolean} The current value of `navigator.onLine`.
 */
export const useOnline = (): boolean => {
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        const handleChange = () => forceUpdate();

        window.addEventListener("online", handleChange);
        window.addEventListener("offline", handleChange);

        return () => {
            window.removeEventListener("online", handleChange);
            window.removeEventListener("offline", handleChange);
        };
    }, [forceUpdate]);

    return navigator.onLine;
};
