// @flow
import * as React from "react";

import ActionSchedulerProvider from "./action-scheduler-provider.js";

import type {
    IScheduleActions,
    WithActionSchedulerProps,
    WithActionScheduler,
} from "../util/types.js";

type WithoutActionScheduler<T> = $Exact<$Diff<T, WithActionSchedulerProps>>;

/**
 * A higher order component that attaches the given component to an
 * `IScheduleActions` instance. Any actions scheduled will automatically be
 * cleared on unmount.
 *
 * @template TOwnProps The own props of the component being rendered, without
 * the additional action scheduler prop. To attach the additional prop to
 * these props use the `WithActionScheduler` type.
 */
export default function withActionScheduler<
    Config: {...},
    Component: React.ComponentType<WithActionScheduler<Config>>,
>(
    WrappedComponent: Component,
): React.ComponentType<WithoutActionScheduler<React.ElementConfig<Component>>> {
    return React.forwardRef((props, ref) => (
        <ActionSchedulerProvider>
            {(schedule: IScheduleActions) => (
                <WrappedComponent {...props} ref={ref} schedule={schedule} />
            )}
        </ActionSchedulerProvider>
    ));
}
