// @flow
import React from "react";

import {View} from "@khanacademy/wonder-blocks-core";

import expectRenderError from "../../../utils/testing/expect-render-error.js";
import {mount, unmountAll} from "../../../utils/testing/mount.js";
import ModalPanel from "./modal-panel.js";
import ModalContext from "./modal-context.js";
import CloseButton from "./close-button.js";

describe("ModalPanel", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("ModalContext.Provider and onClose should warn", () => {
        expectRenderError(
            <ModalContext.Provider value={{closeModal: () => {}}}>
                <ModalPanel
                    content="Hello, world"
                    onClose={() => {}}
                    closeButtonVisible={true}
                />
            </ModalContext.Provider>,
            "You've specified 'onClose' on a modal when using ModalLauncher.  Please specify 'onClose' on the ModalLauncher instead",
        );
    });

    test("testId should be added to both ModalPanel and CloseButton elements", () => {
        // Arrange
        const wrapper = mount(
            <ModalPanel content="dummy content" testId="test-id" />,
        );

        // Act
        const mainElement = wrapper.find(View).first();
        const closeButton = wrapper.find(CloseButton);

        // Assert
        expect(mainElement.prop("testId")).toBe("test-id-panel");
        expect(closeButton.prop("testId")).toBe("test-id-close");
    });
});
