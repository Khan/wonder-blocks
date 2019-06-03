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
     * starts the timeout afresh. If the timeout is not pending, this
     * starts the timeout.
     *
     * @memberof ITimeout
     */
    set(): void;

    /**
     * Clear the set timeout.
     *
     * If the timeout is pending, this cancels that pending timeout. If no
     * timeout is pending, this does nothing.
     *
     * @param {boolean} [resolve] When true, if the timeout was set when called,
     * the timeout action is invoked after cancelling the timeout. Defaults to
     * false.
     *
     * @memberof ITimeout
     */
    clear(resolve?: boolean): void;
}

/**
 * Encapsulates everything associated with calling setInterval/clearInterval,
 * and managing the lifecycle of that interval, including the ability to resolve
 * or cancel an active interval.
 *
 * @export
 * @interface IInterval
 */
export interface IInterval {
    /**
     * Determine if the interval is active or not.
     *
     * @returns {boolean} true if the interval is active, otherwise false.
     * @memberof IInterval
     */
    get isSet(): boolean;

    /**
     * Set the interval.
     *
     * If the interval is active, this cancels that interval and restarts it
     * afresh. If the timeout is not active, this starts the interval.
     *
     * @memberof IInterval
     */
    set(): void;

    /**
     * Clear the active interval.
     *
     * If the interval is active, this cancels that interval. If the interval
     * is not active, this does nothing.
     *
     * @param {boolean} [resolve] When true, if the interval was active when
     * called, the associated action is invoked after cancelling the interval.
     * Defaults to false.
     *
     * @memberof IInterval
     */
    clear(resolve?: boolean): void;
}

/**
 * Encapsulates everything associated with calling requestAnimationFrame/
 * cancelAnimationFrame, and managing the lifecycle of that request, including
 * the ability to resolve or cancel a pending request.
 *
 * @export
 * @interface IAnimationFrame
 */
export interface IAnimationFrame {
    /**
     * Determine if the request is set or not.
     *
     * @returns {boolean} true if the request is set (aka pending), otherwise
     * false.
     * @memberof IAnimationFrame
     */
    get isSet(): boolean;

    /**
     * Set the request.
     *
     * If the request is pending, this cancels that pending request and
     * starts a request afresh. If the request is not pending, this
     * starts the request.
     *
     * @memberof IAnimationFrame
     */
    set(): void;

    /**
     * Clear the set request.
     *
     * If the request is pending, this cancels that pending request. If no
     * request is pending, this does nothing.
     *
     * @param {boolean} [resolve] When true, if the request was set when called,
     * the request action is invoked after cancelling the request. Defaults to
     * false.
     *
     * @memberof IAnimationFrame
     */
    clear(resolve?: boolean): void;
}
