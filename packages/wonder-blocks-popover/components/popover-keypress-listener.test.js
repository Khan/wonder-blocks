// @flow
import * as React from "react";

import {shallow} from "enzyme";

import PopoverKeypressListener from "./popover-keypress-listener.js";

describe("PopoverKeypressListener", () => {
    it("should call onClose if Escape is pressed", () => {
        // Arrange
        const onCloseMock = jest.fn();

        shallow(<PopoverKeypressListener onClose={onCloseMock} />);

        // Act
        const event = new KeyboardEvent("keyup", {key: "Escape"});
        window.dispatchEvent(event);

        // Assert
        expect(onCloseMock).toHaveBeenCalled();
    });
});
