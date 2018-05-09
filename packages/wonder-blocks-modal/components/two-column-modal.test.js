// @flow
import * as React from "react";
import {shallow} from "enzyme";

import TwoColumnModal from "./two-column-modal.js";

describe("TwoColumnModal", () => {
    test("Has no ModalCloseButton as a direct child", () => {
        const wrapper = shallow(
            <TwoColumnModal sidebar="Sidebar" content="Contents" />,
        );

        expect(wrapper.find("ModalCloseButton").exists()).toBeFalsy();
    });
});
