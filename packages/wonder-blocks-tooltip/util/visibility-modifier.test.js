// @flow
import Popper from "popper.js";
import visibilityModifierDefaultConfig from "./visibility-modifier.js";

describe("Visibility PopperJS Modifier", () => {
    test("returns a modifier configuration", () => {
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
        test("TODO", () => {

        });
    });
});
