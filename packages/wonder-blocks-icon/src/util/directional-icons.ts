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
 * - Vite production / Storybook build: `/assets/arrow-right-[hash].svg`
 * - rspack `asset/resource`: `/images/[hash]-arrow-right.svg`
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
 * Bundlers insert a content hash next to the icon name:
 * - rspack `asset/resource`: `[hash]-[name][ext]` (hash prefix)
 * - Vite production builds: `[name]-[hash][ext]` (hash suffix)
 *
 * We match every `-`-delimited prefix and suffix of the basename against the
 * allowlist so both forms resolve (e.g. `arrow-right` from
 * `a1b2c3d4-arrow-right` or `arrow-right-a1b2c3d4`). Returns `false` when the
 * icon cannot be identified.
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

    for (let end = 1; end < segments.length; end++) {
        if (MIRRORED_ICON_NAMES.has(segments.slice(0, end).join("-"))) {
            return true;
        }
    }

    return false;
}

/**
 * Resolves whether an icon is mirrored in RTL, honoring the `mirrorInRtl`
 * override.
 *
 * `mirrorInRtl` wins in both directions when set: `true` opts a custom
 * directional SVG in, `false` opts an allowlisted icon out. Omitting it falls
 * back to the allowlist.
 */
export function resolveMirrorInRtl(
    icon: string,
    mirrorInRtl?: boolean,
): boolean {
    return mirrorInRtl ?? shouldMirrorIconInRtl(icon);
}
