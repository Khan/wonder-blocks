import type {PolitenessLevel} from "../types/Announcer.types";
import Announcer from "./Announcer";

export type AnnounceMessageProps = {
    message: string;
    level?: PolitenessLevel;
    removalDelay?: number;
    timeoutDelay?: number;
};

export const defaultTimeout = 100;

/**
 * Public API method to announce screen reader messages in ARIA Live Regions.
 * @param {string} message The message to announce.
 * @param {PolitenessLevel} level Polite or assertive announcements
 * @param {number} removalDelay Optional duration to remove a message after sending. Defaults to 5000ms.
 * @param {number} timeoutDelay Optional duration to alter an announcement timeout. Useful in tests for rendering immediately.
 * @returns {string} IDREF for targeted live region element
 */
export function announceMessage({
    message,
    level = "polite", // TODO: decide whether to allow other roles, i.e. role=`timer`
    removalDelay,
    timeoutDelay = defaultTimeout,
}: AnnounceMessageProps): string {
    const announcer = Announcer.getInstance();

    // This timeout is for Safari/Voiceover to improve reliability of the first appended message.
    if (timeoutDelay > 0) {
        setTimeout(() => {
            return announcer.announce(message, level, removalDelay);
        }, timeoutDelay);
    } else {
        return announcer.announce(message, level, removalDelay);
    }

    return "";
}
