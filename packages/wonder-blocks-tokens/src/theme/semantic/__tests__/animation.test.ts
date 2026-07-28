import {animation, animationValue} from "../../../index";

/**
 * Reduce a nested token tree to its key skeleton (leaves become `true`), so two
 * trees can be compared for structural parity regardless of leaf values.
 *
 * The `from`/`to` preset states are skipped: they are magnitude data consumed
 * by the preset adapters, never emitted as CSS variables, so the CSS-var tree
 * intentionally omits them while the raw tree keeps them.
 */
function keySkeleton(tree: unknown): unknown {
    if (tree && typeof tree === "object" && !Array.isArray(tree)) {
        const skeleton: Record<string, unknown> = {};
        for (const key of Object.keys(tree)) {
            if (key === "from" || key === "to") {
                continue;
            }
            skeleton[key] = keySkeleton((tree as Record<string, unknown>)[key]);
        }
        return skeleton;
    }
    return true;
}

describe("animation tokens", () => {
    it("exposes the same timing shape for the CSS-var and raw trees", () => {
        // Arrange, Act, Assert
        // (The raw tree additionally carries `from`/`to` preset states, which
        // the skeleton excludes — see keySkeleton.)
        expect(keySkeleton(animation)).toEqual(keySkeleton(animationValue));
    });

    it("exports primitive values as CSS variable references", () => {
        // Arrange, Act, Assert
        expect(animation.duration.short).toBe(
            "var(--wb-animation-duration-short)",
        );
        expect(animation.easing.standard).toBe(
            "var(--wb-animation-easing-standard)",
        );
    });

    it("exports semantic presets as per-field CSS variable references", () => {
        // Arrange, Act, Assert
        expect(animation.overlay.enter).toEqual({
            duration: "var(--wb-animation-overlay-enter-duration)",
            easing: "var(--wb-animation-overlay-enter-easing)",
            delay: "var(--wb-animation-overlay-enter-delay)",
        });
    });

    it("exports raw primitive values (ms numbers and bézier arrays)", () => {
        // Arrange, Act, Assert
        expect(animationValue.duration.short).toBe(150);
        expect(animationValue.easing.standard).toEqual([0.4, 0, 0.2, 1]);
    });

    it("exports timing-only raw archetypes as {duration, easing, delay}", () => {
        // Arrange, Act, Assert
        expect(animationValue.control.press).toEqual({
            duration: 150,
            easing: [0.4, 0, 0.2, 1],
            delay: 0,
        });
    });

    it("exports enriched raw archetypes with from/to preset states", () => {
        // Arrange, Act, Assert
        expect(animationValue.overlay.enter).toEqual({
            duration: 400,
            easing: [0.05, 0.7, 0.1, 1],
            delay: 0,
            from: {opacity: 0, offset: "9.6rem", scale: 0.99},
            to: {opacity: 1, offset: 0, scale: 1},
        });
    });
});
