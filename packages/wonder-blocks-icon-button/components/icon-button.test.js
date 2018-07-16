// @flow
import React from "react";
import {mount, shallow} from "enzyme";

import {icons} from "@khanacademy/wonder-blocks-icon";

import IconButton from "./icon-button.js";

describe("IconButton", () => {
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
});
