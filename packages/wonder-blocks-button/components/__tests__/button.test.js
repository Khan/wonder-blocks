// @flow
import React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {mount, unmountAll} from "../../../../utils/testing/mount.js";

import Button from "../button.js";

const wait = (delay: number = 0) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-restricted-syntax
        return setTimeout(resolve, delay);
    });

describe("Button", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("client-side navigation", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button testId="button" href="/foo">
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(true);
    });

    test("beforeNav rejection blocks client-side navigation ", async () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button
                        testId="button"
                        href="/foo"
                        beforeNav={(e) => Promise.reject()}
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });

    test("beforeNav resolution results in client-side navigation", async () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button
                        testId="button"
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
        await wait(0);
        buttonWrapper.update();

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(true);
    });

    test("safeWithNav with skipClientNav=true waits for promise resolution", async () => {
        // Arrange
        jest.spyOn(window.location, "assign");
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button
                        testId="button"
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});
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
                    <Button
                        testId="button"
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
                    <Button
                        testId="button"
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(safeWithNavMock).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith("/foo");
    });

    test("client-side navigation with unknown URL fails", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button testId="button" href="/unknown">
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button testId="button" href="/foo" skipClientNav>
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });

    test("disallow navigation when href and disabled are both set", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button testId="button" href="/foo" disabled={true}>
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });

    test("don't call beforeNav when href and disabled are both set", () => {
        // Arrange
        const beforeNavMock = jest.fn();
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button
                        testId="button"
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(beforeNavMock).not.toHaveBeenCalled();
    });

    test("don't call safeWithNav when href and disabled are both set", () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button
                        testId="button"
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
        const buttonWrapper = wrapper.find(`[data-test-id="button"]`).first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(safeWithNavMock).not.toHaveBeenCalled();
    });

    it("should set label on the underlying button", () => {
        // Arrange
        const wrapper = mount(
            <Button id="foo" onClick={() => {}}>
                Click me!
            </Button>,
        );

        expect(wrapper.find("button")).toHaveProp({id: "foo"});
    });

    it("should set label on the underlying link", () => {
        // Arrange
        const wrapper = mount(
            <Button id="foo" href="/bar">
                Click me!
            </Button>,
        );

        expect(wrapper.find("a")).toHaveProp({id: "foo"});
    });

    describe("client-side navigation with keyboard", () => {
        const keyCodes = {
            tab: 9,
            enter: 13,
            space: 32,
        };

        it("should navigate on pressing the space key", () => {
            // Arrange
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <Button testId="button" href="/foo">
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
            const buttonWrapper = wrapper
                .find(`[data-test-id="button"]`)
                .first();
            buttonWrapper.simulate("keydown", {
                keyCode: keyCodes.space,
            });
            buttonWrapper.simulate("keyup", {
                keyCode: keyCodes.space,
            });

            // Assert
            expect(wrapper.find("#foo").exists()).toBe(true);
        });

        it("should navigate on pressing the enter key", () => {
            // Arrange
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <Button testId="button" href="/foo">
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
            const buttonWrapper = wrapper
                .find(`[data-test-id="button"]`)
                .first();
            buttonWrapper.simulate("keydown", {
                keyCode: keyCodes.enter,
            });
            buttonWrapper.simulate("keyup", {
                keyCode: keyCodes.enter,
            });

            // Assert
            expect(wrapper.find("#foo").exists()).toBe(true);
        });

        test("beforeNav rejection blocks client-side navigation ", async () => {
            // Arrange
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <Button
                            testId="button"
                            href="/foo"
                            beforeNav={(e) => Promise.reject()}
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
            const buttonWrapper = wrapper
                .find(`[data-test-id="button"]`)
                .first();
            buttonWrapper.simulate("keydown", {
                keyCode: keyCodes.enter,
            });
            buttonWrapper.simulate("keyup", {
                keyCode: keyCodes.enter,
            });
            await wait(0);
            buttonWrapper.update();

            // Assert
            expect(wrapper.find("#foo").exists()).toBe(false);
        });

        test("beforeNav resolution results in client-side navigation", async () => {
            // Arrange
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <Button
                            testId="button"
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
            const buttonWrapper = wrapper
                .find(`[data-test-id="button"]`)
                .first();
            buttonWrapper.simulate("keydown", {
                keyCode: keyCodes.enter,
            });
            buttonWrapper.simulate("keyup", {
                keyCode: keyCodes.enter,
            });
            await wait(0);
            buttonWrapper.update();

            // Assert
            expect(wrapper.find("#foo").exists()).toBe(true);
        });

        test("safeWithNav with skipClientNav=true waits for promise resolution", async () => {
            // Arrange
            jest.spyOn(window.location, "assign");
            const wrapper = mount(
                <MemoryRouter>
                    <div>
                        <Button
                            testId="button"
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
            const buttonWrapper = wrapper
                .find(`[data-test-id="button"]`)
                .first();
            buttonWrapper.simulate("keydown", {
                keyCode: keyCodes.enter,
            });
            buttonWrapper.simulate("keyup", {
                keyCode: keyCodes.enter,
            });
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
                        <Button
                            testId="button"
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
            const buttonWrapper = wrapper
                .find(`[data-test-id="button"]`)
                .first();
            buttonWrapper.simulate("keydown", {
                keyCode: keyCodes.enter,
            });
            buttonWrapper.simulate("keyup", {
                keyCode: keyCodes.enter,
            });
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
                        <Button
                            testId="button"
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
            const buttonWrapper = wrapper
                .find(`[data-test-id="button"]`)
                .first();
            buttonWrapper.simulate("keydown", {
                keyCode: keyCodes.enter,
            });
            buttonWrapper.simulate("keyup", {
                keyCode: keyCodes.enter,
            });

            // Assert
            expect(safeWithNavMock).toHaveBeenCalled();
            expect(window.location.assign).toHaveBeenCalledWith("/foo");
        });
    });
});
