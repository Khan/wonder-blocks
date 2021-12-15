// @flow
import type {
    IAnimationFrame,
    IInterval,
    IScheduleActions,
    ITimeout,
    WithActionScheduler,
    WithActionSchedulerProps,
    WithoutActionScheduler,
} from "./util/types.js";

export type {
    IAnimationFrame,
    IInterval,
    IScheduleActions,
    ITimeout,
    WithActionScheduler,
    WithActionSchedulerProps,
    WithoutActionScheduler,
};

export {SchedulePolicy, ClearPolicy} from "./util/policies.js";
export {default as withActionScheduler} from "./components/with-action-scheduler.js";
export {useInterval} from "./hooks/use-interval.js";
export {useTimeout} from "./hooks/use-timeout.js";
export {useScheduledInterval} from "./hooks/use-scheduled-interval.js";
export {useScheduledTimeout} from "./hooks/use-scheduled-timeout.js";
