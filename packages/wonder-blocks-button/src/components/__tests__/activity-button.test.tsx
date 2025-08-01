import * as React from "react";
import {render, screen} from "@testing-library/react";

import {ActivityButton} from "../activity-button";

describe("ActivityButton", () => {
    describe("attributes", () => {
        test("no explicit role for anchor with href", () => {
            // Arrange
            render(<ActivityButton href="/">Text</ActivityButton>);

            // Act
            const link = screen.getByRole("link");

            // Assert
            expect(link).not.toHaveAttribute("role");
        });

        test("no explicit link role for anchor with href", () => {
            // Arrange
            render(<ActivityButton href="/">Text</ActivityButton>);

            // Act
            const link = screen.getByRole("link");

            // Assert
            expect(link).not.toHaveAttribute("role", "link");
        });

        test("no explicit role for button", () => {
            // Arrange
            render(<ActivityButton>Text</ActivityButton>);

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(button).not.toHaveAttribute("role");
        });

        test("no explicit button role for button element", () => {
            // Arrange
            render(<ActivityButton>Text</ActivityButton>);

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(button).not.toHaveAttribute("role", "button");
        });

        test("allow other explicit roles", () => {
            // Arrange
            render(<ActivityButton role="tab">Tab</ActivityButton>);

            // Act
            const tab = screen.getByRole("tab");

            // Assert
            expect(tab).toHaveAttribute("role");
        });
    });
});
