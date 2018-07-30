// @flow
import React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {mount, unmountAll} from "../../../utils/testing/mount.js";
import Button from "./button.js";

describe("Button", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("client-side navigation", () => {
        // Arrange
        const wrapper = mount(
            <MemoryRouter>
                <div>
                    <Button testId="button" href="/foo" clientNav={true}>
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

    test("client-side navigation without 'clientNav' prop fails", () => {
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
        expect(wrapper.find("#foo").exists()).toBe(false);
    });
});
