// @flow
import * as React from "react";
import ActionScheduler from "../util/action-scheduler.js";

import type {IScheduleActions} from "../util/types.js";

type Props = {|
    /**
     * A function that, when given an instance of `IScheduleActions` will
     * render a `React.Node`.
     */
    children: (IScheduleActions) => React.Node,
|};

/**
 * A provider component that passes our action scheduling API to its children
 * and ensures that all scheduled actions are cleared on unmount.
 *
 * ```jsx
 * <ActionSchedulerProvider>
 *     {schedule => this.renderThingThatNeedsTimers(schedule)}
 * </ActionSchedulerProvider>
 * ```
 */
export default class ActionSchedulerProvider extends React.Component<Props> {
    componentWillUnmount() {
        this._actionScheduler.disable();
    }

    _actionScheduler: ActionScheduler = new ActionScheduler();

    render(): React.Node {
        const {children} = this.props;
        return children(this._actionScheduler);
    }
}
