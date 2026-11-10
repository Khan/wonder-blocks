import stylelint from "stylelint";
import valueParser from "postcss-value-parser";

import type {Declaration} from "postcss";
import type {Rule} from "stylelint";

import {getRuleName, getRuleUrl} from "../utils/rule-name";

const {
    createPlugin,
    utils: {report, ruleMessages, validateOptions},
} = stylelint;

const name = "prefer-semantic-color-over-graphics-palette";

export const ruleName = getRuleName(name);

// The name of the palette export in the tokens package, used in the message.
const PALETTE_EXPORT = "graphicsPalette";

// The prefix of the CSS variables that the palette tokens resolve to, e.g.
// `var(--wb-graphicsPalette-blue_30)`. Keep this the only place the prefix is
// spelled out so that a rename is a one-line change.
export const PALETTE_CSS_VAR_PREFIX = "--wb-graphicsPalette-";

// Properties where palette colors are allowed. These are the CSS equivalent of
// the SVG `fill` and `stroke` attributes that the ESLint rule allows: they
// only apply to SVG content, which usually needs colors that stay the same in
// every theme.
const ALLOWED_PROPERTIES = new Set(["fill", "stroke"]);

const ADVICE =
    "Prefer a `semanticColor` token, which adapts to the current theme. If this color must stay the same in every theme (e.g. illustrations), disable this rule with a comment explaining why.";

export const messages = ruleMessages(ruleName, {
    rejected: `\`${PALETTE_EXPORT}\` colors stay the same in every theme. ${ADVICE}`,
});

const meta = {
    url: getRuleUrl(name),
};

/**
 * The value of `decl` as written in the source, including any comments, so
 * that the indexes of the parsed nodes line up with the source.
 */
function getRawValue(decl: Declaration): string {
    const raws = decl.raws as {value?: {raw?: string}};
    return raws.value?.raw ?? decl.value;
}

/**
 * The index of the start of `decl`'s value, relative to the start of `decl`.
 */
function getValueIndex(decl: Declaration): number {
    return decl.prop.length + (decl.raws.between ?? ":").length;
}

const ruleFunction: Rule = (primary) => {
    return (root, result) => {
        const validOptions = validateOptions(result, ruleName, {
            actual: primary,
            possible: [true],
        });
        if (!validOptions) {
            return;
        }

        root.walkDecls((decl) => {
            if (ALLOWED_PROPERTIES.has(decl.prop.toLowerCase())) {
                return;
            }

            const rawValue = getRawValue(decl);
            // Quick check to skip parsing values that can't match.
            if (!rawValue.includes(PALETTE_CSS_VAR_PREFIX)) {
                return;
            }

            const valueIndex = getValueIndex(decl);

            // Each palette variable is a `word` node, e.g. the first argument
            // of `var()`, including `var()` fallbacks. Strings and comments
            // are separate node types, so text in them isn't reported.
            valueParser(rawValue).walk((node) => {
                if (
                    node.type !== "word" ||
                    !node.value.startsWith(PALETTE_CSS_VAR_PREFIX)
                ) {
                    return;
                }

                report({
                    ruleName,
                    result,
                    message: messages.rejected,
                    node: decl,
                    index: valueIndex + node.sourceIndex,
                    endIndex: valueIndex + node.sourceEndIndex,
                });
            });
        });
    };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
