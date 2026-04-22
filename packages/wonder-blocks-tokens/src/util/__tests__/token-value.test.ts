import {semanticColor} from "../../index";
import {tokenValue} from "../token-value";

// The CSS variable name that `semanticColor.core.foreground.instructive.default`
// resolves to at runtime. Used to seed the computed style for the token we're
// looking up so the tests don't depend on the generated stylesheet being loaded.
const INSTRUCTIVE_FOREGROUND_VAR =
    "--wb-semanticColor-core-foreground-instructive-default";

describe("tokenValue", () => {
    afterEach(() => {
        // Reset any inline custom properties we set during a test.
        document.documentElement.style.cssText = "";
    });

    it("resolves a semanticColor token to its computed value on :root", () => {
        // Arrange
        document.documentElement.style.setProperty(
            INSTRUCTIVE_FOREGROUND_VAR,
            "#1865f2",
        );

        // Act
        const result = tokenValue(
            semanticColor.core.foreground.instructive.default,
        );

        // Assert
        expect(result).toBe("#1865f2");
    });

    it("resolves a semanticColor token against a specific element for theme scoping", () => {
        // Arrange
        document.documentElement.style.setProperty(
            INSTRUCTIVE_FOREGROUND_VAR,
            "#1865f2",
        );
        const scoped = document.createElement("div");
        scoped.style.setProperty(INSTRUCTIVE_FOREGROUND_VAR, "#ffff00");
        document.body.appendChild(scoped);

        // Act
        const result = tokenValue(
            semanticColor.core.foreground.instructive.default,
            scoped,
        );

        // Assert
        expect(result).toBe("#ffff00");
        scoped.remove();
    });

    it("ignores a var() fallback and reads only the custom property", () => {
        // Arrange
        document.documentElement.style.setProperty(
            INSTRUCTIVE_FOREGROUND_VAR,
            "#1865f2",
        );

        // Act
        const result = tokenValue(
            `var(${INSTRUCTIVE_FOREGROUND_VAR}, #000000)`,
        );

        // Assert
        expect(result).toBe("#1865f2");
    });

    it("returns an empty string when the semanticColor token's CSS variable is not defined", () => {
        // Arrange
        const token = semanticColor.core.foreground.instructive.default;

        // Act
        const result = tokenValue(token);

        // Assert
        expect(result).toBe("");
    });

    it("returns a non-var() input unchanged", () => {
        // Arrange
        const token = "#1865f2";

        // Act
        const result = tokenValue(token);

        // Assert
        expect(result).toBe("#1865f2");
    });

    it("trims whitespace from the computed value", () => {
        // Arrange
        document.documentElement.style.setProperty(
            INSTRUCTIVE_FOREGROUND_VAR,
            "  #1865f2  ",
        );

        // Act
        const result = tokenValue(
            semanticColor.core.foreground.instructive.default,
        );

        // Assert
        expect(result).toBe("#1865f2");
    });
});
