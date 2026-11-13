import fs from "fs";
import {
    CUSTOM_MEDIA_FILE,
    generateCustomMedia,
    toMediaQueryList,
} from "../generate-custom-media";

describe("toMediaQueryList", () => {
    it("should strip the @media prefix and trailing comment", () => {
        // Arrange
        const input =
            "@media screen and (min-width: 682px) /* breakpoint.mediaQuery.mdOrLarger */";

        // Act
        const result = toMediaQueryList(input);

        // Assert
        expect(result).toBe("screen and (min-width: 682px)");
    });
});

describe("generateCustomMedia", () => {
    it("should emit one @custom-media rule per media query", () => {
        // Arrange
        const input = {
            mdOrLarger: "@media screen and (min-width: 682px) /* comment */",
        };

        // Act
        const result = generateCustomMedia(input);

        // Assert
        expect(result).toContain(
            "@custom-media --wb-breakpoint-mediaQuery-mdOrLarger screen and (min-width: 682px);",
        );
    });

    it("should match the checked-in custom-media.css", () => {
        // Arrange
        const checkedIn = fs.readFileSync(CUSTOM_MEDIA_FILE, "utf-8");

        // Act
        const result = generateCustomMedia();

        // Assert
        // If this fails, run:
        // pnpm --filter @khanacademy/wonder-blocks-tokens build:custom-media
        expect(checkedIn).toBe(result);
    });
});
