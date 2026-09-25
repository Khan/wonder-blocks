import * as React from "react";
import {act, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import type {View} from "react-native";

import {Button} from "../button";
import {NativeThemeProvider} from "../../theme/native-theme";

// These tests render through react-native-web (see the `react-native`
// mapping in config/jest/test.config.js), so they exercise the same
// component code and the same `react-native-css` runtime that run on device,
// but against the DOM.
describe("Button (native, react-native-css)", () => {
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

    describe("Styles from button.module.css", () => {
        it.each([
            ["default", "32px"],
            ["thunderblocks", "26px"],
        ] as const)(
            "should use the %s theme's small height (%s)",
            (theme, height) => {
                // Arrange, Act
                render(
                    <NativeThemeProvider theme={theme}>
                        <Button size="small" testId="button">
                            Continue
                        </Button>
                    </NativeThemeProvider>,
                );

                // Assert
                expect(screen.getByTestId("button")).toHaveStyle({height});
            },
        );

        it("should apply the kind × actionType colours", () => {
            // Arrange, Act
            render(
                <NativeThemeProvider theme="thunderblocks">
                    <Button
                        kind="secondary"
                        actionType="progressive"
                        testId="button"
                    >
                        Continue
                    </Button>
                </NativeThemeProvider>,
            );

            // Assert
            expect(screen.getByTestId("button")).toHaveStyle({
                backgroundColor: "rgb(235, 241, 253)",
                borderTopColor: "rgba(191,202,255,1.00)",
            });
        });

        it("should give the label the button's colour", () => {
            // Arrange, Act
            render(
                <NativeThemeProvider theme="thunderblocks">
                    <Button kind="secondary">Continue</Button>
                </NativeThemeProvider>,
            );

            // Assert
            expect(screen.getByText("Continue")).toHaveStyle({
                color: "rgb(87, 83, 250)",
            });
        });

        it("should keep line-height in px (works around a react-native-css bug)", () => {
            // Arrange, Act
            render(
                <NativeThemeProvider theme="thunderblocks">
                    <Button>Continue</Button>
                </NativeThemeProvider>,
            );

            // Assert
            expect(screen.getByText("Continue")).toHaveStyle({
                lineHeight: "24px",
            });
        });

        it("should apply the hover rules on hover", async () => {
            // Arrange
            render(
                <NativeThemeProvider theme="thunderblocks">
                    <Button kind="secondary" testId="button">
                        Continue
                    </Button>
                </NativeThemeProvider>,
            );

            // Act
            await userEvent.hover(screen.getByTestId("button"));

            // Assert
            expect(screen.getByTestId("button")).toHaveStyle({
                borderTopColor: "rgba(108,130,255,1.00)",
            });
        });

        it("should apply the :active rules while pressed", async () => {
            // Arrange
            render(
                <NativeThemeProvider theme="thunderblocks">
                    <Button kind="tertiary" testId="button">
                        Continue
                    </Button>
                </NativeThemeProvider>,
            );
            const button = screen.getByTestId("button");
            act(() => button.focus());

            // Act
            // (Keyboard, because react-native-web's press responder doesn't
            // see jsdom's synthetic pointer events.)
            await userEvent.keyboard("{Enter>}");

            // Assert
            expect(button).toHaveStyle({borderTopLeftRadius: "12px"});
        });

        it("should apply the disabled rules", () => {
            // Arrange, Act
            render(
                <NativeThemeProvider theme="thunderblocks">
                    <Button disabled={true} testId="button">
                        Continue
                    </Button>
                </NativeThemeProvider>,
            );

            // Assert
            expect(screen.getByTestId("button")).toHaveStyle({
                backgroundColor: "rgb(224, 224, 225)",
            });
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
