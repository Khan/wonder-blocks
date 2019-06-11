// @flow
import Timeout from "./timeout.js";
import Interval from "./interval.js";
import AnimationFrame from "./animation-frame.js";

import type {
    IAnimationFrame,
    IInterval,
    ITimeout,
    IScheduleActions,
} from "./types.js";

/**
 * Implements the `IScheduleActions` API to provide timeout, interval, and
 * animation frame support. This is not intended for direct use, but instead
 * is to be used solely by the `ActionSchedulerProvider` to provide an
 * `IScheduleActions` instance.
 */
export default class ActionScheduler implements IScheduleActions {
    _registeredActions: Array<() => void> = [];

    timeout(
        action: () => mixed,
        period: number,
        autoSet?: boolean,
        resolveOnClear?: boolean,
    ): ITimeout {
        const timeout = new Timeout(action, period, autoSet);
        this._registeredActions.push(() => timeout.clear(resolveOnClear));
        return timeout;
    }

    interval(
        action: () => mixed,
        period: number,
        autoSet?: boolean,
        resolveOnClear?: boolean,
    ): IInterval {
        const interval = new Interval(action, period, autoSet);
        this._registeredActions.push(() => interval.clear(resolveOnClear));
        return interval;
    }

    animationFrame(
        action: () => void,
        autoSet?: boolean,
        resolveOnClear?: boolean,
    ): IAnimationFrame {
        const animationFrame = new AnimationFrame(action, autoSet);
        this._registeredActions.push(() =>
            animationFrame.clear(resolveOnClear),
        );
        return animationFrame;
    }

    clearAll(): void {
        const registered = [...this._registeredActions];
        this._registeredActions = [];
        registered.forEach((clearFn) => clearFn());
    }
}
