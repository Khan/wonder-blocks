// @flow
import {getPathForIcon, viewportPixelsForSize} from "./icon-util.js";

import type {IconSize, IconAsset} from "./icon-assets.js";

const SIZES = ["small", "medium", "large", "xlarge"];

const DUMMY_ICON_MEDIUM_ONLY = {
    medium: "[MEDIUM SVG PATH]",
};

const DUMMY_ICON_WITH_EVERYTHING_ON_IT: IconAsset = {
    small: "[SMALL SVG PATH]",
    medium: "[MEDIUM SVG PATH]",
    large: "[LARGE SVG PATH]",
    xlarge: "[XLARGE SVG PATH]",
};

describe("getPathForIcon", () => {
    test("return the path for the correct size, if available", () => {
        SIZES.forEach((size) => {
            const {path, assetSize} = getPathForIcon(
                DUMMY_ICON_WITH_EVERYTHING_ON_IT,
                size,
            );
            expect(
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
            };
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
        SIZES.forEach((size) => {
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
        const iconAsset: IconAsset = ({}: any);

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
