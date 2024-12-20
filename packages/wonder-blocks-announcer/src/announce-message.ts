import type {PolitenessLevel} from "../types/announcer.types";
import Announcer from "./announcer";

export type AnnounceMessageProps = {
    message: string;
    level?: PolitenessLevel;
    debounceThreshold?: number;
    initialTimeout?: number;
};

/**
 * Method to announce screen reader messages in ARIA Live Regions.
 * @param {string} message The message to announce.
 * @param {PolitenessLevel} level Polite or assertive announcements
 * @param {number} debounceThreshold Optional duration to wait before announcing another message. Defaults to 250ms.
 * @param {number} initialTimeout Optional duration to wait before the first announcement. Useful for Safari and automated testing.
 * @returns {Promise<string>} Promise that resolves with an IDREF for targeted live region element or an empty string
 */
export function announceMessage({
    message,
    level = "polite", // TODO: decide whether to allow other roles, i.e. role=`timer`
    debounceThreshold,
    initialTimeout = 150,
}: AnnounceMessageProps): Promise<string> {
    const announcer = Announcer.getInstance();
    if (initialTimeout > 0) {
        return new Promise<string>((resolve) => {
            setTimeout(async () => {
                const result = await announcer.announce(
                    message,
                    level,
                    debounceThreshold,
                );
                resolve(result);
            }, initialTimeout);
        });
    } else {
        const result = announcer.announce(message, level, debounceThreshold);
        return new Promise<string>((resolve) => {
            resolve(result);
        });
    }
}
