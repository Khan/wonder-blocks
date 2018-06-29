// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";
import TooltipBubble from "./tooltip-bubble.js";
import TooltipContent from "./tooltip-content.js";

describe("TooltipBubble", () => {
    // A little helper method to make the actual test more readable.
    const makePopperProps = () => ({
        placement: "top",
        style: {
            position: "absolute",
            top: 0,
            left: 0,
        },
        ref: () => {},
        scheduleUpdate: () => {},
        arrowProps: {
            style: {
                left: 50,
                top: 0,
            },
            ref: () => {},
        },
        outOfBoundaries: false,
    });

    test("updates reference to bubble container", (done) => {
        // Arrange
        const arrangeAct = (assert) => {
            // Get some props and set the ref to our assert, that way we assert
            // when the bubble component is mounted.
            const popperProps = makePopperProps();
            popperProps.ref = assert;

            // Do some casting to pretend this is `TooltipContent`. That way
            // we are isolating behaviors a bit more.
            const fakeContent = (((
                <View id="content">Some content</View>
            ): any): React.Element<typeof TooltipContent>);
            const nodes = (
                <View>
                    <TooltipBubble popperProps={popperProps}>
                        {fakeContent}
                    </TooltipBubble>
                </View>
            );

            // Act
            mount(nodes);
        };

        const andAssert = (bubbleNode) => {
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
                const contentElement = realElement.firstElementChild;
                expect(
                    contentElement && contentElement.getAttribute("id"),
                ).toBe("content");
            }
            done();
        };

        arrangeAct(andAssert);
    });
});
