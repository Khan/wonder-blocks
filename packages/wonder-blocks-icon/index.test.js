// @flow
import {
    getPathForIcon,
    viewportPixelsForSize,
} from "@khanacademy/wonder-blocks-icon/util/icon-util.js";

import type {IconSize} from "@khanacademy/wonder-blocks-icon/util/icon-assets.js";

const SIZES = ["small", "medium", "large", "xlarge"];

const DUMMY_ICON_MEDIUM_ONLY = {
    medium: "[MEDIUM SVG PATH]",
};

const DUMMY_ICON_WITH_EVERYTHING_ON_IT = {
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
});

describe("viewportPixelsForSize", () => {
    test("return the correct values", () => {
        expect(viewportPixelsForSize("small")).toBe(16);
        expect(viewportPixelsForSize("medium")).toBe(24);
        expect(viewportPixelsForSize("large")).toBe(48);
        expect(viewportPixelsForSize("xlarge")).toBe(96);
    });
});
