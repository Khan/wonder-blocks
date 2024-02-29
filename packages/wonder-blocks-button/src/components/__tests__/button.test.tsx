/**
 * Test for Wonder Blocks Button component.
 *
 * The test for buttons with icons are in a separate file
 * (button-with-icon.test.tsx) since this one is already too long.
 */
import * as React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";
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
                <div>
                    <Button href="/foo">Click me!</Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button href="/foo" beforeNav={() => Promise.reject()}>
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button
                        href="/foo"
                        beforeNav={() => Promise.reject()}
                        safeWithNav={safeWithNavMock}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button href="/foo" beforeNav={() => Promise.resolve()}>
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button
                        href="/foo"
                        beforeNav={() => Promise.resolve()}
                        safeWithNav={safeWithNavMock}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button href="/foo" beforeNav={() => Promise.resolve()}>
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button
                        href="/foo"
                        safeWithNav={() => Promise.resolve()}
                        skipClientNav={true}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button
                        href="/foo"
                        safeWithNav={() => Promise.resolve()}
                        skipClientNav={true}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button
                        href="/foo"
                        beforeNav={() => Promise.resolve()}
                        safeWithNav={() => Promise.resolve()}
                        skipClientNav={true}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button
                        href="/foo"
                        safeWithNav={() => Promise.reject()}
                        skipClientNav={true}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button
                        href="/foo"
                        safeWithNav={safeWithNavMock}
                        skipClientNav={false}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <Button
                        href="/foo"
                        beforeNav={() => Promise.resolve()}
                        safeWithNav={safeWithNavMock}
                        skipClientNav={false}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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

    test("client-side navigation with unknown URL fails", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <Button href="/unknown">Click me!</Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <Button href="/foo" skipClientNav>
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("disallow navigation when href and disabled are both set", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <Button href="/foo" disabled={true}>
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("don't call beforeNav when href and disabled are both set", async () => {
        // Arrange
        const beforeNavMock = jest.fn();
        render(
            <MemoryRouter>
                <div>
                    <Button
                        href="/foo"
                        disabled={true}
                        beforeNav={beforeNavMock}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(beforeNavMock).not.toHaveBeenCalled();
    });

    test("don't call safeWithNav when href and disabled are both set", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <div>
                    <Button
                        href="/foo"
                        disabled={true}
                        safeWithNav={safeWithNavMock}
                    >
                        Click me!
                    </Button>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(safeWithNavMock).not.toHaveBeenCalled();
    });

    it("should set attribute on the underlying button", async () => {
        // Arrange

        // Act
        render(
            <Button id="foo" onClick={() => {}}>
                Click me!
            </Button>,
        );

        // Assert
        expect(await screen.findByRole("button")).toHaveAttribute("id", "foo");
    });

    it("should set attribute on the underlying link", async () => {
        // Arrange

        // Act
        render(
            <Button id="foo" href="/bar">
                Click me!
            </Button>,
        );

        // Assert
        expect(await screen.findByRole("button")).toHaveAttribute(
            "href",
            "/bar",
        );
    });

    describe("client-side navigation with keyboard", () => {
        it("should navigate on pressing the space key", async () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <Button href="/foo">Click me!</Button>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
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
                    <div>
                        <Button href="/foo">Click me!</Button>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
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
                    <div>
                        <Button href="/foo" beforeNav={() => Promise.reject()}>
                            Click me!
                        </Button>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
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
                    <div>
                        <Button href="/foo" beforeNav={() => Promise.resolve()}>
                            Click me!
                        </Button>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
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
                    <div>
                        <Button
                            href="/foo"
                            safeWithNav={() => Promise.resolve()}
                            skipClientNav={true}
                        >
                            Click me!
                        </Button>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
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
                    <div>
                        <Button
                            href="/foo"
                            safeWithNav={() => Promise.reject()}
                            skipClientNav={true}
                        >
                            Click me!
                        </Button>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
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
                    <div>
                        <Button
                            href="/foo"
                            safeWithNav={safeWithNavMock}
                            skipClientNav={false}
                        >
                            Click me!
                        </Button>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
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

    describe("button focus", () => {
        test("primary button can have focus", async () => {
            // Arrange
            render(<Button testId={"button-focus-test"}>Label</Button>);

            // Act
            const button = await screen.findByTestId("button-focus-test");
            button.focus();

            // Assert
            expect(button).toHaveFocus();
        });

        test("primary button can have focus when disabled", async () => {
            // Arrange
            render(
                <Button disabled={true} testId={"button-focus-test"}>
                    Label
                </Button>,
            );

            // Act
            const button = await screen.findByTestId("button-focus-test");
            button.focus();

            // Assert
            expect(button).toHaveFocus();
        });

        test("tertiary button can have focus when disabled", async () => {
            // Arrange
            render(
                <Button
                    disabled={true}
                    testId={"button-focus-test"}
                    kind="tertiary"
                >
                    Label
                </Button>,
            );

            // Act
            const button = await screen.findByTestId("button-focus-test");
            button.focus();

            // Assert
            expect(button).toHaveFocus();
        });
    });

    describe("type='submit'", () => {
        test("submit button within form via click", async () => {
            // Arrange
            const submitFnMock = jest.fn();
            render(
                <form onSubmit={submitFnMock}>
                    <Button type="submit">Click me!</Button>
                </form>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.click(button);

            // Assert
            expect(submitFnMock).toHaveBeenCalled();
        });

        test("submit button within form via keyboard", async () => {
            // Arrange
            const submitFnMock = jest.fn();
            render(
                <form onSubmit={submitFnMock}>
                    <Button type="submit">Click me!</Button>
                </form>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{enter}");

            // Assert
            expect(submitFnMock).toHaveBeenCalled();
        });

        test("submit button doesn't break if it's not in a form", async () => {
            // Arrange
            render(<Button type="submit">Click me!</Button>);

            // Act
            expect(async () => {
                // Assert
                await userEvent.click(await screen.findByRole("button"));
            }).not.toThrow();
        });
    });
});
