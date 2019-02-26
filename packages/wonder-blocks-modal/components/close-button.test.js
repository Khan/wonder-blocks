// @flow
import * as React from "react";

import expectRenderError from "../../../utils/testing/expect-render-error.js";
import CloseButton from "./close-button.js";
import ModalContext from "./modal-context.js";

describe("CloseButton", () => {
    test("ModalContext.Provider and onClose should warn", () => {
        expectRenderError(
            <ModalContext.Provider value={{closeModal: () => {}}}>
                <CloseButton light={false} onClose={() => {}} />,
            </ModalContext.Provider>,
            "You've specified 'onClose' on a modal when using ModalLauncher.  Please specify 'onClose' on the ModalLauncher instead",
        );
    });
});
