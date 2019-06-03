// @flow
import type {IInterval} from "./types.js";

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
     * @param {boolean} [autoSet] When true, the interval is activated
     * immediately on instanstiation; otherwise, `set` must be called to
     * activate the interval.
     * Defaults to `false`.
     * @memberof Interval
     */
    constructor(action: () => mixed, intervalMs: number, autoSet?: boolean) {
        this._action = action;
        this._intervalMs = intervalMs;

        if (autoSet) {
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
            this.clear(false);
        }
        this._intervalId = setInterval(
            () => this.clear(true),
            this._intervalMs,
        );
    }

    /**
     * Clear the active interval.
     *
     * If the interval is active, this cancels that interval. If no interval is
     * pending, this does nothing.
     *
     * @param {boolean} [resolve] When true, if the interval was active when
     * called, the interval action is invoked after cancellation. Defaults to
     * false.
     *
     * @returns {void}
     * @memberof Interval
     */
    clear(resolve?: boolean): void {
        const intervalId = this._intervalId;
        this._intervalId = null;
        if (intervalId == null) {
            return;
        }
        clearInterval(intervalId);
        if (resolve) {
            this._action();
        }
    }
}
