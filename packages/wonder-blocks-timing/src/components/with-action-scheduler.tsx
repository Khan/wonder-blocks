import {Flow} from "flow-to-typescript-codemod";
import * as React from "react";

import ActionSchedulerProvider from "./action-scheduler-provider";

import type {
    IScheduleActions,
    WithActionSchedulerProps,
    WithActionScheduler,
} from "../util/types";

type WithoutActionScheduler<T> = Omit<T, "schedule">;

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
    Config extends WithActionSchedulerProps,
    Instance,
    Component extends Flow.AbstractComponent<
        WithActionScheduler<Config>,
        Instance
    >,
>(
    WrappedComponent: Component,
): Flow.AbstractComponent<
    WithoutActionScheduler<
        JSX.LibraryManagedAttributes<Component, React.ComponentProps<Component>>
    >,
    Instance
> {
    // @ts-expect-error [FEI-5019] - TS2709 - Cannot use namespace '_' as a type.
    return React.forwardRef<_, Instance>((props, ref) => (
        <ActionSchedulerProvider>
            {(schedule: IScheduleActions) => (
                <WrappedComponent {...props} ref={ref} schedule={schedule} />
            )}
        </ActionSchedulerProvider>
    ));
}
