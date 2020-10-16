// @flow
import * as React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {View} from "@khanacademy/wonder-blocks-core";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";
import Clickable from "../clickable.js";

const wait = (delay: number = 0) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-restricted-syntax
        return setTimeout(resolve, delay);
    });

describe("Clickable", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("client-side navigation", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <View>
                    <Clickable testId="button" href="/foo">
                        {(eventState) => <h1>Click Me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <View id="foo">Hello, world!</View>
                        </Route>
                    </Switch>
                </View>
            </MemoryRouter>,
        );

        // Act
        const clickableWrapper = wrapper
            .find(`[data-test-id="button"]`)
            .first();
        clickableWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(true);
    });

    test("client-side navigation with unknown URL fails", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <View>
                    <Clickable testId="button" href="/unknown">
                        {(eventState) => <h1>Click Me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <View id="foo">Hello, world!</View>
                        </Route>
                    </Switch>
                </View>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <View>
                    <Clickable testId="button" href="/foo" skipClientNav>
                        {(eventState) => <h1>Click Me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <View id="foo">Hello, world!</View>
                        </Route>
                    </Switch>
                </View>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });

    test("disallow navigation when href and disabled are both set", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <View>
                    <Clickable testId="button" href="/foo" disabled={true}>
                        {(eventState) => <h1>Click Me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <View id="foo">Hello, world!</View>
                        </Route>
                    </Switch>
                </View>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });

    test("should verify if href is passed to Clickablebehavior", () => {
        // Arrange, Act
        const wrapper = mount(
            <Clickable testId="button" href="/foo" skipClientNav={true}>
                {(eventState) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        // Assert
        expect(wrapper.find("ClickableBehavior")).toHaveProp({href: "/foo"});
    });

    test("should navigate to a specific link using the keyboard", () => {
        // Arrange
        window.location.assign = jest.fn();

        const wrapper = mount(
            <Clickable testId="button" href="/foo" skipClientNav={true}>
                {(eventState) => <h1>Click Me!</h1>}
            </Clickable>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        // simulate Enter
        buttonWrapper.simulate("keyup", {keyCode: 13});

        // Assert
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    test("beforeNav rejection blocks client-side navigation", async () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        beforeNav={(e) => Promise.reject()}
                    >
                        {() => <span>Click me!</span>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(wrapper.find("#foo")).not.toExist();
    });

    test("beforeNav rejection blocks calling safeWithNav", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        beforeNav={(e) => Promise.reject()}
                        safeWithNav={safeWithNavMock}
                    >
                        {() => <span>Click me!</span>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(safeWithNavMock).not.toHaveBeenCalled();
    });

    test("beforeNav resolution results in client-side navigation", async () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        beforeNav={(e) => Promise.resolve()}
                    >
                        {() => <span>Click me!</span>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(wrapper.find("#foo")).toExist();
    });

    test("beforeNav resolution results in safeWithNav being called", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        beforeNav={(e) => Promise.resolve()}
                        safeWithNav={safeWithNavMock}
                    >
                        {() => <span>Click me!</span>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(safeWithNavMock).toHaveBeenCalled();
    });

    test("safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        safeWithNav={(e) => Promise.resolve()}
                        skipClientNav={true}
                    >
                        {() => <h1>Click me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    test("beforeNav resolution and safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        beforeNav={(e) => Promise.resolve()}
                        safeWithNav={(e) => Promise.resolve()}
                        skipClientNav={true}
                    >
                        {() => <h1>Click me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    test("safeWithNav with skipClientNav=true waits for promise rejection", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Clickable
                        testId="button"
                        href="/foo"
                        safeWithNav={(e) => Promise.reject()}
                        skipClientNav={true}
                    >
                        {() => <h1>Click me!</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    test("safeWithNav with skipClientNav=false calls safeWithNav but doesn't wait to navigate", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        const safeWithNavMock = jest.fn();
        const wrapper = mount(
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
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(safeWithNavMock).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    test("safeWithNav with beforeNav resolution and skipClientNav=false calls safeWithNav but doesn't wait to navigate", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        const safeWithNavMock = jest.fn();
        const wrapper = mount(
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
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
            </MemoryRouter>,
        );

        // Act
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(safeWithNavMock).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    describe("raw events", () => {
        /**
         * Clickable expect a function as children so we create a simple wrapper to
         * allow a React.Node to be passed instead.
         */
        const ClickableWrapper = ({
            children,
            ...restProps
        }: {|
            children: React.Node,
            onKeyDown?: (e: SyntheticKeyboardEvent<>) => mixed,
            onKeyUp?: (e: SyntheticKeyboardEvent<>) => mixed,
        |}) => {
            return <Clickable {...restProps}>{() => children}</Clickable>;
        };

        test("onKeyDown", () => {
            // Arrange
            const keyMock = jest.fn();
            const wrapper = mount(
                <ClickableWrapper onKeyDown={keyMock}>
                    Click me!
                </ClickableWrapper>,
            );

            // Act
            wrapper.find("Clickable").simulate("keydown", {keyCode: 32});

            // Assert
            expect(keyMock).toHaveBeenCalledWith(
                expect.objectContaining({keyCode: 32}),
            );
        });

        test("onKeyUp", () => {
            // Arrange
            const keyMock = jest.fn();
            const wrapper = mount(
                <ClickableWrapper onKeyDown={keyMock}>
                    Click me!
                </ClickableWrapper>,
            );

            // Act
            wrapper.find("Clickable").simulate("keydown", {keyCode: 32});

            // Assert
            expect(keyMock).toHaveBeenCalledWith(
                expect.objectContaining({keyCode: 32}),
            );
        });
    });
});
