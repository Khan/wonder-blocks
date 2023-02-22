import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import {render} from "@testing-library/react";

import WithSSRPlaceholder from "../with-ssr-placeholder";
import {RenderStateRoot} from "../render-state-root";

describe("WithSSRPlaceholder", () => {
    describe("client-side rendering", () => {
        test("calls placeholder render first, then the actual content render", async () => {
            // Arrange
            const mockPlaceholder = jest.fn(() => null);
            await new Promise((resolve: any) => {
                const nodes = (
                    <WithSSRPlaceholder placeholder={mockPlaceholder}>
                        {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                        {() => {
                            resolve();
                            return null;
                        }}
                    </WithSSRPlaceholder>
                );

                // Act
                render(nodes);
            });

            // Assert
            // Our promise doesn't resolve until the children render, therefore
            // we don't get here until that and so if the placeholder has been
            // called, it must have been called first.
            expect(mockPlaceholder).toHaveBeenCalledTimes(1);
        });

        describe("nested", () => {
            test("in parent placeholder, calls placeholder", async () => {
                // Arrange
                const mockChildrenNotCalled = jest.fn(() => null);

                await new Promise((resolve: any) => {
                    const nestedPlaceholder = () => {
                        resolve();
                        return null;
                    };

                    const placeholder = () => (
                        <WithSSRPlaceholder placeholder={nestedPlaceholder}>
                            {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                            {mockChildrenNotCalled}
                        </WithSSRPlaceholder>
                    );

                    const nodes = (
                        <WithSSRPlaceholder placeholder={placeholder}>
                            {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                            {() => null}
                        </WithSSRPlaceholder>
                    );

                    // Act
                    render(nodes);
                });

                // Assert
                // Our promise doesn't resolve until the placeholder of our nested
                // WithSSRPlaceholder is rendered, therefore if we get here it means
                // that the test is doing what we'd expect.
                // In addition, if our code is working right, the children of the
                // nested placeholder should have been skipped.
                expect(mockChildrenNotCalled).not.toHaveBeenCalled();
            });

            test("in parent children, calls children render, skipping placeholder", async () => {
                // Arrange
                const mockPlaceholder = jest.fn(() => null);
                const mockPlaceholderNotCalled = jest.fn(() => null);
                await new Promise((resolve: any) => {
                    const nodes = (
                        <WithSSRPlaceholder placeholder={mockPlaceholder}>
                            {() => (
                                <WithSSRPlaceholder
                                    placeholder={mockPlaceholderNotCalled}
                                >
                                    {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                                    {() => {
                                        resolve();
                                        return null;
                                    }}
                                </WithSSRPlaceholder>
                            )}
                        </WithSSRPlaceholder>
                    );

                    // Act
                    render(nodes);
                });

                // Assert
                // Our promise doesn't resolve until the children of our nested WithSSRPlaceholder
                // are rendered, therefore we don't get here until that and so if the
                // parent placeholder has been called, it must have been called first.
                // In addition, if our code is working right, the placeholder of the
                // nested component should have been skipped.
                expect(mockPlaceholder).toHaveBeenCalledTimes(1);
                expect(mockPlaceholderNotCalled).not.toHaveBeenCalled();
            });
        });
    });

    describe("server-side rendering", () => {
        test("server-side rendering, calls placeholder render only", () => {
            // Arrange
            const mockChildren = jest.fn(() => null);
            const mockPlaceholder = jest.fn(() => null);

            const nodes = (
                <WithSSRPlaceholder placeholder={mockPlaceholder}>
                    {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                    {mockChildren}
                </WithSSRPlaceholder>
            );

            // Act
            ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            expect(mockPlaceholder).toHaveBeenCalledTimes(1);
            expect(mockChildren).toHaveBeenCalledTimes(0);
        });

        test("null placeholder returns null", () => {
            // Arrange
            const mockChildren = jest.fn(() => null);

            const nodes = (
                // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                <WithSSRPlaceholder placeholder={null}>
                    {mockChildren}
                </WithSSRPlaceholder>
            );

            // Act
            const result = ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            expect(result).toBe("");
            expect(mockChildren).toHaveBeenCalledTimes(0);
        });

        describe("nested", () => {
            test("in parent placeholder, renders as placeholder", () => {
                // Arrange
                const expectation = "CHILD PLACEHOLDER";
                const placeholder = (
                    // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                    <WithSSRPlaceholder placeholder={() => expectation}>
                        {() => "This won't render"}
                    </WithSSRPlaceholder>
                );

                const nodes = (
                    <WithSSRPlaceholder placeholder={() => placeholder}>
                        {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                        {() => "This won't render"}
                    </WithSSRPlaceholder>
                );

                // Act
                const result = ReactDOMServer.renderToStaticMarkup(nodes);

                // Assert
                expect(result).toBe(expectation);
            });

            test("in parent children, renders as null", () => {
                // Arrange
                const placeholder = (
                    // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                    <WithSSRPlaceholder placeholder={undefined}>
                        {() => "This won't render"}
                    </WithSSRPlaceholder>
                );

                const nodes = (
                    <WithSSRPlaceholder placeholder={() => placeholder}>
                        {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                        {() => "This won't render"}
                    </WithSSRPlaceholder>
                );

                // Act
                const result = ReactDOMServer.renderToStaticMarkup(nodes);

                // Assert
                expect(result).toBe("");
            });
        });
    });

    describe("inside a RenderStateRoot", () => {
        test("calls placeholder render first, then the actual content render", async () => {
            // Arrange
            const mockPlaceholder = jest.fn(() => null);
            await new Promise((resolve: any) => {
                const nodes = (
                    <RenderStateRoot>
                        <WithSSRPlaceholder placeholder={mockPlaceholder}>
                            {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                            {() => {
                                resolve();
                                return null;
                            }}
                        </WithSSRPlaceholder>
                    </RenderStateRoot>
                );

                // Act
                render(nodes);
            });

            // Assert
            // Our promise doesn't resolve until the children render, therefore
            // we don't get here until that and so if the placeholder has been
            // called, it must have been called first.
            expect(mockPlaceholder).toHaveBeenCalledTimes(1);
        });

        test("server-side rendering, calls placeholder render only", () => {
            // Arrange
            const mockChildren = jest.fn(() => null);
            const mockPlaceholder = jest.fn(() => null);

            const nodes = (
                <RenderStateRoot>
                    <WithSSRPlaceholder placeholder={mockPlaceholder}>
                        {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                        {mockChildren}
                    </WithSSRPlaceholder>
                </RenderStateRoot>
            );

            // Act
            ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            expect(mockPlaceholder).toHaveBeenCalledTimes(1);
            expect(mockChildren).toHaveBeenCalledTimes(0);
        });

        test("null placeholder returns null", () => {
            // Arrange
            const mockChildren = jest.fn(() => null);

            const nodes = (
                <RenderStateRoot>
                    {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                    <WithSSRPlaceholder placeholder={null}>
                        {mockChildren}
                    </WithSSRPlaceholder>
                </RenderStateRoot>
            );

            // Act
            const result = ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            expect(result).toBe("");
            expect(mockChildren).toHaveBeenCalledTimes(0);
        });
    });
});
