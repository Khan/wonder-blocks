import {
    cssDuration,
    cssEasing,
    motionTransition,
    toCssTree,
} from "../animation-utils";

describe("cssDuration", () => {
    it("formats a millisecond number as a CSS time string", () => {
        // Arrange
        const ms = 300;

        // Act
        const result = cssDuration(ms);

        // Assert
        expect(result).toBe("300ms");
    });

    it("formats a zero duration", () => {
        // Arrange, Act, Assert
        expect(cssDuration(0)).toBe("0ms");
    });
});

describe("cssEasing", () => {
    it("formats cubic-bézier control points as a cubic-bezier() string", () => {
        // Arrange
        const easing = [0.4, 0, 0.2, 1] as const;

        // Act
        const result = cssEasing(easing);

        // Assert
        expect(result).toBe("cubic-bezier(0.4, 0, 0.2, 1)");
    });
});

describe("motionTransition", () => {
    it("converts a raw animation token to seconds + a mutable bézier array", () => {
        // Arrange
        const token = {
            duration: 400,
            easing: [0.05, 0.7, 0.1, 1] as const,
            delay: 100,
        };

        // Act
        const result = motionTransition(token);

        // Assert
        expect(result).toEqual({
            duration: 0.4,
            ease: [0.05, 0.7, 0.1, 1],
            delay: 0.1,
        });
    });

    it("returns a new array rather than the token's readonly easing", () => {
        // Arrange
        const token = {
            duration: 200,
            easing: [0, 0, 1, 1] as const,
            delay: 0,
        };

        // Act
        const result = motionTransition(token);

        // Assert
        expect(result.ease).not.toBe(token.easing);
        expect(result.ease).toEqual([0, 0, 1, 1]);
    });
});

describe("toCssTree", () => {
    it("formats durations, easings, and nested tokens into CSS strings", () => {
        // Arrange
        const tree = {
            duration: {short: 150, long: 300},
            easing: {standard: [0.4, 0, 0.2, 1]},
            overlay: {
                enter: {
                    duration: 400,
                    easing: [0.05, 0.7, 0.1, 1],
                    delay: 0,
                },
            },
        };

        // Act
        const result = toCssTree(tree);

        // Assert
        expect(result).toEqual({
            duration: {short: "150ms", long: "300ms"},
            easing: {standard: "cubic-bezier(0.4, 0, 0.2, 1)"},
            overlay: {
                enter: {
                    duration: "400ms",
                    easing: "cubic-bezier(0.05, 0.7, 0.1, 1)",
                    delay: "0ms",
                },
            },
        });
    });
});
