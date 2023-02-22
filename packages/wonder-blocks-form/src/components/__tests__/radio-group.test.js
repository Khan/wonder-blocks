//@flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RadioGroup from "../radio-group";
import Choice from "../choice";

describe("RadioGroup", () => {
    const TestComponent = ({
        errorMessage,
        onChange,
    }: {|
        errorMessage?: string,
        onChange?: () => mixed,
    |}) => {
        const [selectedValue, setSelectedValue] = React.useState("a");
        const handleChange = (selectedValue) => {
            setSelectedValue(selectedValue);
            onChange?.();
        };
        return (
            <RadioGroup
                label="Test"
                description="test description"
                groupName="test"
                onChange={handleChange}
                selectedValue={selectedValue}
                errorMessage={errorMessage}
            >
                <Choice label="a" value="a" aria-labelledby="test-a" />
                <Choice label="b" value="b" aria-labelledby="test-b" />
                <Choice label="c" value="c" aria-labelledby="test-c" />
            </RadioGroup>
        );
    };

    describe("behavior", () => {
        it("selects only one item at a time", () => {
            // Arrange, Act
            render(<TestComponent />);

            const radios = screen.getAllByRole("radio");

            // Assert
            // a starts off checked
            expect(radios[0]).toBeChecked();
            expect(radios[1]).not.toBeChecked();
            expect(radios[2]).not.toBeChecked();
        });

        it("changes selection when selectedValue changes", () => {
            // Arrange
            render(<TestComponent />);

            const radios = screen.getAllByRole("radio");

            // Act
            userEvent.click(radios[1]);

            // Assert
            // a starts off checked
            expect(radios[0]).not.toBeChecked();
            expect(radios[1]).toBeChecked();
            expect(radios[2]).not.toBeChecked();
        });

        it("should set aria-invalid on choices when there's an error message", () => {
            // Arrange, Act
            render(<TestComponent errorMessage="there's an error" />);

            const radios = screen.getAllByRole("radio");

            // Assert
            expect(radios[0]).toHaveAttribute("aria-invalid", "true");
            expect(radios[1]).toHaveAttribute("aria-invalid", "true");
            expect(radios[2]).toHaveAttribute("aria-invalid", "true");
        });

        it("doesn't change when an already selected item is reselected", () => {
            // Arrange
            const handleChange = jest.fn();
            render(<TestComponent onChange={handleChange} />);

            const radios = screen.getAllByRole("radio");

            // Act
            // a is already selected, onChange shouldn't be called
            userEvent.click(radios[0]);

            // Assert
            expect(handleChange).toHaveBeenCalledTimes(0);
        });

        it("checks that aria attributes have been added correctly", () => {
            // Arrange, Act
            render(<TestComponent />);

            const radios = screen.getAllByRole("radio");

            // Assert
            expect(radios[0]).toHaveAttribute("aria-labelledby", "test-a");
            expect(radios[1]).toHaveAttribute("aria-labelledby", "test-b");
            expect(radios[2]).toHaveAttribute("aria-labelledby", "test-c");
        });
    });

    describe("flexible props", () => {
        it("should render with a React.Node label", () => {
            // Arrange, Act
            render(
                <RadioGroup
                    label={
                        <span>
                            label with <strong>strong</strong> text
                        </span>
                    }
                    groupName="test"
                    onChange={() => {}}
                    selectedValue={"a"}
                >
                    <Choice label="a" value="a" aria-labelledby="test-a" />
                    <Choice label="b" value="b" aria-labelledby="test-b" />
                    <Choice label="c" value="c" aria-labelledby="test-c" />
                </RadioGroup>,
            );

            // Assert
            expect(screen.getByText("strong")).toBeInTheDocument();
        });

        it("should render with a React.Node description", () => {
            // Arrange, Act
            render(
                <RadioGroup
                    label="label"
                    description={
                        <span>
                            description with <strong>strong</strong> text
                        </span>
                    }
                    groupName="test"
                    onChange={() => {}}
                    selectedValue={"a"}
                >
                    <Choice label="a" value="a" aria-labelledby="test-a" />
                    <Choice label="b" value="b" aria-labelledby="test-b" />
                    <Choice label="c" value="c" aria-labelledby="test-c" />
                </RadioGroup>,
            );

            // Assert
            expect(screen.getByText("strong")).toBeInTheDocument();
        });

        it("should filter out false-y children when rendering", () => {
            // Arrange, Act
            render(
                <RadioGroup
                    label="label"
                    description="description"
                    groupName="test"
                    onChange={() => {}}
                    selectedValue={"a"}
                >
                    <Choice label="a" value="a" aria-labelledby="test-a" />
                    {false && (
                        <Choice label="b" value="b" aria-labelledby="test-b" />
                    )}
                    <Choice label="c" value="c" aria-labelledby="test-c" />
                    {undefined}
                    {null}
                </RadioGroup>,
            );

            // Assert
            const radios = screen.getAllByRole("radio");

            expect(radios).toHaveLength(2);
        });
    });
});
