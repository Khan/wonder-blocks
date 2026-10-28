import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import type {View} from "react-native";

import {Button} from "../button";
import {NativeThemeProvider} from "../../theme/native-theme";

// These tests render through react-native-web (see the `react-native`
// mapping in config/jest/test.config.js), so they exercise the same
// component code that runs on device, but against the DOM.
describe("Button (native)", () => {
    describe("Base", () => {
        it("should forward the ref", () => {
            // Arrange
            const ref = React.createRef<View>();

            // Act
            render(<Button ref={ref}>Label</Button>);

            // Assert
            expect(ref.current).toBeTruthy();
        });

        it("should render the label", () => {
            // Arrange, Act
            render(<Button>Continue</Button>);

            // Assert
            expect(
                screen.getByRole("button", {name: "Continue"}),
            ).toBeInTheDocument();
        });
    });

    describe("Event Handlers", () => {
        it("should call onPress when pressed", async () => {
            // Arrange
            const onPress = jest.fn();
            render(<Button onPress={onPress}>Continue</Button>);

            // Act
            await userEvent.click(screen.getByRole("button"));

            // Assert
            expect(onPress).toHaveBeenCalledTimes(1);
        });

        it("should not call onPress when disabled", async () => {
            // Arrange
            const onPress = jest.fn();
            render(
                <Button disabled={true} onPress={onPress}>
                    Continue
                </Button>,
            );

            // Act
            // react-native-web sets `pointer-events: none` on disabled
            // pressables; click anyway to prove the handler is inert.
            await userEvent
                .setup({pointerEventsCheck: 0})
                .click(screen.getByRole("button"));

            // Assert
            expect(onPress).not.toHaveBeenCalled();
        });
    });

    describe("Accessibility", () => {
        it("should have no a11y violations", async () => {
            // Arrange, Act
            const {container} = render(
                <NativeThemeProvider theme="syl-dark">
                    <Button>Continue</Button>
                </NativeThemeProvider>,
            );

            // Assert
            await expect(container).toHaveNoA11yViolations();
        });

        it("should set aria-disabled when disabled", () => {
            // Arrange, Act
            render(<Button disabled={true}>Continue</Button>);

            // Assert
            expect(screen.getByRole("button")).toHaveAttribute(
                "aria-disabled",
                "true",
            );
        });

        it("should use aria-label as the accessible name", () => {
            // Arrange, Act
            render(<Button aria-label="Continue to lesson 2">Next</Button>);

            // Assert
            expect(
                screen.getByRole("button", {name: "Continue to lesson 2"}),
            ).toBeInTheDocument();
        });
    });
});
