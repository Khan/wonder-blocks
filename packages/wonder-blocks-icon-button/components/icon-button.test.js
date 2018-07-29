// @flow
import React from "react";
import {shallow} from "enzyme";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {mount, unmountAll} from "../../../utils/testing/mount.js";
import {icons} from "@khanacademy/wonder-blocks-icon";

import IconButton from "./icon-button.js";

const noop = () => void 0;

describe("IconButton", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("render an icon", (done) => {
        const wrapper = shallow(
            <IconButton
                icon={icons.search}
                aria-label="search"
                onClick={done}
            />,
        );
        wrapper.simulate("click");
    });

    test("throw an error for if light and not primary", () => {
        expect(() =>
            mount(
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    kind="secondary"
                    light={true}
                    onClick={noop}
                />,
            ),
        ).toThrowError("Light is only supported for primary IconButtons");
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
                        clientNav={true}
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

    test("client-side navigation without 'clientNav' prop fails", () => {
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
        expect(wrapper.find("#foo").exists()).toBe(false);
    });
});
