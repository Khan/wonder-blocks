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
export {useTimeout} from "./hooks/use-timeout.js";
