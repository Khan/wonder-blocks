// @flow
import React from "react";
import {shallow} from "enzyme";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import {mount, unmountAll} from "../../../utils/testing/mount.js";
import {icons} from "@khanacademy/wonder-blocks-icon";

import IconButton from "./icon-button.js";

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
        expect(() =>
            mount(
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    kind="secondary"
                    light={true}
                    onClick={() => void 0}
                />,
            ),
        ).toThrowError("Light is only supported for primary IconButtons");
    });

    test("client-side navigation", () => {
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

        expect(wrapper.find("#foo").exists()).toBe(false);
        const buttonWrapper = wrapper
            .find(`[data-test-id="icon-button"]`)
            .first();
        expect(buttonWrapper.exists()).toBe(true);
        buttonWrapper.simulate("click", {button: 0});
        expect(wrapper.find("#foo").exists()).toBe(true);
    });

    test("client-side navigation without 'clientNav' prop fails", () => {
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

        expect(wrapper.find("#foo").exists()).toBe(false);
        const buttonWrapper = wrapper
            .find(`[data-test-id="icon-button"]`)
            .first();
        expect(buttonWrapper.exists()).toBe(true);
        buttonWrapper.simulate("click", {button: 0});
        expect(wrapper.find("#foo").exists()).toBe(false);
    });
});
