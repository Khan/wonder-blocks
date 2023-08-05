import * as React from "react";
import {render, screen} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Switch from "../switch";

describe("Switch", () => {
    describe("trigger switch callback", () => {
        test("clicking the switch should call onChange", () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(<Switch checked={false} onChange={onChangeSpy} />);

            // Act
            const switchComponent = screen.getByRole("switch");
            switchComponent.click();

            // Assert
            expect(onChangeSpy).toHaveBeenCalled();
        });

        test("clicking the label should call onChange", () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(
                <Switch
                    label="Gravity"
                    checked={false}
                    onChange={onChangeSpy}
                />,
            );

            // Act
            const label = screen.getByText("Gravity");
            label.click();

            // Assert
            expect(onChangeSpy).toHaveBeenCalled();
        });

        test("clicking a disabled switch should not call onChange", () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(
                <Switch
                    checked={false}
                    onChange={onChangeSpy}
                    disabled={true}
                />,
            );

            // Act
            const switchComponent = screen.getByRole("switch");
            switchComponent.click();

            // Assert
            expect(onChangeSpy).not.toHaveBeenCalled();
        });

        test("pressing the space key should call onChange", () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(<Switch checked={false} onChange={onChangeSpy} />);

            // Act
            const switchComponent = screen.getByRole("switch");
            userEvent.tab();
            userEvent.type(switchComponent, " ");

            // Assert
            expect(onChangeSpy).toHaveBeenCalled();
        });

        test("pressing the enter key should call onChange", () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(<Switch checked={false} onChange={onChangeSpy} />);

            // Act
            const switchComponent = screen.getByRole("switch");
            userEvent.type(switchComponent, "{enter}");

            // Assert
            expect(onChangeSpy).toHaveBeenCalled();
        });
    });

    describe("accessibility attributes", () => {
        it("should set the aria-checked attribute to true when checked is true", () => {
            // Arrange
            render(
                <Switch label="Gravity" checked={true} onChange={() => {}} />,
            );

            // Act
            const switchComponent = screen.getByRole("switch");

            // Assert
            expect(switchComponent).toHaveAttribute("aria-checked", "true");
        });
        it("should set the aria-checked attribute to false when checked is false", () => {
            // Arrange
            render(
                <Switch label="Gravity" checked={false} onChange={() => {}} />,
            );

            // Act
            const switchComponent = screen.getByRole("switch");

            // Assert
            expect(switchComponent).toHaveAttribute("aria-checked", "false");
        });

        it("should set the aria-label if a label is provided", () => {
            // Arrange
            render(
                <Switch
                    ariaLabel="Gravity"
                    checked={false}
                    onChange={() => {}}
                />,
            );

            // Act
            const switchComponent = screen.getByRole("switch");

            // Assert
            expect(switchComponent).toHaveAttribute("aria-label", "Gravity");
        });
    });
});
