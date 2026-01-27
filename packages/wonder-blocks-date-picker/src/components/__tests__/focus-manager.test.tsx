import * as React from "react";
import {describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FocusManager from "../focus-manager";

describe("FocusManager", () => {
    it("moves focus into overlay when Tab is pressed on reference element", async () => {
        // Arrange
        const referenceElement = document.createElement("input");
        document.body.appendChild(referenceElement);
        referenceElement.focus();

        render(
            <FocusManager
                referenceElement={referenceElement}
                onEndFocused={() => {}}
            >
                <button>First Button</button>
                <button>Second Button</button>
            </FocusManager>,
        );

        // Act
        await userEvent.tab();

        // Assert
        expect(screen.getByText("First Button")).toHaveFocus();
    });

    it("allows Tab to proceed normally when overlay has no focusable elements", async () => {
        // Arrange
        const referenceElement = document.createElement("input");
        const nextElement = document.createElement("button");
        nextElement.textContent = "Next Element";
        document.body.appendChild(referenceElement);
        document.body.appendChild(nextElement);
        referenceElement.focus();

        render(
            <FocusManager
                referenceElement={referenceElement}
                onEndFocused={() => {}}
            >
                <div>No focusable content</div>
            </FocusManager>,
        );

        // Act
        await userEvent.tab();

        // Assert
        expect(nextElement).toHaveFocus();
    });

    it("moves focus through all focusable elements in overlay", async () => {
        // Arrange
        const referenceElement = document.createElement("input");
        document.body.appendChild(referenceElement);
        referenceElement.focus();

        render(
            <FocusManager
                referenceElement={referenceElement}
                onEndFocused={() => {}}
            >
                <button>First Button</button>
                <button>Second Button</button>
                <button>Third Button</button>
            </FocusManager>,
        );

        // Act
        await userEvent.tab();
        await userEvent.tab();

        // Assert
        expect(screen.getByText("Second Button")).toHaveFocus();
    });

    it("calls onEndFocused when tabbing past last element in overlay", async () => {
        // Arrange
        const referenceElement = document.createElement("input");
        document.body.appendChild(referenceElement);
        referenceElement.focus();

        const onEndFocused = jest.fn();

        render(
            <FocusManager
                referenceElement={referenceElement}
                onEndFocused={onEndFocused}
            >
                <button>Only Button</button>
            </FocusManager>,
        );

        // Act
        await userEvent.tab(); // Enter overlay
        await userEvent.tab(); // Exit overlay

        // Assert
        expect(onEndFocused).toHaveBeenCalledTimes(1);
    });

    it("moves focus to reference element when Shift+Tab is pressed on first focusable element", async () => {
        // Arrange
        const referenceElement = document.createElement("input");
        document.body.appendChild(referenceElement);
        referenceElement.focus();

        render(
            <FocusManager
                referenceElement={referenceElement}
                onStartFocused={() => {}}
            >
                <button>First Button</button>
                <button>Second Button</button>
            </FocusManager>,
        );

        // Act
        await userEvent.tab(); // Enter overlay
        await userEvent.tab({shift: true}); // Shift+Tab back

        // Assert
        expect(referenceElement).toHaveFocus();
    });

    it("calls onStartFocused when Shift+Tab is pressed from first element", async () => {
        // Arrange
        const referenceElement = document.createElement("input");
        document.body.appendChild(referenceElement);
        referenceElement.focus();

        const onStartFocused = jest.fn();

        render(
            <FocusManager
                referenceElement={referenceElement}
                onStartFocused={onStartFocused}
            >
                <button>First Button</button>
            </FocusManager>,
        );

        // Act
        await userEvent.tab(); // Enter overlay
        await userEvent.tab({shift: true}); // Shift+Tab back

        // Assert
        expect(onStartFocused).toHaveBeenCalledTimes(1);
    });
});
