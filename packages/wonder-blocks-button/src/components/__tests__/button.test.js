// @flow
import * as React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../button";

describe("Button", () => {
    const {location} = window;

    beforeAll(() => {
        delete window.location;
        window.location = {assign: jest.fn()};
    });

    afterAll(() => {
        window.location = location;
    });

    test("client-side navigation", () => {
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    });

    test("beforeNav rejection blocks client-side navigation", () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <Button href="/foo" beforeNav={(e) => Promise.reject()}>
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("beforeNav rejection blocks calling safeWithNav", () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <div>
                    <Button
                        href="/foo"
                        beforeNav={(e) => Promise.reject()}
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        expect(safeWithNavMock).not.toHaveBeenCalled();
    });

    test("beforeNav resolution results in client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <Button href="/foo" beforeNav={(e) => Promise.resolve()}>
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        waitFor(() => {
            expect(screen.getByText("Hello, world!")).toBeInTheDocument();
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
                        beforeNav={(e) => Promise.resolve()}
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        waitFor(() => {
            expect(safeWithNavMock).toHaveBeenCalled();
        });
    });

    test("show circular spinner before beforeNav resolves", () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <Button href="/foo" beforeNav={(e) => Promise.resolve()}>
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        // TODO(juan): Find a way to use a more accessible query.
        expect(screen.getByTestId("button-spinner")).toBeInTheDocument();
    });

    test("safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        render(
            <MemoryRouter>
                <div>
                    <Button
                        href="/foo"
                        safeWithNav={(e) => Promise.resolve()}
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        waitFor(() => {
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
                        safeWithNav={(e) => Promise.resolve()}
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        expect(screen.getByTestId("button-spinner")).toBeInTheDocument();
    });

    test("beforeNav resolution and safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        render(
            <MemoryRouter>
                <div>
                    <Button
                        href="/foo"
                        beforeNav={(e) => Promise.resolve()}
                        safeWithNav={(e) => Promise.resolve()}
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        waitFor(() => {
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
                        safeWithNav={(e) => Promise.reject()}
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
        const button = screen.getByRole("button");
        userEvent.click(button);

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
        const button = screen.getByRole("button");
        userEvent.click(button);

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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        waitFor(() => {
            expect(safeWithNavMock).toHaveBeenCalled();
        });
        waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    test("client-side navigation with unknown URL fails", () => {
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", () => {
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("disallow navigation when href and disabled are both set", () => {
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("don't call beforeNav when href and disabled are both set", () => {
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        expect(beforeNavMock).not.toHaveBeenCalled();
    });

    test("don't call safeWithNav when href and disabled are both set", () => {
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
        const button = screen.getByRole("button");
        userEvent.click(button);

        // Assert
        expect(safeWithNavMock).not.toHaveBeenCalled();
    });

    it("should set attribute on the underlying button", () => {
        // Arrange

        // Act
        render(
            <Button id="foo" onClick={() => {}}>
                Click me!
            </Button>,
        );

        // Assert
        expect(screen.getByRole("button")).toHaveAttribute("id", "foo");
    });

    it("should set attribute on the underlying link", () => {
        // Arrange

        // Act
        render(
            <Button id="foo" href="/bar">
                Click me!
            </Button>,
        );

        // Assert
        expect(screen.getByRole("button")).toHaveAttribute("href", "/bar");
    });

    describe("client-side navigation with keyboard", () => {
        it("should navigate on pressing the space key", () => {
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
            const button = screen.getByRole("button");
            userEvent.type(button, "{space}");

            // Assert
            expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        });

        it("should navigate on pressing the enter key", () => {
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
            const button = screen.getByRole("button");
            userEvent.type(button, "{enter}");

            // Assert
            expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        });

        test("beforeNav rejection blocks client-side navigation ", async () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <Button href="/foo" beforeNav={(e) => Promise.reject()}>
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
            const button = screen.getByRole("button");
            userEvent.type(button, "{enter}");

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });

        test("beforeNav resolution results in client-side navigation", async () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <Button
                            href="/foo"
                            beforeNav={(e) => Promise.resolve()}
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
            const button = screen.getByRole("button");
            userEvent.type(button, "{enter}");

            // Assert
            waitFor(() => {
                expect(screen.getByText("Hello, world!")).toBeInTheDocument();
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
                            safeWithNav={(e) => Promise.resolve()}
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
            const button = screen.getByRole("button");
            userEvent.type(button, "{enter}");

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
                            safeWithNav={(e) => Promise.reject()}
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
            const button = screen.getByRole("button");
            userEvent.type(button, "{enter}");

            // Assert
            waitFor(() => {
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
            const button = screen.getByRole("button");
            userEvent.type(button, "{enter}");

            // Assert
            waitFor(() => {
                expect(safeWithNavMock).toHaveBeenCalled();
            });
            waitFor(() => {
                expect(window.location.assign).toHaveBeenCalledWith("/foo");
            });
        });
    });

    describe("button focus", () => {
        test("primary button can have focus", async () => {
            // Arrange
            render(<Button testId={"button-focus-test"}>Label</Button>);

            // Act
            const button = screen.getByTestId("button-focus-test");
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
            const button = screen.getByTestId("button-focus-test");
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
            const button = screen.getByTestId("button-focus-test");
            button.focus();

            // Assert
            expect(button).toHaveFocus();
        });
    });

    describe("type='submit'", () => {
        test("submit button within form via click", () => {
            // Arrange
            const submitFnMock = jest.fn();
            render(
                <form onSubmit={submitFnMock}>
                    <Button type="submit">Click me!</Button>
                </form>,
            );

            // Act
            const button = screen.getByRole("button");
            userEvent.click(button);

            // Assert
            expect(submitFnMock).toHaveBeenCalled();
        });

        test("submit button within form via keyboard", () => {
            // Arrange
            const submitFnMock = jest.fn();
            render(
                <form onSubmit={submitFnMock}>
                    <Button type="submit">Click me!</Button>
                </form>,
            );

            // Act
            const button = screen.getByRole("button");
            userEvent.type(button, "{enter}");

            // Assert
            expect(submitFnMock).toHaveBeenCalled();
        });

        test("submit button doesn't break if it's not in a form", () => {
            // Arrange
            render(<Button type="submit">Click me!</Button>);

            // Act
            expect(() => {
                // Assert
                userEvent.click(screen.getByRole("button"));
            }).not.toThrow();
        });
    });
});
