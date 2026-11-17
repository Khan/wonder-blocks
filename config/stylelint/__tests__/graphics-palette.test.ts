import * as path from "node:path";

import type {Config, LinterResult, PublicApi} from "stylelint";

// Stylelint and `stylelint.config.ts` are ES modules, which Jest 29 can't
// load. Node can `require()` them, so load them with Node's own `require`.
// Jest replaces `createRequire` from `require("node:module")` with one that
// goes through Jest's module system, so get the real one from Node.
const {createRequire} = process.getBuiltinModule("node:module");
const rootDir = path.join(__dirname, "../../..");
const nodeRequire = createRequire(path.join(rootDir, "package.json"));

const stylelint: PublicApi = nodeRequire("stylelint");
const config: Config = nodeRequire(
    path.join(rootDir, "stylelint.config.ts"),
).default;

const RULE = "declaration-property-value-disallowed-list";

const GRAPHICS_PALETTE_MESSAGE = `\`graphicsPalette\` colors stay the same in every theme. Prefer a \`semanticColor\` token, which adapts to the current theme. If this color must stay the same in every theme (e.g. illustrations), disable this rule with a comment explaining why. (${RULE})`;

/**
 * Lint `code` with only the repo's setting for this rule, so the other rules
 * (and the token CSS that some of them read) don't affect the results.
 */
const lintCss = async (code: string) => {
    const result: LinterResult = await stylelint.lint({
        code,
        config: {rules: {[RULE]: config.rules?.[RULE]}},
    });
    return result.results[0].warnings.filter(
        (warning) => warning.rule === RULE,
    );
};

describe("stylelint config: graphicsPalette CSS variables", () => {
    describe("reported", () => {
        it.each([
            [
                "a var() reference",
                ".a { color: var(--wb-graphicsPalette-blue_30); }",
            ],
            [
                "a background color",
                ".a { background-color: var(--wb-graphicsPalette-gray_90); }",
            ],
            [
                "a shorthand",
                ".a { border: 1px solid var(--wb-graphicsPalette-red_20); }",
            ],
            [
                "a gradient",
                ".a { background: linear-gradient(var(--wb-graphicsPalette-red_30), var(--wb-graphicsPalette-blue_30)); }",
            ],
            [
                "a box-shadow",
                ".a { box-shadow: 0 1px 2px var(--wb-graphicsPalette-black_100); }",
            ],
            [
                "a var() fallback",
                ".a { color: var(--x, var(--wb-graphicsPalette-white_100)); }",
            ],
            [
                "a custom property definition",
                ":root { --my-color: var(--wb-graphicsPalette-green_30); }",
            ],
            ["fill", ".a svg { fill: var(--wb-graphicsPalette-gray_30); }"],
            [
                "stroke",
                ".a path { stroke: var(--wb-graphicsPalette-black_100); }",
            ],
            [
                "an SVG color property",
                ".a { stop-color: var(--wb-graphicsPalette-cyan_30); }",
            ],
            [
                "a reference in a nested rule",
                ".a { &:hover { color: var(--wb-graphicsPalette-orange_30); } }",
            ],
        ])("reports %s once", async (_label, code) => {
            // Arrange — code provided by it.each

            // Act
            const warnings = await lintCss(code);

            // Assert
            expect(warnings).toHaveLength(1);
        });

        it("reports with the graphicsPalette message", async () => {
            // Arrange
            const code = ".a { color: var(--wb-graphicsPalette-blue_30); }";

            // Act
            const [warning] = await lintCss(code);

            // Assert
            expect(warning.text).toBe(GRAPHICS_PALETTE_MESSAGE);
        });

        it("reports as an error", async () => {
            // Arrange
            const code = ".a { color: var(--wb-graphicsPalette-blue_30); }";

            // Act
            const [warning] = await lintCss(code);

            // Assert
            expect(warning.severity).toBe("error");
        });

        it("reports each declaration that uses the palette", async () => {
            // Arrange
            const code = `.a {
    color: var(--wb-graphicsPalette-blue_30);
    fill: var(--wb-graphicsPalette-blue_30);
    outline-color: var(--wb-graphicsPalette-magenta_30);
}`;

            // Act
            const warnings = await lintCss(code);

            // Assert
            expect(warnings.map((warning) => warning.line)).toEqual([2, 3, 4]);
        });

        it("reports a line that isn't disabled", async () => {
            // Arrange
            const code = `.a {
    /* stylelint-disable-next-line ${RULE} -- Illustration artwork; colors stay the same in every theme */
    background-color: var(--wb-graphicsPalette-gray_30);
    color: var(--wb-graphicsPalette-gray_90);
}`;

            // Act
            const warnings = await lintCss(code);

            // Assert
            expect(warnings.map((warning) => warning.line)).toEqual([4]);
        });
    });

    describe("not reported", () => {
        it.each([
            [
                "a semanticColor variable",
                ".a { color: var(--wb-semanticColor-core-foreground-neutral-strong); }",
            ],
            [
                "a variable without the wb prefix",
                ".a { color: var(--graphicsPalette-blue_30); }",
            ],
            [
                "a comment that mentions the variable",
                "/* var(--wb-graphicsPalette-blue_30) */ .a { color: /* var(--wb-graphicsPalette-blue_30) */ red; }",
            ],
            [
                "a line disabled with a reason",
                `.a {
    /* stylelint-disable-next-line ${RULE} -- Illustration artwork; colors stay the same in every theme */
    background-color: var(--wb-graphicsPalette-gray_30);
}`,
            ],
        ])("doesn't report %s", async (_label, code) => {
            // Arrange — code provided by it.each

            // Act
            const warnings = await lintCss(code);

            // Assert
            expect(warnings).toBeEmpty();
        });
    });

    describe("var() fallbacks", () => {
        it("still reports a fallback without a palette color as a warning", async () => {
            // Arrange
            const code = ".a { color: var(--x, red); }";

            // Act
            const [warning] = await lintCss(code);

            // Assert
            expect(warning).toMatchObject({
                severity: "warning",
                text: `Avoid var() fallbacks — reference --wb-* tokens directly so typos are caught by csstools/value-no-unknown-custom-properties. (${RULE})`,
            });
        });
    });
});
