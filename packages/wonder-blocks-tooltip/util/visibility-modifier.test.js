// @flow
import Popper from "popper.js";
import visibilityModifierDefaultConfig from "./visibility-modifier.js";

describe("Visibility PopperJS Modifier", () => {
    test("returns an enabled modifier configuration with expected order", () => {
        // Arrange
        // Act
        const result = visibilityModifierDefaultConfig;

        // Assert
        expect(result).toMatchObject({
            enabled: true,
            fn: expect.any(Function),
            order: Popper.Defaults.modifiers.hide.order + 1,
        });
    });

    describe("#fn", () => {
        describe("Obscured by one or more scroll parents", () => {
            test("Obscured horizontally only, is not visible", () => {
                // Arrange
                // Act
                // Assert
            });

            test("Obscured vertically only, is not visible", () => {
                // Arrange
                // Act
                // Assert
            });

            test("Obscured totally, is not visible", () => {
                // Arrange
                // Act
                // Assert
            });
        });

        describe("Obscured by fixed or absolute components", () => {
            test("Upper-left obscured, is visible", () => {
                // Arrange
                // Act
                // Assert
            });

            test("Only lower-right obscured, is visible", () => {
                // Arrange
                // Act
                // Assert
            });

            test("Upper-left and lower-right obscured, is not visible", () => {
                // Arrange
                // Act
                // Assert
            });
        });

        test("Not obscured by parent nor fixed/absolute positioning", () => {
            // Arrange
            // Act
            // Assert
        });
    });
});
