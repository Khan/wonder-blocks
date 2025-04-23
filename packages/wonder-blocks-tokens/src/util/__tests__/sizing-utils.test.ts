import {remToPx, pxToRem} from "../sizing-utils";

describe("remToPx", () => {
    it("converts a REM value to pixels", () => {
        // Arrange
        const size = "1.2rem";

        // Act
        const result = remToPx(size);

        // Assert
        expect(result).toBe("12px");
    });

    it("takes a configurable baseline parameter", () => {
        // Arrange
        const size = "1.5rem";

        // Act
        const result = remToPx(size, 8);

        // Assert
        expect(result).toBe("12px");
    });
});

describe("pxToRem", () => {
    it("converts a pixel number value to REMs", () => {
        // Arrange
        const size = 40;

        // Act
        const result = pxToRem(size);

        // Assert
        expect(result).toBe("4rem");
    });

    it("takes a configurable baseline parameter", () => {
        // Arrange
        const size = 12;

        // Act
        const result = pxToRem(size, 8);

        // Assert
        expect(result).toBe("1.5rem");
    });
});
