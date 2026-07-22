import Announcer from "./announcer";

type InitAnnouncerProps = {
    debounceThreshold?: number;
    targetElement?: HTMLElement | null;
};

/**
 * Optional setup function to pre-create live regions before the first
 * announcement. Call this once on page load (e.g. in a top-level useEffect)
 * to improve reliability with VoiceOver/Safari, which works best when regions
 * are registered in the DOM before use.
 *
 * Without this, regions are created automatically on the first
 * `announceMessage` call.
 *
 * @param props.targetElement Where to mount the live regions. Defaults to `document.body`.
 * @param props.debounceThreshold Sets the global debounce wait time in ms.
 * @returns The Announcer singleton instance.
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
