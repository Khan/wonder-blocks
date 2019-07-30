// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../../utils/testing/mount.js";

import OnePaneDialog from "./one-pane-dialog.js";

describe("OnePaneDialog", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("testId should be set in the Dialog element", () => {
        // Arrange
        const wrapper = mount(
            <OnePaneDialog
                title="Dialog with multi-step footer"
                content="dummy content"
                testId="one-pane-dialog-example"
            />,
        );

        // Act
        const dialog = wrapper.find(`[role="dialog"]`).first();

        // Assert
        expect(dialog.prop("testId")).toBe("one-pane-dialog-example");
    });
});
