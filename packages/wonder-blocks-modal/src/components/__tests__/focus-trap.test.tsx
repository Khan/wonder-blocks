import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import Button from "@khanacademy/wonder-blocks-button";
import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";

import FocusTrap from "../focus-trap";

describe("FocusTrap", () => {
    it("Focus should move to the first focusable element", async () => {
        // Arrange
        render(
            <>
                <FocusTrap>
                    <RadioGroup
                        label="some-label"
                        description="some-description"
                        groupName="some-group-name"
                        onChange={() => {}}
                        selectedValue={""}
                    >
                        <Choice
                            label="first option"
                            value="some-choice-value"
                        />
                        <Choice
                            label="second option"
                            value="some-choice-value-2"
                            description="Some choice description."
                        />
                    </RadioGroup>
                    <Button>A button</Button>
                </FocusTrap>
                <Button>An external button</Button>
            </>,
        );

        // Initial focused element
        const firstRadioButton = await screen.findByRole("radio", {
            name: /first option/i,
        });
        firstRadioButton.focus();

        // Act
        // focus on the button
        await userEvent.tab();
        // focus on the last sentinel
        await userEvent.tab();

        // Assert
        // Redirect focus to the first radiobutton.
        expect(firstRadioButton).toHaveFocus();
    });

    it("Focus should move to the last focusable element", async () => {
        // Arrange
        render(
            <>
                <FocusTrap>
                    <RadioGroup
                        label="some-label"
                        description="some-description"
                        groupName="some-group-name"
                        onChange={() => {}}
                        selectedValue={""}
                    >
                        <Choice
                            label="first option"
                            value="some-choice-value"
                        />
                        <Choice
                            label="second option"
                            value="some-choice-value-2"
                            description="Some choice description."
                        />
                    </RadioGroup>
                    <Button>A focusable button</Button>
                </FocusTrap>
                <Button>An external button</Button>
            </>,
        );

        // Initial focused element
        const firstRadioButton = await screen.findByRole("radio", {
            name: /first option/i,
        });
        firstRadioButton.focus();

        // Act
        // focus on the first sentinel
        await userEvent.tab({shift: true});

        // Assert
        // Redirect focus to the button.
        expect(
            await screen.findByRole("button", {name: "A focusable button"}),
        ).toHaveFocus();
    });
});
