import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownOpener from "../dropdown-opener";

describe("DropdownOpener", () => {
    describe("readOnly prop", () => {
        it("should set aria-disabled to true if readOnly is true", () => {
            // Arrange
            // Act
            render(
                <DropdownOpener
                    readOnly={true}
                    onClick={jest.fn()}
                    opened={false}
                    text="Custom opener"
                    role="combobox"
                >
                    {() => <div>Custom opener</div>}
                </DropdownOpener>,
            );

            // Assert
            expect(screen.getByRole("combobox")).toHaveAttribute(
                "aria-disabled",
                "true",
            );
        });

        it("should not set aria-disabled if readOnly is false", () => {
            // Arrange
            // Act
            render(
                <DropdownOpener
                    readOnly={false}
                    onClick={jest.fn()}
                    opened={false}
                    text="Custom opener"
                    role="combobox"
                >
                    {() => <div>Custom opener</div>}
                </DropdownOpener>,
            );

            // Assert
            expect(screen.getByRole("combobox")).not.toHaveAttribute(
                "aria-disabled",
            );
        });

        it("should not set aria-disabled if readOnly is not provided", () => {
            // Arrange
            // Act
            render(
                <DropdownOpener
                    onClick={jest.fn()}
                    opened={false}
                    text="Custom opener"
                    role="combobox"
                >
                    {() => <div>Custom opener</div>}
                </DropdownOpener>,
            );

            // Assert
            expect(screen.getByRole("combobox")).not.toHaveAttribute(
                "aria-disabled",
            );
        });

        it("should not call onClick if readOnly is true and the opener is clicked", async () => {
            // Arrange
            const onClick = jest.fn();
            render(
                <DropdownOpener
                    readOnly={true}
                    onClick={onClick}
                    opened={false}
                    text="Custom opener"
                    role="combobox"
                >
                    {() => <div>Custom opener</div>}
                </DropdownOpener>,
            );

            // Act
            await userEvent.click(screen.getByRole("combobox"));

            // Assert
            expect(onClick).not.toHaveBeenCalled();
        });

        it("should not call onClick if readOnly is true and the opener is pressed using the enter key", async () => {
            // Arrange
            const onClick = jest.fn();
            render(
                <DropdownOpener
                    readOnly={true}
                    onClick={onClick}
                    opened={false}
                    text="Custom opener"
                    role="combobox"
                >
                    {() => <div>Custom opener</div>}
                </DropdownOpener>,
            );

            // Act
            await userEvent.tab();
            await userEvent.keyboard("{Enter}");

            // Assert
            expect(onClick).not.toHaveBeenCalled();
        });

        it("should not call onClick if readOnly is true and the opener is pressed using the space key", async () => {
            // Arrange
            const onClick = jest.fn();
            render(
                <DropdownOpener
                    readOnly={true}
                    onClick={onClick}
                    opened={false}
                    text="Custom opener"
                    role="combobox"
                >
                    {() => <div>Custom opener</div>}
                </DropdownOpener>,
            );

            // Act
            await userEvent.tab();
            await userEvent.keyboard(" ");

            // Assert
            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe("Accessibility", () => {
        it("should set aria-label to the button when provided", () => {
            // Arrange
            render(
                <DropdownOpener
                    aria-label="Custom opener"
                    onClick={jest.fn()}
                    opened={false}
                    text="Custom opener"
                    role="combobox"
                >
                    {() => <div>Custom opener</div>}
                </DropdownOpener>,
            );

            // Assert
            expect(screen.getByRole("combobox")).toHaveAccessibleName(
                "Custom opener",
            );
        });
    });
});
