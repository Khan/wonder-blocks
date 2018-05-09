// @flow
import * as React from "react";
import {shallow} from "enzyme";

import StandardModal from "./standard-modal.js";

describe("StandardModal", () => {
    test("Clicking the close button triggers `onClickCloseButton`", () => {
        const wrapper = shallow(
            <StandardModal title="Title" content="Content" footer="Footer" />,
        );

        expect(wrapper.find("ModalCloseButton").exists()).toBeFalsy();
    });
});
