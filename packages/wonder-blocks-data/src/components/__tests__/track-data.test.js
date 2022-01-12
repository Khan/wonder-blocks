// @flow
import * as React from "react";
import {Server} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";

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
        const underTest = () => render(<TrackData>SOME CHILDREN</TrackData>);

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"This component is not for use during client-side rendering"`,
        );
    });

    it("should render children when server-side mode is on", () => {
        // Arrange
        jest.spyOn(Server, "isServerSide").mockReturnValue(true);

        // Act
        render(<TrackData>SOME CHILDREN</TrackData>);
        const result = screen.getByText("SOME CHILDREN");

        // Assert
        expect(result).toBeInTheDocument();
    });

    it("should provide tracker function for tracking context", async () => {
        // Arrange
        jest.spyOn(Server, "isServerSide").mockReturnValue(true);

        // Act
        const result = await new Promise((resolve, reject) => {
            render(
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
