import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";

import {View} from "@khanacademy/wonder-blocks-core";

import TooltipBubble from "../tooltip-bubble";
import TooltipContent from "../tooltip-content";

// Do some casting to pretend this is `TooltipContent`. That way we are
// isolating behaviors a bit more.
const fakeContent = (
    <View id="content">Some content</View>
) as React.ReactElement<React.ComponentProps<typeof TooltipContent>>;

describe("TooltipBubble", () => {
    it("should render the content as a tooltip", async () => {
        // Arrange

        // Act
        render(
            <TooltipBubble id="bubble" onActiveChanged={() => {}}>
                {fakeContent}
            </TooltipBubble>,
        );

        // Assert
        expect(await screen.findByRole("tooltip")).toHaveTextContent(
            "Some content",
        );
    });

    it("should set the id on the tooltip element", async () => {
        // Arrange

        // Act
        render(
            <TooltipBubble id="bubble" onActiveChanged={() => {}}>
                {fakeContent}
            </TooltipBubble>,
        );

        // Assert
        expect(await screen.findByRole("tooltip")).toHaveAttribute(
            "id",
            "bubble",
        );
    });

    it("should report the bubble as active when hovered", async () => {
        // Arrange
        const onActiveChanged = jest.fn();
        render(
            <TooltipBubble id="bubble" onActiveChanged={onActiveChanged}>
                {fakeContent}
            </TooltipBubble>,
        );

        // Act
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseEnter(await screen.findByRole("tooltip"));

        // Assert
        expect(onActiveChanged).toHaveBeenCalledWith(true);
    });

    it("should report the bubble as inactive when unhovered", async () => {
        // Arrange
        const onActiveChanged = jest.fn();
        render(
            <TooltipBubble id="bubble" onActiveChanged={onActiveChanged}>
                {fakeContent}
            </TooltipBubble>,
        );
        const tooltip = await screen.findByRole("tooltip");
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseEnter(tooltip);

        // Act
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseLeave(tooltip);

        // Assert
        expect(onActiveChanged).toHaveBeenLastCalledWith(false);
    });
});
