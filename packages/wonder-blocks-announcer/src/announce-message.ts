import type {PolitenessLevel} from "../types/Announcer.types";
import Announcer from "./Announcer";

export type AnnounceMessageProps = {
    message: string;
    level?: PolitenessLevel;
    removalDelay?: number;
};

export const defaultTimeout = 100;

/**
 * Public API method to announce screen reader messages in ARIA Live Regions.
 * @param {string} message The message to announce.
 * @param {PolitenessLevel} level Polite or assertive announcements
 * @param {number} removalDelay Optional duration to remove a message after sending. Defaults to 5000ms.
 * @returns {Promise<string>} Promise that resolves with an IDREF for targeted live region element
 */
export function announceMessage({
    message,
    level = "polite", // TODO: decide whether to allow other roles, i.e. role=`timer`
    removalDelay,
}: AnnounceMessageProps): Promise<string> {
    const announcer = Announcer.getInstance();
    return announcer.announce(message, level, removalDelay);
}
