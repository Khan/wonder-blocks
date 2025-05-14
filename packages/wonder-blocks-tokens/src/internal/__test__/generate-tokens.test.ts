import {generateTokens} from "../generate-tokens";

describe("generateTokens", () => {
    it("should generate tokens", () => {
        // Arrange
        const obj = {
            semanticColor: {
                primary: "red",
                secondary: "blue",
            },
        };

        // Act
        const cssVars = generateTokens(obj);

        // Assert
        expect(cssVars).toStrictEqual({
            "--wb-semanticColor-primary": "red",
            "--wb-semanticColor-secondary": "blue",
        });
    });

    it("should not generate tokens in empty objects", () => {
        // Arrange
        const obj = {
            semanticColor: {
                primary: {},
                secondary: "blue",
            },
        };

        // Act
        const cssVars = generateTokens(obj);

        // Assert
        expect(cssVars).toStrictEqual({
            "--wb-semanticColor-secondary": "blue",
        });
    });

    it("should set the prefix correctly", () => {
        // Arrange
        const obj = {
            semanticColor: {
                primary: "red",
                secondary: "blue",
            },
        };

        // Act
        const cssVars = generateTokens(obj, "--wb-custom-prefix-");

        // Assert
        expect(cssVars).toStrictEqual({
            "--wb-custom-prefix-semanticColor-primary": "red",
            "--wb-custom-prefix-semanticColor-secondary": "blue",
        });
    });
});
