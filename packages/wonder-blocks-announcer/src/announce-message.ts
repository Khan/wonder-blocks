import type {PolitenessLevel} from "./util/announcer.types";
import Announcer from "./announcer";

export type AnnounceMessageProps = {
    message: string;
    level?: PolitenessLevel;
    inModalContext?: boolean;
    debounceThreshold?: number;
    initialTimeout?: number;
};

/**
 * Automatically detects if there's an active modal context on the page
 * @returns {boolean} true if there's an active modal with aria-modal="true"
 */
function detectModalContext(): boolean {
    if (typeof document === "undefined") {
        return false;
    }

    // Check if there's an element with aria-modal="true" that's currently visible
    const modalElement = document.querySelector<HTMLElement>(
        '[aria-modal="true"]',
    );

    // Additional check: make sure the modal is actually visible/active
    // We check that it's not hidden via display:none or visibility:hidden
    if (modalElement) {
        const computedStyle = window.getComputedStyle(modalElement);
        const isVisible =
            computedStyle.display !== "none" &&
            computedStyle.visibility !== "hidden" &&
            computedStyle.opacity !== "0";
        return isVisible;
    }

    return false;
}

/**
 * Method to announce screen reader messages in ARIA Live Regions.
 * Automatically detects modal context and places live regions appropriately.
 * @param {string} message The message to announce.
 * @param {PolitenessLevel} level Polite or assertive announcements
 * @param {boolean} inModalContext  Optional flag for injecting Announcer messages into a modal. If not provided, will be auto-detected.
 * @param {number} debounceThreshold Optional duration to wait before announcing another message. Defaults to 250ms.
 * @param {number} initialTimeout Optional duration to wait before the first announcement. Useful for Safari and automated testing.
 * @returns {Promise<string>} Promise that resolves with an IDREF for targeted live region element or an empty string
 */
export function announceMessage({
    message,
    level = "polite",
    inModalContext,
    debounceThreshold,
    initialTimeout = 150,
}: AnnounceMessageProps): Promise<string> {
    // Auto-detect modal context if not explicitly provided
    const shouldUseModalContext =
        inModalContext !== undefined ? inModalContext : detectModalContext();
    const announcer = Announcer.getInstance();
    if (initialTimeout > 0) {
        return new Promise<string>((resolve) => {
            return setTimeout(async () => {
                const result = announcer.announce(
                    message,
                    level,
                    shouldUseModalContext,
                    debounceThreshold,
                );
                resolve(result);
            }, initialTimeout);
        });
    } else {
        return announcer.announce(
            message,
            level,
            shouldUseModalContext,
            debounceThreshold,
        );
    }
}
