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
     * afresh. If the interval is not active, this starts the interval.
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

/**
 * Provides means to request timeouts, intervals, and animation frames, with
 * additional support for clearing all requested actions.
 *
 * This interface describes a replacement for the `setTimeout`/`clearTimeout`,
 * `setInterval`/`clearInterval` and `requestAnimationFrame`/`cancelAnimationFrame`
 * APIs that supports the ability to easily clear all pending actions.
 *
 * @export
 * @interface IScheduleActions
 */
export interface IScheduleActions {
    /**
     * Request a timeout.
     *
     * A timeout will wait for a given period and then invoke a given action.
     *
     * @param {() => void} action The action to be invoked when the timeout
     * period is reached.
     * @param {number} period The timeout period in milliseconds. The action
     * will be invoked after this period has passed since the timeout was set.
     * This value must be greater than or equal to zero.
     * @param {boolean} [autoSchedule] Whether or not to set the timeout as soon
     * as this call is made, or wait until `set` is explicitly called. Defaults
     * to `true`.
     * @param {boolean} [resolveOnClear] Whether or not the associated action
     * will be invoked if it is still pending at the point the timeout is
     * cleared. Defaults to `false`.
     * @returns {ITimeout} A interface for manipulating the created timeout.
     * @memberof IScheduleActions
     */
    timeout(
        action: () => mixed,
        period: number,
        autoSchedule?: boolean,
        resolveOnClear?: boolean,
    ): ITimeout;

    /**
     * Request an interval.
     *
     * An interval will invoke a given action each time the given period has
     * passed until the interval is cleared.
     *
     * @param {() => void} action The action to be invoked when the interval
     * period occurs.
     * @param {number} period The interval period in milliseconds. The action
     * will be invoked each time this period has passed since the interval was
     * set or last occurred.
     * This value must be greater than zero.
     * @param {boolean} [autoSchedule] Whether or not to set the interval as soon
     * as this call is made, or wait until `set` is explicitly called. Defaults
     * to `true`.
     * @param {boolean} [resolveOnClear] Whether or not the associated action
     * will be invoked at the point the interval is cleared if the interval
     * is running at that time. Defaults to `false`.
     * @returns {IInterval} An interface for manipulating the created interval.
     * @memberof IScheduleActions
     */
    interval(
        action: () => mixed,
        period: number,
        autoSchedule?: boolean,
        resolveOnClear?: boolean,
    ): IInterval;

    /**
     * Request an animation frame.
     *
     * An animation frame request tells the browser that you wish to perform an
     * animation and requests that the browser call a specified function to
     * update an animation before the next repaint.
     *
     * @param {() => void} action The action to be invoked before the repaint.
     * @param {boolean} [autoSchedule] Whether or not to make the request as soon
     * as this call is made, or wait until `set` is explicitly called. Defaults
     * to `true`.
     * @param {boolean} [resolveOnClear] Whether or not the associated action
     * will be invoked at the point the request is cleared if it has not yet
     * executed. Defaults to `false`.
     * @returns {IAnimationFrame} An interface for manipulating the created
     * request.
     * @memberof IScheduleActions
     */
    animationFrame(
        action: () => void,
        autoSchedule?: boolean,
        resolveOnClear?: boolean,
    ): IAnimationFrame;

    /**
     * Clears all timeouts, intervals, and animation frame requests that were
     * made with this scheduler.
     *
     * @memberof IScheduleActions
     */
    clearAll(): void;
}

/**
 * Extends the given props with props that the `withActionScheduler` higher
 * order component will inject.
 */
export type WithActionScheduler<TOwnProps: {}> = {|
    ...$Exact<TOwnProps>,

    /**
     * An instance of the `IScheduleActions` API to use for scheduling
     * intervals, timeouts, and animation frame requests.
     */
    schedule: IScheduleActions,
|};
