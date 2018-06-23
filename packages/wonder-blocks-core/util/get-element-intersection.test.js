// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";
import enumerateScrollAncestors from "./enumerate-scroll-ancestors.js";
import getElementIntersection from "./get-element-intersection.js";

jest.mock("./enumerate-scroll-ancestors.js", () => jest.fn(() => []));

function rect(top, right, bottom, left) {
    return {top, right, bottom, left};
}

describe("getElementIntersection", () => {
    beforeEach(() => {
        // Flow doesn't like jest mocks $FlowFixMe
        enumerateScrollAncestors.mockClear();
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
        test("element is not null, enumerates scroll ancestors", (done) => {
            const arrange = (actAndAssert) => {
                // Arrange
                const nodes = (
                    <div>
                        <div ref={actAndAssert}>Test</div>
                    </div>
                );

                mount(nodes);
            };

            const actAndAssert = (node) => {
                const element = (ReactDOM.findDOMNode(node): any);

                // Act
                getElementIntersection(element);

                // Assert
                expect(enumerateScrollAncestors).toHaveBeenCalledWith(element);
                done();
            };

            arrange(actAndAssert);
        });

        test("no scroll ancestors, returns full intersection", (done) => {
            const arrange = (actAndAssert) => {
                // Arrange
                const nodes = (
                    <div>
                        <div ref={actAndAssert}>Test</div>
                    </div>
                );

                mount(nodes);
            };

            const actAndAssert = (node) => {
                const element = (ReactDOM.findDOMNode(node): any);

                // Act
                const result = getElementIntersection(element);

                // Assert
                expect(result).toMatchObject({
                    horizontal: "within",
                    vertical: "within",
                });
                done();
            };

            arrange(actAndAssert);
        });

        test("element is within visible part of scroll ancestor, returns within", (done) => {
            // Arrange
            // First, let's fake out some scroll parent.
            // Flow doesn't like jest mocks $FlowFixMe
            enumerateScrollAncestors.mockImplementation(() => [
                {getBoundingClientRect: jest.fn(() => rect(0, 100, 100, 0))},
            ]);
            const arrange = (actAndAssert) => {
                const nodes = (
                    <div>
                        <div ref={actAndAssert}>Test</div>
                    </div>
                );

                mount(nodes);
            };

            const actAndAssert = (node) => {
                const element = (ReactDOM.findDOMNode(node): any);
                element.getBoundingClientRect = jest.fn(() =>
                    rect(5, 90, 90, 5),
                );

                // Act
                const result = getElementIntersection(element);

                // Assert
                expect(result).toMatchObject({
                    horizontal: "within",
                    vertical: "within",
                });
                done();
            };

            arrange(actAndAssert);
        });

        describe("element is before visible part of scroll ancestor, returns before", () => {
            test("horizontal", (done) => {
                // Arrange
                // First, let's fake out some scroll parent.
                // Flow doesn't like jest mocks $FlowFixMe
                enumerateScrollAncestors.mockImplementation(() => [
                    {
                        getBoundingClientRect: jest.fn(() =>
                            rect(0, 100, 100, 0),
                        ),
                    },
                ]);
                const arrange = (actAndAssert) => {
                    const nodes = (
                        <div>
                            <div ref={actAndAssert}>Test</div>
                        </div>
                    );

                    mount(nodes);
                };

                const actAndAssert = (node) => {
                    const element = (ReactDOM.findDOMNode(node): any);
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
                    done();
                };

                arrange(actAndAssert);
            });

            test("vertical", (done) => {
                // Arrange
                // First, let's fake out some scroll parent.
                // Flow doesn't like jest mocks $FlowFixMe
                enumerateScrollAncestors.mockImplementation(() => [
                    {
                        getBoundingClientRect: jest.fn(() =>
                            rect(0, 100, 100, 0),
                        ),
                    },
                ]);
                const arrange = (actAndAssert) => {
                    const nodes = (
                        <div>
                            <div ref={actAndAssert}>Test</div>
                        </div>
                    );

                    mount(nodes);
                };

                const actAndAssert = (node) => {
                    const element = (ReactDOM.findDOMNode(node): any);
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
                    done();
                };

                arrange(actAndAssert);
            });
        });

        describe("element is after visible part of scroll ancestor, returns after", () => {
            test("horizontal", (done) => {
                // Arrange
                // First, let's fake out some scroll parent.
                // Flow doesn't like jest mocks $FlowFixMe
                enumerateScrollAncestors.mockImplementation(() => [
                    {
                        getBoundingClientRect: jest.fn(() =>
                            rect(0, 100, 100, 0),
                        ),
                    },
                ]);
                const arrange = (actAndAssert) => {
                    const nodes = (
                        <div>
                            <div ref={actAndAssert}>Test</div>
                        </div>
                    );

                    mount(nodes);
                };

                const actAndAssert = (node) => {
                    const element = (ReactDOM.findDOMNode(node): any);
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
                    done();
                };

                arrange(actAndAssert);
            });

            test("vertical", (done) => {
                // Arrange
                // First, let's fake out some scroll parent.
                // Flow doesn't like jest mocks $FlowFixMe
                enumerateScrollAncestors.mockImplementation(() => [
                    {
                        getBoundingClientRect: jest.fn(() =>
                            rect(0, 100, 100, 0),
                        ),
                    },
                ]);
                const arrange = (actAndAssert) => {
                    const nodes = (
                        <div>
                            <div ref={actAndAssert}>Test</div>
                        </div>
                    );

                    mount(nodes);
                };

                const actAndAssert = (node) => {
                    const element = (ReactDOM.findDOMNode(node): any);
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
                    done();
                };

                arrange(actAndAssert);
            });
        });

        test("element is before and after visible part of scroll ancestor, returns combination", (done) => {
            // Arrange
            // First, let's fake out some scroll parent.
            // Flow doesn't like jest mocks $FlowFixMe
            enumerateScrollAncestors.mockImplementation(() => [
                {getBoundingClientRect: jest.fn(() => rect(0, 100, 100, 0))},
            ]);
            const arrange = (actAndAssert) => {
                const nodes = (
                    <div>
                        <div ref={actAndAssert}>Test</div>
                    </div>
                );

                mount(nodes);
            };

            const actAndAssert = (node) => {
                const element = (ReactDOM.findDOMNode(node): any);
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
                done();
            };

            arrange(actAndAssert);
        });

        test("multiple scroll ancestors, stops enumeration on first before/after", (done) => {
            // Arrange
            // First, let's fake out some scroll parent.
            // Flow doesn't like jest mocks $FlowFixMe
            enumerateScrollAncestors.mockImplementation(() => [
                {getBoundingClientRect: jest.fn(() => rect(0, 100, 100, 0))},
                {getBoundingClientRect: jest.fn(() => rect(50, 200, 250, 0))},
                null,
            ]);
            const arrange = (actAndAssert) => {
                const nodes = (
                    <div>
                        <div ref={actAndAssert}>Test</div>
                    </div>
                );

                mount(nodes);
            };

            const actAndAssert = (node) => {
                const element = (ReactDOM.findDOMNode(node): any);
                element.getBoundingClientRect = jest.fn(() =>
                    rect(0, 25, 25, 0),
                );

                // Act
                const underTest = () => getElementIntersection(element);

                // Assert
                expect(underTest).not.toThrow();
                done();
            };

            arrange(actAndAssert);
        });
    });

    describe("when bounds element is not falsy", () => {
        test("does not enumerate scroll ancestors", (done) => {
            // Arrange
            const fakeParentElement = ({
                getBoundingClientRect: jest.fn(() => rect(0, 100, 100, 0)),
            }: any);
            const arrange = (actAndAssert) => {
                const nodes = (
                    <div>
                        <div ref={actAndAssert}>Test</div>
                    </div>
                );

                mount(nodes);
            };

            const actAndAssert = (node) => {
                const element = (ReactDOM.findDOMNode(node): any);

                // Act
                getElementIntersection(element, fakeParentElement);

                // Assert
                expect(enumerateScrollAncestors).not.toHaveBeenCalledWith(
                    element,
                );
                done();
            };

            arrange(actAndAssert);
        });
    });

    test("TODO", () => {});
});
