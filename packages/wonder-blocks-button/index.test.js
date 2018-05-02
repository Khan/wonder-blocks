// @flow
import React from "react";
import {shallow} from "enzyme";

import Button from "./index.js";

describe("Button", () => {
    test("render a label", (done) => {
        const wrapper = shallow(
            <Button testId={"1"} onClick={() => done()}>
                Hello World!
            </Button>,
        );
        wrapper.simulate("click");
    });
});
