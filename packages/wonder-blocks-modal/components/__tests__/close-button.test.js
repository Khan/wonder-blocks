// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../../utils/testing/mount.js";
import expectRenderError from "../../../../utils/testing/expect-render-error.js";
import CloseButton from "../close-button.js";
import ModalContext from "../modal-context.js";

describe("CloseButton", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("ModalContext.Provider and onClose should warn", () => {
        expectRenderError(
            <ModalContext.Provider value={{closeModal: () => {}}}>
                <CloseButton light={false} onClick={() => {}} />,
            </ModalContext.Provider>,
            "You've specified 'onClose' on a modal when using ModalLauncher.  Please specify 'onClose' on the ModalLauncher instead",
        );
    });

    test("testId should be set in the Icon element", () => {
        // Arrange
        const wrapper = mount(
            <ModalContext.Provider value={{closeModal: () => {}}}>
                <CloseButton testId="modal-example-close" />,
            </ModalContext.Provider>,
        );

        // Act
        const closeButton = wrapper.find(CloseButton);

        // Assert
        expect(closeButton.prop("testId")).toBe("modal-example-close");
    });
});
