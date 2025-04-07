/**
 * Tests for Wonder Blocks Button with icons.
 * The rest of the button tests can be found in button.test.tsx.
 */

import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import plus from "@phosphor-icons/core/regular/plus.svg";

import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import {color} from "@khanacademy/wonder-blocks-tokens";

import Button from "../button";

describe("button with icon", () => {
    test("start icon should be hidden from Screen Readers", async () => {
        // Arrange
        render(
            <Button testId={"button-focus-test"} startIcon={plus}>
                Label
            </Button>,
        );

        // Act
        const icon = await screen.findByTestId("button-focus-test-start-icon");

        // Assert
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    test("end icon should be hidden from Screen Readers", async () => {
        // Arrange
        render(
            <Button testId={"button-focus-test"} endIcon={plus}>
                Label
            </Button>,
        );

        // Act
        const icon = await screen.findByTestId("button-focus-test-end-icon");

        // Assert
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    /**
     * Primary button
     */

    test("icon is displayed when button contains startIcon", async () => {
        // Arrange
        render(
            <Button testId={"button-focus-test"} startIcon={plus}>
                Label
            </Button>,
        );

        // Act
        const icon = await screen.findByTestId("button-focus-test-start-icon");

        // Assert
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    test("icon is displayed when button contains endIcon", async () => {
        // Arrange
        render(
            <Button testId={"button-focus-test"} endIcon={plus}>
                Label
            </Button>,
        );

        // Act
        const icon = await screen.findByTestId("button-focus-test-end-icon");

        // Assert
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    test("both icons are displayed when button contains startIcon and endIcon", async () => {
        // Arrange
        render(
            <Button
                testId={"button-focus-test"}
                startIcon={plus}
                endIcon={plus}
            >
                Label
            </Button>,
        );

        // Act
        const startIcon = await screen.findByTestId(
            "button-focus-test-start-icon",
        );
        const endIcon = await screen.findByTestId("button-focus-test-end-icon");

        // Assert
        expect(startIcon).toBeInTheDocument();
        expect(endIcon).toBeInTheDocument();
    });

    /**
     * Secondary button
     */

    test("icon is displayed when secondary button contains startIcon", async () => {
        // Arrange
        render(
            <Button
                kind="secondary"
                testId={"button-icon-test"}
                startIcon={plus}
            >
                Label
            </Button>,
        );

        // Act
        const icon = await screen.findByTestId("button-icon-test-start-icon");

        // Assert
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    test("icon is displayed when secondary button contains endIcon", async () => {
        // Arrange
        render(
            <Button kind="secondary" testId={"button-icon-test"} endIcon={plus}>
                Label
            </Button>,
        );

        // Act
        const icon = await screen.findByTestId("button-icon-test-end-icon");

        // Assert
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    test("default theme secondary button icon has no hover style", async () => {
        // Arrange
        render(
            <Button kind="secondary" testId={"button-icon-test"} endIcon={plus}>
                Label
            </Button>,
        );

        // Act
        const button = await screen.findByTestId("button-icon-test");
        const iconWrapper = await screen.findByTestId(
            "button-icon-test-end-icon-wrapper",
        );
        await userEvent.hover(button);

        // Assert
        expect(iconWrapper).toHaveStyle(`backgroundColor: transparent`);
    });

    test("Khanmigo secondary button icon has hover style", async () => {
        // Arrange
        render(
            <ThemeSwitcherContext.Provider value="khanmigo">
                <Button
                    kind="secondary"
                    testId={"button-icon-test"}
                    endIcon={plus}
                >
                    Label
                </Button>
            </ThemeSwitcherContext.Provider>,
        );

        // Act
        const button = await screen.findByTestId("button-icon-test");
        const iconWrapper = await screen.findByTestId(
            "button-icon-test-end-icon-wrapper",
        );
        await userEvent.hover(button);

        // Assert
        expect(iconWrapper).toHaveStyle(
            `backgroundColor: ${color.fadedBlue16}`,
        );
    });

    /**
     * Tertiary button
     */

    test("icon is displayed when tertiary button contains startIcon", async () => {
        // Arrange
        render(
            <Button
                kind="tertiary"
                testId={"button-focus-test"}
                startIcon={plus}
            >
                Label
            </Button>,
        );

        // Act
        const icon = await screen.findByTestId("button-focus-test-start-icon");

        // Assert
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    test("icon is displayed when tertiary button contains endIcon", async () => {
        // Arrange
        render(
            <Button kind="tertiary" testId={"button-focus-test"} endIcon={plus}>
                Label
            </Button>,
        );

        // Act
        const icon = await screen.findByTestId("button-focus-test-end-icon");

        // Assert
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });
});
