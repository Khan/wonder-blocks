import type {PolitenessLevel} from "./util/announcer.types";
import Announcer from "./announcer";

export type AnnounceMessageProps = {
    message: string;
    level?: PolitenessLevel;
    debounceThreshold?: number;
    initialTimeout?: number;
};

/**
 * Send a message to a screen reader via an ARIA Live Region.
 *
 * When a Wonder Blocks modal is open, the message is automatically routed to
 * live regions inside the modal so the screen reader can hear it.
 *
 * @param message The text to announce.
 * @param level `"polite"` (default) waits for other speech to finish; `"assertive"` interrupts.
 * @param debounceThreshold ms to wait before sending (default `250`). Trailing-edge: last call wins.
 * @param initialTimeout ms to delay the first announcement (default `150`). Helps with Safari/VoiceOver timing.
 * @returns Promise resolving with the ID of the targeted live region, e.g. `"wbARegion-polite1"`.
 */
export function announceMessage({
    message,
    level = "polite",
    debounceThreshold,
    initialTimeout = 150,
}: AnnounceMessageProps): Promise<string> {
    const announcer = Announcer.getInstance();

    if (initialTimeout > 0) {
        return new Promise<string>((resolve) => {
            return setTimeout(async () => {
                // Resolve at announcement time (not call time) so that a modal
                // opened during the initialTimeout window is detected correctly.
                const result = announcer.announce(
                    message,
                    level,
                    announcer.hasActiveModal(),
                    debounceThreshold,
                );
                resolve(result);
            }, initialTimeout);
        });
    } else {
        return announcer.announce(
            message,
            level,
            announcer.hasActiveModal(),
            debounceThreshold,
        );
    }
}
