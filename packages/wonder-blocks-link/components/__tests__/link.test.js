// @flow
import React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {mount, unmountAll} from "../../../../utils/testing/mount.js";
import Link from "../link.js";

const wait = (delay: number = 0) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-restricted-syntax
        return setTimeout(resolve, delay);
    });

describe("Link", () => {
    beforeEach(() => {
        unmountAll();
    });

    describe("client-side navigation", () => {
        test("works for known URLs", () => {
            // Arrange
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <Link testId="link" href="/foo">
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
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {button: 0});

            // Assert
            expect(wrapper.find("#foo").exists()).toBe(true);
        });

        test("navigation with unknown URL fails", () => {
            // Arrange
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <Link testId="link" href="/unknown">
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
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {button: 0});

            // Assert
            expect(wrapper.find("#foo").exists()).toBe(false);
        });

        test("waits until beforeNav resolves before navigating", async () => {
            // Arrange
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <Link
                            testId="link"
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
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
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {
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
                        <Link
                            testId="link"
                            href="/foo"
                            beforeNav={() => Promise.resolve()}
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
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {
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
                        <Link
                            testId="link"
                            href="/foo"
                            beforeNav={() => Promise.reject()}
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
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {
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
                            testId="link"
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
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {
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
                            testId="link"
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
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {
                button: 0,
            });

            // Assert
            expect(safeWithNavMock).not.toHaveBeenCalled();
        });
    });

    describe("server-side navigation", () => {
        test("doesn't redirect if safeWithNav hasn't resolved yet when skipClientNav=true", () => {
            // Arrange
            jest.spyOn(window.location, "assign").mockImplementation(() => {});
            const wrapper = mount(
                <Link
                    testId="link"
                    href="/foo"
                    safeWithNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {
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
                    testId="link"
                    href="/foo"
                    safeWithNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {
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
                    testId="link"
                    href="/foo"
                    beforeNav={() => Promise.resolve()}
                    safeWithNav={() => Promise.resolve()}
                    skipClientNav={true}
                >
                    Click me!
                </Link>,
            );

            // Act
            const buttonWrapper = wrapper.find(`[data-test-id="link"]`).first();
            buttonWrapper.simulate("click", {
                button: 0,
            });
            await wait(0);
            wrapper.update();

            // Assert
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });
});
