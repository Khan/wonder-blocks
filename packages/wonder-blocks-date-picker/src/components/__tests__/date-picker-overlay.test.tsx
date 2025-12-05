import * as React from "react";
import {describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";

import DatePickerOverlay from "../date-picker-overlay";

describe("DatePickerOverlay", () => {
    it("renders the children if valid props are passed in", () => {
        // Arrange
        const referenceElement = document.createElement("input");

        // Act
        render(
            <DatePickerOverlay
                referenceElement={referenceElement}
                onClose={() => {}}
            >
                <div>overlay container</div>
            </DatePickerOverlay>,
        );

        // Assert
        expect(screen.getByText("overlay container")).toBeInTheDocument();
    });

    it("does not render if the referenceElement is invalid", () => {
        // Arrange
        const referenceElement = null;

        // Act
        render(
            <DatePickerOverlay
                referenceElement={referenceElement}
                onClose={() => {}}
            >
                <div>overlay container</div>
            </DatePickerOverlay>,
        );

        // Assert
        expect(screen.queryByText("overlay container")).not.toBeInTheDocument();
    });

    it("does not render if we cannot find a host to attach the portal to", () => {
        // Arrange
        const referenceElement = document.createElement("input");

        // mock that the body does not exist (just for science)
        jest.spyOn(globalThis.document, "querySelector").mockReturnValue(null);

        // Act
        render(
            <DatePickerOverlay
                referenceElement={referenceElement}
                onClose={() => {}}
            >
                <div>overlay container</div>
            </DatePickerOverlay>,
        );

        // Assert
        expect(screen.queryByText("overlay container")).not.toBeInTheDocument();
    });
});
