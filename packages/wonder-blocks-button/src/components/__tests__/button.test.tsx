import * as React from "react";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import Button from "../button";

describe("Button", () => {
    const {location} = window;

    beforeAll(() => {
        // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
        delete window.location;
        // @ts-expect-error [FEI-5019] - TS2740 - Type '{ assign: Mock<any, any, any>; }' is missing the following properties from type 'Location': ancestorOrigins, hash, host, hostname, and 8 more.
        window.location = {assign: jest.fn()};
    });

    afterAll(() => {
        window.location = location;
    });

    test("client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button href="/foo">Click me!</Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(await screen.findByText("Hello, world!")).toBeInTheDocument();
    });

    test("beforeNav rejection blocks client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button href="/foo" beforeNav={() => Promise.reject()}>
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("beforeNav rejection blocks calling safeWithNav", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button
                            href="/foo"
                            beforeNav={() => Promise.reject()}
                            safeWithNav={safeWithNavMock}
                        >
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(safeWithNavMock).not.toHaveBeenCalled();
    });

    test("beforeNav resolution results in client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button href="/foo" beforeNav={() => Promise.resolve()}>
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        await waitFor(async () => {
            expect(
                await screen.findByText("Hello, world!"),
            ).toBeInTheDocument();
        });
    });

    test("beforeNav resolution results in safeWithNav being called", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
                            safeWithNav={safeWithNavMock}
                        >
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        await waitFor(() => {
            expect(safeWithNavMock).toHaveBeenCalled();
        });
    });

    // Unfortunately we can't test the spinner here after upgrading to
    // user-event v14 as the render happens before we're aable to check on the
    // state of the spinner.
    test.skip("show circular spinner before beforeNav resolves", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button href="/foo" beforeNav={() => Promise.resolve()}>
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        // TODO(juan): Find a way to use a more accessible query.
        expect(await screen.findByTestId("button-spinner")).toBeInTheDocument();
    });

    test("safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button
                            href="/foo"
                            safeWithNav={() => Promise.resolve()}
                            skipClientNav={true}
                        >
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        await waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    test("safeWithNav with skipClientNav=true shows spinner", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button
                            href="/foo"
                            safeWithNav={() => Promise.resolve()}
                            skipClientNav={true}
                        >
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(await screen.findByTestId("button-spinner")).toBeInTheDocument();
    });

    test("beforeNav resolution and safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
                            safeWithNav={() => Promise.resolve()}
                            skipClientNav={true}
                        >
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        await waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    test("safeWithNav with skipClientNav=true waits for promise rejection", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button
                            href="/foo"
                            safeWithNav={() => Promise.reject()}
                            skipClientNav={true}
                        >
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    test("safeWithNav with skipClientNav=false calls safeWithNav but doesn't wait to navigate", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <CompatRouter>
                    <Button
                        href="/foo"
                        safeWithNav={safeWithNavMock}
                        skipClientNav={false}
                    >
                        Click me!
                    </Button>
                    <Routes>
                        <Route
                            path="/foo"
                            element={<div id="foo">Hello, world!</div>}
                        />
                    </Routes>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(safeWithNavMock).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    test("safeWithNav with beforeNav resolution and skipClientNav=false calls safeWithNav but doesn't wait to navigate", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Button
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
                            safeWithNav={safeWithNavMock}
                            skipClientNav={false}
                        >
                            Click me!
                        </Button>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        await waitFor(() => {
            expect(safeWithNavMock).toHaveBeenCalled();
        });
        await waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    describe("client-side navigation with keyboard", () => {
        it("should navigate on pressing the space key", async () => {
            // Arrange
            render(
                <MemoryRouter>
                    <CompatRouter>
                        <div>
                            <Button href="/foo">Click me!</Button>
                            <Routes>
                                <Route
                                    path="/foo"
                                    element={<div id="foo">Hello, world!</div>}
                                />
                            </Routes>
                        </div>
                    </CompatRouter>
                </MemoryRouter>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{space}");

            // Assert
            expect(
                await screen.findByText("Hello, world!"),
            ).toBeInTheDocument();
        });

        it("should navigate on pressing the enter key", async () => {
            // Arrange
            render(
                <MemoryRouter>
                    <CompatRouter>
                        <div>
                            <Button href="/foo">Click me!</Button>
                            <Routes>
                                <Route
                                    path="/foo"
                                    element={<div id="foo">Hello, world!</div>}
                                />
                            </Routes>
                        </div>
                    </CompatRouter>
                </MemoryRouter>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{enter}");

            // Assert
            expect(
                await screen.findByText("Hello, world!"),
            ).toBeInTheDocument();
        });

        test("beforeNav rejection blocks client-side navigation ", async () => {
            // Arrange
            render(
                <MemoryRouter>
                    <CompatRouter>
                        <div>
                            <Button
                                href="/foo"
                                beforeNav={() => Promise.reject()}
                            >
                                Click me!
                            </Button>
                            <Routes>
                                <Route
                                    path="/foo"
                                    element={<div id="foo">Hello, world!</div>}
                                />
                            </Routes>
                        </div>
                    </CompatRouter>
                </MemoryRouter>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{enter}");

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });

        test("beforeNav resolution results in client-side navigation", async () => {
            // Arrange
            render(
                <MemoryRouter>
                    <CompatRouter>
                        <div>
                            <Button
                                href="/foo"
                                beforeNav={() => Promise.resolve()}
                            >
                                Click me!
                            </Button>
                            <Routes>
                                <Route
                                    path="/foo"
                                    element={<div id="foo">Hello, world!</div>}
                                />
                            </Routes>
                        </div>
                    </CompatRouter>
                </MemoryRouter>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{enter}");

            // Assert
            await waitFor(async () => {
                expect(
                    await screen.findByText("Hello, world!"),
                ).toBeInTheDocument();
            });
        });

        test("safeWithNav with skipClientNav=true waits for promise resolution", async () => {
            // Arrange
            jest.spyOn(window.location, "assign");
            render(
                <MemoryRouter>
                    <CompatRouter>
                        <div>
                            <Button
                                href="/foo"
                                safeWithNav={() => Promise.resolve()}
                                skipClientNav={true}
                            >
                                Click me!
                            </Button>
                            <Routes>
                                <Route
                                    path="/foo"
                                    element={<div id="foo">Hello, world!</div>}
                                />
                            </Routes>
                        </div>
                    </CompatRouter>
                </MemoryRouter>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{enter}");

            // Assert
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });

        test("safeWithNav with skipClientNav=true waits for promise rejection", async () => {
            // Arrange
            jest.spyOn(window.location, "assign");
            render(
                <MemoryRouter>
                    <CompatRouter>
                        <div>
                            <Button
                                href="/foo"
                                safeWithNav={() => Promise.reject()}
                                skipClientNav={true}
                            >
                                Click me!
                            </Button>
                            <Routes>
                                <Route
                                    path="/foo"
                                    element={<div id="foo">Hello, world!</div>}
                                />
                            </Routes>
                        </div>
                    </CompatRouter>
                </MemoryRouter>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{enter}");

            // Assert
            await waitFor(() => {
                expect(window.location.assign).toHaveBeenCalledWith("/foo");
            });
        });

        test("safeWithNav with skipClientNav=false calls safeWithNav but doesn't wait to navigate", async () => {
            // Arrange
            jest.spyOn(window.location, "assign");
            const safeWithNavMock = jest.fn();
            render(
                <MemoryRouter>
                    <CompatRouter>
                        <div>
                            <Button
                                href="/foo"
                                safeWithNav={safeWithNavMock}
                                skipClientNav={false}
                            >
                                Click me!
                            </Button>
                            <Routes>
                                <Route
                                    path="/foo"
                                    element={<div id="foo">Hello, world!</div>}
                                />
                            </Routes>
                        </div>
                    </CompatRouter>
                </MemoryRouter>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{enter}");

            // Assert
            await waitFor(() => {
                expect(safeWithNavMock).toHaveBeenCalled();
            });
            await waitFor(() => {
                expect(window.location.assign).toHaveBeenCalledWith("/foo");
            });
        });
    });
});
