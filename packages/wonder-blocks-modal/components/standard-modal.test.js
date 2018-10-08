// @flow
import * as React from "react";
import {shallow} from "enzyme";

import expectRenderError from "../../../utils/testing/expect-render-error.js";
import StandardModal from "./standard-modal.js";
import ModalContext from "./modal-context.js";

describe("StandardModal", () => {
    test("Ensure the ModalCloseButton isn't inside.", () => {
        const wrapper = shallow(
            <StandardModal title="Title" content="Content" footer="Footer" />,
        );

        expect(wrapper.find("ModalCloseButton").exists()).toBeFalsy();
    });

    test("ModalContext.Provider and onClose should warn", () => {
        expectRenderError(
            <ModalContext.Provider value={{closeModal: () => {}}}>
                <StandardModal
                    title="Title"
                    content="Content"
                    footer="Footer"
                    onClose={() => {}}
                />,
            </ModalContext.Provider>,
            "You've specified 'onClose' on a modal when using ModalLauncher.  Please specify 'onClose' on the ModalLauncher instead",
        );
    });
});
