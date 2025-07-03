import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import CheckboxGroup from "../checkbox-group";
import Choice from "../choice";

describe("CheckboxGroup", () => {
    describe("a11y", () => {
        it("should associate the label with the fieldset", async () => {
            // Arrange, Act
            render(
                <CheckboxGroup
                    label="Test label"
                    groupName="test"
                    onChange={() => {}}
                    selectedValues={[]}
                >
                    <Choice label="a" value="a" aria-labelledby="test-a" />
                    <Choice label="b" value="b" aria-labelledby="test-b" />
                    <Choice label="c" value="c" aria-labelledby="test-c" />
                </CheckboxGroup>,
            );

            const fieldset = screen.getByRole("group", {name: /test label/i});

            // Assert
            expect(fieldset).toBeInTheDocument();
        });
    });

    describe("behavior", () => {
        const TestComponent = ({errorMessage}: {errorMessage?: string}) => {
            const [selectedValues, setSelectedValue] = React.useState([
                "a",
                "b",
            ]);
            const handleChange = (selectedValues: any) => {
                setSelectedValue(selectedValues);
            };
            return (
                <CheckboxGroup
                    label="Test"
                    description="test description"
                    groupName="test"
                    onChange={handleChange}
                    selectedValues={selectedValues}
                    errorMessage={errorMessage}
                >
                    <Choice label="a" value="a" aria-labelledby="test-a" />
                    <Choice label="b" value="b" aria-labelledby="test-b" />
                    <Choice label="c" value="c" aria-labelledby="test-c" />
                </CheckboxGroup>
            );
        };

        it("has the correct items checked", async () => {
            // Arrange, Act
            render(<TestComponent />);

            const checkboxes = screen.getAllByRole("checkbox");

            // Assert
            // a starts off checked
            expect(checkboxes[0]).toBeChecked();
            expect(checkboxes[1]).toBeChecked();
            expect(checkboxes[2]).not.toBeChecked();
        });

        it("clicking a selected choice deselects it", async () => {
            // Arrange
            render(<TestComponent />);

            const checkboxes = screen.getAllByRole("checkbox");

            // Act
            await userEvent.click(checkboxes[0]);

            // Assert
            expect(checkboxes[0]).not.toBeChecked();
            expect(checkboxes[1]).toBeChecked();
            expect(checkboxes[2]).not.toBeChecked();
        });

        it("should set aria-invalid on choices when there's an error message", async () => {
            // Arrange, Act
            render(<TestComponent errorMessage="there's an error" />);

            const checkboxes = screen.getAllByRole("checkbox");

            // Assert
            expect(checkboxes[0]).toHaveAttribute("aria-invalid", "true");
            expect(checkboxes[1]).toHaveAttribute("aria-invalid", "true");
            expect(checkboxes[2]).toHaveAttribute("aria-invalid", "true");
        });

        it("checks that aria attributes have been added correctly", async () => {
            // Arrange, Act
            render(<TestComponent />);

            const checkboxes = screen.getAllByRole("checkbox");

            // Assert
            expect(checkboxes[0]).toHaveAttribute("aria-labelledby", "test-a");
            expect(checkboxes[1]).toHaveAttribute("aria-labelledby", "test-b");
            expect(checkboxes[2]).toHaveAttribute("aria-labelledby", "test-c");
        });
    });

    describe("flexible props", () => {
        it("should render with a React.Node label", async () => {
            // Arrange, Act
            render(
                <CheckboxGroup
                    label={
                        <span>
                            label with <strong>strong</strong> text
                        </span>
                    }
                    groupName="test"
                    onChange={() => {}}
                    selectedValues={[]}
                >
                    <Choice label="a" value="a" aria-labelledby="test-a" />
                    <Choice label="b" value="b" aria-labelledby="test-b" />
                    <Choice label="c" value="c" aria-labelledby="test-c" />
                </CheckboxGroup>,
            );

            // Assert
            expect(await screen.findByText("strong")).toBeInTheDocument();
        });

        it("should render with a React.Node description", async () => {
            // Arrange, Act
            render(
                <CheckboxGroup
                    label="label"
                    description={
                        <span>
                            description with <strong>strong</strong> text
                        </span>
                    }
                    groupName="test"
                    onChange={() => {}}
                    selectedValues={[]}
                >
                    <Choice label="a" value="a" aria-labelledby="test-a" />
                    <Choice label="b" value="b" aria-labelledby="test-b" />
                    <Choice label="c" value="c" aria-labelledby="test-c" />
                </CheckboxGroup>,
            );

            // Assert
            expect(await screen.findByText("strong")).toBeInTheDocument();
        });

        it("should filter out false-y children when rendering", async () => {
            // Arrange, Act
            render(
                <CheckboxGroup
                    label="label"
                    description="description"
                    groupName="test"
                    onChange={() => {}}
                    selectedValues={[]}
                >
                    <Choice label="a" value="a" aria-labelledby="test-a" />
                    {/* eslint-disable-next-line no-constant-condition */}
                    {false ? (
                        <Choice label="b" value="b" aria-labelledby="test-b" />
                    ) : null}
                    <Choice label="c" value="c" aria-labelledby="test-c" />
                    {undefined}
                    {null}
                </CheckboxGroup>,
            );

            // Assert
            const checkboxes = screen.getAllByRole("checkbox");

            expect(checkboxes).toHaveLength(2);
        });
    });
});
