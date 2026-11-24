import * as fs from "node:fs";
import * as path from "node:path";

import {findUnexpandedAtRules} from "../find-unexpanded-at-rules";

describe("findUnexpandedAtRules", () => {
    it.each(["apply", "mixin", "define-mixin", "import"])(
        "reports a top-level `@%s`",
        (name) => {
            // Arrange
            const css = `@${name} --x;`;

            // Act
            const result = findUnexpandedAtRules(css);

            // Assert
            expect(result).toEqual([{name, params: "--x", line: 1}]);
        },
    );

    it("reports an `@apply` nested in a layer and a style rule", () => {
        // Arrange
        const css = [
            "@layer shared {",
            "    .button {",
            "        &:focus-visible {",
            "            @apply --wb-focus-visible;",
            "        }",
            "    }",
            "}",
        ].join("\n");

        // Act
        const result = findUnexpandedAtRules(css);

        // Assert
        expect(result).toEqual([
            {name: "apply", params: "--wb-focus-visible", line: 4},
        ]);
    });

    it("reports an `@apply` nested in a media query", () => {
        // Arrange
        const css = "@media (width >= 1px) { .a { @apply --x; } }";

        // Act
        const result = findUnexpandedAtRules(css);

        // Assert
        expect(result).toEqual([{name: "apply", params: "--x", line: 1}]);
    });

    it("reports every disallowed at-rule, in source order", () => {
        // Arrange
        const css = [
            '@import "@khanacademy/wonder-blocks-styles/focus-styles.css";',
            ".a { @apply --x; }",
        ].join("\n");

        // Act
        const result = findUnexpandedAtRules(css);

        // Assert
        expect(result.map(({name, line}) => [name, line])).toEqual([
            ["import", 1],
            ["apply", 2],
        ]);
    });

    it("ignores disallowed at-rule names inside comments", () => {
        // Arrange
        const css = [
            "/*",
            ' * @import "@khanacademy/wonder-blocks-styles/focus-styles.css";',
            " * .a { @apply --wb-focus-visible; }",
            " * @mixin --x() {} @define-mixin y {}",
            " */",
            ".a { color: red; }",
        ].join("\n");

        // Act
        const result = findUnexpandedAtRules(css);

        // Assert
        expect(result).toEqual([]);
    });

    // The mixin's doc comment mentions `@import` and `@apply`, and it's inlined
    // into every package that uses the focus ring, once per import.
    const getFocusStylesComments = (): string =>
        (
            fs
                .readFileSync(
                    path.join(
                        __dirname,
                        "../../packages/wonder-blocks-styles/src/styles/focus-styles.css",
                    ),
                    "utf8",
                )
                .match(/\/\*[\s\S]*?\*\//g) ?? []
        ).join("\n");

    it("reads a focus-styles doc comment that mentions `@apply`", () => {
        // Arrange
        const comments = getFocusStylesComments();

        // Act
        const mentionsApply = comments.includes("@apply");

        // Assert
        expect(mentionsApply).toBe(true);
    });

    it("ignores the doc comment of the shared focus-styles mixin file", () => {
        // Arrange
        const comments = getFocusStylesComments();

        // Act
        const result = findUnexpandedAtRules(comments);

        // Assert
        expect(result).toEqual([]);
    });

    it.each([
        "@layer shared { .a { color: red; } }",
        "@layer reset, shared, legacy;",
        "@media (width >= 1px) { .a { color: red; } }",
        "@keyframes spin { to { transform: rotate(360deg); } }",
        '@font-face { font-family: "Lato"; src: url(lato.woff2); }',
        "@supports (display: grid) { .a { display: grid; } }",
    ])("doesn't report allowed at-rules: %s", (allowedCss) => {
        // Arrange
        const css = allowedCss;

        // Act
        const result = findUnexpandedAtRules(css);

        // Assert
        expect(result).toEqual([]);
    });
});
