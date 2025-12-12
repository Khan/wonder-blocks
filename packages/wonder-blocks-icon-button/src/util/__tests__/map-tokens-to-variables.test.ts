import {
    mapTokensToVariables,
    type TokensAsJsVariable,
} from "../map-tokens-to-variables";

describe("mapTokensToVariables", () => {
    it("maps camelCase tokens to CSS variable keys with a given prefix", () => {
        // Arrange
        const tokens: Partial<
            TokensAsJsVariable<"boxForeground" | "iconSize">
        > = {
            boxForeground: "#fff",
            iconSize: 24,
        };
        const prefix = "--wb-ib-node-";

        // Act
        const result = mapTokensToVariables(tokens, prefix);

        // Assert
        expect(result).toEqual({
            "--wb-ib-node-box-foreground": "#fff",
            "--wb-ib-node-icon-size": 24,
        });
    });

    it("returns an empty object for empty tokens", () => {
        // Arrange
        const tokens: Partial<TokensAsJsVariable<"box-background">> = {};
        const prefix = "--wb-ib-node-";

        // Act
        const result = mapTokensToVariables(tokens, prefix);

        // Assert
        expect(result).toEqual({});
    });

    it("handles boolean and number values correctly", () => {
        // Arrange
        const tokens: Partial<TokensAsJsVariable<"boxShadow" | "isActive">> = {
            boxShadow: 10,
            isActive: false,
        };
        const prefix = "--custom-";

        // Act
        const result = mapTokensToVariables(tokens, prefix);

        // Assert
        expect(result).toEqual({
            "--custom-box-shadow": 10,
            "--custom-is-active": false,
        });
    });

    it("preserves only properties present on the tokens object", () => {
        // Arrange
        const tokens: Partial<TokensAsJsVariable<"a" | "b" | "c">> = {
            a: 1,
        };
        const prefix = "--x-";

        // Act
        const result = mapTokensToVariables(tokens, prefix);

        // Assert
        expect(result).toEqual({
            "--x-a": 1,
        });
    });
});
