// @flow
import type {IAnimationFrame} from "./types.js";

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
    _animationFrameId: ?AnimationFrameID;
    _action: () => mixed;

    /**
     * Creates an animation frame request that will invoke the given action.
     * The request is not made until set is called.
     *
     * @param {() => mixed} action The action to be invoked.
     * @param {boolean} [autoSet] When true, the request is made immediately on
     * instanstiation; otherwise, `set` must be called to make the request.
     * Defaults to `false`.
     * @memberof AnimationFrame
     */
    constructor(action: () => mixed, autoSet?: boolean) {
        this._action = action;

        if (autoSet) {
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
            this.clear(false);
        }
        this._animationFrameId = requestAnimationFrame(() => this.clear(true));
    }

    /**
     * Clear the pending request.
     *
     * If the request is pending, this cancels that pending request without
     * invoking the action. If no request is pending, this does nothing.
     *
     * @param {boolean} [resolve] When true, if the request was pending when
     * called, the request action is invoked after cancelling the timeout.
     * Defaults to false.
     *
     * @returns {void}
     * @memberof AnimationFrame
     */
    clear(resolve?: boolean): void {
        const animationFrameId = this._animationFrameId;
        this._animationFrameId = null;
        if (animationFrameId == null) {
            return;
        }
        cancelAnimationFrame(animationFrameId);
        if (resolve) {
            this._action();
        }
    }
}
