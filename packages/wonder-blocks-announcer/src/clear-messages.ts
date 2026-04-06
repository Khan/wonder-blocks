import Announcer from "./announcer";

/**
 * Immediately clear live region content without waiting for the default
 * removal delay. Useful when a message should be retracted (e.g. a loading
 * state that resolves before the timeout).
 *
 * @param id ID of a specific live region to clear. Clears all regions if omitted.
 */
export function clearMessages(id?: string) {
    const announcer = Announcer.getInstance();
    if (id && document?.getElementById(id)) {
        announcer.clear(id);
    } else if (typeof document !== "undefined") {
        announcer.clear();
    }
}
