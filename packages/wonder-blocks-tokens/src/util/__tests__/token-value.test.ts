import {border, font, semanticColor, sizing} from "../../index";
import {tokenValue} from "../token-value";

// The CSS variable name that `semanticColor.core.foreground.instructive.default`
// resolves to at runtime. Used to seed the computed style for the token we're
// looking up so the tests don't depend on the generated stylesheet being loaded.
const INSTRUCTIVE_FOREGROUND_VAR =
    "--wb-semanticColor-core-foreground-instructive-default";
const SIZING_160_VAR = "--wb-sizing-size_160";
const FONT_FAMILY_SANS_VAR = "--wb-font-family-sans";
const BORDER_WIDTH_THIN_VAR = "--wb-border-width-thin";

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

    it("resolves a sizing token to its computed value", () => {
        // Arrange
        document.documentElement.style.setProperty(SIZING_160_VAR, "1.6rem");

        // Act
        const result = tokenValue(sizing.size_160);

        // Assert
        expect(result).toBe("1.6rem");
    });

    it("resolves a font token to its computed value", () => {
        // Arrange
        document.documentElement.style.setProperty(
            FONT_FAMILY_SANS_VAR,
            '"Lato", sans-serif',
        );

        // Act
        const result = tokenValue(font.family.sans);

        // Assert
        expect(result).toBe('"Lato", sans-serif');
    });

    it("resolves a border token to its computed value", () => {
        // Arrange
        document.documentElement.style.setProperty(
            BORDER_WIDTH_THIN_VAR,
            "1px",
        );

        // Act
        const result = tokenValue(border.width.thin);

        // Assert
        expect(result).toBe("1px");
    });

    it("resolves a sizing token against a specific element for theme scoping", () => {
        // Arrange
        document.documentElement.style.setProperty(SIZING_160_VAR, "1.6rem");
        const scoped = document.createElement("div");
        scoped.style.setProperty(SIZING_160_VAR, "2rem");
        document.body.appendChild(scoped);

        // Act
        const result = tokenValue(sizing.size_160, scoped);

        // Assert
        expect(result).toBe("2rem");
        scoped.remove();
    });
});
