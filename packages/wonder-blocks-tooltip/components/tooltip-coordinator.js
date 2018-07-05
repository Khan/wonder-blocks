// @flow
/**
 * This component coordinates all the tooltips to ensure:
 *    1. Only one is visible at any time
 *    2. The appropriate delay occurs before making a tooltip active
 */
import * as React from "react";

import SuppressionTracker from "../util/suppression-tracker.js";
import {
    TooltipAppearanceDelay,
    TooltipDisappearanceDelay,
} from "../util/constants.js";
import TooltipPortalMounter from "./tooltip-portal-mounter.js";

import type {ICanBeSuppressed} from "../util/types.js";

type Props = {|
    // A render function to render a `TooltipPortalMounter`.
    children: (
        active: boolean,
        showInstantly: boolean,
    ) => React.Element<typeof TooltipPortalMounter>,

    // Whether this arbiter is expected to be active or not.
    // The parent TooltipAnchor should set this.
    active: boolean,
|};

type State = {
    // Should the arbiter attempt to represent an active state?
    active: boolean,

    // Should the arbiter tell its children to render instantly versus
    // animating their appearance?
    instant: boolean,
};

const ARBITER = new SuppressionTracker();

export default class TooltipArbiter extends React.Component<Props, State>
    implements ICanBeSuppressed {
    _stateChangeTimeoutId: ?number;
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
            this._updateTracking();
        }
    }

    _updateTracking() {
        if (this.props.active) {
            ARBITER.track(this);
        } else {
            ARBITER.untrack(this);
        }
    }

    _clearTimeout() {
        const timeoutID = this._stateChangeTimeoutId;
        this._stateChangeTimeoutId = null;
        if (timeoutID != null) {
            clearTimeout(timeoutID);
        }
    }

    suppress = (instantly: boolean) => {
        this._clearTimeout();

        if (this.state.active) {
            if (instantly) {
                this.setState({active: false, instant: true});
            } else {
                this._stateChangeTimeoutId = setTimeout(
                    () => this.setState({active: false, instant: false}),
                    TooltipDisappearanceDelay,
                );
            }
        }
    };

    unsuppress = (instantly: boolean) => {
        this._clearTimeout();

        if (!this.state.active) {
            if (instantly) {
                this.setState({active: true, instant: true});
            } else {
                this._stateChangeTimeoutId = setTimeout(
                    () => this.setState({active: true, instant: false}),
                    TooltipAppearanceDelay,
                );
            }
        }
    };

    render() {
        return this.props.children(this.state.active, this.state.instant);
    }
}
