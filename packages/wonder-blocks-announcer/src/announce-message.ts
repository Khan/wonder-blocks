import type {PolitenessLevel} from "../types/Announcer.types";
import Announcer from "./Announcer";

export type AnnounceMessageProps = {
    message: string;
    level?: PolitenessLevel;
    removalDelay?: number;
};

/**
 * Public API method to announce screen reader messages in ARIA Live Regions.
 * @param {string} message The message to announce.
 * @param {PolitenessLevel} level Polite or assertive announcements
 * @param {number} removalDelay Optional duration to remove a message after sending. Defaults to 5000ms.
 * @returns {string} IDREF for targeted live region element
 */
export function announceMessage({
    message,
    level = "polite", // TODO: decide whether to allow other roles, i.e. role=`timer`
    removalDelay,
}: AnnounceMessageProps): string {
    const announcer = Announcer.getInstance();

    // if (typeof jest === "undefined") {
    //     setTimeout(() => {
    //         return announcer?.announce(message, level, removalDelay);
    //     }, 100);
    // } else {
    // If we are in a test environment, announce without waiting
    return announcer.announce(message, level, removalDelay);
    // }
    return "";
}
