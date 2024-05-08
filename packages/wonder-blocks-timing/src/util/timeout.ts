import {SchedulePolicy, ClearPolicy} from "./policies";

import type {ITimeout} from "./types";

/**
 * Encapsulates everything associated with calling setTimeout/clearTimeout, and
 * managing the lifecycle of that timer, including the ability to resolve or
 * cancel a pending timeout action.
 *
 * @export
 * @class Timeout
 * @implements {ITimeout}
 */
export default class Timeout implements ITimeout {
    _timeoutId: ReturnType<typeof setTimeout> | null | undefined;
    _action: () => unknown;
    _timeoutMs: number;

    /**
     * Creates a timeout that will invoke the given action after
     * the given period. The timeout does not start until set is called.
     *
     * @param action The action to be invoked when the timeout
     * period has passed.
     * @param timeoutMs The timeout period.
     * @param [schedulePolicy] When SchedulePolicy.Immediately,
     * the timer is set immediately on instantiation; otherwise, `set` must be
     * called to set the timeout.
     * Defaults to `SchedulePolicy.Immediately`.
     * @memberof Timeout
     */
    constructor(
        action: () => unknown,
        timeoutMs: number,
        schedulePolicy: SchedulePolicy = SchedulePolicy.Immediately,
    ) {
        if (typeof action !== "function") {
            throw new Error("Action must be a function");
        }

        if (timeoutMs < 0) {
            throw new Error("Timeout period must be >= 0");
        }

        this._action = action;
        this._timeoutMs = timeoutMs;

        if (schedulePolicy === SchedulePolicy.Immediately) {
            this.set();
        }
    }

    /**
     * Determine if the timeout is set or not.
     *
     * @returns true if the timeout is set (aka pending), otherwise
     * false.
     * @memberof Timeout
     */
    get isSet(): boolean {
        return this._timeoutId != null;
    }

    /**
     * Set the timeout.
     *
     * If the timeout is pending, this cancels that pending timeout and
     * sets the timeout afresh. If the timeout is not pending, this
     * sets a new timeout.
     *
     * @memberof Timeout
     */
    set(): void {
        if (this.isSet) {
            this.clear(ClearPolicy.Cancel);
        }
        this._timeoutId = setTimeout(
            () => this.clear(ClearPolicy.Resolve),
            this._timeoutMs,
        );
    }

    /**
     * Clear the set timeout.
     *
     * If the timeout is pending, this cancels that pending timeout without
     * invoking the action. If no timeout is pending, this does nothing.
     *
     * @param [policy] When ClearPolicy.Resolve, if the request
     * was set when called, the request action is invoked after cancelling
     * the request; otherwise, the pending action is cancelled.
     * Defaults to `ClearPolicy.Cancel`.
     *
     * @returns {void}
     * @memberof Timeout
     */
    clear(policy: ClearPolicy = ClearPolicy.Cancel): void {
        const timeoutId = this._timeoutId;
        this._timeoutId = null;
        if (timeoutId == null) {
            return;
        }
        clearTimeout(timeoutId);
        if (policy === ClearPolicy.Resolve) {
            this._action();
        }
    }
}
