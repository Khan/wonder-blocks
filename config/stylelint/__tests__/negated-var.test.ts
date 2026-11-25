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

const NEGATED_VAR_MESSAGE = `\`-var(…)\` is invalid CSS, so browsers drop the whole declaration. Negate a token with \`calc(-1 * var(--wb-…))\` instead. (${RULE})`;

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

describe("stylelint config: negated var()", () => {
    it.each([
        "margin: -var(--wb-sizing-size_040)",
        "margin-inline: 0 -var(--wb-sizing-size_040)",
        "transform: translateX(-var(--wb-sizing-size_040))",
    ])("reports `%s`", async (declaration) => {
        // Arrange
        const code = `.a { ${declaration}; }`;

        // Act
        const warnings = await lintCss(code);

        // Assert
        expect(warnings.map((warning) => warning.text)).toEqual([
            NEGATED_VAR_MESSAGE,
        ]);
    });

    it.each([
        "margin: calc(-1 * var(--wb-sizing-size_040))",
        "margin-inline: var(--wb-sizing-size_040) var(--wb-sizing-size_080)",
        "inline-size: calc(100% - var(--wb-sizing-size_040))",
    ])("allows `%s`", async (declaration) => {
        // Arrange
        const code = `.a { ${declaration}; }`;

        // Act
        const warnings = await lintCss(code);

        // Assert
        expect(warnings).toEqual([]);
    });
});
