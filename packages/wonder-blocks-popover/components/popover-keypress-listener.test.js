// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../utils/testing/mount.js";

import PopoverKeypressListener from "./popover-keypress-listener.js";

describe("PopoverKeypressListener", () => {
    afterEach(() => {
        unmountAll();
    });

    it("should call onClose if Escape is pressed", () => {
        // Arrange
        const onCloseMock = jest.fn();

        mount(<PopoverKeypressListener onClose={onCloseMock} />);

        // Act
        const event = new KeyboardEvent("keyup", {key: "Escape"});
        window.dispatchEvent(event);

        // Assert
        expect(onCloseMock).toHaveBeenCalled();
    });
});
