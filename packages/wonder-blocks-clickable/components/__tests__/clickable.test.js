// @flow
import React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {View} from "@khanacademy/wonder-blocks-core";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";
import Clickable from "../clickable.js";

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
});
