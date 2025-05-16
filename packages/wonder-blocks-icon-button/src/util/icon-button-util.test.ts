import {targetPixelsForSize} from "./icon-button-util";

describe("targetPixelsForSize", () => {
    test.each`
        size        | expectedTargetPixels
        ${"xsmall"} | ${24}
        ${"small"}  | ${32}
        ${"medium"} | ${40}
        ${"large"}  | ${48}
    `(
        "should return $expectedTargetPixels for $size icon button",
        ({size, expectedTargetPixels}) => {
            expect(targetPixelsForSize(size)).toBe(expectedTargetPixels);
        },
    );
});
