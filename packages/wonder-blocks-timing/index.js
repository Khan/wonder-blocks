// @flow
import type {
    IAnimationFrame,
    IInterval,
    IScheduleActions,
    ITimeout,
    WithActionScheduler,
} from "./util/types.js";

export type {
    IAnimationFrame,
    IInterval,
    IScheduleActions,
    ITimeout,
    WithActionScheduler,
};

export {
    default as withActionScheduler,
} from "./components/with-action-scheduler.js";
