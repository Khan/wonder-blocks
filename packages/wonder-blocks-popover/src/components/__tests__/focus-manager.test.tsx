import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FocusManager from "../focus-manager";

describe("FocusManager", () => {
    it("should focus on the first focusable element inside the popover", async () => {
        // Arrange
        const externalNodes = (
            <div>
                <button>Open popover</button>
                <button>Next focusable element outside</button>
            </div>
        );
        render(externalNodes);

        // get the anchor reference to be able pass it to the FocusManager
        const anchorElementNode = screen.getByRole("button", {
            name: "Open popover",
        });

        render(
            <FocusManager anchorElement={anchorElementNode}>
                <div>
                    <button>first focusable element inside</button>
                    <button>second focusable element inside</button>
                    <button>third focusable element inside</button>
                </div>
            </FocusManager>,
        );

        // Act
        // focus on the previous element before the popover (anchor element)
        anchorElementNode.focus();
        // focus on the next focusable element
        userEvent.tab();

        const firstFocusableElementInside = screen.getByText(
            "first focusable element inside",
        );

        // Assert
        expect(firstFocusableElementInside).toHaveFocus();
    });

    it("should focus on the last focusable element inside the popover", async () => {
        // Arrange
        const externalNodes = (
            <div>
                <button>Open popover</button>
                <button>Next focusable element outside</button>
            </div>
        );
        render(externalNodes);

        // get the anchor reference to be able pass it to the FocusManager
        const anchorElementNode = screen.getByRole("button", {
            name: "Open popover",
        });

        render(
            <FocusManager anchorElement={anchorElementNode}>
                <div>
                    <button>first focusable element inside</button>
                    <button>second focusable element inside</button>
                    <button>third focusable element inside</button>
                </div>
            </FocusManager>,
        );

        // Act

        // find previous focusable element outside the popover
        const nextFocusableElementOutside = screen.getByRole("button", {
            name: "Next focusable element outside",
        });

        // focus on the next element after the popover
        nextFocusableElementOutside.focus();
        userEvent.tab({shift: true});

        const lastFocusableElementInside = screen.getByText(
            "third focusable element inside",
        );

        // Assert
        expect(lastFocusableElementInside).toHaveFocus();
    });

    it("should allow flowing the focus correctly", async () => {
        // Arrange
        const externalNodes = (
            <div>
                <button>Prev focusable element outside</button>
                <button>Open popover</button>
                <button>Next focusable element outside</button>
            </div>
        );
        render(externalNodes);

        // get the anchor reference to be able pass it to the FocusManager
        const anchorElementNode = screen.getByRole("button", {
            name: "Open popover",
        });

        render(
            <FocusManager anchorElement={anchorElementNode}>
                <div>
                    <button>first focusable element inside</button>
                </div>
            </FocusManager>,
        );

        // Act
        // 1. focus on the previous element before the popover
        userEvent.tab();

        // 2. focus on the anchor element
        userEvent.tab();

        // 3. focus on focusable element inside the popover
        userEvent.tab();

        // 4. focus on the next focusable element outside the popover (this will
        //    be the first focusable element outside the popover)
        userEvent.tab();

        // NOTE: At this point, the focus moves to the document body, so we need
        // to press tab again to move the focus to the next focusable element.
        userEvent.tab();

        // 5. Finally focus on the first element in the document
        userEvent.tab();

        // find previous focusable element outside the popover
        const prevFocusableElementOutside = screen.getByRole("button", {
            name: "Prev focusable element outside",
        });

        // Assert
        expect(prevFocusableElementOutside).toHaveFocus();
    });

    it("should disallow focusability on internal elements if the user focus out of the focus manager", async () => {
        // Arrange
        const externalNodes = (
            <div>
                <button>Prev focusable element outside</button>
                <button>Open popover</button>
                <button>Next focusable element outside</button>
            </div>
        );
        render(externalNodes);

        // get the anchor reference to be able pass it to the FocusManager
        const anchorElementNode = screen.getByRole("button", {
            name: "Open popover",
        });

        render(
            <FocusManager anchorElement={anchorElementNode}>
                <div>
                    <button>first focusable element inside</button>
                </div>
            </FocusManager>,
        );

        // Act
        // 1. focus on the previous element before the popover
        userEvent.tab();

        // 2. focus on the anchor element
        userEvent.tab();

        // 3. focus on focusable element inside the popover
        userEvent.tab();

        // 4. focus on the next focusable element outside the popover (this will
        //    be the first focusable element outside the popover)
        userEvent.tab();

        // The elements inside the focus manager should not be focusable anymore.
        const focusableElementInside = screen.getByRole("button", {
            name: "first focusable element inside",
        });

        // Assert
        expect(focusableElementInside).toHaveAttribute("tabIndex", "-1");
    });
});
