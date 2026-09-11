/**
 * The coarse placement of the popover relative to its anchor.
 *
 * NOTE: Wonder Blocks Floating (floating-ui) supports more granular placements
 * (e.g. `top-start`), but Popover only exposes and reasons about these four
 * coarse values. The resolved floating-ui placement is normalized down to one
 * of these before being shared via `PopoverContext`.
 */
export type Placement = "top" | "bottom" | "left" | "right";

/**
 * The root boundary that the popover is kept within when it is repositioned to
 * stay in view.
 *
 * - `"viewport"`: keep the popover within the user's viewport.
 * - `"document"`: keep the popover within the document body.
 */
export type RootBoundary = "viewport" | "document";
