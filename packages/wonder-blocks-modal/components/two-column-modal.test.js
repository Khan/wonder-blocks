// @flow
import * as React from "react";
import {shallow} from "enzyme";

import TwoColumnModal from "./two-column-modal.js";

describe("TwoColumnModal", () => {
    test("Clicking the close button triggers `onClickCloseButton`", () => {
        const onClickCloseButton = jest.fn();
        const wrapper = shallow(
            <TwoColumnModal
                leftContent="Left content"
                rightContent="Right content"
                onClickCloseButton={onClickCloseButton}
            />,
        );

        expect(onClickCloseButton).not.toHaveBeenCalled();
        wrapper.find("ModalCloseButton").simulate("click");
        expect(onClickCloseButton).toHaveBeenCalled();
    });
});
