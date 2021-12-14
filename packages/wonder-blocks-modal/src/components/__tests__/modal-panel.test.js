// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";

import {View} from "@khanacademy/wonder-blocks-core";

import expectRenderError from "../../../../../utils/testing/expect-render-error.js";
import ModalPanel from "../modal-panel.js";
import ModalContext from "../modal-context.js";
import CloseButton from "../close-button.js";

describe("ModalPanel", () => {
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

    test("testId should be added to the panel wrapper", () => {
        // Arrange
        const wrapper = mount(
            <ModalPanel content="dummy content" testId="test-id" />,
        );

        // Act
        const mainElement = wrapper.find(View).first();

        // Assert
        expect(mainElement.prop("testId")).toBe("test-id-panel");
    });

    test("testId should be added to the CloseButton element", () => {
        // Arrange
        const wrapper = mount(
            <ModalPanel content="dummy content" testId="test-id" />,
        );

        // Act
        const closeButton = wrapper.find(CloseButton);

        // Assert
        expect(closeButton.prop("testId")).toBe("test-id-close");
    });
});
