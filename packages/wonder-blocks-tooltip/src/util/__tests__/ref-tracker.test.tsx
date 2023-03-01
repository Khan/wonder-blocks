import * as React from "react";
import * as ReactDOM from "react-dom";
import {render} from "@testing-library/react";
import {View} from "@khanacademy/wonder-blocks-core";

import RefTracker from "../ref-tracker";

type CallbackFn = (arg1?: HTMLElement | null | undefined) => void;

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
            const targetFn = {} as CallbackFn;

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
                const ref = await new Promise((resolve: any) => {
                    const nodes = (
                        <View>
                            <View ref={resolve} />
                        </View>
                    );
                    render(nodes);
                });
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'unknown' is not assignable to parameter of type 'ReactInstance | null | undefined'.
                const domNode = ReactDOM.findDOMNode(ref);
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'unknown' is not assignable to parameter of type 'Element | Component<any, {}, any> | null | undefined'.
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
                const ref = await new Promise((resolve: any) => {
                    const nodes = (
                        <View>
                            <View ref={resolve} />
                        </View>
                    );
                    render(nodes);
                });

                // Act
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'unknown' is not assignable to parameter of type 'Element | Component<any, {}, any> | null | undefined'.
                const underTest = () => tracker.updateRef(ref);

                // Assert
                expect(underTest).not.toThrow();
            });

            test("real ref, targetFn callback, calls the targetFn", async () => {
                // Arrange
                const tracker = new RefTracker();
                const targetFn = jest.fn();
                tracker.setCallback(targetFn);

                const ref = await new Promise((resolve: any) => {
                    const nodes = (
                        <View>
                            <View ref={resolve} />
                        </View>
                    );
                    render(nodes);
                });
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'unknown' is not assignable to parameter of type 'ReactInstance | null | undefined'.
                const domNode = ReactDOM.findDOMNode(ref);

                // Act
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'unknown' is not assignable to parameter of type 'Element | Component<any, {}, any> | null | undefined'.
                tracker.updateRef(ref);

                // Assert
                expect(targetFn).toHaveBeenCalledWith(domNode);
            });

            test("same ref, targetFn callback, does not call targetFn", async () => {
                // Arrange
                const tracker = new RefTracker();
                const targetFn = jest.fn();
                tracker.setCallback(targetFn);

                const ref = await new Promise((resolve: any) => {
                    const nodes = (
                        <View>
                            <View ref={resolve} />
                        </View>
                    );
                    render(nodes);
                });
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'unknown' is not assignable to parameter of type 'Element | Component<any, {}, any> | null | undefined'.
                tracker.updateRef(ref);
                targetFn.mockClear();

                // Act
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'unknown' is not assignable to parameter of type 'Element | Component<any, {}, any> | null | undefined'.
                tracker.updateRef(ref);

                // Assert
                expect(targetFn).not.toHaveBeenCalled();
            });
        });
    });
});
