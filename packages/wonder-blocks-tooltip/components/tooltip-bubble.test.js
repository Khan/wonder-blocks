// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";
import TooltipBubble from "./tooltip-bubble.js";
import TooltipContent from "./tooltip-content.js";

describe("TooltipBubble", () => {
    test("updates reference to bubble container", (done) => {
        // Arrange
        const arrangeAct = (assert) => {
            const popperProps = {
                placement: "top",
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                },
                ref: assert,
                scheduleUpdate: () => {},
                arrowProps: {
                    style: {
                        left: 50,
                        top: 0,
                    },
                    ref: () => {},
                },
                outOfBoundaries: false,
            };
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
            expect(bubbleNode).toBeDefined();

            const realElement = ReactDOM.findDOMNode(bubbleNode);
            expect(realElement instanceof Element).toBeTruthy();
            if (realElement instanceof Element) {
                expect(realElement.getAttribute("data-placement")).toBe("top");

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
