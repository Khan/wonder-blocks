// @flow
import * as React from "react";
import {shallow} from "enzyme";

import TwoColumnModal from "./two-column-modal.js";

describe("TwoColumnModal", () => {
    test("Ensure the ModalCloseButton isn't inside.", () => {
        const wrapper = shallow(
            <TwoColumnModal sidebar="Sidebar" content="Contents" />,
        );

        expect(wrapper.find("ModalCloseButton").exists()).toBeFalsy();
    });
});
