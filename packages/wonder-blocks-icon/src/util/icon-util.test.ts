import {getPathForIcon, viewportPixelsForSize} from "./icon-util";

import type {IconSize, IconAsset} from "./icon-assets";

const SIZES = ["small", "medium", "large", "xlarge"];

const DUMMY_ICON_MEDIUM_ONLY = {
    medium: "[MEDIUM SVG PATH]",
} as const;

const DUMMY_ICON_WITH_EVERYTHING_ON_IT: IconAsset = {
    small: "[SMALL SVG PATH]",
    medium: "[MEDIUM SVG PATH]",
    large: "[LARGE SVG PATH]",
    xlarge: "[XLARGE SVG PATH]",
};

describe("getPathForIcon", () => {
    test("return the path for the correct size, if available", () => {
        SIZES.forEach((size: any) => {
            const {path, assetSize} = getPathForIcon(
                DUMMY_ICON_WITH_EVERYTHING_ON_IT,
                size,
            );
            expect(
                // @ts-expect-error [FEI-5019] - TS7053 - Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'IconAsset'.
                path === DUMMY_ICON_WITH_EVERYTHING_ON_IT[size] &&
                    assetSize === size,
            ).toBeTruthy();
        });
    });

    test("scale up a small asset rather than scaling down a large one", () => {
        const expectValueForSize = (
            requestedSize: IconSize,
            returnedSize: IconSize,
        ) => {
            const iconMissingRequestedSize = {
                ...DUMMY_ICON_WITH_EVERYTHING_ON_IT,
            } as const;
            delete iconMissingRequestedSize[requestedSize];
            expect(
                getPathForIcon(iconMissingRequestedSize, requestedSize),
            ).toMatchObject({
                assetSize: returnedSize,
                path: DUMMY_ICON_WITH_EVERYTHING_ON_IT[returnedSize],
            });
        };
        expectValueForSize("small", "medium");
        expectValueForSize("medium", "small");
        expectValueForSize("large", "medium");
        expectValueForSize("xlarge", "large");
    });

    test("return a path as long as at least one size is available", () => {
        SIZES.forEach((size: any) => {
            const {path, assetSize} = getPathForIcon(
                DUMMY_ICON_MEDIUM_ONLY,
                size,
            );
            expect(
                path === DUMMY_ICON_MEDIUM_ONLY["medium"] &&
                    assetSize === "medium",
            ).toBeTruthy();
        });
    });

    test("no valid asset sizes, throws", () => {
        // Arrange
        const iconAsset: IconAsset = {} as any;

        // Act
        const underTest = () => getPathForIcon(iconAsset, "medium");

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"Icon does not contain any valid asset sizes!"`,
        );
    });
});

describe("viewportPixelsForSize", () => {
    test("return the correct values", () => {
        expect(viewportPixelsForSize("small")).toBe(16);
        expect(viewportPixelsForSize("medium")).toBe(24);
        expect(viewportPixelsForSize("large")).toBe(48);
        expect(viewportPixelsForSize("xlarge")).toBe(96);
    });
});
