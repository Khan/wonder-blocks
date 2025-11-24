import {describe, it} from "@jest/globals";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import FocusManager from "../focus-manager";

/**
 * Component that mocks a document inside a page
 */
const Document = () => (
    <div>
        <button data-testid="reference" />
        <button data-testid="next" />
    </div>
);

describe("FocusManager", () => {
    it("should focus on the first element inside the container", async () => {
        // Arrange
        render(<Document />);
        const referenceElement = await screen.findByTestId("reference");
        render(
            <FocusManager referenceElement={referenceElement}>
                <div>
                    <button data-testid="tab-1">tab 1</button>
                    <button data-text-id="tab-2">tab 2</button>
                </div>
            </FocusManager>,
        );

        // Act
        referenceElement.focus();
        await userEvent.tab();

        // Assert
        const firstFocusableElementInside = await screen.findByTestId("tab-1");
        expect(firstFocusableElementInside).toHaveFocus();
    });

    it("should focus on the last element inside the container", async () => {
        // Arrange
        render(<Document />);
        const referenceElement = await screen.findByTestId("reference");
        render(
            <FocusManager referenceElement={referenceElement}>
                <div>
                    <button data-testid="tab-1">tab 1</button>
                    <button data-testid="tab-2">tab 2</button>
                </div>
            </FocusManager>,
        );

        // Act
        const nextElementOutside = await screen.findByTestId("next");
        nextElementOutside.focus();
        await userEvent.tab({shift: true});

        // Assert
        const lastFocusableElementInside = await screen.findByTestId("tab-2");
        expect(lastFocusableElementInside).toHaveFocus();
    });

    it("should focus on the reference element", async () => {
        // Arrange
        render(<Document />);
        const referenceElement = await screen.findByTestId("reference");
        const onStartFocusedMock = jest.fn();
        render(
            <FocusManager
                referenceElement={referenceElement}
                onStartFocused={onStartFocusedMock}
            >
                <div>
                    <button data-testid="tab-1">tab 1</button>
                    <button data-testid="tab-2">tab 2</button>
                </div>
            </FocusManager>,
        );
        const firstSentinel = await screen.findByTestId("focus-sentinel-prev");

        // Act
        fireEvent.focus(firstSentinel);

        // Assert
        expect(referenceElement).toHaveFocus();
        // Also verify that onStartFocused is called (if set).
        expect(onStartFocusedMock).toHaveBeenCalled();
    });

    it("should focus on the next focusable element outside the container", async () => {
        // Arrange
        render(<Document />);
        const referenceElement = await screen.findByTestId("reference");
        const onEndFocusedMock = jest.fn();
        render(
            <FocusManager
                referenceElement={referenceElement}
                onEndFocused={onEndFocusedMock}
            >
                <div>
                    <button data-testid="tab-1">tab 1</button>
                    <button data-testid="tab-2">tab 2</button>
                </div>
            </FocusManager>,
        );
        const lastSentinel = await screen.findByTestId("focus-sentinel-next");

        // Act
        fireEvent.focus(lastSentinel);

        // Assert
        const nextElementOutside = await screen.findByTestId("next");
        expect(nextElementOutside).toHaveFocus();
        // Also verify that onEndFocused is called (if set).
        expect(onEndFocusedMock).toHaveBeenCalled();
    });

    it("should skip any disabled elements outside the container", async () => {
        // Arrange
        const Document = () => (
            <div>
                <button data-testid="reference" />
                {/* This input shouldn't be focusable */}
                <input disabled />
                <button data-testid="next" />
            </div>
        );
        render(<Document />);
        const referenceElement = await screen.findByTestId("reference");
        render(
            <FocusManager
                referenceElement={referenceElement}
                onEndFocused={jest.fn()}
            >
                <div>
                    <button data-testid="tab-1">tab 1</button>
                    <button data-testid="tab-2">tab 2</button>
                </div>
            </FocusManager>,
        );
        const lastSentinel = await screen.findByTestId("focus-sentinel-next");

        // Act
        fireEvent.focus(lastSentinel);

        // Assert
        const nextElementOutside = await screen.findByTestId("next");
        // Verify that the disabled element is skipped.
        expect(nextElementOutside).toHaveFocus();
    });
});
