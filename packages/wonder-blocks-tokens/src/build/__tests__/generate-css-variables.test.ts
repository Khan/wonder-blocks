import {graphicsPalette} from "../../index";
import {graphicsPalette as graphicsPaletteValues} from "../../theme/semantic/internal/primitive-color-thunderblocks";
import {generateGraphicsPaletteDefinitions} from "../generate-css-variables";

describe("generateGraphicsPaletteDefinitions", () => {
    it("should define the variables on the :root selector only", () => {
        // Arrange

        // Act
        const result = generateGraphicsPaletteDefinitions();

        // Assert
        expect(result).toMatch(/^:root \{[^{}]*\}$/);
    });

    it("should define each palette color with its hex value", () => {
        // Arrange

        // Act
        const result = generateGraphicsPaletteDefinitions();

        // Assert
        expect(result).toContain(
            `--wb-graphicsPalette-blue_30: ${graphicsPaletteValues.blue_30};`,
        );
    });

    it("should define one variable per palette color", () => {
        // Arrange

        // Act
        const result = generateGraphicsPaletteDefinitions();

        // Assert
        expect(result.match(/--wb-graphicsPalette-/g)).toHaveLength(
            Object.keys(graphicsPaletteValues).length,
        );
    });

    it("should define every variable that the graphicsPalette export references", () => {
        // Arrange
        const css = generateGraphicsPaletteDefinitions();

        // Act
        const undefinedVariables = Object.values(graphicsPalette)
            .map((token) => token.match(/^var\((--[^)]+)\)$/)?.[1])
            .filter((name) => !name || !css.includes(`${name}:`));

        // Assert
        expect(undefinedVariables).toEqual([]);
    });
});
