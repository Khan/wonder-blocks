import {mapValuesToCssVars} from "../map-values-to-css-vars";

describe("mapValuesToCssVars", () => {
    it("should map values to css vars", () => {
        // Arrange
        const obj = {
            color: {
                primary: "red",
                secondary: "blue",
            },
        };

        // Act
        const cssVars = mapValuesToCssVars(obj);

        // Assert
        expect(cssVars).toStrictEqual({
            color: {
                primary: "var(--wb-color-primary)",
                secondary: "var(--wb-color-secondary)",
            },
        });
    });

    it("should not map values in empty objects", () => {
        // Arrange
        const obj = {
            color: {
                primary: {},
                secondary: "blue",
            },
        };

        // Act
        const cssVars = mapValuesToCssVars(obj);

        // Assert
        expect(cssVars).toStrictEqual({
            color: {
                primary: {},
                secondary: "var(--wb-color-secondary)",
            },
        });
    });
});
