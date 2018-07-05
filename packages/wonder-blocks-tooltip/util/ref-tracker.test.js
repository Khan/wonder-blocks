// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";
import RefTracker from "./ref-tracker.js";

type CallbackFn = (?HTMLElement) => void;

describe("RefTracker", () => {
    describe("#setCallback", () => {
        test("called with falsy value, no throw", () => {
            // Arrange
            const tracker = new RefTracker();

            // Act
            const underTest = () => tracker.setCallback(null);

            // Assert
            expect(underTest).not.toThrow();
        });

        test("called with non-function, throws", () => {
            // Arrange
            const tracker = new RefTracker();
            const targetFn = (({}: any): CallbackFn);

            // Act
            const underTest = () => tracker.setCallback(targetFn);

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        describe("called with a function", () => {
            test("no prior call to updateRef, does not call targetFn", () => {
                // Arrange
                const tracker = new RefTracker();
                const targetFn = jest.fn();
                // Act
                tracker.setCallback(targetFn);

                // Assert
                expect(targetFn).not.toHaveBeenCalled();
            });

            test("prior updateRef call, target called with ref's node", () => {
                // Arrange
                const tracker = new RefTracker();
                const targetFn = jest.fn();
                const arrange = (actAssert) => {
                    const nodes = (
                        <View>
                            <View ref={actAssert} />
                        </View>
                    );
                    mount(nodes);
                };

                const actAndAssert = (ref) => {
                    const domNode = ReactDOM.findDOMNode(ref);
                    tracker.updateRef(ref);

                    // Act
                    tracker.setCallback(targetFn);

                    // Assert
                    expect(targetFn).toHaveBeenCalledWith(domNode);
                };

                arrange(actAndAssert);
            });
        });
    });

    describe("#updateRef", () => {
        describe("calling without setting a callback", () => {
            test("falsy ref, no throw", () => {
                // Arrange
                const tracker = new RefTracker();

                // Act
                const underTest = () => tracker.updateRef(null);

                // Assert
                expect(underTest).not.toThrow();
            });

            test("real ref, no callback, no throw", () => {
                // Arrange
                const tracker = new RefTracker();
                const arrange = (actAssert) => {
                    const nodes = (
                        <View>
                            <View ref={actAssert} />
                        </View>
                    );
                    mount(nodes);
                };

                const actAndAssert = (ref) => {
                    // Act
                    const underTest = () => tracker.updateRef(ref);

                    // Assert
                    expect(underTest).not.toThrow();
                };

                arrange(actAndAssert);
            });

            test("real ref, targetFn callback, calls the targetFn", () => {
                // Arrange
                const tracker = new RefTracker();
                const targetFn = jest.fn();
                tracker.setCallback(targetFn);

                const arrange = (actAssert) => {
                    const nodes = (
                        <View>
                            <View ref={actAssert} />
                        </View>
                    );
                    mount(nodes);
                };

                const actAndAssert = (ref) => {
                    const domNode = ReactDOM.findDOMNode(ref);

                    // Act
                    tracker.updateRef(ref);

                    // Assert
                    expect(targetFn).toHaveBeenCalledWith(domNode);
                };

                arrange(actAndAssert);
            });

            test("same ref, targetFn callback, does not call targetFn", () => {
                // Arrange
                const tracker = new RefTracker();
                const targetFn = jest.fn();
                tracker.setCallback(targetFn);

                const arrange = (actAssert) => {
                    const nodes = (
                        <View>
                            <View ref={actAssert} />
                        </View>
                    );
                    mount(nodes);
                };

                const actAndAssert = (ref) => {
                    tracker.updateRef(ref);
                    targetFn.mockClear();

                    // Act
                    tracker.updateRef(ref);

                    // Assert
                    expect(targetFn).not.toHaveBeenCalled();
                };

                arrange(actAndAssert);
            });
        });
    });
});
