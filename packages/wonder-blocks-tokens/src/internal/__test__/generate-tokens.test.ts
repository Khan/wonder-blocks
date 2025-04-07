import {generateTokens} from "../generate-tokens";

describe("generateTokens", () => {
    it("should generate tokens", () => {
        // Arrange
        const obj = {
            primary: "red",
            secondary: "blue",
        };

        // Act
        const cssVars = generateTokens(obj);

        // Assert
        expect(cssVars).toStrictEqual({
            "--wb-s-color-primary": "red",
            "--wb-s-color-secondary": "blue",
        });
    });

    it("should not generate tokens in empty objects", () => {
        // Arrange
        const obj = {
            primary: {},
            secondary: "blue",
        };

        // Act
        const cssVars = generateTokens(obj);

        // Assert
        expect(cssVars).toStrictEqual({
            "--wb-s-color-secondary": "blue",
        });
    });
});
