// @flow
import * as React from "react";
import {shallow} from "enzyme";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import {icons} from "@khanacademy/wonder-blocks-icon";

import {mount, unmountAll} from "../../../../../utils/testing/mount.js";
import expectRenderError from "../../../../../utils/testing/expect-render-error.js";
import IconButton from "../icon-button.js";

describe("IconButton", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("render an icon", (done) => {
        const wrapper = shallow(
            <IconButton
                icon={icons.search}
                aria-label="search"
                onClick={() => done()}
            />,
        );
        wrapper.simulate("click");
    });

    test("throw an error for if light and not primary", () => {
        expectRenderError(
            <IconButton
                icon={icons.search}
                aria-label="search"
                kind="secondary"
                light={true}
                onClick={() => void 0}
            />,
            "Light is only supported for primary IconButtons",
        );
    });

    test("client-side navigation", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <IconButton
                        icon={icons.search}
                        aria-label="search"
                        testId="icon-button"
                        href="/foo"
                    />
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
            .find(`[data-test-id="icon-button"]`)
            .first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(true);
    });

    test("client-side navigation with unknown URL fails", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <IconButton
                        icon={icons.search}
                        aria-label="search"
                        testId="icon-button"
                        href="/unknown"
                    />
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
            .find(`[data-test-id="icon-button"]`)
            .first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <IconButton
                        icon={icons.search}
                        aria-label="search"
                        testId="icon-button"
                        href="/foo"
                        skipClientNav
                    />
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
            .find(`[data-test-id="icon-button"]`)
            .first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });

    test("disallow navigation when href and disabled are both set", () => {
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <IconButton
                        icon={icons.search}
                        aria-label="search"
                        testId="icon-button"
                        href="/foo"
                        disabled={true}
                    />
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
            .find(`[data-test-id="icon-button"]`)
            .first();
        buttonWrapper.simulate("click", {button: 0});

        // Assert
        expect(wrapper.find("#foo").exists()).toBe(false);
    });
});
