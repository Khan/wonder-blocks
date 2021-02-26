// @flow
import {fade, mix} from "../utils.js";

const INVALID_COLORS = ["#NOTVALID", "#12345", "#12", "#ABCDEFG", ""];

describe("mix", () => {
    test("color is not a string, throws", () => {
        // Arrange
        const color = ((null: any): string);

        // Act
        const underTest = () => mix(color, "#FFF");

        // Assert
        expect(underTest).toThrowErrorMatchingSnapshot();
    });

    test("background is not a string, throws", () => {
        // Arrange
        const background = ((null: any): string);

        // Act
        const underTest = () => mix("#FFF", background);

        // Assert
        expect(underTest).toThrowErrorMatchingSnapshot();
    });

    test("color is not a valid string format, throws", () => {
        // Arrange
        const testpoints = INVALID_COLORS;

        // Act
        for (const testpoint of testpoints) {
            const underTest = () => mix(testpoint, "#FFF");
            expect(underTest).toThrowErrorMatchingSnapshot();
        }
    });

    test("background is not a valid string format, throws", () => {
        // Arrange
        const testpoints = INVALID_COLORS;

        // Act
        for (const testpoint of testpoints) {
            const underTest = () => mix("#FFF", testpoint);
            expect(underTest).toThrowErrorMatchingSnapshot();
        }
    });

    test("color has no alpha, returns color with background alpha", () => {
        // Arrange
        const testpoints = [
            ["#000", "#abc", "#000000"],
            ["#FFFFFF", "rgba(10,20,30,0.5)", "rgba(255,255,255,0.50)"],
            ["rgb(200,200,190)", "rgba(0,0,0,0.23)", "rgba(200,200,190,0.23)"],
            ["rgba(0,0,0,1)", "#1D3baa", "#000000"],
            ["#ABC", "rgba(0,0,0,1)", "#aabbcc"],
        ];

        for (const [color, background, expectation] of testpoints) {
            // Act
            const result = mix(color, background);

            // Assert
            expect(result).toBe(expectation);
        }
    });

    test("color has alpha, returns mix with background alpha", () => {
        // Arrange
        const testpoints = [
            ["rgba(100,100,100,0.2)", "#FFF", "#e0e0e0"],
            ["rgba(100,100,100,0.2)", "rgba(0,0,0,0.5)", "rgba(20,20,20,0.50)"],
            ["rgba(0,0,0,0.25)", "#fFfFfF", "#bfbfbf"],
            ["rgba(0,0,0,0.25)", "rgb(255,255,0)", "#bfbf00"],
            ["rgba(100,200,100,0.25)", "rgb(255,255,0)", "#d8f119"],
        ];

        for (const [color, background, expectation] of testpoints) {
            // Act
            const result = mix(color, background);

            // Assert
            expect(result).toBe(expectation);
        }
    });
});

describe("fade", () => {
    test("color is not a string, throws", () => {
        // Arrange
        const color = ((null: any): string);

        // Act
        const underTest = () => fade(color, 0.2);

        // Assert
        expect(underTest).toThrowErrorMatchingSnapshot();
    });

    test("color is not a valid string format, throws", () => {
        // Arrange
        const testpoints = INVALID_COLORS;

        // Act
        for (const testpoint of testpoints) {
            const underTest = () => fade(testpoint, 0.5);
            expect(underTest).toThrowErrorMatchingSnapshot();
        }
    });

    test("percentage is negative, throws", () => {
        // Arrange
        const percentage = -1;

        // Act
        const underTest = () => fade("#FFFFFF", percentage);

        // Assert
        expect(underTest).toThrowErrorMatchingSnapshot();
    });

    test("percentage is greater than 1, throws", () => {
        // Arrange
        const percentage = 1.1;

        // Act
        const underTest = () => fade("#FFFFFF", percentage);

        // Assert
        expect(underTest).toThrowErrorMatchingSnapshot();
    });

    test("3 digit # color, returns faded color", () => {
        // Arrange
        const color = "#ABC";

        // Act
        const result = fade(color, 0.5);

        // Assert
        expect(result).toBe("rgba(170,187,204,0.50)");
    });

    test("6 digit # color, returns faded color", () => {
        // Arrange
        const color = "#AABBCC";

        // Act
        const result = fade(color, 0.5);

        // Assert
        expect(result).toBe("rgba(170,187,204,0.50)");
    });

    test("rgb color, returns faded color", () => {
        // Arrange
        const color = "rgb(100,200,0)";

        // Act
        const result = fade(color, 0.5);

        // Assert
        expect(result).toBe("rgba(100,200,0,0.50)");
    });

    test("rgba color without 100% alpha, returns faded color", () => {
        // Arrange
        const color = "rgba(100,200,0, 1)";

        // Act
        const result = fade(color, 0.5);

        // Assert
        expect(result).toBe("rgba(100,200,0,0.50)");
    });

    test("rgba color with less than 100% alpha, returns faded color", () => {
        // Arrange
        const color = "rgba(100,200,0, 0.6)";

        // Act
        const result = fade(color, 0.5);

        // Assert
        expect(result).toBe("rgba(100,200,0,0.30)");
    });
});
