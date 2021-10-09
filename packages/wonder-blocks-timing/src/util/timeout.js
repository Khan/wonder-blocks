// @flow
import {
    SchedulePolicy as SchedulePolicies,
    ClearPolicy as ClearPolicies,
} from "./policies.js";

import type {ITimeout, SchedulePolicy, ClearPolicy} from "./types.js";

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
    _timeoutId: ?TimeoutID;
    _action: () => mixed;
    _timeoutMs: number;

    /**
     * Creates a timeout that will invoke the given action after
     * the given period. The timeout does not start until set is called.
     *
     * @param {() => mixed} action The action to be invoked when the timeout
     * period has passed.
     * @param {number} timeoutMs The timeout period.
     * @param {SchedulePolicy} [schedulePolicy] When SchedulePolicy.Immediately,
     * the timer is set immediately on instantiation; otherwise, `set` must be
     * called to set the timeout.
     * Defaults to `SchedulePolicy.Immediately`.
     * @memberof Timeout
     */
    constructor(
        action: () => mixed,
        timeoutMs: number,
        schedulePolicy: SchedulePolicy = SchedulePolicies.Immediately,
    ) {
        if (typeof action !== "function") {
            throw new Error("Action must be a function");
        }

        if (timeoutMs < 0) {
            throw new Error("Timeout period must be >= 0");
        }

        this._action = action;
        this._timeoutMs = timeoutMs;

        if (schedulePolicy === SchedulePolicies.Immediately) {
            this.set();
        }
    }

    /**
     * Determine if the timeout is set or not.
     *
     * @returns {boolean} true if the timeout is set (aka pending), otherwise
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
            this.clear(ClearPolicies.Cancel);
        }
        this._timeoutId = setTimeout(
            () => this.clear(ClearPolicies.Resolve),
            this._timeoutMs,
        );
    }

    /**
     * Clear the set timeout.
     *
     * If the timeout is pending, this cancels that pending timeout without
     * invoking the action. If no timeout is pending, this does nothing.
     *
     * @param {ClearPolicy} [policy] When ClearPolicy.Resolve, if the request
     * was set when called, the request action is invoked after cancelling
     * the request; otherwise, the pending action is cancelled.
     * Defaults to `ClearPolicy.Cancel`.
     *
     * @returns {void}
     * @memberof Timeout
     */
    clear(policy: ClearPolicy = ClearPolicies.Cancel): void {
        const timeoutId = this._timeoutId;
        this._timeoutId = null;
        if (timeoutId == null) {
            return;
        }
        clearTimeout(timeoutId);
        if (policy === ClearPolicies.Resolve) {
            this._action();
        }
    }
}
