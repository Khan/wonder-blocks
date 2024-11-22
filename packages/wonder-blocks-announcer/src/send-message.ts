import type {PolitenessLevel} from "../types/Announcer.types";
import Announcer from "./Announcer";

export type SendMessageProps = {
    message: string;
    level?: PolitenessLevel;
    removalDelay?: number;
};

/**
 * Public API method to send screen reader messages.
 * @param {string} message The message to send.
 * @param {PolitenessLevel} level Polite or assertive announcements
 * @param {number} removalDelay Optional duration to remove a message after sending. Defaults to 5000ms.
 * @returns {string} IDREF for targeted live region element
 */
export function sendMessage({
    message,
    level = "polite", // TODO: decide whether to allow other roles, i.e. role=`timer`
    removalDelay,
}: SendMessageProps): string {
    const announcer = Announcer.getInstance();

    if (typeof jest === "undefined") {
        setTimeout(() => {
            return announcer?.announce(message, level, removalDelay);
        }, 100);
    } else {
        // If we are in a test environment, announce without waiting
        return announcer.announce(message, level, removalDelay);
    }
    return "";
}
