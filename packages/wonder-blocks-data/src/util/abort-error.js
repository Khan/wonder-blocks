// @flow

/**
 * Simple implementation to represent aborting.
 *
 * Other frameworks may provide this too, so we won't be sharing this with
 * the outside world. It's just a utility for test and internal use whenever
 * we need to represent the concept of aborted things.
 */
export class AbortError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AbortError";
    }
}
