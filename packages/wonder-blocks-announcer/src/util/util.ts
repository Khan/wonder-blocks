/**
 * Alternate index for cycling through elements
 * @param {number} index Previous element index (0 or 1)
 * @returns {number} New index
 */
export function alternateIndex(index: number, count: number): number {
    index += 1;
    index = index % count;
    return index;
}

/**
 * Keep announcements from happening too often by limiting callback execution by time.
 * Anytime the announcer is called repeatedly, this can slow down the results.
 * @param {Function} callback Announce method to call with argments
 * @param {number} wait Length of time to wait before calling callback again
 * @returns {string} idRef of targeted live region element
 */
export function debounce(callback: (...args: any[]) => string, wait: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let executed = false;

    return (...args: any[]): Promise<string> => {
        return new Promise((resolve) => {
            if (!executed) {
                executed = true;
                const result = callback(...args);
                resolve(result);
            }
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                executed = false;
            }, wait);
        });
    };
}
