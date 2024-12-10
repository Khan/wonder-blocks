import Announcer from "./announcer";

/**
 * Public API method to clear screen reader messages after sending.
 * Clears all regions by default.
 * @param {string} id Optional id of live region element to clear.
 */
export function clearMessages(id?: string) {
    const announcer = Announcer.getInstance();
    if (id && document?.getElementById(id)) {
        announcer?.clear(id);
    } else if (typeof document !== "undefined") {
        announcer?.clear();
    }
}
