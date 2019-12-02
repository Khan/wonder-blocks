// @flow
import * as React from "react";
import {Server} from "@khanacademy/wonder-blocks-core";

import {TrackerContext, trackDataRequest} from "../util/request-tracking.js";

type TrackDataProps = {|
    children: React.Node,
|};

/**
 * Component to enable data request tracking when server-side rendering.
 */
export default class TrackData extends React.Component<TrackDataProps> {
    constructor(props: TrackDataProps) {
        super(props);

        if (!Server.isServerSide()) {
            throw new Error(
                "This component is not for use during client-side rendering",
            );
        }
    }

    render() {
        return (
            <TrackerContext.Provider value={trackDataRequest}>
                {this.props.children}
            </TrackerContext.Provider>
        );
    }
}
