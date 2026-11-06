import * as React from "react";
import {render, screen} from "@testing-library/react";
import {TextField} from "@khanacademy/wonder-blocks-form";

import LabeledField from "../labeled-field";

describe("data-wb-component", () => {
    it("should set the LabeledField name on the root element", () => {
        // Arrange
        render(
            <LabeledField
                field={<TextField value="" onChange={() => {}} />}
                label="Label"
                testId="root"
            />,
        );

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "LabeledField");
    });

    it("should keep the TextField name on the field", () => {
        // Arrange
        render(
            <LabeledField
                field={<TextField value="" onChange={() => {}} />}
                label="Label"
            />,
        );

        // Act
        const field = screen.getByRole("textbox");

        // Assert
        expect(field).toHaveAttribute("data-wb-component", "TextField");
    });
});
