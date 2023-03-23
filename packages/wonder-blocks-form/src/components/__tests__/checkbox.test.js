//@flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import Checkbox from "../checkbox";

describe("Checkbox", () => {
    test("uses the ID prop when it is specified", () => {
        // Arrange, Act
        render(
            <Checkbox
                id="specified-checkbox-id"
                label="Receive assignment reminders for Algebra"
                description="You will receive a reminder 24 hours before each deadline"
                checked={false}
                onChange={() => {}}
            />,
        );

        const checkbox = screen.getByRole("checkbox");

        // Assert
        expect(checkbox).toHaveAttribute("id", "specified-checkbox-id");
    });

    test("provides a unique ID when the ID prop is not specified", () => {
        // Arrange, Act
        render(
            <Checkbox
                label="Receive assignment reminders for Algebra"
                description="You will receive a reminder 24 hours before each deadline"
                checked={false}
                onChange={() => {}}
            />,
        );

        const checkbox = screen.getByRole("checkbox");

        // Assert
        expect(checkbox).toHaveAttribute("id", "uid-choice-1-main");
    });

    test("clicking the checkbox triggers `onChange`", () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <Checkbox
                label="Receive assignment reminders for Algebra"
                description="You will receive a reminder 24 hours before each deadline"
                checked={false}
                onChange={onChangeSpy}
            />,
        );

        // Act
        const checkbox = screen.getByRole("checkbox");
        checkbox.click();

        // Assert
        expect(onChangeSpy).toHaveBeenCalled();
    });

    test("clicks the label triggers `onChange`", () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <Checkbox
                label="Receive assignment reminders for Algebra"
                description="You will receive a reminder 24 hours before each deadline"
                checked={false}
                onChange={onChangeSpy}
            />,
        );

        // Act
        const checkboxLabel = screen.getByText(
            "Receive assignment reminders for Algebra",
        );
        checkboxLabel.click();

        // Assert
        expect(onChangeSpy).toHaveBeenCalled();
    });
});
