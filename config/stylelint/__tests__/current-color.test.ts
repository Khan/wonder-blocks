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

const STRICT_VALUE_RULE = "scale-unlimited/declaration-strict-value";

/**
 * Lint `code` with the repo's strict-value setting and the standard config's
 * `value-keyword-case`, the two rules that check how `currentcolor` is
 * spelled. The other rules (and the token CSS that some of them read) are
 * left out so they don't affect the results.
 */
const lintCss = async (code: string) => {
    const result: LinterResult = await stylelint.lint({
        code,
        config: {
            plugins: config.plugins,
            rules: {
                [STRICT_VALUE_RULE]: config.rules?.[STRICT_VALUE_RULE],
                // From stylelint-config-standard, which `extends` brings in.
                "value-keyword-case": "lower",
            },
        },
    });
    return result.results[0].warnings;
};

describe("stylelint config: currentcolor", () => {
    it.each(["color", "background-color", "border-color"])(
        "allows `%s: currentcolor`",
        async (property) => {
            // Arrange
            const code = `.a { ${property}: currentcolor; }`;

            // Act
            const warnings = await lintCss(code);

            // Assert
            expect(warnings).toEqual([]);
        },
    );

    it("reports `currentColor` through value-keyword-case", async () => {
        // Arrange
        const code = ".a { color: currentColor; }";

        // Act
        const warnings = await lintCss(code);

        // Assert
        expect(warnings.map((warning) => warning.rule)).toContain(
            "value-keyword-case",
        );
    });
});
