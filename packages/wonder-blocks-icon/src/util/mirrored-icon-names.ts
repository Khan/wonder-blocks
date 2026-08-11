/**
 * Phosphor icon names whose glyph encodes a reading direction, and which
 * therefore need to be mirrored horizontally when rendered inside
 * right-to-left content.
 *
 * This list is the single source of truth for RTL icon mirroring in
 * `PhosphorIcon`. To change which icons flip, update this set in a Wonder
 * Blocks PR — there is no per-call-site override on `PhosphorIcon`.
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
export const MIRRORED_ICON_NAMES: ReadonlySet<string> = new Set([
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
