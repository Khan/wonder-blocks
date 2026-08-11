/**
 * Phosphor icon names whose glyph encodes a reading direction, and which
 * therefore need to be mirrored horizontally when rendered inside
 * right-to-left content.
 *
 * This list is the single source of truth for RTL icon mirroring. To change
 * which icons flip, update this set in a Wonder Blocks PR — there is no
 * per-call-site override on `PhosphorIcon`.
 *
 * Deliberately excluded, because their meaning is independent of reading
 * direction and mirroring them would be a regression:
 * - Media affordances (`play`, `fast-forward`, `rewind`, `skip-forward`,
 *   `skip-back`). By long-standing convention these keep pointing the same
 *   way in RTL because they refer to the timeline, not the text.
 * - Rotation (`arrow-clockwise`, `arrow-counter-clockwise`,
 *   `arrows-clockwise`, `arrows-counter-clockwise`). These describe a real
 *   physical direction of travel.
 * - Chart and trend glyphs (`trend-up`, `trend-down`). These sit on a time
 *   axis that is conventionally left-to-right in every locale.
 * - Vertical or symmetric glyphs (`arrows-down-up`, `arrows-left-right`,
 *   `arrows-in`, `arrows-out`, `text-align-center`, `text-align-justify`).
 *   Mirroring is either meaningless or a visual no-op.
 * - Physical text alignment (`text-align-left`, `text-align-right`). These
 *   mean flush against a physical edge (Word/Docs style), not start/end of
 *   line. Indentation (`text-indent`, `text-outdent`) is included because it
 *   follows reading direction.
 * - Launch / pop-out idioms (`arrow-square-out`, `arrow-up-right`,
 *   `arrow-square-up-right`). Treated as a fixed "opens elsewhere" cue
 *   (Carbon and similar systems leave launch glyphs unmirrored). KA uses
 *   `arrow-square-out` for external links and `arrow-up-right` as a popout.
 *   Related left diagonals (`arrow-up-left`, `arrow-square-up-left`) stay on
 *   the whitelist because they are not used as that idiom.
 * - `magnifying-glass`. Retained unmirrored to match platform conventions.
 */
const MIRRORED_ICON_NAMES: ReadonlySet<string> = new Set([
    "arrow-arc-left",
    "arrow-arc-right",
    "arrow-bend-double-up-left",
    "arrow-bend-double-up-right",
    "arrow-bend-down-left",
    "arrow-bend-down-right",
    "arrow-bend-left-down",
    "arrow-bend-left-up",
    "arrow-bend-right-down",
    "arrow-bend-right-up",
    "arrow-bend-up-left",
    "arrow-bend-up-right",
    "arrow-circle-down-left",
    "arrow-circle-down-right",
    "arrow-circle-left",
    "arrow-circle-right",
    "arrow-circle-up-left",
    "arrow-circle-up-right",
    "arrow-down-left",
    "arrow-down-right",
    "arrow-elbow-down-left",
    "arrow-elbow-down-right",
    "arrow-elbow-left",
    "arrow-elbow-left-down",
    "arrow-elbow-left-up",
    "arrow-elbow-right",
    "arrow-elbow-right-down",
    "arrow-elbow-right-up",
    "arrow-elbow-up-left",
    "arrow-elbow-up-right",
    "arrow-fat-left",
    "arrow-fat-line-left",
    "arrow-fat-line-right",
    "arrow-fat-lines-left",
    "arrow-fat-lines-right",
    "arrow-fat-right",
    "arrow-left",
    "arrow-line-down-left",
    "arrow-line-down-right",
    "arrow-line-left",
    "arrow-line-right",
    "arrow-line-up-left",
    "arrow-line-up-right",
    "arrow-right",
    "arrow-square-down-left",
    "arrow-square-down-right",
    "arrow-square-left",
    "arrow-square-right",
    "arrow-square-up-left",
    "arrow-u-down-left",
    "arrow-u-down-right",
    "arrow-u-left-down",
    "arrow-u-left-up",
    "arrow-u-right-down",
    "arrow-u-right-up",
    "arrow-u-up-left",
    "arrow-u-up-right",
    "arrow-up-left",
    "caret-circle-double-left",
    "caret-circle-double-right",
    "caret-circle-left",
    "caret-circle-right",
    "caret-double-left",
    "caret-double-right",
    "caret-left",
    "caret-line-left",
    "caret-line-right",
    "caret-right",
    "paper-plane",
    "paper-plane-right",
    "paper-plane-tilt",
    "sign-in",
    "sign-out",
    "text-indent",
    "text-outdent",
]);

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
