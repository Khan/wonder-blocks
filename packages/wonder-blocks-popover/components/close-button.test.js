// @flow
import * as React from "react";

import {mount} from "../../../utils/testing/mount.js";

import CloseButton from "./close-button.js";
import PopoverContext from "./popover-context.js";

describe("CloseButton", () => {
    test("PopoverContext.Provider and onClose should warn", () => {
        // Arrange
        const noop = () => {};

        const nodes = (
            <PopoverContext.Provider value={{close: noop}}>
                <CloseButton light={false} onClose={noop} />,
            </PopoverContext.Provider>
        );

        // Act
        const underTest = () => mount(nodes);

        // Assert
        expect(underTest).toThrowError(
            "You've specified 'onClose' on the content when using Popover. Please specify 'onClose' on the Popover instead",
        );
    });
});
