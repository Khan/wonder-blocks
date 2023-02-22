// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import expectRenderError from "../../../../../utils/testing/expect-render-error";
import CloseButton from "../close-button";
import ModalContext from "../modal-context";

describe("CloseButton", () => {
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
        render(
            <div>
                <ModalContext.Provider value={{closeModal: () => {}}}>
                    <CloseButton testId="modal-example-close" />,
                </ModalContext.Provider>
            </div>,
        );

        // Act
        const closeButton = screen.getByRole("button");

        // Assert
        expect(closeButton).toHaveAttribute(
            "data-test-id",
            "modal-example-close",
        );
    });
});
