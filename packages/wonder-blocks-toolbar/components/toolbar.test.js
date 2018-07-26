// @flow
import * as React from "react";
import {shallow} from "enzyme";

import Toolbar from "./toolbar.js";

describe("Toolbar", () => {
    test("Title id can be specified", () => {
        const wrapper = shallow(<Toolbar title="Title" />);
        expect(wrapper.find("#wb-toolbar-title").exists()).toBe(true);

        const titleId = "test-title-id-element";
        const wrapperWithId = shallow(
            <Toolbar title="Title" titleId={titleId} />,
        );
        expect(wrapperWithId.find("#wb-toolbar-title").exists()).toBe(false);
        expect(wrapperWithId.find(`#${titleId}`).exists()).toBe(true);
    });
});
