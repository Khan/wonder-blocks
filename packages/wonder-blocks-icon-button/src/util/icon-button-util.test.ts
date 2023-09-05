import {iconSizeForButtonSize, targetPixelsForSize} from "./icon-button-util";

describe("iconSizeForButtonSize", () => {
    test("should return the correct icon size for a given icon button size", () => {
        expect(iconSizeForButtonSize("xsmall")).toBe("small");
        expect(iconSizeForButtonSize("small")).toBe("medium");
        expect(iconSizeForButtonSize("medium")).toBe("medium");
    });
});

describe("targetPixelsForSize", () => {
    test("should return the correct target size for a given icon button size", () => {
        expect(targetPixelsForSize("xsmall")).toBe(24);
        expect(targetPixelsForSize("small")).toBe(32);
        expect(targetPixelsForSize("medium")).toBe(40);
    });
});
