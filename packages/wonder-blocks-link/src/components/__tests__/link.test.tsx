import * as React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

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
        test("works for known URLs", async () => {
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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

            // Assert
            expect(
                await screen.findByText("Hello, world!"),
            ).toBeInTheDocument();
        });

        test("navigation to without route does not render", async () => {
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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });

        // NOTE(john): This fails after upgrading to user-event v14.
        // I believe that the act() call is resolving the promise, so this
        // test is no longer doing what it expects.
        test.skip("waits until beforeNav resolves before navigating", async () => {
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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });

        // NOTE(john): This fails after upgrading to user-event v14.
        // I believe that the act() call is resolving the promise, so this
        // test is no longer doing what it expects.
        test.skip("doesn't navigate before beforeNav resolves", async () => {
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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

            // Assert
            expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
        });

        test("does not navigate if beforeNav rejects", async () => {
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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

            // Assert
            await waitFor(() => {
                expect(safeWithNavMock).toHaveBeenCalled();
            });
        });

        // NOTE(john): This fails after upgrading to user-event v14.
        // I believe that the act() call is resolving the promise, so this
        // test is no longer doing what it expects.
        test.skip("doesn't run safeWithNav until beforeNav resolves", async () => {
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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

            // Assert
            expect(safeWithNavMock).not.toHaveBeenCalled();
        });
    });

    describe("full page load navigation", () => {
        // NOTE(john): This fails after upgrading to user-event v14.
        // I believe that the act() call is resolving the promise, so this
        // test is no longer doing what it expects.
        test.skip("doesn't redirect if safeWithNav hasn't resolved yet when skipClientNav=true", async () => {
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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

            // Assert
            await waitFor(() => {
                expect(window.location.assign).toHaveBeenCalledWith("/foo");
            });
        });

        // NOTE(john): This fails after upgrading to user-event v14.
        // I believe that the act() call is resolving the promise, so this
        // test is no longer doing what it expects.
        test.skip("doesn't redirect before beforeNav resolves when skipClientNav=true", async () => {
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
            const link = await screen.findByText("Click me!");
            await userEvent.click(link);

            // Assert
            expect(window.location.assign).not.toHaveBeenCalled();
        });
    });

    describe("raw events", () => {
        test("onKeyDown", async () => {
            // Arrange
            let keyCode: any;
            render(
                <Link href="/foo" onKeyDown={(e: any) => (keyCode = e.keyCode)}>
                    Click me!
                </Link>,
            );

            // Act
            const link = await screen.findByText("Click me!");
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(link, {keyCode: 32});

            // Assert
            expect(keyCode).toEqual(32);
        });

        test("onKeyUp", async () => {
            // Arrange
            let keyCode: any;
            render(
                <Link href="/foo" onKeyUp={(e: any) => (keyCode = e.keyCode)}>
                    Click me!
                </Link>,
            );

            // Act
            const link = await screen.findByText("Click me!");
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(link, {keyCode: 32});

            // Assert
            expect(keyCode).toEqual(32);
        });
    });

    describe("external link that opens in a new tab", () => {
        test("target attribute passed down correctly", async () => {
            // Arrange
            render(
                <Link href="https://www.google.com/" target="_blank">
                    Click me!
                </Link>,
            );

            // Act
            const link = await screen.findByRole("link");

            // Assert
            expect(link).toHaveAttribute("target", "_blank");
        });

        test("render external icon when `target=_blank` and link is external", async () => {
            // Arrange
            render(
                <Link href="https://www.google.com/" target="_blank">
                    Click me!
                </Link>,
            );

            // Act
            const icon = await screen.findByTestId("external-icon");

            // Assert
            expect(icon).toHaveStyle({
                maskImage: "url(arrow-square-out-bold.svg)",
            });
        });

        test("does not render external icon when `target=_blank` and link is relative", async () => {
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

        test("does not render external icon when there is no target and link is external", async () => {
            // Arrange
            render(<Link href="https://www.google.com/">Click me!</Link>);

            // Act
            const icon = screen.queryByTestId("external-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });

        test("does not render external icon when there is no target and link is relative", async () => {
            // Arrange
            render(<Link href="/">Click me!</Link>);

            // Act
            const icon = screen.queryByTestId("external-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });
    });

    describe("start and end icons", () => {
        test("render icon with link when startIcon prop is passed in", async () => {
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
            const icon = await screen.findByTestId("start-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });

        test("does not render icon when startIcon prop is not passed in", async () => {
            // Arrange
            render(<Link href="https://www.khanacademy.org/">Click me!</Link>);

            // Act
            const icon = screen.queryByTestId("start-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });

        test("startIcon prop passed down correctly", async () => {
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
            const icon = await screen.findByTestId("start-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });

        test("render icon with link when endIcon prop is passed in", async () => {
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
            const icon = await screen.findByTestId("end-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });

        test("does not render icon when endIcon prop is not passed in", async () => {
            // Arrange
            render(<Link href="https://www.khanacademy.org/">Click me!</Link>);

            // Act
            const icon = screen.queryByTestId("end-icon");

            // Assert
            expect(icon).not.toBeInTheDocument();
        });

        test("does not render externalIcon when endIcon is passed in and `target='_blank'`", async () => {
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

        test("render endIcon instead of default externalIcon when `target='_blank' and link is external`", async () => {
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
            const icon = await screen.findByTestId("end-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });

        test("endIcon prop passed down correctly", async () => {
            // Arrange
            render(
                <Link href="/" endIcon={<PhosphorIcon icon={plusIcon} />}>
                    Click to go back
                </Link>,
            );

            // Act
            const icon = await screen.findByTestId("end-icon");

            // Assert
            expect(icon).toHaveStyle({maskImage: "url(plus-bold.svg)"});
        });
    });
});
