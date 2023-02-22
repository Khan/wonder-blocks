// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FocusManager from "../focus-manager";
import {findFocusableNodes} from "../../util/util";

describe("FocusManager", () => {
    it("should focus on the first focusable element inside the popover", async () => {
        // Arrange
        const ref = await new Promise((resolve) => {
            const nodes = (
                <div ref={resolve}>
                    <button>Open popover</button>
                    <button>Next focusable element outside</button>
                </div>
            );
            render(nodes);
        });
        const domNode = ((ReactDOM.findDOMNode(ref): any): HTMLElement);

        // mock focusable elements in document
        // eslint-disable-next-line testing-library/no-node-access
        global.document.querySelectorAll = jest
            .fn()
            .mockImplementation(() => findFocusableNodes(domNode));

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
        const ref = await new Promise((resolve) => {
            const nodes = (
                <div ref={resolve}>
                    <button>Open popover</button>
                    <button>Next focusable element outside</button>
                </div>
            );
            render(nodes);
        });
        const domNode = ((ReactDOM.findDOMNode(ref): any): HTMLElement);

        // mock focusable elements in document
        // eslint-disable-next-line testing-library/no-node-access
        global.document.querySelectorAll = jest
            .fn()
            .mockImplementation(() => findFocusableNodes(domNode));

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
});
