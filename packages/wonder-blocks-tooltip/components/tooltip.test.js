// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import {View} from "@khanacademy/wonder-blocks-core";
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";

import {mount, unmountAll} from "../../../utils/testing/mount.js";
import Tooltip from "./tooltip.js";
import TooltipBubble from "./tooltip-bubble.js";
import TooltipContent from "./tooltip-content.js";

const mockIDENTIFIER = "mock-identifier";
jest.mock("./tooltip-bubble.js");
jest.mock("@khanacademy/wonder-blocks-core", () => {
    const Core = jest.requireActual("@khanacademy/wonder-blocks-core");
    // We want all of Core to be the regular thing except for UniqueIDProvider
    return {
        ...Core,
        UniqueIDProvider: (props) =>
            props.children({
                get: () => mockIDENTIFIER,
            }),
    };
});

describe("Tooltip", () => {
    beforeEach(() => {
        unmountAll();
        jest.clearAllMocks();
        jest.clearAllTimers();
        jest.useFakeTimers();
    });

    describe("content is a string, wraps in TooltipContent", () => {
        test("with title", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const nodes = (
                    <View>
                        <Tooltip id="tooltip" title="Title" content="Content">
                            <View ref={resolve}>Anchor</View>
                        </Tooltip>
                    </View>
                );
                mount(nodes);
            });
            const node = (ReactDOM.findDOMNode(ref): any);
            node && node.dispatchEvent(new FocusEvent("focusin"));
            jest.runOnlyPendingTimers();

            // Act
            // Flow doesn't like jest mocks $FlowFixMe
            const result = TooltipBubble.mock.instances[0].props["children"];

            // Assert
            expect(result).toMatchSnapshot(
                `Similar to <TooltipContent title="Title">Content</TooltipContent>`,
            );
        });

        test("without title", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const nodes = (
                    <View>
                        <Tooltip id="tooltip" content="Content">
                            <View ref={resolve}>Anchor</View>
                        </Tooltip>
                    </View>
                );
                mount(nodes);
            });
            const node = (ReactDOM.findDOMNode(ref): any);
            node && node.dispatchEvent(new FocusEvent("focusin"));
            jest.runOnlyPendingTimers();

            // Act
            // Flow doesn't like jest mocks $FlowFixMe
            const result = TooltipBubble.mock.instances[0].props["children"];

            // Assert
            expect(result).toMatchSnapshot(
                `Similar to <TooltipContent>Content</TooltipContent>`,
            );
        });
    });

    describe("content is TooltipContent", () => {
        test("with title, sets title of TooltipContent", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const content = (
                    <TooltipContent>
                        <HeadingSmall>Some custom content</HeadingSmall>
                    </TooltipContent>
                );
                const title = <HeadingSmall>Title</HeadingSmall>;
                const nodes = (
                    <View>
                        <Tooltip id="tooltip" title={title} content={content}>
                            <View ref={resolve}>Anchor</View>
                        </Tooltip>
                    </View>
                );
                mount(nodes);
            });
            const node = (ReactDOM.findDOMNode(ref): any);
            node && node.dispatchEvent(new KeyboardEvent("focusin"));
            jest.runOnlyPendingTimers();

            // Act
            // Flow doesn't like jest mocks $FlowFixMe
            const result = TooltipBubble.mock.instances[0].props["children"];

            // Assert
            expect(result.props["title"]).toMatchSnapshot(
                `Similar to <HeadingSmall>Title</HeadingSmall>`,
            );
            expect(result.props["children"]).toMatchSnapshot(
                `Similar to <HeadingSmall>Some custom content</HeadingSmall>`,
            );
        });

        test("with title, overrides title of TooltipContent", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const content = (
                    <TooltipContent title="Content title">
                        <Body>Some custom content</Body>
                    </TooltipContent>
                );
                const nodes = (
                    <View>
                        <Tooltip id="tooltip" title="Title" content={content}>
                            <View ref={resolve}>Anchor</View>
                        </Tooltip>
                    </View>
                );
                mount(nodes);
            });
            const node = (ReactDOM.findDOMNode(ref): any);
            node && node.dispatchEvent(new KeyboardEvent("focusin"));
            jest.runOnlyPendingTimers();

            // Act
            // Flow doesn't like jest mocks $FlowFixMe
            const result = TooltipBubble.mock.instances[0].props["children"];

            // Assert
            expect(result.props["title"]).toBe("Title");
            expect(result.props["children"]).toMatchSnapshot(
                `Similar to <Body>Some custom content</Body>`,
            );
        });

        test("without title, renders content as-is", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const content = (
                    <TooltipContent title="Content title">
                        <Body>Some custom content</Body>
                    </TooltipContent>
                );
                const nodes = (
                    <View>
                        <Tooltip id="tooltip" content={content}>
                            <View ref={resolve}>Anchor</View>
                        </Tooltip>
                    </View>
                );
                mount(nodes);
            });
            const node = (ReactDOM.findDOMNode(ref): any);
            node && node.dispatchEvent(new KeyboardEvent("focusin"));
            jest.runOnlyPendingTimers();

            // Act
            // Flow doesn't like jest mocks $FlowFixMe
            const result = TooltipBubble.mock.instances[0].props["children"];

            // Assert
            expect(result.props["title"]).toBe("Content title");
            expect(result.props["children"]).toMatchSnapshot(
                `<Body>Some custom content</Body>`,
            );
        });
    });

    describe("accessibility", () => {
        test("no id, sets identifier of TooltipBubble with UniqueIDProvider", async () => {
            // Arrange
            const ref = await new Promise((resolve) => {
                const nodes = (
                    <View>
                        <Tooltip content="Content">
                            <View ref={resolve}>Anchor</View>
                        </Tooltip>
                    </View>
                );
                mount(nodes);
            });
            const node = (ReactDOM.findDOMNode(ref): any);
            node && node.dispatchEvent(new KeyboardEvent("focusin"));
            jest.runOnlyPendingTimers();

            // Act
            // Flow doesn't like jest mocks $FlowFixMe
            const result = TooltipBubble.mock.instances[0].props["id"];

            // Assert
            expect(result).toBe(mockIDENTIFIER);
        });

        test("custom id, sets identifier of TooltipBubble", async () => {
            // Arrange
            const tooltipID = "tooltip-1";
            const ref = await new Promise((resolve) => {
                const nodes = (
                    <View>
                        <Tooltip id={tooltipID} title="Title" content="Content">
                            <View ref={resolve}>Anchor</View>
                        </Tooltip>
                    </View>
                );
                mount(nodes);
            });
            const node = (ReactDOM.findDOMNode(ref): any);
            node && node.dispatchEvent(new KeyboardEvent("focusin"));
            jest.runOnlyPendingTimers();

            // Act
            // Flow doesn't like jest mocks $FlowFixMe
            const result = TooltipBubble.mock.instances[0].props["id"];

            // Assert
            expect(result).toBe(tooltipID);
        });

        describe("text-only anchor", () => {
            test("wraps with element", async () => {
                // Arrange
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                Anchor
                            </Tooltip>
                        </View>
                    );
                    mount(nodes);
                });

                // Act
                const result = (ReactDOM.findDOMNode(ref): any);

                // Assert
                expect(result).toBeInstanceOf(HTMLSpanElement);
                expect(result.innerHTML).toBe("Anchor");
            });

            test("id provided, does not attach aria-describedby", async () => {
                // Arrange
                const tooltipID = "tooltip-2";
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <Tooltip
                                ref={resolve}
                                id={tooltipID}
                                content="Content"
                            >
                                Anchor
                            </Tooltip>
                        </View>
                    );
                    mount(nodes);
                });
                const node = (ReactDOM.findDOMNode(ref): any);

                // Act
                const result = node.getAttribute("aria-describedby");

                // Assert
                expect(result).toBeNull();
            });

            test("no id provided, attaches aria-describedby", async () => {
                // Arrange
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                Anchor
                            </Tooltip>
                        </View>
                    );
                    mount(nodes);
                });
                const node = (ReactDOM.findDOMNode(ref): any);

                // Act
                const result = node.getAttribute("aria-describedby");

                // Assert
                expect(result).toBe(mockIDENTIFIER);
            });
        });

        describe("element anchor", () => {
            test("does not wrap", async () => {
                // Arrange
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                {anchor}
                            </Tooltip>
                        </View>
                    );
                    mount(nodes);
                });

                // Act
                const result = (ReactDOM.findDOMNode(ref): any);

                // Assert
                expect(result).toBeInstanceOf(HTMLDivElement);
                expect(result.innerHTML).not.toBe("Anchor");
                expect(result.children[0].innerHTML).toBe("Anchor");
            });

            test("id provided, does not attach aria-describedby", async () => {
                // Arrange
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <Tooltip
                                id="tooltip-3"
                                ref={resolve}
                                content="Content"
                            >
                                {anchor}
                            </Tooltip>
                        </View>
                    );
                    mount(nodes);
                });
                const node = (ReactDOM.findDOMNode(ref): any);

                // Act
                const result = node.getAttribute("aria-describedby");

                // Assert
                expect(result).toBeNull();
            });

            test("no id provided, attaches aria-describedby", async () => {
                // Arrange
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                {anchor}
                            </Tooltip>
                        </View>
                    );
                    mount(nodes);
                });
                const node = (ReactDOM.findDOMNode(ref): any);

                // Act
                const result = node.getAttribute("aria-describedby");

                // Assert
                expect(result).toBe(mockIDENTIFIER);
            });
        });
    });
});
