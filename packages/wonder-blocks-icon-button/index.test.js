// @flow
import React from "react";
import {mount} from "enzyme";

import IconButton from "./index.js";

describe("IconButton", () => {
    test("render an icon", (done) => {
        const wrapper = mount(
            <IconButton icon="" alt="" onClick={() => done()} />,
        );
        wrapper.simulate("click");
    });
    test("throw an error for if light and not primary", () => {
        expect(() =>
            mount(
                <IconButton
                    icon=""
                    alt=""
                    kind="secondary"
                    light={true}
                    onClick={() => void 0}
                />,
            ),
        ).toThrowError("Light is only supported for primary IconButtons");
    });
});
