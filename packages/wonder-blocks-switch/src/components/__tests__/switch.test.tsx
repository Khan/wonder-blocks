import * as React from "react";
import {render, screen} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
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

        test("clicking a label for the switch should call onChange", () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(
                <>
                    <Switch
                        id="switch-id"
                        checked={false}
                        onChange={onChangeSpy}
                    />
                    <label htmlFor="switch-id">Switch</label>
                </>,
            );

            // Act
            const label = screen.getByText("Switch");
            label.click();

            // Assert
            expect(onChangeSpy).toHaveBeenCalled();
        });
    });

    describe("setting attributes", () => {
        it("should set the accessibility attributes accordingly", () => {
            // Arrange
            render(
                <Switch aria-label="Gravity" checked={true} disabled={true} />,
            );

            // Act
            const switchComponent = screen.getByRole("switch");

            // Assert
            expect(switchComponent).toHaveAttribute("aria-label", "Gravity");
            expect(switchComponent).toHaveProperty("checked", true);
        });

        it("should render an icon if one is provided", () => {
            // Arrange
            render(
                <Switch
                    checked={false}
                    icon={<Icon icon={icons.add} testId="test-icon" />}
                />,
            );

            // Act
            const icon = screen.getByTestId("test-icon");

            // Assert
            expect(icon).toBeInTheDocument();
        });
    });
});
