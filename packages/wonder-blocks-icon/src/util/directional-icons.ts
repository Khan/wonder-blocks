import {MIRRORED_ICON_NAMES} from "./mirrored-icon-names";

/**
 * Weight suffixes that `@phosphor-icons/core` appends to the file name. The
 * `regular` weight has no suffix.
 */
const WEIGHT_SUFFIXES = [
    "-bold",
    "-fill",
    "-thin",
    "-light",
    "-duotone",
] as const;

/**
 * Extracts the Phosphor icon name from a resolved asset reference.
 *
 * The `icon` prop is whatever the bundler produced for the SVG import, so the
 * shape varies by environment:
 * - Vite dev server: `/node_modules/.../assets/regular/arrow-right.svg`
 * - rspack `asset/resource`: `/images/a1b2c3d4-arrow-right.svg`
 * - Jest transform: `arrow-right.svg`
 *
 * All of these end in `<name>[-weight].svg`, optionally behind a content hash
 * and a directory prefix, so the name is recovered from the final path
 * segment. Returns `undefined` when no name can be recovered — most notably
 * for `data:` URIs, which carry no file name at all.
 */
export function getPhosphorIconName(icon: string): string | undefined {
    if (!icon || icon.startsWith("data:")) {
        return undefined;
    }

    // Drop any query string or fragment the bundler may have appended.
    const path = icon.split(/[?#]/)[0];
    const basename = path.substring(path.lastIndexOf("/") + 1);

    if (!basename.toLowerCase().endsWith(".svg")) {
        return undefined;
    }

    const withoutExtension = basename.slice(0, -".svg".length);

    for (const suffix of WEIGHT_SUFFIXES) {
        if (withoutExtension.endsWith(suffix)) {
            return withoutExtension.slice(0, -suffix.length);
        }
    }

    return withoutExtension;
}

/**
 * Whether the given icon asset should be mirrored in right-to-left content.
 *
 * Bundlers may prefix the file name with a content hash (`asset/resource`
 * emits `[hash]-[name][ext]`), so rather than matching the whole name we test
 * successively shorter `-`-delimited suffixes against the known set. Each
 * lookup is O(1) and the name has only a handful of segments.
 *
 * Returns `false` when the icon cannot be identified, so an unrecognised or
 * inlined asset keeps its current, unmirrored rendering rather than flipping
 * unexpectedly.
 */
export function shouldMirrorIconInRtl(icon: string): boolean {
    const name = getPhosphorIconName(icon);

    if (!name) {
        return false;
    }

    const segments = name.split("-");

    for (let i = 0; i < segments.length; i++) {
        if (MIRRORED_ICON_NAMES.has(segments.slice(i).join("-"))) {
            return true;
        }
    }

    return false;
}
