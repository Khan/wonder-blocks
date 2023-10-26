import * as React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";

import Link from "../link";

describe("Link", () => {
    beforeEach(() => {
        // Note: window.location.assign needs a mock function in the testing
        // environment.
        // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
        delete window.location;
        // @ts-expect-error [FEI-5019] - TS2740 - Type '{ assign: Mock<any, any, any>; }' is missing the following properties from type 'Location': ancestorOrigins, hash, host, hostname, and 8 more.
        window.location = {assign: jest.fn(), origin: "http://localhost"};
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
                        <Link href="/">Click me!</Link>
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
                <Link href="/foo" onKeyDown={(e: any) => (keyCode = e.keyCode)}>
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
                <Link href="/foo" onKeyUp={(e: any) => (keyCode = e.keyCode)}>
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

    describe("external link that opens in a new tab", () => {
        test("target attribute passed down correctly", () => {
            // Arrange
            render(
                <Link href="https://www.google.com/" target="_blank">
                    Click me!
                </Link>,
            );

            // Act
            const link = screen.getByRole("link");

            // Assert
            expect(link).toHaveAttribute("target", "_blank");
        });

        test("render external icon when `target=_blank` and link is external", () => {
            // Arrange
            render(
                <Link href="https://www.google.com/" target="_blank">
                    Click me!
                </Link>,
            );

            // Act
            const icon = screen.getByTestId("external-icon");

            // Assert
            expect(icon).toHaveStyle({
                maskImage: "url(arrow-square-out-bold.svg)",
            });
        });

        test("does not render external icon when `target=_blank` and link is relative", () => {
            // Arrange
            render(
                <Link href="/" target="_blank">
                    Click me!
                </Link>,
            );

            // Act
            const icon = screen.queryByTestId("external-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });

        test("does not render external icon when there is no target and link is external", () => {
            // Arrange
            render(<Link href="https://www.google.com/">Click me!</Link>);

            // Act
            const icon = screen.queryByTestId("external-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });

        test("does not render external icon when there is no target and link is relative", () => {
            // Arrange
            render(<Link href="/">Click me!</Link>);

            // Act
            const icon = screen.queryByTestId("external-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });
    });

    describe("start and end icons", () => {
        test("render icon with link when startIcon prop is passed in", () => {
            // Arrange
            render(
                <Link
                    href="https://www.khanacademy.org/"
                    startIcon={<PhosphorIcon icon={plusIcon} />}
                >
                    Add new item
                </Link>,
            );

            // Act
            const icon = screen.getByTestId("start-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });

        test("does not render icon when startIcon prop is not passed in", () => {
            // Arrange
            render(<Link href="https://www.khanacademy.org/">Click me!</Link>);

            // Act
            const icon = screen.queryByTestId("start-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });

        test("startIcon prop passed down correctly", () => {
            // Arrange
            render(
                <Link
                    href="https://www.khanacademy.org/"
                    startIcon={<PhosphorIcon icon={plusIcon} />}
                >
                    Add new item
                </Link>,
            );

            // Act
            const icon = screen.getByTestId("start-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });

        test("render icon with link when endIcon prop is passed in", () => {
            // Arrange
            render(
                <Link
                    href="https://www.khanacademy.org/"
                    endIcon={<PhosphorIcon icon={plusIcon} />}
                >
                    Click to go back
                </Link>,
            );

            // Act
            const icon = screen.getByTestId("end-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });

        test("does not render icon when endIcon prop is not passed in", () => {
            // Arrange
            render(<Link href="https://www.khanacademy.org/">Click me!</Link>);

            // Act
            const icon = screen.queryByTestId("end-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });

        test("does not render externalIcon when endIcon is passed in and `target='_blank'`", () => {
            // Arrange
            render(
                <Link
                    href="https://www.google.com/"
                    endIcon={<PhosphorIcon icon={plusIcon} />}
                    target="_blank"
                >
                    Open a new tab
                </Link>,
            );

            // Act
            const externalIcon = screen.queryByTestId("external-icon");

            // Assert
            expect(externalIcon).not.toBeInTheDocument();
        });

        test("render endIcon instead of default externalIcon when `target='_blank' and link is external`", () => {
            // Arrange
            render(
                <Link
                    href="https://www.google.com/"
                    endIcon={<PhosphorIcon icon={plusIcon} />}
                    target="_blank"
                >
                    Open a new tab
                </Link>,
            );

            // Act
            const icon = screen.getByTestId("end-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });

        test("endIcon prop passed down correctly", () => {
            // Arrange
            render(
                <Link href="/" endIcon={<PhosphorIcon icon={plusIcon} />}>
                    Click to go back
                </Link>,
            );

            // Act
            const icon = screen.getByTestId("end-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });
    });
});
