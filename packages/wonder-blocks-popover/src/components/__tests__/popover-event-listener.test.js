// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import PopoverEventListener from "../popover-event-listener.js";
import PopoverContent from "../popover-content.js";

describe("PopoverKeypressListener", () => {
    it("should call onClose if Escape is pressed", () => {
        // Arrange
        const onCloseMock = jest.fn();

        render(<PopoverEventListener onClose={onCloseMock} />);

        // Act
        userEvent.keyboard("{esc}");

        // Assert
        expect(onCloseMock).toHaveBeenCalled();
    });

    it("should call onClose if clicked outside content ref", () => {
        // Arrange
        const onCloseMock = jest.fn();
        const contentRef = React.createRef();

        render(
            <View>
                <PopoverContent
                    ref={contentRef}
                    title="Title"
                    content="Content"
                />
                <PopoverEventListener
                    onClose={onCloseMock}
                    contentRef={contentRef}
                />
            </View>,
        );

        // Act
        const event = new MouseEvent("click", {view: window, bubbles: true});
        const node = document.body;
        if (node) {
            // First click is ignored by PopoverEventListener
            // because it is triggered when opening the popover.
            node.dispatchEvent(event);
            node.dispatchEvent(event);
        } else {
            // Signal that body was never found
            expect(node).not.toBe(null);
        }

        // Assert
        expect(onCloseMock).toHaveBeenCalled();
    });

    it("should not call onClose if clicked inside content ref", () => {
        // Arrange
        const onCloseMock = jest.fn();
        const contentRef = React.createRef();

        render(
            <View>
                <PopoverContent
                    ref={contentRef}
                    title="Title"
                    content="Content"
                    testId="popover-content"
                />
                <PopoverEventListener
                    onClose={onCloseMock}
                    contentRef={contentRef}
                />
            </View>,
        );

        // Act
        const event = new MouseEvent("click", {view: window, bubbles: true});
        const node = screen.getByTestId("popover-content");

        if (node) {
            // First click is ignored by PopoverEventListener
            // because it is triggered when opening the popover.
            node.dispatchEvent(event);
            node.dispatchEvent(event);
        } else {
            // Signal that PopoverContent was never found
            expect(node).not.toBe(null);
        }

        // Assert
        expect(onCloseMock).not.toHaveBeenCalled();
    });
});
