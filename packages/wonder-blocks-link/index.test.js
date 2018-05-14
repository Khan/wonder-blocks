// @flow
import React from "react";
import {shallow} from "enzyme";

import Link from "./index.js";

describe("Link", () => {
    test("TODO", () => {
        const wrapper = shallow(<Link href="#">Hello World!</Link>);
        wrapper.simulate("click");
    });
});
