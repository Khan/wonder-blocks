// @flow
import * as React from "react";
import {mount} from "enzyme";

import OnePaneDialog from "../one-pane-dialog.js";

describe("OnePaneDialog", () => {
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

    test("role can be overriden to alertdialog", () => {
        // Arrange
        const wrapper = mount(
            <OnePaneDialog
                title="Dialog with multi-step footer"
                content="dummy content"
                testId="one-pane-dialog-example"
                role="alertdialog"
            />,
        );

        // Act
        const dialog = wrapper.find(`[role="alertdialog"]`).first();

        // Assert
        expect(dialog).toHaveLength(1);
    });
});
