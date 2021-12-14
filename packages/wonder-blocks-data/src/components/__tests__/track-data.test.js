// @flow
import * as React from "react";
import {Server} from "@khanacademy/wonder-blocks-core";
import {mount, shallow} from "enzyme";
import "jest-enzyme"; // eslint-disable-line import/no-unassigned-import

import TrackData from "../track-data.js";
import {RequestTracker, TrackerContext} from "../../util/request-tracking.js";

describe("TrackData", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should throw if used when server-side mode is off", () => {
        // Arrange
        jest.spyOn(Server, "isServerSide").mockReturnValue(false);

        // Act
        const underTest = () => shallow(<TrackData>SOME CHILDREN</TrackData>);

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"This component is not for use during client-side rendering"`,
        );
    });

    it("should render children when server-side mode is on", () => {
        // Arrange
        jest.spyOn(Server, "isServerSide").mockReturnValue(true);

        // Act
        const result = shallow(<TrackData>SOME CHILDREN</TrackData>);

        // Assert
        expect(result).toHaveHTML("SOME CHILDREN");
    });

    it("should provide tracker function for tracking context", async () => {
        // Arrange
        jest.spyOn(Server, "isServerSide").mockReturnValue(true);

        // Act
        const result = await new Promise((resolve, reject) => {
            mount(
                <TrackData>
                    <TrackerContext.Consumer>
                        {(fn) => resolve(fn)}
                    </TrackerContext.Consumer>
                </TrackData>,
            );
        });

        // Assert
        expect(result).toBe(RequestTracker.Default.trackDataRequest);
    });
});
