import Announcer from "./announcer";

/**
 * Utility to inject Announcer on page load.
 * It can be called from useEffect or elsewhere to improve ARIA Live Region performance on the first announcement.
 * @returns {Announcer} The Announcer instance created.
 */
export function initAnnouncer(): Announcer {
    return Announcer.getInstance();
}
