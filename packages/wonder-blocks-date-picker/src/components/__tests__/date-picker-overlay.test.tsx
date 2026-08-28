import * as React from "react";
import {afterEach, describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";

import DatePickerOverlay from "../date-picker-overlay";

describe("DatePickerOverlay", () => {
    afterEach(() => {
        // The "does not render if we cannot find a host" test below mocks
        // `document.querySelector` to return null; without restoring it,
        // that mock leaks into later tests and makes every subsequent
        // DatePickerOverlay render bail out with `modalHost` missing.
        jest.restoreAllMocks();
    });

    it("renders the children if valid props are passed in", async () => {
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
        // Popper resolves its position asynchronously; findByText waits for
        // that pending update to flush (inside act()) before asserting.
        expect(
            await screen.findByText("overlay container"),
        ).toBeInTheDocument();
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

    it("renders the overlay with an aria-label for the calendar grid region", async () => {
        // Arrange
        const referenceElement = document.createElement("input");
        const calendarGridRegionAriaLabel = "Custom aria-label";

        // Act
        render(
            <DatePickerOverlay
                referenceElement={referenceElement}
                onClose={() => {}}
                calendarGridRegionAriaLabel={calendarGridRegionAriaLabel}
            >
                <div>overlay container</div>
            </DatePickerOverlay>,
        );

        // Assert
        const overlayContainer = await screen.findByRole("region");
        expect(overlayContainer).toHaveAttribute(
            "aria-label",
            calendarGridRegionAriaLabel,
        );
    });
});
