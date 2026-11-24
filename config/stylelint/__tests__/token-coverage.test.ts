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

// The rules that together require tokens instead of raw values.
const RULES = [
    "scale-unlimited/declaration-strict-value",
    "color-named",
    "function-disallowed-list",
];

/**
 * Lint `code` with only the repo's settings for the token rules, so the other
 * rules (and the token CSS that some of them read) don't affect the results.
 */
const lintCss = async (code: string) => {
    const result: LinterResult = await stylelint.lint({
        code,
        config: {
            plugins: config.plugins,
            rules: Object.fromEntries(
                RULES.map((rule) => [rule, config.rules?.[rule]]),
            ),
        },
    });
    return result.results[0].warnings;
};

describe("stylelint config: token coverage", () => {
    it.each([
        "padding-inline: 12px",
        "margin-block-end: 8px",
        "gap: 16px",
        "row-gap: 4px",
        "border-block-end: 1px solid var(--wb-semanticColor-core-border-neutral-subtle)",
        "border-start-start-radius: 4px",
        "outline: 2px solid var(--wb-semanticColor-focus-outer)",
        "background: white",
        "stroke: blue",
        "box-shadow: 0 0 0 2px white",
        "fill: rgb(0 0 0)",
        "background-color: oklch(50% 0.1 200)",
        "background: transparent",
    ])("reports `%s`", async (declaration) => {
        // Arrange
        const code = `.a { ${declaration}; }`;

        // Act
        const warnings = await lintCss(code);

        // Assert
        expect(warnings).not.toEqual([]);
    });

    it.each([
        "padding-inline: var(--wb-sizing-size_120)",
        "border-block-end: var(--wb-border-width-thin) solid var(--wb-semanticColor-core-border-neutral-subtle)",
        "outline: var(--wb-border-width-medium) solid var(--wb-semanticColor-focus-outer)",
        "inline-size: calc(var(--wb-sizing-size_120) * 2)",
        "color: currentcolor",
        "background: var(--wb-semanticColor-core-transparent)",
    ])("allows `%s`", async (declaration) => {
        // Arrange
        const code = `.a { ${declaration}; }`;

        // Act
        const warnings = await lintCss(code);

        // Assert
        expect(warnings).toEqual([]);
    });
});
