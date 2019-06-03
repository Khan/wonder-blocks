// @flow

/**
 * Encapsulates everything associated with calling setTimeout/clearTimeout, and
 * managing the lifecycle of that timer, including the ability to resolve or
 * cancel a pending timeout action.
 *
 * @export
 * @interface ITimeout
 */
export interface ITimeout {
    /**
     * Determine if the timeout is set or not.
     *
     * @returns {boolean} true if the timeout is set (aka pending), otherwise
     * false.
     * @memberof ITimeout
     */
    get isSet(): boolean;

    /**
     * Set the timeout.
     *
     * If the timeout is pending, this cancels that pending timeout and
     * starts the timeout a fresh. If the timeout is not pending, this
     * starts a new timeout equivalent to constructing a timeout instance
     * with the same parameters as the instance on which this is called.
     *
     * @memberof ITimeout
     */
    set(): void;

    /**
     * Clear the set timeout.
     *
     * If the timeout is pending, this cancels that pending timeout without
     * invoking the action. If no timeout is pending, this does nothing.
     *
     * @param {boolean} [resolve] When true, if the timeout was set when called,
     * the timeout action is invoked after cancelling the timeout. Defaults to
     * false.
     *
     * @memberof ITimeout
     */
    clear(resolve?: boolean): void;
}
