import stylelint from "stylelint";

import plugin, {
    messages,
    ruleName,
} from "../prefer-semantic-color-over-graphics-palette";

/**
 * Lint `code` with only this rule enabled and return its warnings.
 */
const lintCss = async (code: string, primaryOption: unknown = true) => {
    const {results} = await stylelint.lint({
        code,
        config: {
            plugins: [plugin],
            rules: {[ruleName]: primaryOption},
        },
    });
    return results[0];
};

const getRuleWarnings = async (code: string) => {
    const result = await lintCss(code);
    return result.warnings.filter((warning) => warning.rule === ruleName);
};

describe("prefer-semantic-color-over-graphics-palette", () => {
    describe("reported", () => {
        it.each([
            [
                "a var() reference",
                ".a { color: var(--wb-graphicsPalette-blue_30); }",
                1,
            ],
            [
                "a background color",
                ".a { background-color: var(--wb-graphicsPalette-gray_90); }",
                1,
            ],
            [
                "a shorthand",
                ".a { border: 1px solid var(--wb-graphicsPalette-red_20); }",
                1,
            ],
            [
                "a gradient",
                ".a { background: linear-gradient(var(--wb-graphicsPalette-red_30), var(--wb-graphicsPalette-blue_30)); }",
                2,
            ],
            [
                "a box-shadow",
                ".a { box-shadow: 0 1px 2px var(--wb-graphicsPalette-black_100); }",
                1,
            ],
            [
                "a var() fallback",
                ".a { color: var(--x, var(--wb-graphicsPalette-white_100)); }",
                1,
            ],
            [
                "a palette var() with a palette fallback",
                ".a { color: var(--wb-graphicsPalette-red_30, var(--wb-graphicsPalette-red_40)); }",
                2,
            ],
            [
                "a custom property definition",
                ":root { --my-color: var(--wb-graphicsPalette-green_30); }",
                1,
            ],
            [
                "an SVG color property other than fill and stroke",
                ".a { stop-color: var(--wb-graphicsPalette-cyan_30); }",
                1,
            ],
            [
                "several declarations",
                ".a { color: var(--wb-graphicsPalette-blue_30); outline-color: var(--wb-graphicsPalette-magenta_30); }",
                2,
            ],
            [
                "a reference next to a comment in the value",
                ".a { color: /* graphicsPalette */ var(--wb-graphicsPalette-blue_30); }",
                1,
            ],
            [
                "an uppercase property name that isn't fill or stroke",
                ".a { COLOR: var(--wb-graphicsPalette-blue_30); }",
                1,
            ],
            [
                "a reference in a nested rule",
                ".a { &:hover { color: var(--wb-graphicsPalette-orange_30); } }",
                1,
            ],
        ])("reports %s", async (_label, code, expectedCount) => {
            // Arrange — code provided by it.each

            // Act
            const warnings = await getRuleWarnings(code);

            // Assert
            expect(warnings).toHaveLength(expectedCount);
        });

        it("reports with the message shared with the ESLint rule", async () => {
            // Arrange
            const code = ".a { color: var(--wb-graphicsPalette-blue_30); }";

            // Act
            const [warning] = await getRuleWarnings(code);

            // Assert
            expect(warning.text).toBe(
                "`graphicsPalette` colors stay the same in every theme. Prefer a `semanticColor` token, which adapts to the current theme. If this color must stay the same in every theme (e.g. illustrations), disable this rule with a comment explaining why. (@khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette)",
            );
        });

        it("reports at the variable reference", async () => {
            // Arrange
            const code =
                ".a { border: 1px solid var(--wb-graphicsPalette-red_20); }";

            // Act
            const [warning] = await getRuleWarnings(code);

            // Assert
            expect(warning).toMatchObject({
                line: 1,
                column: 28,
                endLine: 1,
                endColumn: 55,
            });
        });

        it("reports each reference at its own location", async () => {
            // Arrange
            const code =
                ".a { background: linear-gradient(var(--wb-graphicsPalette-red_30), var(--wb-graphicsPalette-blue_30)); }";

            // Act
            const warnings = await getRuleWarnings(code);

            // Assert
            expect(warnings.map((warning) => warning.column)).toEqual([38, 72]);
        });

        it("reports a line that isn't disabled", async () => {
            // Arrange
            const code = `.a {
    /* stylelint-disable-next-line ${ruleName} -- Illustration artwork; colors stay the same in every theme */
    background-color: var(--wb-graphicsPalette-gray_30);
    color: var(--wb-graphicsPalette-gray_90);
}`;

            // Act
            const warnings = await getRuleWarnings(code);

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
            ["a hardcoded color", ".a { color: #fff; }"],
            [
                "a custom property that isn't a palette variable",
                ".a { color: var(--my-graphicsPalette-blue_30); }",
            ],
            [
                "a variable without the wb prefix",
                ".a { color: var(--graphicsPalette-blue_30); }",
            ],
            [
                "a comment that mentions graphicsPalette",
                "/* Prefer semanticColor over graphicsPalette */ .a { color: red; }",
            ],
            [
                "a comment in a value that mentions the variable",
                ".a { color: /* var(--wb-graphicsPalette-blue_30) */ red; }",
            ],
            [
                "a string that mentions the variable",
                '.a::before { content: "var(--wb-graphicsPalette-blue_30)"; }',
            ],
            [
                "a selector that mentions graphicsPalette",
                ".graphicsPalette-blue_30 { color: red; }",
            ],
            ["fill", ".a { fill: var(--wb-graphicsPalette-gray_30); }"],
            ["stroke", ".a { stroke: var(--wb-graphicsPalette-black_100); }"],
            [
                "uppercase FILL",
                ".a { FILL: var(--wb-graphicsPalette-gray_30); }",
            ],
            [
                "fill with a var() fallback",
                ".a { fill: var(--icon-fill, var(--wb-graphicsPalette-red_30)); }",
            ],
            [
                "a line disabled with stylelint-disable-next-line",
                `.a {
    /* stylelint-disable-next-line ${ruleName} -- Illustration artwork; colors stay the same in every theme */
    background-color: var(--wb-graphicsPalette-gray_30);
}`,
            ],
            [
                "a line disabled with stylelint-disable-line",
                `.a { background-color: var(--wb-graphicsPalette-gray_30); /* stylelint-disable-line ${ruleName} -- Illustration artwork */ }`,
            ],
            [
                "a block disabled with stylelint-disable",
                `/* stylelint-disable ${ruleName} -- Illustration artwork; colors stay the same in every theme */
.a { color: var(--wb-graphicsPalette-gray_30); }
.b { border-color: var(--wb-graphicsPalette-gray_40); }
/* stylelint-enable ${ruleName} */`,
            ],
        ])("doesn't report %s", async (_label, code) => {
            // Arrange — code provided by it.each

            // Act
            const warnings = await getRuleWarnings(code);

            // Assert
            expect(warnings).toBeEmpty();
        });
    });

    describe("options", () => {
        it("doesn't report when the option isn't valid", async () => {
            // Arrange
            const code = ".a { color: var(--wb-graphicsPalette-blue_30); }";

            // Act
            const result = await lintCss(code, "always");

            // Assert
            expect(result.invalidOptionWarnings).toHaveLength(1);
        });
    });

    describe("messages", () => {
        it("includes the rule name", () => {
            // Arrange — messages are created when the rule is loaded

            // Act
            const message = messages.rejected;

            // Assert
            expect(message).toEndWith(`(${ruleName})`);
        });
    });
});
