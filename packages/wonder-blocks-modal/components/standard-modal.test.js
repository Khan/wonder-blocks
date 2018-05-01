// @flow
import * as React from "react";
import {shallow} from "enzyme";

import StandardModal from "./standard-modal.js";

describe("StandardModal", () => {
    test("Clicking the close button triggers `onClickCloseButton`", () => {
        const onClickCloseButton = jest.fn();
        const wrapper = shallow(
            <StandardModal
                title="Title"
                content="Content"
                footer="Footer"
                onClickCloseButton={onClickCloseButton}
            />,
        );

        expect(onClickCloseButton).not.toHaveBeenCalled();
        wrapper.find("ModalCloseButton").simulate("click");
        expect(onClickCloseButton).toHaveBeenCalled();
    });
});
