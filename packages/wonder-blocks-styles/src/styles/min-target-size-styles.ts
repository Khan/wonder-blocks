import type {CSSProperties} from "aphrodite";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

/**
 * A transparent hit area that guarantees a control is at least 24x24, to
 * satisfy WCAG 2.5.8 (Target Size, Minimum).
 *
 * We expand the *hit area* with a pseudo-element rather than growing the
 * element itself so that the visual layout of existing components is
 * unchanged.
 *
 * Notes:
 * - `blockSize`/`inlineSize` of `100%` mean the hit area is never *smaller*
 *   than the control it belongs to.
 * - WCAG 2.5.8 exempts inline targets (a link within a sentence, whose size is
 *   constrained by the line-height of the surrounding text), so this should not
 *   be applied to inline links.
 */
export const minTargetSize = {
    // Establishes the containing block for the ::before hit area below.
    position: "relative",
    "::before": {
        content: "''",
        position: "absolute",
        insetBlockStart: "50%",
        insetInlineStart: "50%",
        transform: "translate(-50%, -50%)",
        blockSize: "100%",
        inlineSize: "100%",
        minBlockSize: sizing.size_240,
        minInlineSize: sizing.size_240,
    },
} satisfies CSSProperties;
