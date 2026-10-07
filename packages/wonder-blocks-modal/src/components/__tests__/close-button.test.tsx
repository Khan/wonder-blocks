import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    WonderBlocksConfigProvider,
    defaultStringsEn,
} from "@khanacademy/wonder-blocks-config";

import expectRenderError from "../../../../../utils/testing/expect-render-error";
import CloseButton from "../close-button";
import ModalContext from "../modal-context";

describe("CloseButton", () => {
    test("ModalContext.Provider and onClose should warn", () => {
        expectRenderError(
            <ModalContext.Provider value={{closeModal: () => {}}}>
                <CloseButton onClick={() => {}} />,
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
            "data-testid",
            "modal-example-close",
        );
    });

    test("should use the default aria-label", () => {
        // Arrange
        render(<CloseButton />);

        // Act
        const closeButton = screen.getByRole("button");

        // Assert
        expect(closeButton).toHaveAccessibleName("Close modal");
    });

    test("should use the aria-label from the config provider", () => {
        // Arrange
        render(
            <WonderBlocksConfigProvider
                i18n={{
                    strings: {
                        ...defaultStringsEn,
                        iconAltCloseModal: "translated text",
                    },
                    locale: "es",
                }}
            >
                <CloseButton />
            </WonderBlocksConfigProvider>,
        );

        // Act
        const closeButton = screen.getByRole("button");

        // Assert
        expect(closeButton).toHaveAccessibleName("translated text");
    });
});
