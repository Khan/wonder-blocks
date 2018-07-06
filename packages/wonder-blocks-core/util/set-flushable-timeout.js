// @flow
export type FlushableTimeout = {
    /**
     * Flushes the timeout, causing the delayed function to get invoked
     * immediately.
     *
     * Does nothing if the timeout was already cleared or completed.
     */
    flush: () => void,

    /**
     * Clears the timeout so that the delayed function isn't called.
     *
     * Does nothing if the timeout was already cleared or completed.
     */
    clear: () => void,

    /**
     * A promise that resolves when the timeout is cleared or the delayed
     * function is called; either after the timeout period or the timeout is
     * flushed.
     *
     * The boolean value passed to resolution indicates if the timeout was
     * cancelled or not. When true, the timeout was cleared without invoking
     * the given function. When false, the timeout function executed; either
     * after the timeout period or because `flush` was invoked..
     */
    promise: Promise<boolean>,
};

/**
 * Schedules a function to run after a given delay.
 *
 * This is similar to `setTimeout` except that the resulting timer can be
 * flushed to execute the deplayed function immediately.
 *
 * @param {boolean => void} fn The function to be invoked. This takes a boolean
 * that indicates whether the timeout was flushed or not.
 *
 * @param {number} ms The number of milliseconds to delay the given function.
 */
export default function setFlushableTimeout(
    fn: (boolean) => void,
    ms: number,
): FlushableTimeout {
    let timeoutID;
    let resolve;

    const clearThisTimeout = () => {
        if (!timeoutID) {
            return false;
        }
        clearTimeout(timeoutID);
        timeoutID = null;
        return true;
    };

    const doFn = (flushed) => {
        if (clearThisTimeout()) {
            fn(flushed);
            resolve(false);
        }
    };

    const flush = () => doFn(true);

    const clear = () => {
        if (clearThisTimeout()) {
            resolve(true);
        }
    };

    const promise = new Promise((r) => {
        resolve = r;
        timeoutID = setTimeout(() => doFn(false), ms);
    });

    return {
        flush,
        clear,
        promise,
    };
}
