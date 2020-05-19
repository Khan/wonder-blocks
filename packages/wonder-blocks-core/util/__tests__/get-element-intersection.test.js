// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";
import enumerateScrollAncestors from "../enumerate-scroll-ancestors.js";
import getElementIntersection from "../get-element-intersection.js";

jest.mock("../enumerate-scroll-ancestors.js", () => jest.fn(() => []));

function rect(top, right, bottom, left) {
    return {top, right, bottom, left};
}

describe("getElementIntersection", () => {
    beforeEach(() => {
        // Flow doesn't like jest mocks $FlowFixMe
        enumerateScrollAncestors.mockClear();
        unmountAll();
    });

    test("element is null, returns unspecified intersection", () => {
        // Arrange
        const element = ((null: any): Element);

        // Act
        const result = getElementIntersection(element);

        // Assert
        expect(result).toMatchObject({horizontal: null, vertical: null});
    });

    describe("when bounds element is falsy", () => {
        test("element is not null, enumerates scroll ancestors", async () => {
            const ref = await new Promise((resolve) => {
                // Arrange
                const nodes = (
                    <div>
                        <div ref={resolve}>Test</div>
                    </div>
                );

                mount(nodes);
            });

            const element = (ReactDOM.findDOMNode(ref): any);

            // Act
            getElementIntersection(element);

            // Assert
            expect(enumerateScrollAncestors).toHaveBeenCalledWith(element);
        });

        test("no scroll ancestors, returns full intersection", async () => {
            const ref = await new Promise((resolve) => {
                // Arrange
                const nodes = (
                    <div>
                        <div ref={resolve}>Test</div>
                    </div>
                );

                mount(nodes);
            });
            const element = (ReactDOM.findDOMNode(ref): any);

            // Act
            const result = getElementIntersection(element);

            // Assert
            expect(result).toMatchObject({
                horizontal: "within",
                vertical: "within",
            });
        });

        test("element is within visible part of scroll ancestor, returns within", async () => {
            // Arrange
            // First, let's fake out some scroll parent.
            // Flow doesn't like jest mocks $FlowFixMe
            enumerateScrollAncestors.mockImplementation(() => [
                {
                    getBoundingClientRect: jest.fn(() => rect(0, 100, 100, 0)),
                    currentStyle: {
                        overflowX: "auto",
                        overflowY: "auto",
                    },
                },
            ]);
            const ref = await new Promise((resolve) => {
                const nodes = (
                    <div>
                        <div ref={resolve}>Test</div>
                    </div>
                );

                mount(nodes);
            });
            const element = (ReactDOM.findDOMNode(ref): any);
            element.getBoundingClientRect = jest.fn(() => rect(5, 90, 90, 5));

            // Act
            const result = getElementIntersection(element);

            // Assert
            expect(result).toMatchObject({
                horizontal: "within",
                vertical: "within",
            });
        });

        describe("element is before visible part of scroll ancestor, returns before", () => {
            test("horizontal", async () => {
                // Arrange
                // First, let's fake out some scroll parent.
                // Flow doesn't like jest mocks $FlowFixMe
                enumerateScrollAncestors.mockImplementation(() => [
                    {
                        getBoundingClientRect: jest.fn(() =>
                            rect(0, 100, 100, 0),
                        ),
                        currentStyle: {
                            overflowX: "auto",
                            overflowY: "auto",
                        },
                    },
                ]);
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <div>
                            <div ref={resolve}>Test</div>
                        </div>
                    );

                    mount(nodes);
                });
                const element = (ReactDOM.findDOMNode(ref): any);
                element.getBoundingClientRect = jest.fn(() =>
                    rect(5, -25, 90, -50),
                );

                // Act
                const result = getElementIntersection(element);

                // Assert
                expect(result).toMatchObject({
                    horizontal: "before",
                    vertical: "within",
                });
            });

            test("vertical", async () => {
                // Arrange
                // First, let's fake out some scroll parent.
                // Flow doesn't like jest mocks $FlowFixMe
                enumerateScrollAncestors.mockImplementation(() => [
                    {
                        getBoundingClientRect: jest.fn(() =>
                            rect(0, 100, 100, 0),
                        ),
                        currentStyle: {
                            overflowX: "auto",
                            overflowY: "auto",
                        },
                    },
                ]);
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <div>
                            <div ref={resolve}>Test</div>
                        </div>
                    );

                    mount(nodes);
                });
                const element = (ReactDOM.findDOMNode(ref): any);
                element.getBoundingClientRect = jest.fn(() =>
                    rect(-50, 90, -25, 5),
                );

                // Act
                const result = getElementIntersection(element);

                // Assert
                expect(result).toMatchObject({
                    horizontal: "within",
                    vertical: "before",
                });
            });
        });

        describe("element is after visible part of scroll ancestor, returns after", () => {
            test("horizontal", async () => {
                // Arrange
                // First, let's fake out some scroll parent.
                // Flow doesn't like jest mocks $FlowFixMe
                enumerateScrollAncestors.mockImplementation(() => [
                    {
                        getBoundingClientRect: jest.fn(() =>
                            rect(0, 100, 100, 0),
                        ),
                        currentStyle: {
                            overflowX: "auto",
                            overflowY: "auto",
                        },
                    },
                ]);
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <div>
                            <div ref={resolve}>Test</div>
                        </div>
                    );

                    mount(nodes);
                });
                const element = (ReactDOM.findDOMNode(ref): any);
                element.getBoundingClientRect = jest.fn(() =>
                    rect(5, 150, 90, 125),
                );

                // Act
                const result = getElementIntersection(element);

                // Assert
                expect(result).toMatchObject({
                    horizontal: "after",
                    vertical: "within",
                });
            });

            test("vertical", async () => {
                // Arrange
                // First, let's fake out some scroll parent.
                // Flow doesn't like jest mocks $FlowFixMe
                enumerateScrollAncestors.mockImplementation(() => [
                    {
                        getBoundingClientRect: jest.fn(() =>
                            rect(0, 100, 100, 0),
                        ),
                        currentStyle: {
                            overflowX: "auto",
                            overflowY: "auto",
                        },
                    },
                ]);
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <div>
                            <div ref={resolve}>Test</div>
                        </div>
                    );

                    mount(nodes);
                });
                const element = (ReactDOM.findDOMNode(ref): any);
                element.getBoundingClientRect = jest.fn(() =>
                    rect(125, 90, 150, 5),
                );

                // Act
                const result = getElementIntersection(element);

                // Assert
                expect(result).toMatchObject({
                    horizontal: "within",
                    vertical: "after",
                });
            });
        });

        test("element is before and after visible part of scroll ancestor, returns combination", async () => {
            // Arrange
            // First, let's fake out some scroll parent.
            // Flow doesn't like jest mocks $FlowFixMe
            enumerateScrollAncestors.mockImplementation(() => [
                {
                    getBoundingClientRect: jest.fn(() => rect(0, 100, 100, 0)),
                    currentStyle: {
                        overflowX: "auto",
                        overflowY: "auto",
                    },
                },
            ]);
            const ref = await new Promise((resolve) => {
                const nodes = (
                    <div>
                        <div ref={resolve}>Test</div>
                    </div>
                );

                mount(nodes);
            });
            const element = (ReactDOM.findDOMNode(ref): any);
            element.getBoundingClientRect = jest.fn(() =>
                rect(-50, 150, -25, 125),
            );

            // Act
            const result = getElementIntersection(element);

            // Assert
            expect(result).toMatchObject({
                horizontal: "after",
                vertical: "before",
            });
        });

        test("element is before or after, but parent overflow is visible, returns within", async () => {
            // Arrange
            // First, let's fake out some scroll parent.
            // Flow doesn't like jest mocks $FlowFixMe
            enumerateScrollAncestors.mockImplementation(() => [
                {
                    getBoundingClientRect: jest.fn(() => rect(0, 100, 100, 0)),
                    currentStyle: {
                        overflowX: "visible",
                        overflowY: "visible",
                    },
                },
            ]);
            const ref = await new Promise((resolve) => {
                const nodes = (
                    <div>
                        <div ref={resolve}>Test</div>
                    </div>
                );

                mount(nodes);
            });
            const element = (ReactDOM.findDOMNode(ref): any);
            element.getBoundingClientRect = jest.fn(() =>
                rect(-50, 150, -25, 125),
            );

            // Act
            const result = getElementIntersection(element);

            // Assert
            expect(result).toMatchObject({
                horizontal: "within",
                vertical: "within",
            });
        });

        test("multiple scroll ancestors, stops enumeration on first before/after", async () => {
            // Arrange
            // First, let's fake out some scroll parent.
            // Flow doesn't like jest mocks $FlowFixMe
            enumerateScrollAncestors.mockImplementation(() => [
                {
                    getBoundingClientRect: jest.fn(() => rect(0, 100, 100, 0)),
                    currentStyle: {
                        overflowX: "auto",
                        overflowY: "auto",
                    },
                },
                {
                    getBoundingClientRect: jest.fn(() => rect(50, 200, 250, 0)),
                    currentStyle: {
                        overflowX: "auto",
                        overflowY: "auto",
                    },
                },
                null,
            ]);
            const ref = await new Promise((resolve) => {
                const nodes = (
                    <div>
                        <div ref={resolve}>Test</div>
                    </div>
                );

                mount(nodes);
            });
            const element = (ReactDOM.findDOMNode(ref): any);
            element.getBoundingClientRect = jest.fn(() => rect(0, 25, 25, 0));

            // Act
            const underTest = () => getElementIntersection(element);

            // Assert
            expect(underTest).not.toThrow();
        });
    });

    describe("when bounds element is not falsy", () => {
        test("does not enumerate scroll ancestors", async () => {
            // Arrange
            const fakeParentElement = ({
                getBoundingClientRect: jest.fn(() => rect(0, 100, 100, 0)),
                currentStyle: {
                    overflowX: "auto",
                    overflowY: "auto",
                },
            }: any);
            const ref = await new Promise((resolve) => {
                const nodes = (
                    <div>
                        <div ref={resolve}>Test</div>
                    </div>
                );

                mount(nodes);
            });

            const element = (ReactDOM.findDOMNode(ref): any);

            // Act
            getElementIntersection(element, fakeParentElement);

            // Assert
            expect(enumerateScrollAncestors).not.toHaveBeenCalledWith(element);
        });
    });
});
