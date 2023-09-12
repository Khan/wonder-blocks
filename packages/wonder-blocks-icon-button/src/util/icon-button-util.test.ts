import {iconSizeForButtonSize, targetPixelsForSize} from "./icon-button-util";

describe("iconSizeForButtonSize", () => {
    test.each`
        buttonSize  | expectedIconSize
        ${"xsmall"} | ${"small"}
        ${"small"}  | ${"medium"}
        ${"medium"} | ${"medium"}
    `(
        "should return $expectedIconSize icon for $buttonSize icon button",
        ({buttonSize, expectedIconSize}) => {
            expect(iconSizeForButtonSize(buttonSize)).toBe(expectedIconSize);
        },
    );
});

describe("targetPixelsForSize", () => {
    test.each`
        size        | expectedTargetPixels
        ${"xsmall"} | ${24}
        ${"small"}  | ${32}
        ${"medium"} | ${40}
    `(
        "should return $expectedTargetPixels for $size icon button",
        ({size, expectedTargetPixels}) => {
            expect(targetPixelsForSize(size)).toBe(expectedTargetPixels);
        },
    );
});
