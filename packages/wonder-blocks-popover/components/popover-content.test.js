// @flow
import * as React from "react";

import {mount} from "../../../utils/testing/mount.js";
import expectRenderError from "../../../utils/testing/expect-render-error.js";

import PopoverContent from "./popover-content.js";
import PopoverContext from "./popover-context.js";

describe("PopoverContent", () => {
    it("should close the popover from the actions", () => {
        // Arrange
        const onCloseMock = jest.fn();

        const wrapper = mount(
            <PopoverContent
                onClose={onCloseMock}
                title="Title"
                content="content"
                actions={({close}) => (
                    <button data-close-button onClick={close}>
                        close popover
                    </button>
                )}
            />,
        );

        // Act
        wrapper.find("[data-close-button]").simulate("click");

        // Assert
        expect(onCloseMock).toBeCalled();
    });

    it("should warn when setting PopoverContext.Provider and onClose together", () => {
        expectRenderError(
            <PopoverContext.Provider value={{close: () => {}}}>
                <PopoverContent
                    title="title"
                    content="content"
                    onClose={() => {}}
                />
                ,
            </PopoverContext.Provider>,
            "You've specified 'onClose' on the content when using Popover. Please specify 'onClose' on the Popover instead",
        );
    });
});
