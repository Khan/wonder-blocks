import {StyleSheetServer, css} from "aphrodite";

import {minTargetSizeStyles} from "../min-target-size-styles";

/**
 * jsdom does not lay out pseudo-elements, so we cannot measure the hit area
 * here. Instead we assert on the CSS Aphrodite actually emits, which is what
 * the WCAG 2.5.8 guarantee rests on.
 */
describe("minTargetSizeStyles", () => {
    const renderCss = () =>
        StyleSheetServer.renderStatic(() =>
            css(minTargetSizeStyles.minTargetSize),
        ).css.content;

    it("makes the host a containing block for the hit area", () => {
        // Arrange / Act
        const content = renderCss();

        // Assert
        expect(content).toContain("position:relative");
    });

    it("emits the hit area as a ::after pseudo-element", () => {
        // Arrange / Act
        const content = renderCss();

        // Assert
        expect(content).toMatch(/\.minTargetSize_[a-z0-9]+::after\{/);
    });

    it("sizes the hit area to at least the 24px WCAG 2.5.8 minimum", () => {
        // Arrange / Act
        const content = renderCss();

        // Assert
        expect(content).toContain("min-block-size:var(--wb-sizing-size_240)");
        expect(content).toContain("min-inline-size:var(--wb-sizing-size_240)");
    });

    it("never shrinks the hit area below the size of the host", () => {
        // Arrange / Act
        const content = renderCss();

        // Assert
        expect(content).toContain("block-size:100%");
        expect(content).toContain("inline-size:100%");
    });

    it("centres the hit area on the host", () => {
        // Arrange / Act
        const content = renderCss();

        // Assert
        expect(content).toContain("inset-block-start:50%");
        expect(content).toContain("inset-inline-start:50%");
        expect(content).toContain("transform:translate(-50%, -50%)");
    });
});
