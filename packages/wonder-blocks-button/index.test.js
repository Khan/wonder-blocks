// @flow
import React from "react";
import {mount} from "enzyme";

import Button from "./index.js";

describe("Button", () => {
    test("render a label", (done) => {
        const wrapper = mount(
            <Button onClick={() => done()}>Hello World!</Button>,
        );
        wrapper.simulate("click");
    });
});
