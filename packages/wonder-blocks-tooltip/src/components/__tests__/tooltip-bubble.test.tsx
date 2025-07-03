import * as React from "react";
import {render, screen} from "@testing-library/react";

import {View} from "@khanacademy/wonder-blocks-core";

import TooltipBubble from "../tooltip-bubble";
import TooltipContent from "../tooltip-content";

describe("TooltipBubble", () => {
    // A little helper method to make the actual test more readable.
    const makePopperProps = () =>
        ({
            placement: "top",
            tailOffset: {
                top: "0",
                left: "50",
                bottom: undefined,
                right: undefined,
                transform: "translate3d(50, 0, 0)",
            },
        }) as const;

    test("updates reference to bubble container", async () => {
        // Arrange
        // Get some props and set the ref to our assert, that way we assert
        // when the bubble component is mounted.
        const props = makePopperProps();

        // Do some casting to pretend this is `TooltipContent`. That way we are
        // isolating behaviors a bit more.
        const fakeContent = (
            <View id="content">Some content</View>
        ) as React.ReactElement<React.ComponentProps<typeof TooltipContent>>;

        // Act
        render(
            <View>
                <TooltipBubble
                    id="bubble"
                    placement={props.placement}
                    tailOffset={props.tailOffset}
                    updateBubbleRef={jest.fn()}
                    onActiveChanged={() => {}}
                >
                    {fakeContent}
                </TooltipBubble>
            </View>,
        );

        // Is the node a mounted element?
        const tooltip = await screen.findByRole("tooltip");

        /**
         * All we're doing is making sure we got called and verifying that we
         * got called with an element we expect.
         */
        // Assert
        // Did we apply our data attribute?
        expect(tooltip.getAttribute("data-placement")).toBe("top");

        // Did we render our content?
        expect(screen.getByText("Some content")).toBeInTheDocument();
    });
});
