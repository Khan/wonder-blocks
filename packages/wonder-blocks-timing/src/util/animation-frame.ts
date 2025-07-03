import {SchedulePolicy, ClearPolicy} from "./policies";

import type {IAnimationFrame} from "./types";

/**
 * Encapsulates everything associated with calling requestAnimationFrame/
 * cancelAnimationFrame, and managing the lifecycle of that request, including
 * the ability to resolve or cancel a pending request action.
 *
 * @export
 * @class AnimationFrame
 * @implements {IAnimationFrame}
 */
export default class AnimationFrame implements IAnimationFrame {
    _animationFrameId: number | null | undefined;
    _action: (time: DOMHighResTimeStamp) => unknown;

    /**
     * Creates an animation frame request that will invoke the given action.
     * The request is not made until set is called.
     *
     * @param  action The action to be invoked.
     * @param [schedulePolicy] When SchedulePolicy.Immediately,
     * the interval is set immediately on instantiation; otherwise, `set` must be
     * called to set the interval.
     * Defaults to `SchedulePolicy.Immediately`.
     * @memberof AnimationFrame
     */
    constructor(
        action: (time: DOMHighResTimeStamp) => unknown,
        schedulePolicy: SchedulePolicy = SchedulePolicy.Immediately,
    ) {
        if (typeof action !== "function") {
            throw new Error("Action must be a function");
        }

        this._action = action;

        if (schedulePolicy === SchedulePolicy.Immediately) {
            this.set();
        }
    }

    /**
     * Determine if the request is pending or not.
     *
     * @returns {boolean} true if the request is pending, otherwise
     * false.
     * @memberof AnimationFrame
     */
    get isSet(): boolean {
        return this._animationFrameId != null;
    }

    /**
     * Make the animation frame request.
     *
     * If the request is pending, this cancels that pending request and
     * makes the request afresh. If the request is not pending, this
     * makes a new request.
     *
     * @memberof AnimationFrame
     */
    set(): void {
        if (this.isSet) {
            this.clear(ClearPolicy.Cancel);
        }
        this._animationFrameId = requestAnimationFrame((time) =>
            this.clear(ClearPolicy.Resolve, time),
        );
    }

    /**
     * Clear the pending request.
     *
     * If the request is pending, this cancels that pending request without
     * invoking the action. If no request is pending, this does nothing.
     *
     * @param [policy] When ClearPolicy.Resolve, if the request
     * was set when called, the request action is invoked after cancelling
     * the request; otherwise, the pending action is cancelled.
     * Defaults to `ClearPolicy.Cancel`.
     * @param [time] Timestamp to pass to the action when
     * ClearPolicy.Resolve is specified. Ignored when ClearPolicy.Cancel is
     * specified.
     *
     * @memberof AnimationFrame
     */
    clear(
        policy: ClearPolicy = ClearPolicy.Cancel,
        time?: DOMHighResTimeStamp,
    ): void {
        const animationFrameId = this._animationFrameId;
        this._animationFrameId = null;
        if (animationFrameId == null) {
            return;
        }
        cancelAnimationFrame(animationFrameId);
        if (policy === ClearPolicy.Resolve) {
            this._action(time || performance.now());
        }
    }
}
