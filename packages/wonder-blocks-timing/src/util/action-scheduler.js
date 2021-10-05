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
    _disabled: boolean = false;
    _registeredActions: Array<() => void> = [];
    static +NoopAction: ITimeout & IAnimationFrame & IInterval = {
        set: () => {},
        get isSet() {
            return false;
        },
        clear: () => {},
    };

    timeout(
        action: () => mixed,
        period: number,
        autoSchedule?: boolean,
        resolveOnClear?: boolean,
    ): ITimeout {
        if (this._disabled) {
            return ActionScheduler.NoopAction;
        }
        const timeout = new Timeout(action, period, autoSchedule);
        this._registeredActions.push(() => timeout.clear(resolveOnClear));
        return timeout;
    }

    interval(
        action: () => mixed,
        period: number,
        autoSchedule?: boolean,
        resolveOnClear?: boolean,
    ): IInterval {
        if (this._disabled) {
            return ActionScheduler.NoopAction;
        }
        const interval = new Interval(action, period, autoSchedule);
        this._registeredActions.push(() => interval.clear(resolveOnClear));
        return interval;
    }

    animationFrame(
        action: (DOMHighResTimeStamp) => void,
        autoSchedule?: boolean,
        resolveOnClear?: boolean,
    ): IAnimationFrame {
        if (this._disabled) {
            return ActionScheduler.NoopAction;
        }
        const animationFrame = new AnimationFrame(action, autoSchedule);
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

    /**
     * Prevents this scheduler from creating any additional actions.
     * This also clears any pending actions.
     */
    disable(): void {
        this._disabled = true;
        this.clearAll();
    }
}
