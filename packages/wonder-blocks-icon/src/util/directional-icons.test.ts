import {getPhosphorIconName, shouldMirrorIconInRtl} from "./directional-icons";

describe("getPhosphorIconName", () => {
    test.each([
        // Vite dev server serves the file from its resolved location.
        [
            "/node_modules/@phosphor-icons/core/assets/regular/arrow-right.svg",
            "arrow-right",
        ],
        // rspack `asset/resource` emits `[hash]-[name][ext]`. The hash stays
        // part of the name here; it is handled when matching.
        ["/images/a1b2c3d4-arrow-right.svg", "a1b2c3d4-arrow-right"],
        // Jest's asset transform can yield a bare file name.
        ["arrow-right.svg", "arrow-right"],
        // Weight suffixes are stripped so all weights share one name.
        ["arrow-right-bold.svg", "arrow-right"],
        ["caret-left-fill.svg", "caret-left"],
        ["arrow-line-right-thin.svg", "arrow-line-right"],
        ["sign-out-light.svg", "sign-out"],
        ["paper-plane-duotone.svg", "paper-plane"],
        // Query strings and fragments are discarded.
        ["/images/arrow-right.svg?v=2", "arrow-right"],
        ["/images/arrow-right.svg#frag", "arrow-right"],
        // Uppercase extensions still resolve.
        ["arrow-right.SVG", "arrow-right"],
    ])("extracts the icon name from %s", (icon, expected) => {
        expect(getPhosphorIconName(icon)).toBe(expected);
    });

    test.each([
        // A data URI carries no file name at all.
        ["data:image/svg+xml;base64,PHN2Zz48L3N2Zz4="],
        // Non-SVG assets are not Phosphor icons.
        ["/images/arrow-right.png"],
        // Nothing to extract.
        [""],
    ])("returns undefined for %s", (icon) => {
        expect(getPhosphorIconName(icon)).toBeUndefined();
    });
});

describe("shouldMirrorIconInRtl", () => {
    test.each([
        ["/node_modules/.../assets/regular/arrow-right.svg"],
        ["/node_modules/.../assets/regular/arrow-left.svg"],
        ["/node_modules/.../assets/regular/caret-right.svg"],
        ["/node_modules/.../assets/regular/caret-double-right.svg"],
        ["/node_modules/.../assets/regular/arrow-line-right.svg"],
        ["/node_modules/.../assets/regular/arrow-bend-up-right.svg"],
        ["/node_modules/.../assets/regular/arrow-u-up-left.svg"],
        ["/node_modules/.../assets/regular/paper-plane-right.svg"],
        ["/node_modules/.../assets/regular/sign-out.svg"],
        ["/node_modules/.../assets/regular/text-indent.svg"],
        ["/node_modules/.../assets/regular/text-outdent.svg"],
        // Bundler-hashed and weighted variants resolve to the same decision.
        // rspack `asset/resource`: hash prefix.
        ["/images/a1b2c3d4-arrow-right.svg"],
        ["/images/a1b2c3d4-arrow-right-bold.svg"],
        // Vite production / Storybook / Chromatic: `[name]-[hash].svg`.
        ["/assets/arrow-right-a1b2c3d4.svg"],
        ["/assets/caret-right-deadbeef.svg"],
        ["/assets/sign-out-01234567.svg"],
        ["/assets/arrow-right-bold-a1b2c3d4.svg"],
        ["caret-right-fill.svg"],
    ])("mirrors %s", (icon) => {
        expect(shouldMirrorIconInRtl(icon)).toBe(true);
    });

    test.each([
        // Media affordances refer to the timeline, not the text.
        ["/node_modules/.../assets/regular/play.svg"],
        ["/node_modules/.../assets/regular/fast-forward.svg"],
        ["/node_modules/.../assets/regular/skip-forward.svg"],
        ["/node_modules/.../assets/regular/rewind.svg"],
        // Rotation describes a real direction of travel.
        ["/node_modules/.../assets/regular/arrow-clockwise.svg"],
        ["/node_modules/.../assets/regular/arrow-counter-clockwise.svg"],
        // Chart trends sit on a time axis that does not mirror.
        ["/node_modules/.../assets/regular/trend-down.svg"],
        ["/node_modules/.../assets/regular/trend-up.svg"],
        // Vertical or symmetric glyphs have nothing to mirror.
        ["/node_modules/.../assets/regular/arrows-down-up.svg"],
        ["/node_modules/.../assets/regular/arrows-left-right.svg"],
        ["/node_modules/.../assets/regular/text-align-center.svg"],
        ["/node_modules/.../assets/regular/text-align-justify.svg"],
        // Physical flush-left/right alignment, not start/end of line.
        ["/node_modules/.../assets/regular/text-align-left.svg"],
        ["/node_modules/.../assets/regular/text-align-right.svg"],
        // Launch / pop-out idioms stay fixed (Carbon-style).
        ["/node_modules/.../assets/regular/arrow-square-out.svg"],
        ["/node_modules/.../assets/regular/arrow-up-right.svg"],
        ["/node_modules/.../assets/regular/arrow-square-up-right.svg"],
        // Platform convention keeps search unmirrored.
        ["/node_modules/.../assets/regular/magnifying-glass.svg"],
        // Non-directional icons.
        ["/node_modules/.../assets/regular/check.svg"],
        ["/node_modules/.../assets/regular/funnel.svg"],
        // A hashed non-directional icon must not match on its hash.
        ["/images/deadbeef-play.svg"],
        ["/assets/play-a1b2c3d4.svg"],
        ["/assets/arrow-up-right-a1b2c3d4.svg"],
        // An arbitrary non-Phosphor SVG.
        ["/images/my-custom-illustration.svg"],
    ])("does not mirror %s", (icon) => {
        expect(shouldMirrorIconInRtl(icon)).toBe(false);
    });

    it("does not mirror an inlined data URI, since it cannot be identified", () => {
        expect(
            shouldMirrorIconInRtl("data:image/svg+xml;base64,PHN2Zz48L3N2Zz4="),
        ).toBe(false);
    });

    it("does not mirror when a directional word is only a partial segment", () => {
        // "arrows-left-right" contains both "left" and "right" but is a
        // symmetric glyph, and must not match "arrow-left" or "arrow-right".
        expect(shouldMirrorIconInRtl("arrows-left-right.svg")).toBe(false);
    });
});
