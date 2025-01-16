import type Announcer from "../announcer";

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
 * @param {Announcer} context Reference to the Announcer instance for maintaining correct scope
 * @param {Function} callback Callback announcer method to call with argments
 * @param {number} debounceThreshold Length of time to wait before calling callback again
 * @returns {Function & { updateWaitTime: (time: number) => void }} Promise resolving with idRef of targeted live region element, and a method to update wait duration
 */
export function createDebounceFunction(
    context: Announcer,
    callback: (...args: any[]) => string,
    debounceThreshold: number,
): {
    (...args: any[]): Promise<string>;
    updateWaitTime: (time: number) => void;
} {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let executed = false;
    let lastExecutionTime = 0;

    const debouncedFn = (...args: []) => {
        return new Promise<string>((resolve) => {
            const now = Date.now();
            const timeSinceLastExecution = now - lastExecutionTime;
            if (timeSinceLastExecution >= debounceThreshold) {
                lastExecutionTime = now;
                // Leading edge: Execute the callback immediately
                if (!executed) {
                    executed = true;
                    const result = callback.apply(context, args);
                    resolve(result);
                }
            }

            // If the timeout exists, clear it
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }

            // Trailing edge: Set the timeout for the next allowed execution
            timeoutId = setTimeout(() => {
                executed = false;
            }, debounceThreshold);
        });
    };

    // Allow callers to adjust the debounce wait time
    debouncedFn.updateWaitTime = (newWaitTime: number) => {
        debounceThreshold = newWaitTime;
    };

    return debouncedFn;
}
