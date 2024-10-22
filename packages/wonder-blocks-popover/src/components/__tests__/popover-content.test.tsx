import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import PopoverContent from "../popover-content";
import PopoverContext from "../popover-context";

describe("PopoverContent", () => {
    it("should close the popover from the actions", async () => {
        // Arrange
        const onCloseMock = jest.fn();

        render(
            <PopoverContext.Provider
                value={{close: onCloseMock, placement: "left"}}
            >
                <PopoverContent
                    title="Title"
                    content="content"
                    actions={({close}: any) => (
                        <button onClick={close}>close popover</button>
                    )}
                />
            </PopoverContext.Provider>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(onCloseMock).toBeCalled();
    });

    it("should warn when setting a image and icon at the same time", async () => {
        // Arrange
        const nodes = (
            <PopoverContent
                title="illustration"
                content="content"
                image={<img src="/dummy-image.png" alt="popover" />}
                icon={<img src="/dummy-icon.png" alt="popover icon" />}
            />
        );

        // Act
        const underTest = () => render(nodes);

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"'image' and 'icon' cannot be used at the same time. You can fix this by either removing 'image' or 'icon' from your instance."`,
        );
    });

    it("should warn when setting a horizontal placement with an Illustration popover", async () => {
        // Arrange
        const nodes = (
            <PopoverContext.Provider
                value={{close: () => {}, placement: "left"}}
            >
                <PopoverContent
                    title="illustration"
                    content="content"
                    image={<img src="/dummy-image.png" alt="dummy" />}
                />
            </PopoverContext.Provider>
        );

        // Act
        const underTest = () => render(nodes);

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"'image' can only be vertically placed. You can fix this by either changing \`placement\` to \`top\` or \`bottom\` or removing the \`image\` prop inside \`content\`."`,
        );
    });
});
