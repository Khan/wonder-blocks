import * as React from "react";
import {afterEach, describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";

import {
    WonderBlocksConfigProvider,
    defaultStringsEn,
} from "@khanacademy/wonder-blocks-config";

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

    it("renders the calendar grid region with a default aria-label", async () => {
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
        expect(
            await screen.findByRole("region", {name: "Date picker calendar"}),
        ).toBeInTheDocument();
    });

    it("uses the default aria-label when calendarGridRegionAriaLabel is an empty string", async () => {
        // Arrange
        const referenceElement = document.createElement("input");

        // Act
        render(
            <DatePickerOverlay
                referenceElement={referenceElement}
                onClose={() => {}}
                calendarGridRegionAriaLabel=""
            >
                <div>overlay container</div>
            </DatePickerOverlay>,
        );

        // Assert
        expect(
            await screen.findByRole("region", {name: "Date picker calendar"}),
        ).toBeInTheDocument();
    });

    it("uses the calendar grid region aria-label from the config provider", async () => {
        // Arrange
        const referenceElement = document.createElement("input");

        // Act
        render(
            <WonderBlocksConfigProvider
                i18n={{
                    strings: {
                        ...defaultStringsEn,
                        datePickerCalendar: "translated text",
                    },
                    locale: "es",
                }}
            >
                <DatePickerOverlay
                    referenceElement={referenceElement}
                    onClose={() => {}}
                >
                    <div>overlay container</div>
                </DatePickerOverlay>
            </WonderBlocksConfigProvider>,
        );

        // Assert
        expect(
            await screen.findByRole("region", {name: "translated text"}),
        ).toBeInTheDocument();
    });

    it("prefers the calendarGridRegionAriaLabel prop over the config provider", async () => {
        // Arrange
        const referenceElement = document.createElement("input");

        // Act
        render(
            <WonderBlocksConfigProvider
                i18n={{
                    strings: {
                        ...defaultStringsEn,
                        datePickerCalendar: "translated text",
                    },
                    locale: "es",
                }}
            >
                <DatePickerOverlay
                    referenceElement={referenceElement}
                    onClose={() => {}}
                    calendarGridRegionAriaLabel="overriding label"
                >
                    <div>overlay container</div>
                </DatePickerOverlay>
            </WonderBlocksConfigProvider>,
        );

        // Assert
        expect(
            await screen.findByRole("region", {name: "overriding label"}),
        ).toBeInTheDocument();
    });
});
