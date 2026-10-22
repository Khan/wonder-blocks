import * as React from "react";
import {render, screen} from "@testing-library/react";

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
        render(<TooltipBubble id="bubble">{fakeContent}</TooltipBubble>);

        // Assert
        expect(await screen.findByRole("tooltip")).toHaveTextContent(
            "Some content",
        );
    });

    it("should set the id on the tooltip element", async () => {
        // Arrange

        // Act
        render(<TooltipBubble id="bubble">{fakeContent}</TooltipBubble>);

        // Assert
        expect(await screen.findByRole("tooltip")).toHaveAttribute(
            "id",
            "bubble",
        );
    });
});
