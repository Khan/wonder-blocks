// @flow
import React from "react";
import {shallow} from "enzyme";

import Button from "./button.js";

describe("Button", () => {
    test("render a label", (done) => {
        const wrapper = shallow(
            <Button onClick={() => done()}>Hello World!</Button>,
        );
        wrapper.simulate("click");
    });
});
