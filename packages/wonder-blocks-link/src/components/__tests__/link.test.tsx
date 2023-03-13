import * as React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Color from "@khanacademy/wonder-blocks-color";

import Link from "../link";

describe("Link", () => {
    beforeEach(() => {
        // Note: window.location.assign needs a mock function in the testing
        // environment.
        // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
        delete window.location;
        // @ts-expect-error [FEI-5019] - TS2740 - Type '{ assign: Mock<any, any, any>; }' is missing the following properties from type 'Location': ancestorOrigins, hash, host, hostname, and 8 more.
        window.location = {assign: jest.fn()};
    });

    afterEach(() => {
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'mockClear' does not exist on type '(url: string | URL) => void'.
        window.location.assign.mockClear();
        jest.clearAllMocks();
    });

    describe("client-side navigation", () => {
        test("works for known URLs", () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <Link href="/foo">Click me!</Link>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        });

        test("navigation to without route does not render", () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <Link href="/unknown">Click me!</Link>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });

        test("waits until beforeNav resolves before navigating", () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <Link href="/foo" beforeNav={() => Promise.resolve()}>
                            Click me!
                        </Link>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });

        test("doesn't navigate before beforeNav resolves", () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <Link href="/foo" beforeNav={() => Promise.resolve()}>
                            Click me!
                        </Link>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });

        test("does not navigate if beforeNav rejects", () => {
            // Arrange
            render(
                <MemoryRouter>
                    <div>
                        <Link href="/foo" beforeNav={() => Promise.reject()}>
                            Click me!
                        </Link>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });

        test("runs safeWithNav if set", async () => {
            // Arrange
            const safeWithNavMock = jest.fn();
            render(
                <MemoryRouter>
                    <div>
                        <Link
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
                            safeWithNav={safeWithNavMock}
                        >
                            Click me!
                        </Link>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            await waitFor(() => {
                expect(safeWithNavMock).toHaveBeenCalled();
            });
        });

        test("doesn't run safeWithNav until beforeNav resolves", () => {
            // Arrange
            const safeWithNavMock = jest.fn();
            render(
                <MemoryRouter>
                    <div>
                        <Link
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
                            safeWithNav={safeWithNavMock}
                        >
                            Click me!
                        </Link>
                        <Switch>
                            <Route path="/foo">
                                <div id="foo">Hello, world!</div>
                            </Route>
                        </Switch>
                    </div>
                </MemoryRouter>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            expect(safeWithNavMock).not.toHaveBeenCalled();
        });
    });

    describe("full page load navigation", () => {
        test("doesn't redirect if safeWithNav hasn't resolved yet when skipClientNav=true", () => {
            // Arrange
            jest.spyOn(window.location, "assign").mockImplementation(() => {});
            render(
                <Link
                    href="/foo"
                    safeWithNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            expect(window.location.assign).not.toHaveBeenCalled();
        });

        test("redirects after safeWithNav resolves when skipClientNav=true", async () => {
            // Arrange
            jest.spyOn(window.location, "assign").mockImplementation(() => {});
            render(
                <Link
                    href="/foo"
                    safeWithNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            await waitFor(() => {
                expect(window.location.assign).toHaveBeenCalledWith("/foo");
            });
        });

        test("redirects after beforeNav and safeWithNav resolve when skipClientNav=true", async () => {
            // Arrange
            jest.spyOn(window.location, "assign").mockImplementation(() => {});
            render(
                <Link
                    href="/foo"
                    beforeNav={() => Promise.resolve()}
                    safeWithNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            await waitFor(() => {
                expect(window.location.assign).toHaveBeenCalledWith("/foo");
            });
        });

        test("doesn't redirect before beforeNav resolves when skipClientNav=true", () => {
            // Arrange
            jest.spyOn(window.location, "assign").mockImplementation(() => {});
            render(
                <Link
                    href="/foo"
                    beforeNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const link = screen.getByText("Click me!");
            userEvent.click(link);

            // Assert
            expect(window.location.assign).not.toHaveBeenCalled();
        });
    });

    describe("raw events", () => {
        test("onKeyDown", () => {
            // Arrange
            let keyCode: any;
            render(
                <Link href="/" onKeyDown={(e: any) => (keyCode = e.keyCode)}>
                    Click me!
                </Link>,
            );

            // Act
            const link = screen.getByText("Click me!");
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(link, {keyCode: 32});

            // Assert
            expect(keyCode).toEqual(32);
        });

        test("onKeyUp", () => {
            // Arrange
            let keyCode: any;
            render(
                <Link href="/" onKeyUp={(e: any) => (keyCode = e.keyCode)}>
                    Click me!
                </Link>,
            );

            // Act
            const link = screen.getByText("Click me!");
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(link, {keyCode: 32});

            // Assert
            expect(keyCode).toEqual(32);
        });
    });

    describe("focus style", () => {
        test("blue outline around primary links on focus", () => {
            // Arrange
            render(<Link href="/">Click me!</Link>);

            // Act
            userEvent.tab();
            const link = screen.getByText("Click me!");

            // Assert
            expect(link).toHaveFocus();
            expect(link).toHaveStyle(`outline: 1px solid ${Color.blue}`);
        });

        test("blue outline around secondary links on focus", () => {
            // Arrange
            render(
                <Link href="/" kind="secondary">
                    Click me!
                </Link>,
            );

            // Act
            userEvent.tab();
            const link = screen.getByText("Click me!");

            // Assert
            expect(link).toHaveFocus();
            expect(link).toHaveStyle(`outline: 1px solid ${Color.blue}`);
        });

        test("blue outline around primary inline links on focus", () => {
            // Arrange
            render(
                <Link href="/" kind="primary" inline={true}>
                    Click me!
                </Link>,
            );

            // Act
            userEvent.tab();
            const link = screen.getByText("Click me!");

            // Assert
            expect(link).toHaveFocus();
            expect(link).toHaveStyle(`outline: 1px solid ${Color.blue}`);
        });

        test("blue outline around secondary inline links on focus", () => {
            // Arrange
            render(
                <Link href="/" kind="secondary" inline={true}>
                    Click me!
                </Link>,
            );

            // Act
            userEvent.tab();
            const link = screen.getByText("Click me!");

            // Assert
            expect(link).toHaveFocus();
            expect(link).toHaveStyle(`outline: 1px solid ${Color.blue}`);
        });

        test("white outline around light links on focus", () => {
            // Arrange
            render(
                <Link href="/" light={true}>
                    Click me!
                </Link>,
            );

            // Act
            userEvent.tab();
            const link = screen.getByText("Click me!");

            // Assert
            expect(link).toHaveFocus();
            expect(link).toHaveStyle(`outline: 1px solid ${Color.white}`);
        });

        test("white outline around inline light links on focus", () => {
            // Arrange
            render(
                <Link href="/" light={true} inline={true}>
                    Click me!
                </Link>,
            );

            // Act
            userEvent.tab();
            const link = screen.getByText("Click me!");

            // Assert
            expect(link).toHaveFocus();
            expect(link).toHaveStyle(`outline: 1px solid ${Color.white}`);
        });
    });

    describe("external link", () => {
        test("render icon when `target=_blank`", () => {
            // Arrange
            render(
                <Link href="/" target="_blank">
                    Click me!
                </Link>,
            );

            // Act
            const link = screen.getByText("Click me!");
            const icon = screen.getByTestId("external-icon");

            // Assert
            expect(link.innerHTML).toEqual(expect.stringContaining("<svg"));
            expect(icon).toBeInTheDocument();
        });

        test("does not render icon", () => {
            // Arrange
            render(<Link href="/">Click me!</Link>);

            // Act
            const icon = screen.queryByTestId("external-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });

        test("target attribute passed down correctly", () => {
            // Arrange
            render(
                <Link href="/" target="_blank">
                    Click me!
                </Link>,
            );

            // Act
            const link = screen.getByText("Click me!");

            // Assert
            expect(link).toHaveAttribute("target", "_blank");
        });
    });
});
