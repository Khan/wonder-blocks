import type {
    IAnimationFrame,
    IInterval,
    IScheduleActions,
    ITimeout,
    WithActionScheduler,
    WithActionSchedulerProps,
    WithoutActionScheduler,
} from "./util/types";

export type {
    IAnimationFrame,
    IInterval,
    IScheduleActions,
    ITimeout,
    WithActionScheduler,
    WithActionSchedulerProps,
    WithoutActionScheduler,
};

export {SchedulePolicy, ClearPolicy} from "./util/policies";
export {default as ActionSchedulerProvider} from "./components/action-scheduler-provider";
export {default as withActionScheduler} from "./components/with-action-scheduler";
export {useInterval} from "./hooks/use-interval";
export {useTimeout} from "./hooks/use-timeout";
export {useScheduledInterval} from "./hooks/use-scheduled-interval";
export {useScheduledTimeout} from "./hooks/use-scheduled-timeout";
