/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render, screen} from "@testing-library/react";

import Checkbox from "../checkbox";
import CheckboxGroup from "../checkbox-group";
import Choice from "../choice";
import LabeledTextField from "../labeled-text-field";
import RadioGroup from "../radio-group";
import TextArea from "../text-area";
import TextField from "../text-field";

describe("data-wb-component", () => {
    it.each([
        ["Checkbox", <Checkbox key="1" checked={false} onChange={() => {}} />],
        [
            "Choice",
            <Choice
                key="2"
                label="Choice"
                value="choice"
                variant="checkbox"
                checked={false}
                onChange={() => {}}
            />,
        ],
        [
            "Choice",
            <Choice
                key="3"
                label="Choice"
                value="choice"
                variant="radio"
                checked={false}
                onChange={() => {}}
            />,
        ],
        ["TextArea", <TextArea key="4" value="" onChange={() => {}} />],
        [
            "LabeledTextField",
            // eslint-disable-next-line import/no-deprecated
            <LabeledTextField
                key="5"
                label="Label"
                value=""
                onChange={() => {}}
            />,
        ],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        const {container} = render(element);

        // Act
        // NOTE: The root element doesn't expose a role or a test id (they
        // are applied to the input).
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });

    it("should not set the name on the input of a Checkbox", () => {
        // Arrange
        render(<Checkbox checked={false} onChange={() => {}} />);

        // Act
        const input = screen.getByRole("checkbox");

        // Assert
        expect(input).not.toHaveAttribute("data-wb-component");
    });

    it("should set the TextField name on the input", () => {
        // Arrange
        render(<TextField value="" onChange={() => {}} />);

        // Act
        const input = screen.getByRole("textbox");

        // Assert
        expect(input).toHaveAttribute("data-wb-component", "TextField");
    });

    it.each([
        [
            "CheckboxGroup",
            <CheckboxGroup
                key="1"
                groupName="group"
                selectedValues={[]}
                onChange={() => {}}
                testId="root"
            >
                <Choice label="Choice" value="choice" />
                <Choice label="Choice 2" value="choice-2" />
            </CheckboxGroup>,
        ],
        [
            "RadioGroup",
            <RadioGroup
                key="2"
                groupName="group"
                selectedValue=""
                onChange={() => {}}
                testId="root"
            >
                <Choice label="Choice" value="choice" />
                <Choice label="Choice 2" value="choice-2" />
            </RadioGroup>,
        ],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        render(element);

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });
});
