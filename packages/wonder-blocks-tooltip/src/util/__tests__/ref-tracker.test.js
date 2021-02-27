// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";

import RefTracker from "../ref-tracker.js";

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

            test("prior updateRef call, target called with ref's node", async () => {
                // Arrange
                const tracker = new RefTracker();
                const targetFn = jest.fn();
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <View ref={resolve} />
                        </View>
                    );
                    mount(nodes);
                });
                const domNode = ReactDOM.findDOMNode(ref);
                tracker.updateRef(ref);

                // Act
                tracker.setCallback(targetFn);

                // Assert
                expect(targetFn).toHaveBeenCalledWith(domNode);
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

            test("real ref, no callback, no throw", async () => {
                // Arrange
                const tracker = new RefTracker();
                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <View ref={resolve} />
                        </View>
                    );
                    mount(nodes);
                });

                // Act
                const underTest = () => tracker.updateRef(ref);

                // Assert
                expect(underTest).not.toThrow();
            });

            test("real ref, targetFn callback, calls the targetFn", async () => {
                // Arrange
                const tracker = new RefTracker();
                const targetFn = jest.fn();
                tracker.setCallback(targetFn);

                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <View ref={resolve} />
                        </View>
                    );
                    mount(nodes);
                });
                const domNode = ReactDOM.findDOMNode(ref);

                // Act
                tracker.updateRef(ref);

                // Assert
                expect(targetFn).toHaveBeenCalledWith(domNode);
            });

            test("same ref, targetFn callback, does not call targetFn", async () => {
                // Arrange
                const tracker = new RefTracker();
                const targetFn = jest.fn();
                tracker.setCallback(targetFn);

                const ref = await new Promise((resolve) => {
                    const nodes = (
                        <View>
                            <View ref={resolve} />
                        </View>
                    );
                    mount(nodes);
                });
                tracker.updateRef(ref);
                targetFn.mockClear();

                // Act
                tracker.updateRef(ref);

                // Assert
                expect(targetFn).not.toHaveBeenCalled();
            });
        });
    });
});
