import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import PopoverEventListener from "../popover-event-listener";
import PopoverContent from "../popover-content";

describe("PopoverKeypressListener", () => {
    // TODO(FEI-5533): Key press events aren't working correctly with
    // user-event v14. We need to investigate and fix this.
    it.skip("should call onClose if Escape is pressed", async () => {
        // Arrange
        const onCloseMock = jest.fn();

        render(<PopoverEventListener onClose={onCloseMock} />);

        // Act
        await userEvent.keyboard("{esc}");

        // Assert
        expect(onCloseMock).toHaveBeenCalled();
    });

    it("should call onClose if clicked outside content ref", async () => {
        // Arrange
        const onCloseMock = jest.fn();
        const contentRef: React.RefObject<PopoverContent> = React.createRef();

        const wrapper = render(
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
        // First click is ignored by PopoverEventListener
        // because it is triggered when opening the popover.
        await userEvent.click(wrapper.container);
        await userEvent.click(wrapper.container);

        // Assert
        expect(onCloseMock).toHaveBeenCalled();
    });

    it("should not call onClose if clicked inside content ref", async () => {
        // Arrange
        const onCloseMock = jest.fn();
        const contentRef: React.RefObject<PopoverContent> = React.createRef();

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
        const node = await screen.findByTestId("popover-content");

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
