import * as React from "react";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import Clickable from "../clickable";

describe("Clickable", () => {
    beforeEach(() => {
        // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
        delete window.location;
        // @ts-expect-error [FEI-5019] - TS2740 - Type '{ assign: Mock<any, any, any>; }' is missing the following properties from type 'Location': ancestorOrigins, hash, host, hostname, and 8 more.
        window.location = {assign: jest.fn()};
    });

    test("client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <View>
                        <Clickable testId="button" href="/foo">
                            {(eventState: any) => <h1>Click Me!</h1>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </View>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        expect(await screen.findByText("Hello, world!")).toBeInTheDocument();
    });

    test("client-side navigation with unknown URL fails", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <View>
                        <Clickable testId="button" href="/unknown">
                            {(eventState: any) => <h1>Click Me!</h1>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </View>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <View>
                        <Clickable testId="button" href="/foo" skipClientNav>
                            {(eventState: any) => <h1>Click Me!</h1>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </View>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("disallow navigation when href and disabled are both set", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <View>
                        <Clickable testId="button" href="/foo" disabled={true}>
                            {(eventState: any) => <h1>Click Me!</h1>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </View>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("a link is rendered with the given href", async () => {
        // Arrange, Act
        render(
            <Clickable testId="button" href="/foo" skipClientNav={true}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        // Assert
        const link = await screen.findByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/foo");
    });

    test("should navigate to a specific link using the keyboard", async () => {
        // Arrange
        render(
            <Clickable testId="button" href="/foo" skipClientNav={true}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        // Act
        const button = await screen.findByTestId("button");
        // simulate Enter
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.keyUp(button, {keyCode: 13});

        // Assert
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    test("beforeNav rejection blocks client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Clickable
                            testId="button"
                            href="/foo"
                            beforeNav={() => Promise.reject()}
                        >
                            {() => <span>Click me!</span>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

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
                        <Clickable
                            testId="button"
                            href="/foo"
                            beforeNav={() => Promise.reject()}
                            safeWithNav={safeWithNavMock}
                        >
                            {() => <span>Click me!</span>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        expect(safeWithNavMock).not.toHaveBeenCalled();
    });

    test("beforeNav resolution results in client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Clickable
                            testId="button"
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
                        >
                            {() => <span>Click me!</span>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

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
                        <Clickable
                            testId="button"
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
                            safeWithNav={safeWithNavMock}
                        >
                            {() => <span>Click me!</span>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(safeWithNavMock).toHaveBeenCalled();
        });
    });

    test("safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Clickable
                            testId="button"
                            href="/foo"
                            safeWithNav={() => Promise.resolve()}
                            skipClientNav={true}
                        >
                            {() => <h1>Click me!</h1>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    test("beforeNav resolution and safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Clickable
                            testId="button"
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
                            safeWithNav={() => Promise.resolve()}
                            skipClientNav={true}
                        >
                            {() => <h1>Click me!</h1>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    test("safeWithNav with skipClientNav=true waits for promise rejection", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Clickable
                            testId="button"
                            href="/foo"
                            safeWithNav={() => Promise.reject()}
                            skipClientNav={true}
                        >
                            {() => <h1>Click me!</h1>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    test("safeWithNav with skipClientNav=false calls safeWithNav but doesn't wait to navigate", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Clickable
                            testId="button"
                            href="/foo"
                            safeWithNav={safeWithNavMock}
                            skipClientNav={false}
                        >
                            {() => <h1>Click me!</h1>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        expect(safeWithNavMock).toHaveBeenCalled();
        // client side nav to /foo
        expect(await screen.findByText("Hello, world!")).toBeInTheDocument();
        // not a full page nav
        expect(window.location.assign).not.toHaveBeenCalledWith("/foo");
    });

    test("safeWithNav with beforeNav resolution and skipClientNav=false calls safeWithNav but doesn't wait to navigate", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <Clickable
                            testId="button"
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
                            safeWithNav={safeWithNavMock}
                            skipClientNav={false}
                        >
                            {() => <h1>Click me!</h1>}
                        </Clickable>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<View>Hello, world!</View>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(safeWithNavMock).toHaveBeenCalled();
        });
        // client side nav to /foo
        expect(await screen.findByText("Hello, world!")).toBeInTheDocument();
        // not a full page nav
        expect(window.location.assign).not.toHaveBeenCalledWith("/foo");
    });

    test("should add aria-disabled if disabled is set", async () => {
        // Arrange

        // Act
        render(
            <Clickable testId="clickable-button" disabled={true}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        const button = await screen.findByTestId("clickable-button");

        // Assert
        expect(button).toHaveAttribute("aria-disabled", "true");
    });

    test("should add aria-label if one is passed in", async () => {
        // Arrange

        // Act
        render(
            <Clickable
                testId="clickable-button"
                aria-label="clickable-button-aria-label"
            >
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        const button = await screen.findByTestId("clickable-button");

        // Assert
        expect(button).toHaveAttribute(
            "aria-label",
            "clickable-button-aria-label",
        );
    });

    test("should not have an aria-label if one is not passed in", async () => {
        // Arrange

        // Act
        render(
            <Clickable testId="clickable-button">
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        const button = await screen.findByTestId("clickable-button");

        // Assert
        expect(button).not.toHaveAttribute("aria-label");
    });

    test("allow keyboard navigation when disabled is set", async () => {
        // Arrange
        render(
            <div>
                <button>First focusable button</button>
                <Clickable testId="clickable-button" disabled={true}>
                    {(eventState: any) => <h1>Click Me!</h1>}
                </Clickable>
            </div>,
        );

        // Act
        // RTL's focuses on `document.body` by default, so we need to focus on
        // the first button
        await userEvent.tab();

        // Then we focus on our Clickable button.
        await userEvent.tab();

        const button = await screen.findByTestId("clickable-button");

        // Assert
        expect(button).toHaveFocus();
    });

    test("should not have a tabIndex if one is not set", async () => {
        // Arrange

        // Act
        render(
            <Clickable testId="clickable-button">
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        const button = await screen.findByTestId("clickable-button");

        // Assert
        expect(button).not.toHaveAttribute("tabIndex");
    });

    test("should have the tabIndex that is passed in", async () => {
        // Arrange

        // Act
        render(
            // eslint-disable-next-line jsx-a11y/tabindex-no-positive -- Explicitly testing tabIndex value
            <Clickable testId="clickable-button" tabIndex={1}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        const button = await screen.findByTestId("clickable-button");

        // Assert
        expect(button).toHaveAttribute("tabIndex", "1");
    });

    test("forwards the ref to the clickable button element", async () => {
        // Arrange
        const ref: React.RefObject<HTMLButtonElement> = React.createRef();

        // Act
        render(
            <Clickable testId="clickable-button" ref={ref}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test("forwards the ref to the clickable anchor element ", async () => {
        // Arrange
        const ref: React.RefObject<HTMLAnchorElement> = React.createRef();

        // Act
        render(
            <Clickable href="/test-url" testId="clickable-anchor" ref={ref}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    describe("raw events", () => {
        /**
         * Clickable expect a function as children so we create a simple wrapper to
         * allow a React.Node to be passed instead.
         */
        const ClickableWrapper = ({
            children,
            ...restProps
        }: {
            children: React.ReactNode;
            onKeyDown?: (e: React.KeyboardEvent) => unknown;
            onKeyUp?: (e: React.KeyboardEvent) => unknown;
            onMouseDown?: (e: React.MouseEvent) => unknown;
            onMouseUp?: (e: React.MouseEvent) => unknown;
        }) => {
            return <Clickable {...restProps}>{() => children}</Clickable>;
        };

        test("onKeyDown", async () => {
            // Arrange
            let keyCode: any;
            render(
                <ClickableWrapper onKeyDown={(e) => (keyCode = e.keyCode)}>
                    Click me!
                </ClickableWrapper>,
            );

            // Act
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(await screen.findByRole("button"), {keyCode: 32});

            // Assert
            expect(keyCode).toEqual(32);
        });

        test("onKeyUp", async () => {
            // Arrange
            let keyCode: any;
            render(
                <ClickableWrapper onKeyUp={(e) => (keyCode = e.keyCode)}>
                    Click me!
                </ClickableWrapper>,
            );

            // Act
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(await screen.findByRole("button"), {keyCode: 32});

            // Assert
            expect(keyCode).toEqual(32);
        });

        test("onMouseDown", async () => {
            // Arrange
            let clientX: any;
            render(
                <Clickable onMouseDown={(e) => (clientX = e.clientX)}>
                    {() => "Click me!"}
                </Clickable>,
            );

            // Act
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.mouseDown(await screen.findByRole("button"), {
                clientX: 10,
            });

            // Assert
            expect(clientX).toEqual(10);
        });

        test("onMouseUp", async () => {
            // Arrange
            let clientX: any;
            render(
                <Clickable onMouseUp={(e) => (clientX = e.clientX)}>
                    {() => "Click me!"}
                </Clickable>,
            );

            // Act
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.mouseUp(await screen.findByRole("button"), {clientX: 10});

            // Assert
            expect(clientX).toEqual(10);
        });
    });
});
