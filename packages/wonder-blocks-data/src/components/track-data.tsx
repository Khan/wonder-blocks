import * as React from "react";
import {Server} from "@khanacademy/wonder-blocks-core";

import {RequestTracker, TrackerContext} from "../util/request-tracking";

type TrackDataProps = {
    children: React.ReactNode;
};

/**
 * Component to enable data request tracking when server-side rendering.
 */
export default class TrackData extends React.Component<TrackDataProps> {
    render(): React.ReactNode {
        if (!Server.isServerSide()) {
            throw new Error(
                "This component is not for use during client-side rendering",
            );
        }
        return (
            <TrackerContext.Provider
                value={RequestTracker.Default.trackDataRequest}
            >
                {this.props.children}
            </TrackerContext.Provider>
        );
    }
}
