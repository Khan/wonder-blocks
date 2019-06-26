// @flow
import * as React from "react";

import expectRenderError from "../../../utils/testing/expect-render-error.js";
import CloseButton from "./close-button.js";
import PopoverContext from "./popover-context.js";

describe("CloseButton", () => {
    test("PopoverContext.Provider and onClose should warn", () => {
        expectRenderError(
            <PopoverContext.Provider value={{close: () => {}}}>
                <CloseButton light={false} onClose={() => {}} />,
            </PopoverContext.Provider>,
            "You've specified 'onClose' on the content when using Popover. Please specify 'onClose' on the Popover instead",
        );
    });
});
