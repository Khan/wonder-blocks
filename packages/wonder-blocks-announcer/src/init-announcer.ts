import Announcer from "./announcer";

type InitAnnouncerProps = {
    debounceThreshold?: number;
    targetElement?: HTMLElement | null;
};

/**
 * Utility to inject Announcer on page load.
 * It can be called from useEffect or elsewhere to improve ARIA Live Region performance on the first announcement.
 * @returns {Announcer} The Announcer instance created.
 */
export function initAnnouncer(props?: InitAnnouncerProps): Announcer {
    let targetElement;
    if (props?.targetElement !== null) {
        targetElement = props?.targetElement;
    }
    const announcer = Announcer.getInstance(targetElement);
    if (props?.debounceThreshold !== undefined) {
        announcer.updateWaitThreshold(props?.debounceThreshold);
    }
    return announcer;
}
