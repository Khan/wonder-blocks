import * as React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import Clickable from "../clickable";

describe("Clickable", () => {
    beforeEach(() => {
        // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
        delete window.location;
        // @ts-expect-error [FEI-5019] - TS2740 - Type '{ assign: Mock<any, any, any>; }' is missing the following properties from type 'Location': ancestorOrigins, hash, host, hostname, and 8 more.
        window.location = {assign: jest.fn()};
    });

    test("client-side navigation", () => {
        // Arrange
        render(
            <MemoryRouter>
                <View>
                    <Clickable testId="button" href="/foo">
                        {(eventState: any) => <h1>Click Me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <View>Hello, world!</View>
                        </Route>
                    </Switch>
                </View>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    });

    test("client-side navigation with unknown URL fails", () => {
        // Arrange
        render(
            <MemoryRouter>
                <View>
                    <Clickable testId="button" href="/unknown">
                        {(eventState: any) => <h1>Click Me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <View>Hello, world!</View>
                        </Route>
                    </Switch>
                </View>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", () => {
        // Arrange
        render(
            <MemoryRouter>
                <View>
                    <Clickable testId="button" href="/foo" skipClientNav>
                        {(eventState: any) => <h1>Click Me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <View>Hello, world!</View>
                        </Route>
                    </Switch>
                </View>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("disallow navigation when href and disabled are both set", () => {
        // Arrange
        render(
            <MemoryRouter>
                <View>
                    <Clickable testId="button" href="/foo" disabled={true}>
                        {(eventState: any) => <h1>Click Me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <View>Hello, world!</View>
                        </Route>
                    </Switch>
                </View>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("a link is rendered with the given href", () => {
        // Arrange, Act
        render(
            <Clickable testId="button" href="/foo" skipClientNav={true}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        // Assert
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/foo");
    });

    test("should navigate to a specific link using the keyboard", () => {
        // Arrange
        render(
            <Clickable testId="button" href="/foo" skipClientNav={true}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        // Act
        const button = screen.getByTestId("button");
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
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        beforeNav={() => Promise.reject()}
                    >
                        {() => <span>Click me!</span>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div>Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("beforeNav rejection blocks calling safeWithNav", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        beforeNav={() => Promise.reject()}
                        safeWithNav={safeWithNavMock}
                    >
                        {() => <span>Click me!</span>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div>Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        expect(safeWithNavMock).not.toHaveBeenCalled();
    });

    test("beforeNav resolution results in client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        beforeNav={() => Promise.resolve()}
                    >
                        {() => <span>Click me!</span>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div>Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        });
    });

    test("beforeNav resolution results in safeWithNav being called", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        beforeNav={() => Promise.resolve()}
                        safeWithNav={safeWithNavMock}
                    >
                        {() => <span>Click me!</span>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div>Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(safeWithNavMock).toHaveBeenCalled();
        });
    });

    test("safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        safeWithNav={() => Promise.resolve()}
                        skipClientNav={true}
                    >
                        {() => <h1>Click me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div>Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    test("beforeNav resolution and safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        render(
            <MemoryRouter>
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
                    <Switch>
                        <Route path="/foo">
                            <div>Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    test("safeWithNav with skipClientNav=true waits for promise rejection", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        safeWithNav={() => Promise.reject()}
                        skipClientNav={true}
                    >
                        {() => <h1>Click me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div>Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });

    test("safeWithNav with skipClientNav=false calls safeWithNav but doesn't wait to navigate", () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        safeWithNav={safeWithNavMock}
                        skipClientNav={false}
                    >
                        {() => <h1>Click me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div>Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        expect(safeWithNavMock).toHaveBeenCalled();
        // client side nav to /foo
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        // not a full page nav
        expect(window.location.assign).not.toHaveBeenCalledWith("/foo");
    });

    test("safeWithNav with beforeNav resolution and skipClientNav=false calls safeWithNav but doesn't wait to navigate", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
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
                    <Switch>
                        <Route path="/foo">
                            <div>Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        userEvent.click(screen.getByTestId("button"));

        // Assert
        await waitFor(() => {
            expect(safeWithNavMock).toHaveBeenCalled();
        });
        // client side nav to /foo
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        // not a full page nav
        expect(window.location.assign).not.toHaveBeenCalledWith("/foo");
    });

    test("should add aria-disabled if disabled is set", () => {
        // Arrange

        // Act
        render(
            <Clickable testId="clickable-button" disabled={true}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        const button = screen.getByTestId("clickable-button");

        // Assert
        expect(button).toHaveAttribute("aria-disabled", "true");
    });

    test("should add aria-label if one is passed in", () => {
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

        const button = screen.getByTestId("clickable-button");

        // Assert
        expect(button).toHaveAttribute(
            "aria-label",
            "clickable-button-aria-label",
        );
    });

    test("should not have an aria-label if one is not passed in", () => {
        // Arrange

        // Act
        render(
            <Clickable testId="clickable-button">
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        const button = screen.getByTestId("clickable-button");

        // Assert
        expect(button).not.toHaveAttribute("aria-label");
    });

    test("allow keyboard navigation when disabled is set", () => {
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
        userEvent.tab();

        // Then we focus on our Clickable button.
        userEvent.tab();

        const button = screen.getByTestId("clickable-button");

        // Assert
        expect(button).toHaveFocus();
    });

    test("should not have a tabIndex if one is not set", () => {
        // Arrange

        // Act
        render(
            <Clickable testId="clickable-button">
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        const button = screen.getByTestId("clickable-button");

        // Assert
        expect(button).not.toHaveAttribute("tabIndex");
    });

    test("should have the tabIndex that is passed in", () => {
        // Arrange

        // Act
        render(
            <Clickable testId="clickable-button" tabIndex={1}>
                {(eventState: any) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        const button = screen.getByTestId("clickable-button");

        // Assert
        expect(button).toHaveAttribute("tabIndex", "1");
    });

    test("forwards the ref to the clickable button element", () => {
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

    test("forwards the ref to the clickable anchor element ", () => {
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

        test("onKeyDown", () => {
            // Arrange
            let keyCode: any;
            render(
                <ClickableWrapper onKeyDown={(e) => (keyCode = e.keyCode)}>
                    Click me!
                </ClickableWrapper>,
            );

            // Act
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(screen.getByRole("button"), {keyCode: 32});

            // Assert
            expect(keyCode).toEqual(32);
        });

        test("onKeyUp", () => {
            // Arrange
            let keyCode: any;
            render(
                <ClickableWrapper onKeyUp={(e) => (keyCode = e.keyCode)}>
                    Click me!
                </ClickableWrapper>,
            );

            // Act
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(screen.getByRole("button"), {keyCode: 32});

            // Assert
            expect(keyCode).toEqual(32);
        });

        test("onMouseDown", () => {
            // Arrange
            let clientX: any;
            render(
                <Clickable onMouseDown={(e) => (clientX = e.clientX)}>
                    {() => "Click me!"}
                </Clickable>,
            );

            // Act
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.mouseDown(screen.getByRole("button"), {clientX: 10});

            // Assert
            expect(clientX).toEqual(10);
        });

        test("onMouseUp", () => {
            // Arrange
            let clientX: any;
            render(
                <Clickable onMouseUp={(e) => (clientX = e.clientX)}>
                    {() => "Click me!"}
                </Clickable>,
            );

            // Act
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.mouseUp(screen.getByRole("button"), {clientX: 10});

            // Assert
            expect(clientX).toEqual(10);
        });
    });
});
