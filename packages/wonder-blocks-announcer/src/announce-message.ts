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
 * Method to announce screen reader messages in ARIA Live Regions.
 * Automatically routes to modal live regions when a modal is active
 * (i.e. attachAnnouncerToModal has been called and detachAnnouncerFromModal has not yet run).
 * @param {string} message The message to announce.
 * @param {PolitenessLevel} level Polite or assertive announcements
 * @param {boolean} inModalContext Optional override for modal routing. Auto-detected if not provided.
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
    const announcer = Announcer.getInstance();
    // If inModalContext is not explicitly provided, infer it from whether
    // a modal is currently attached. This avoids a DOM query on every call.
    const shouldUseModalContext =
        inModalContext !== undefined
            ? inModalContext
            : announcer.hasActiveModal();

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
