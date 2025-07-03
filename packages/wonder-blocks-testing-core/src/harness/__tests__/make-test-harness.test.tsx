import * as React from "react";
import {Route} from "react-router-dom";
import {render} from "@testing-library/react";

import * as RA from "../adapt";
import {makeTestHarness} from "../make-test-harness";
import {DefaultConfigs, DefaultAdapters} from "../adapters/adapters";

describe("#makeTestHarness", () => {
    it("should return a function", () => {
        // Arrange

        // Act
        const result = makeTestHarness(DefaultAdapters, DefaultConfigs);

        // Assert
        expect(result).toBeFunction();
    });

    describe("returned function", () => {
        describe("returned component", () => {
            it("should have displayName generated from component displayName", () => {
                // Arrange
                const testHarness = makeTestHarness(
                    DefaultAdapters,
                    DefaultConfigs,
                );
                const Component = () => <div>test</div>;
                Component.displayName = "MyNamedComponent";

                // Act
                const {displayName: result} = testHarness(Component);

                // Assert
                expect(result).toBe("testHarness(MyNamedComponent)");
            });

            it("should have displayName generated from component name in absence of displayName", () => {
                // Arrange
                const testHarness = makeTestHarness(
                    DefaultAdapters,
                    DefaultConfigs,
                );
                const Component = function MyFunctionNamedComponent() {
                    return <div>test</div>;
                };

                // Act
                const {displayName: result} = testHarness(Component);

                // Assert
                expect(result).toBe("testHarness(MyFunctionNamedComponent)");
            });

            it("should have default displayName in absence of displayName or name", () => {
                // Arrange
                const testHarness = makeTestHarness(
                    DefaultAdapters,
                    DefaultConfigs,
                );
                const Component = () => <div>test</div>;

                // Act
                const {displayName: result} = testHarness(Component);

                // Assert
                expect(result).toBe("testHarness(Component)");
            });

            describe("if config is omitted", () => {
                it("should render with defaults", () => {
                    // Arrange
                    const testHarness = makeTestHarness(
                        DefaultAdapters,
                        DefaultConfigs,
                    );
                    const Component = () => <div>test</div>;
                    const renderSpy = jest.spyOn(RA, "Adapt");

                    // Act
                    const HarnessedComponent = testHarness(Component);
                    render(<HarnessedComponent />);

                    // Assert
                    expect(renderSpy).toHaveBeenCalledWith(
                        {
                            adapters: DefaultAdapters,
                            configs: DefaultConfigs,
                            children: expect.anything(),
                        },
                        {},
                    );
                });

                it("should render harnessed component", () => {
                    // Arrange
                    const testHarness = makeTestHarness(
                        DefaultAdapters,
                        DefaultConfigs,
                    );
                    const Component = (props: {text: string}) => (
                        <div>{props.text}</div>
                    );

                    // Act
                    const HarnessedComponent = testHarness(Component, {
                        // Need to provide a key as this a snapshot test that will
                        // break because of MemoryRouter using random keys
                        // otherwise. Could also use `forceStatic` to avoid this.
                        router: {location: {pathname: "/", key: "root"}},
                    });
                    const {container} = render(
                        <HarnessedComponent text="Test!" />,
                    );

                    // Assert
                    expect(container).toMatchInlineSnapshot(`
                        <div>
                          <div>
                            Test!
                          </div>
                        </div>
                    `);
                });
            });

            describe("if config overrides a default", () => {
                it("should render with updated config", () => {
                    // Arrange
                    const testHarness = makeTestHarness(
                        DefaultAdapters,
                        DefaultConfigs,
                    );
                    const configOverrides: Partial<typeof DefaultConfigs> = {
                        router: "/mysecretplace",
                    };
                    const Component = () => <div>test</div>;
                    const renderSpy = jest.spyOn(RA, "Adapt");

                    // Act
                    const HarnessedComponent = testHarness(
                        Component,
                        configOverrides,
                    );
                    render(<HarnessedComponent />);

                    // Assert
                    expect(renderSpy).toHaveBeenCalledWith(
                        {
                            adapters: DefaultAdapters,
                            configs: {
                                ...DefaultConfigs,
                                router: configOverrides.router,
                            },
                            children: expect.anything(),
                        },
                        {},
                    );
                });

                it("should render harnessed component", () => {
                    // Arrange
                    const testHarness = makeTestHarness(
                        DefaultAdapters,
                        DefaultConfigs,
                    );
                    const configOverrides: Partial<typeof DefaultConfigs> = {
                        router: "/mysecretplace/test",
                    };
                    // Render a route match that only works if we render our
                    // overridden location.
                    const Component = (props: {text: string}) => (
                        <Route path="/mysecretplace/*">{props.text}</Route>
                    );

                    // Act
                    const HarnessedComponent = testHarness(
                        Component,
                        configOverrides,
                    );
                    const {container} = render(
                        <HarnessedComponent text="Test!" />,
                    );

                    // Assert
                    expect(container).toMatchInlineSnapshot(`
                        <div>
                          Test!
                        </div>
                    `);
                });
            });
        });
    });
});
