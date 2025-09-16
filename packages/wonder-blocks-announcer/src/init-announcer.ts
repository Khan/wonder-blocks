import Announcer from "./announcer";
import {findOrCreateLayerRoot} from "./util/manage-layer-root";

type InitAnnouncerProps = {
    debounceThreshold?: number;
    targetElement?: HTMLElement | null;
    /**
     * Whether to use the Wonder Blocks Layer Root as the target element.
     * When true, creates/uses a common ancestor that both Announcer and Modal components share.
     * Default: true
     */
    useLayerRoot?: boolean;
};

/**
 * Utility to inject Announcer on page load.
 * It can be called from useEffect or elsewhere to improve ARIA Live Region performance on the first announcement.
 * @returns {Announcer} The Announcer instance created.
 */
export function initAnnouncer(props?: InitAnnouncerProps): Announcer {
    const {debounceThreshold, targetElement, useLayerRoot = true} = props || {};

    let resolvedTargetElement;

    if (targetElement !== null && targetElement !== undefined) {
        // Explicit targetElement provided
        resolvedTargetElement = targetElement;
    } else if (useLayerRoot) {
        // Use Layer Root as default (creates common ancestor for announcer + modal)
        resolvedTargetElement = findOrCreateLayerRoot();
    }
    // Otherwise resolvedTargetElement remains undefined, defaulting to document.body in Announcer.getInstance

    const announcer = Announcer.getInstance(resolvedTargetElement);
    if (debounceThreshold !== undefined) {
        announcer.updateWaitThreshold(debounceThreshold);
    }
    return announcer;
}
