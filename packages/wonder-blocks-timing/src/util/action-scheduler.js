// @flow
import Timeout from "./timeout.js";
import Interval from "./interval.js";
import AnimationFrame from "./animation-frame.js";

import type {
    IAnimationFrame,
    IInterval,
    ITimeout,
    IScheduleActions,
    Options,
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

    timeout(action: () => mixed, period: number, options?: Options): ITimeout {
        if (this._disabled) {
            return ActionScheduler.NoopAction;
        }
        const timeout = new Timeout(action, period, options?.schedulePolicy);
        this._registeredActions.push(() => timeout.clear(options?.clearPolicy));
        return timeout;
    }

    interval(
        action: () => mixed,
        period: number,
        options?: Options,
    ): IInterval {
        if (this._disabled) {
            return ActionScheduler.NoopAction;
        }
        const interval = new Interval(action, period, options?.schedulePolicy);
        this._registeredActions.push(() =>
            interval.clear(options?.clearPolicy),
        );
        return interval;
    }

    animationFrame(
        action: (DOMHighResTimeStamp) => void,
        options?: Options,
    ): IAnimationFrame {
        if (this._disabled) {
            return ActionScheduler.NoopAction;
        }
        const animationFrame = new AnimationFrame(
            action,
            options?.schedulePolicy,
        );
        this._registeredActions.push(() =>
            animationFrame.clear(options?.clearPolicy),
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
