import tokens from "../../tokens";
import {mergeTheme} from "../merge-theme";

describe("mergeTheme", () => {
    it("should return the source theme if the target is empty", () => {
        // Arrange
        const themeDefault = {
            color: {
                bg: {
                    default: "#ffffff",
                    primary: "#0000ff",
                },
            },
            spacing: {
                small: 4,
                medium: 8,
            },
        };
        const themeOverride = {};

        // Act
        const result = mergeTheme(themeDefault, themeOverride);

        // Assert
        expect(result).toEqual(themeDefault);
    });

    it("should merge two themes", () => {
        // Arrange
        const themeDefault = {
            color: {
                blue: "#0000f0",
                green: "#00ff00",
            },
            spacing: {
                medium: 8,
                large: 16,
            },
        };

        const themeOverride = {
            color: {
                blue: "#0000ff",
                red: "#ff0000",
            },
            spacing: {
                small: 4,
                medium: 8,
            },
        };

        // Act
        const result = mergeTheme(themeDefault, themeOverride);

        // Assert
        expect(result).toEqual({
            color: {
                blue: "#0000ff",
                green: "#00ff00",
                red: "#ff0000",
            },
            spacing: {
                small: 4,
                medium: 8,
                large: 16,
            },
        });
    });

    it("should override the global tokens", () => {
        // Arrange
        const themeDefault = tokens;

        // Only override the blue color
        const themeOverride = {
            color: {
                blue: "#0000ff",
            },
        };

        // Act
        const result = mergeTheme(themeDefault, themeOverride);

        // Assert
        expect(result.color.blue).toEqual("#0000ff");
    });
});
