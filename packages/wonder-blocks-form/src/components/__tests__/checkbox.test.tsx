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

    test.each`
        indeterminateValue | checkedValue
        ${true}            | ${null}
        ${false}           | ${true}
        ${false}           | ${false}
    `(
        "sets the indeterminate property to $indeterminateValue when checked is $checkedValue (with ref)",
        ({indeterminateValue, checkedValue}) => {
            // Arrange
            const ref = React.createRef<HTMLInputElement>();

            // Act
            render(
                <Checkbox
                    label="Some label"
                    description="Some description"
                    checked={checkedValue}
                    onChange={() => {}}
                    ref={ref}
                />,
            );

            // Assert
            expect(ref?.current?.indeterminate).toBe(indeterminateValue);
        },
    );

    test.each`
        indeterminateValue | checkedValue
        ${true}            | ${null}
        ${false}           | ${true}
        ${false}           | ${false}
    `(
        "sets the indeterminate property to $indeterminateValue when checked is $checkedValue (without ref)",
        ({indeterminateValue, checkedValue}) => {
            // Arrange
            render(
                <Checkbox
                    label="Some label"
                    description="Some description"
                    checked={checkedValue}
                    onChange={() => {}}
                />,
            );

            // Act
            const inputElement = screen.getByRole(
                "checkbox",
            ) as HTMLInputElement;

            // Assert
            expect(inputElement.indeterminate).toBe(indeterminateValue);
        },
    );
});
