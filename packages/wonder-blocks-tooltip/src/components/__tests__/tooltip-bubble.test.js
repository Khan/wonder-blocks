// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";
import "jest-enzyme"; // eslint-disable-line import/no-unassigned-import

import {View} from "@khanacademy/wonder-blocks-core";

import TooltipBubble from "../tooltip-bubble.js";
import typeof TooltipContent from "../tooltip-content.js";

const sleep = (duration = 0) =>
    new Promise((resolve, reject) => setTimeout(resolve, duration));

describe("TooltipBubble", () => {
    // A little helper method to make the actual test more readable.
    const makePopperProps = () => ({
        placement: "top",
        tailOffset: {
            top: "0",
            left: "50",
            bottom: undefined,
            right: undefined,
            transform: "translate3d(50, 0, 0)",
        },
    });

    test("updates reference to bubble container", async () => {
        // Arrange
        const bubbleNode = await new Promise((resolve) => {
            // Get some props and set the ref to our assert, that way we assert
            // when the bubble component is mounted.
            const props = makePopperProps();

            // Do some casting to pretend this is `TooltipContent`. That way
            // we are isolating behaviors a bit more.
            const fakeContent = (((
                <View id="content">Some content</View>
            ): any): React.Element<TooltipContent>);
            const nodes = (
                <View>
                    <TooltipBubble
                        id="bubble"
                        placement={props.placement}
                        tailOffset={props.tailOffset}
                        updateBubbleRef={resolve}
                        onActiveChanged={() => {}}
                    >
                        {fakeContent}
                    </TooltipBubble>
                </View>
            );

            // Act
            mount(nodes);
        });

        /**
         * All we're doing is making sure we got called and verifying that
         * we got called with an element we expect.
         */
        // Assert
        // Did we get a node?
        expect(bubbleNode).toBeDefined();

        // Is the node a mounted element?
        const realElement = ReactDOM.findDOMNode(bubbleNode);
        expect(realElement instanceof Element).toBeTruthy();

        // Keep flow happy...
        if (realElement instanceof Element) {
            // Did we apply our data attribute?
            expect(realElement.getAttribute("data-placement")).toBe("top");

            // Did we render our content?
            await sleep();
            const contentElement = document.getElementById("content");
            expect(contentElement).toBeDefined();
        }
    });
});
