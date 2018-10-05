// @flow
import React from "react";

import expectRenderError from "../../../utils/testing/expect-render-error.js";
import ModalPanel from "./modal-panel.js";
import ModalContext from "./modal-context.js";

describe("ModalPanel", () => {
    test("ModalContext.Provider and onClose should warn", () => {
        expectRenderError(
            <ModalContext.Provider value={{closeModal: () => {}}}>
                <ModalPanel
                    content="Hello, world"
                    onClose={() => {}}
                    showCloseButton={true}
                />
            </ModalContext.Provider>,
            "You've specified 'onClose' on a modal when using ModalLauncher.  Please specify 'onClose' on the ModalLauncher instead",
        );
    });
});
