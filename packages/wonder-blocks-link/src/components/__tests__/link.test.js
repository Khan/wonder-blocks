// @flow
import * as React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {mount, unmountAll} from "../../../../../utils/testing/mount.js";
import Link from "../link.js";

const wait = (delay: number = 0) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-restricted-syntax
        return setTimeout(resolve, delay);
    });

describe("Link", () => {
    beforeEach(() => {
        // Note: window.location.assign needs a mock function in the testing
        // environment.
        window.location.assign = jest.fn();
        unmountAll();
    });

    afterEach(() => {
        window.location.assign.mockClear();
    });

    describe("client-side navigation", () => {
        test("works for known URLs", () => {
            // Arrange
            const wrapper = mount(
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
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {button: 0});

            // Assert
            expect(wrapper.find("#foo").exists()).toBe(true);
        });

        test("navigation to without route does not render", () => {
            // Arrange
            const wrapper = mount(
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
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {button: 0});

            // Assert
            expect(wrapper.find("#foo").exists()).toBe(false);
        });

        test("waits until beforeNav resolves before navigating", async () => {
            // Arrange
            const wrapper = mount(
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
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {
                button: 0,
            });
            await wait(0);
            wrapper.update();

            // Assert
            expect(wrapper.find("#foo")).toExist();
        });

        test("doesn't navigate before beforeNav resolves", async () => {
            // Arrange
            const wrapper = mount(
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
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {
                button: 0,
            });

            // Assert
            expect(wrapper.find("#foo")).not.toExist();
        });

        test("does not navigate if beforeNav rejects", async () => {
            // Arrange
            const wrapper = mount(
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
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {
                button: 0,
            });
            await wait(0);
            wrapper.update();

            // Assert
            expect(wrapper.find("#foo")).not.toExist();
        });

        test("runs safeWithNav if set", async () => {
            // Arrange
            const safeWithNavMock = jest.fn();
            const wrapper = mount(
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
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {
                button: 0,
            });
            await wait(0);
            wrapper.update();

            // Assert
            expect(safeWithNavMock).toHaveBeenCalled();
        });

        test("doesn't run safeWithNav until beforeNav resolves", () => {
            // Arrange
            const safeWithNavMock = jest.fn();
            const wrapper = mount(
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
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {
                button: 0,
            });

            // Assert
            expect(safeWithNavMock).not.toHaveBeenCalled();
        });
    });

    describe("full page load navigation", () => {
        test("doesn't redirect if safeWithNav hasn't resolved yet when skipClientNav=true", () => {
            // Arrange
            jest.spyOn(window.location, "assign").mockImplementation(() => {});
            const wrapper = mount(
                <Link
                    href="/foo"
                    safeWithNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {
                button: 0,
            });

            // Assert
            expect(window.location.assign).not.toHaveBeenCalled();
        });

        test("redirects after safeWithNav resolves when skipClientNav=true", async () => {
            // Arrange
            jest.spyOn(window.location, "assign").mockImplementation(() => {});
            const wrapper = mount(
                <Link
                    href="/foo"
                    safeWithNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {
                button: 0,
            });
            await wait(0);
            wrapper.update();

            // Assert
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });

        test("redirects after beforeNav and safeWithNav resolve when skipClientNav=true", async () => {
            // Arrange
            jest.spyOn(window.location, "assign").mockImplementation(() => {});
            const wrapper = mount(
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
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {
                button: 0,
            });
            await wait(0);
            wrapper.update();

            // Assert
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });

        test("doesn't redirect before beforeNav resolves when skipClientNav=true", () => {
            // Arrange
            jest.spyOn(window.location, "assign").mockImplementation(() => {});
            const wrapper = mount(
                <Link
                    href="/foo"
                    beforeNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const linkWrapper = wrapper.find("Link").first();
            linkWrapper.simulate("click", {
                button: 0,
            });

            // Assert
            expect(window.location.assign).not.toHaveBeenCalled();
        });
    });

    describe("raw events", () => {
        test("onKeyDown", () => {
            // Arrange
            const keyMock = jest.fn();
            const wrapper = mount(
                <Link href="/" onKeyDown={keyMock}>
                    Click me!
                </Link>,
            );

            // Act
            wrapper.find(Link).simulate("keydown", {keyCode: 32});

            // Assert
            expect(keyMock).toHaveBeenCalledWith(
                expect.objectContaining({keyCode: 32}),
            );
        });

        test("onKeyUp", () => {
            // Arrange
            const keyMock = jest.fn();
            const wrapper = mount(
                <Link href="/" onKeyDown={keyMock}>
                    Click me!
                </Link>,
            );

            // Act
            wrapper.find(Link).simulate("keydown", {keyCode: 32});

            // Assert
            expect(keyMock).toHaveBeenCalledWith(
                expect.objectContaining({keyCode: 32}),
            );
        });
    });
});
