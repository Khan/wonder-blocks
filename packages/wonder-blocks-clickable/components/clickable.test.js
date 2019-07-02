// @flow
import React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {View} from "@khanacademy/wonder-blocks-core";
import {mount, unmountAll} from "../../../utils/testing/mount.js";
import Clickable from "./clickable.js";

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
});
