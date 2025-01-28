import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

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
        const anchorElementNode = await screen.findByRole("button", {
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
        // focus gets automatically moved to be on the first focusable element

        const firstFocusableElementInside = await screen.findByText(
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
        const anchorElementNode = await screen.findByRole("button", {
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
        const nextFocusableElementOutside = await screen.findByRole("button", {
            name: "Next focusable element outside",
        });

        // focus on the next element after the popover
        nextFocusableElementOutside.focus();
        await userEvent.tab({shift: true});

        const lastFocusableElementInside = await screen.findByText(
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
        const anchorElementNode = await screen.findByRole("button", {
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
        // 1. focus on the Open popover button, this opens the focus manager
        // and focuses the button inside the popover
        await userEvent.tab();

        // 2. we advance to the next focusable element outside the popover
        await userEvent.tab();

        // 3. we loop back around to the first focusable element outside the popover
        await userEvent.tab();

        // find previous focusable element outside the popover
        const prevFocusableElementOutside = await screen.findByRole("button", {
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
        const anchorElementNode = await screen.findByRole("button", {
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
        await userEvent.tab();

        // 2. focus on the anchor element
        await userEvent.tab();

        // 3. focus on focusable element inside the popover
        await userEvent.tab();

        // 4. focus on the next focusable element outside the popover (this will
        //    be the first focusable element outside the popover)
        await userEvent.tab();

        // The elements inside the focus manager should not be focusable anymore.
        const focusableElementInside = await screen.findByRole("button", {
            name: "first focusable element inside",
        });

        // Assert
        expect(focusableElementInside).toHaveAttribute("tabIndex", "-1");
    });

    it("changeFocusabilityInsidePopover(true) should keep the original tabindex when explicitly set to 0", async () => {
        // Arrange
        const externalNodes = (
            <div>
                <button>Open popover</button>
            </div>
        );
        render(externalNodes);

        // get the anchor reference to be able pass it to the FocusManager
        const anchorElementNode = await screen.findByRole("button", {
            name: "Open popover",
        });

        render(
            <FocusManager anchorElement={anchorElementNode}>
                <div>
                    <button tabIndex={0}>first focusable element inside</button>
                </div>
            </FocusManager>,
        );

        // Act
        // focus on the previous element before the popover (anchor element)
        anchorElementNode.focus();

        const firstFocusableElementInside = await screen.findByText(
            "first focusable element inside",
        );

        // Assert
        expect(firstFocusableElementInside).toHaveAttribute("tabIndex", "0");
    });

    it("changeFocusabilityInsidePopover(true) should keep the original tabindex when explicitly set to -1", async () => {
        // Arrange
        const externalNodes = (
            <div>
                <button>Open popover</button>
            </div>
        );
        render(externalNodes);

        // get the anchor reference to be able pass it to the FocusManager
        const anchorElementNode = await screen.findByRole("button", {
            name: "Open popover",
        });

        render(
            <FocusManager anchorElement={anchorElementNode}>
                <div>
                    <button tabIndex={-1}>
                        {"first focusable(...?) element inside"}
                    </button>
                </div>
            </FocusManager>,
        );

        // Act
        // focus on the previous element before the popover (anchor element)
        anchorElementNode.focus();

        const firstFocusableElementInside = await screen.findByText(
            "first focusable(...?) element inside",
        );

        // Assert
        expect(firstFocusableElementInside).toHaveAttribute("tabIndex", "-1");
    });

    it("changeFocusabilityInsidePopover(true) should add tabindex of 0 when not set", async () => {
        // Arrange
        const externalNodes = (
            <div>
                <button>Open popover</button>
            </div>
        );
        render(externalNodes);

        // get the anchor reference to be able pass it to the FocusManager
        const anchorElementNode = await screen.findByRole("button", {
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
        // focus on the previous element before the popover (anchor element)
        anchorElementNode.focus();

        const firstFocusableElementInside = await screen.findByText(
            "first focusable element inside",
        );

        // Assert
        expect(firstFocusableElementInside).toHaveAttribute("tabIndex", "0");
    });
});
