// @flow
import * as React from "react";

import ActionSchedulerProvider from "./action-scheduler-provider.js";

import type {IScheduleActions, WithActionScheduler} from "../util/types.js";

/**
 * A higher order component that attaches the given component to an
 * `IScheduleActions` instance. Any actions scheduled will automatically be
 * cleared on unmount.
 *
 * @template TOwnProps The own props of the component being rendered, without
 * the additional action scheduler prop. To attach the additional prop to
 * these props use the `WithActionScheduler` type.
 */
function withActionScheduler<TOwnProps: {...}>(
    Component: React.AbstractComponent<WithActionScheduler<TOwnProps>>,
): React.AbstractComponent<TOwnProps> {
    return (props: TOwnProps): React.Node => (
        <ActionSchedulerProvider>
            {(schedule: IScheduleActions) => (
                <Component {...props} schedule={schedule} />
            )}
        </ActionSchedulerProvider>
    );
}

export default withActionScheduler;
