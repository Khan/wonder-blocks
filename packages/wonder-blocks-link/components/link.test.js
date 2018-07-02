// @flow
import React from "react";
import {mount} from "enzyme";

import Link from "./link.js";

describe("Link", () => {
    test("TODO", () => {
        const wrapper = mount(<Link href="#">Hello World!</Link>);
        wrapper.simulate("click");
    });
});