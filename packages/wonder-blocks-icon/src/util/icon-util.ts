import type {IconAsset, IconSize} from "./icon-assets";

/**
 * A simple function that tells us how many viewport pixels each icon size
 * corresponds to.
 */
export const viewportPixelsForSize = (size: IconSize): number =>
    ({
        xsmall: 16,
        small: 20,
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
): {
    assetSize: IconSize;
    path: string;
} => {
    if (typeof icon[size] === "number") {
        // Great, we have the IconSize we actually requested
        // @ts-expect-error [FEI-5019] - TS2322 - Type 'string | undefined' is not assignable to type 'string'.
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
        // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'string' is not assignable to parameter of type 'keyof IconAsset'. | TS2345 - Argument of type 'string' is not assignable to parameter of type 'keyof IconAsset'.
        const assetSizes = availableSizes.sort((a, b) => sortFn(a) - sortFn(b));
        const bestAssetSize = assetSizes[0];
        // @ts-expect-error [FEI-5019] - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'IconAsset'.
        if (bestAssetSize && icon[bestAssetSize]) {
            // @ts-expect-error [FEI-5019] - TS2322 - Type 'string' is not assignable to type 'keyof IconAsset'. | TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'IconAsset'.
            return {assetSize: bestAssetSize, path: icon[bestAssetSize]};
        } else {
            throw new Error("Icon does not contain any valid asset sizes!");
        }
    }
};
