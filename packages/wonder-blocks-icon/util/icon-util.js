// @flow
import type {IconAsset, IconSize} from "./icon-assets.js";

/**
 * A simple function that tells us how many viewport pixels each icon size
 * corresponds to.
 */
export const viewportPixelsForSize = (size: IconSize): number =>
    ({
        small: 16,
        medium: 24,
        large: 48,
        xlarge: 96,
    }[size]);

/**
 * A utility to find the right asset from an IconAsset to display in an icon
 * at a given IconSize. We're looking for, in the following order:
 *   1. The path for the IconSize (e.g. small, medium) requested
 *   2. A path that's _smaller_ than the size we requested
 *   3. Any path (what remains is one for a larger IconSize)
 *
 * The goal here is to provide a path that looks good at the given size...
 * obviously, if the size that we want is provided, we'll use it. Otherwise we'd
 * rather blow up a smaller, simpler icon than scrunch down a more complex one.
 */
export const getPathForIcon = (
    icon: IconAsset,
    size: IconSize,
): {|
    assetSize: IconSize,
    path: string,
|} => {
    if (icon[size]) {
        // Great, we have the IconSize we actually requested
        return {assetSize: size, path: icon[size]};
    } else {
        // Oh, no, we don't have the right IconSize! Let's find the next best
        // one...we prefer to find a smaller icon and blow it up instead of
        // using a larger icon and shrinking it such that detail may be lost.
        const desiredPixelSize = viewportPixelsForSize(size);
        const availableSizes = Object.keys(icon);
        const sortFn = (availableSize: IconSize) => {
            const availablePixelSize = viewportPixelsForSize(availableSize);
            const tooLargeByPixels = availablePixelSize - desiredPixelSize;
            return tooLargeByPixels > 0
                ? Number.POSITIVE_INFINITY
                : Math.abs(tooLargeByPixels);
        };
        const assetSizes = availableSizes.sort((a, b) => sortFn(a) - sortFn(b));
        const bestAssetSize = assetSizes[0];
        if (bestAssetSize && icon[bestAssetSize]) {
            return {assetSize: bestAssetSize, path: icon[bestAssetSize]};
        } else {
            throw new Error("Icon does not contain any valid asset sizes!");
        }
    }
};
