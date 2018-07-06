// @flow
import * as React from "react";

import SuppressionTracker from "../util/suppression-tracker.js";
import {
    TooltipAppearanceDelay,
    TooltipDisappearanceDelay,
} from "../util/constants.js";
import TooltipPortalMounter from "./tooltip-portal-mounter.js";

import type {ICanBeSuppressed} from "../util/types.js";

type Props = {|
    /** A render function to render a `TooltipPortalMounter`. */
    children: (
        active: boolean,
        showInstantly: boolean,
    ) => React.Element<typeof TooltipPortalMounter>,

    /**
     * Whether this specific coordinator's child is to be active or not.
     * The parent TooltipAnchor should set this. The coordinator will then
     * coordinate with other coordinators to make sure the correct tooltip
     * is active.
     */
    active: boolean,
|};

type State = {
    /** Should the coordinator attempt to represent an active state? */
    active: boolean,

    /**
     * Should the coordinator tell its children to render instantly versus
     * animating their appearance?
     */
    instant: boolean,
};

const TRACKER = new SuppressionTracker(
    TooltipAppearanceDelay,
    TooltipDisappearanceDelay,
);

/**
 * This component coordinates all the tooltips to ensure:
 *    1. Only one is visible at any time
 *    2. The appropriate delay occurs before making a tooltip active
 */
export default class TooltipCoordinator extends React.Component<Props, State>
    implements ICanBeSuppressed {
    state = {
        active: false,
        instant: false,
    };

    componentDidMount() {
        // First time we appear.
        // Let's update our tracking, but only if active is true, otherwise
        // we'll be trying to untrack something that isn't even getting tracked
        // in the first place.
        if (this.props.active) {
            this._updateTracking();
        }
    }

    componentDidUpdate(prevProps: Props) {
        // If our active prop has changed, we need to update our tracking in
        // the main arbiter.
        if (this.props.active !== prevProps.active) {
            setTimeout(() => this._updateTracking(), 0);
        }
    }

    _updateTracking() {
        if (this.props.active) {
            TRACKER.track(this);
        } else {
            TRACKER.untrack(this);
        }
    }

    suppress = (instantly: boolean) => {
        if (this.state.active) {
            this.setState({active: false, instant: instantly});
        }
    };

    unsuppress = (instantly: boolean) => {
        if (!this.state.active) {
            this.setState({active: true, instant: instantly});
        }
    };

    render() {
        return this.props.children(this.state.active, this.state.instant);
    }
}
