import type {PolitenessLevel} from "../types/Announcer.types";
import Announcer from "./Announcer";

export type AnnounceMessageProps = {
    message: string;
    level?: PolitenessLevel;
    debounceThreshold?: number;
};

/**
 * Public API method to announce screen reader messages in ARIA Live Regions.
 * @param {string} message The message to announce.
 * @param {PolitenessLevel} level Polite or assertive announcements
 * @param {number} debounceThreshold Optional duration to wait before announcing another message. Defaults to 250ms.
 * @returns {Promise<string>} Promise that resolves with an IDREF for targeted live region element
 */
export function announceMessage({
    message,
    level = "polite", // TODO: decide whether to allow other roles, i.e. role=`timer`
    debounceThreshold,
}: AnnounceMessageProps): Promise<string> {
    const announcer = Announcer.getInstance();
    return announcer.announce(message, level, debounceThreshold);
}
