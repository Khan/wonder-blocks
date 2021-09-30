// @flow
import {
    SchedulePolicy as SchedulePolicies,
    ClearPolicy as ClearPolicies,
} from "./policies.js";

import type {IInterval, SchedulePolicy, ClearPolicy} from "./types.js";

/**
 * Encapsulates everything associated with calling setInterval/clearInterval,
 * and managing the lifecycle of that interval. This includes the ability to
 * cancel the interval, and knowing if the interval is active.
 *
 * @export
 * @class Interval
 * @implements {IInterval}
 */
export default class Interval implements IInterval {
    _intervalId: ?IntervalID;
    _action: () => mixed;
    _intervalMs: number;

    /**
     * Creates an interval that will invoke the given action after
     * the given period. The interval does not start until set is called.
     *
     * @param {() => mixed} action The action to be invoked each time the
     * interval period has passed.
     * @param {number} intervalMs The interval period.
     * @param {SchedulePolicy} [schedulePolicy] When SchedulePolicy.Immediately,
     * the interval is set immediately on instantiation; otherwise, `set` must be
     * called to set the interval.
     * Defaults to `SchedulePolicy.Immediately`.
     * @memberof Interval
     */
    constructor(
        action: () => mixed,
        intervalMs: number,
        schedulePolicy: SchedulePolicy = SchedulePolicies.Immediately,
    ) {
        if (typeof action !== "function") {
            throw new Error("Action must be a function");
        }

        if (intervalMs < 1) {
            throw new Error("Interval period must be >= 1");
        }

        this._action = action;
        this._intervalMs = intervalMs;

        if (schedulePolicy === SchedulePolicies.Immediately) {
            this.set();
        }
    }

    /**
     * Determine if the interval is active or not.
     *
     * @returns {boolean} true if the interval is active, otherwise false.
     * @memberof Interval
     */
    get isSet(): boolean {
        return this._intervalId != null;
    }

    /**
     * Activate the interval.
     *
     * If the interval is active, this cancels that interval and starts the
     * interval afresh. If the interval is not active, this starts it.
     *
     * @memberof Interval
     */
    set(): void {
        if (this.isSet) {
            this.clear(ClearPolicies.Cancel);
        }
        this._intervalId = setInterval(() => this._action(), this._intervalMs);
    }

    /**
     * Clear the active interval.
     *
     * If the interval is active, this cancels that interval. If no interval is
     * pending, this does nothing.
     *
     * @param {ClearPolicy} [policy] When ClearPolicy.Resolve, if the request
     * was set when called, the request action is invoked after cancelling
     * the request; otherwise, the pending action is cancelled.
     * Defaults to `ClearPolicy.Cancel`.
     *
     * @returns {void}
     * @memberof Interval
     */
    clear(policy: ClearPolicy = ClearPolicies.Cancel): void {
        const intervalId = this._intervalId;
        this._intervalId = null;
        if (intervalId == null) {
            return;
        }
        clearInterval(intervalId);
        if (policy === ClearPolicies.Resolve) {
            this._action();
        }
    }
}
