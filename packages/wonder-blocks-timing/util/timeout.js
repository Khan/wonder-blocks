// @flow
import type {ITimeout} from "./types.js";

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
     * @param {boolean} [autoSet] When true, the timer is set immediately on
     * instanstiation; otherwise, `set` must be called to set the timeout.
     * Defaults to `true`.
     * @memberof Timeout
     */
    constructor(action: () => mixed, timeoutMs: number, autoSet?: boolean) {
        if (typeof action !== "function") {
            throw new Error("Action must be a function");
        }

        if (timeoutMs < 0) {
            throw new Error("Timeout period must be >= 0");
        }

        this._action = action;
        this._timeoutMs = timeoutMs;

        if (autoSet || autoSet == null) {
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
            this.clear(false);
        }
        this._timeoutId = setTimeout(() => this.clear(true), this._timeoutMs);
    }

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
     * @returns {void}
     * @memberof Timeout
     */
    clear(resolve?: boolean): void {
        const timeoutId = this._timeoutId;
        this._timeoutId = null;
        if (timeoutId == null) {
            return;
        }
        clearTimeout(timeoutId);
        if (resolve) {
            this._action();
        }
    }
}
