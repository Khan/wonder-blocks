import transform from "../migrate-spacing-to-sizing";

// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const defineInlineTest = require("jscodeshift/dist/testUtils").defineInlineTest;

const transformOptions = {
    printOptions: {
        objectCurlySpacing: false,
        quote: "double",
        trailingComma: true,
    },
};

describe("migrate-spacing-to-sizing", () => {
    describe("imports", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {paddingTop: spacing.medium_16};
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const styles = {paddingTop: sizing.size_160};
`,
            "should swap spacing for sizing in the named imports list",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {paddingTop: spacing.medium_16, gap: sizing.size_080};
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const styles = {paddingTop: sizing.size_160, gap: sizing.size_080};
`,
            "should drop spacing when sizing is already imported",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {color: color.blue, paddingTop: spacing.medium_16};
`,
            `
import {color, sizing} from "@khanacademy/wonder-blocks-tokens";
const styles = {color: color.blue, paddingTop: sizing.size_160};
`,
            "should keep other named imports intact and add sizing alphabetically",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {color} from "@khanacademy/wonder-blocks-tokens";
const styles = {color: color.blue};
`,
            `
import {color} from "@khanacademy/wonder-blocks-tokens";
const styles = {color: color.blue};
`,
            "should be a no-op when spacing is not imported",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-spacing";
const padding = spacing.medium_16;
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-spacing";
const padding = spacing.medium_16;
`,
            "should be a no-op when spacing is imported from a non-tokens package",
        );
    });

    describe("style-object usage", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import {StyleSheet} from "aphrodite";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

const styles = StyleSheet.create({
    container: {
        paddingTop: spacing.medium_16,
        paddingBottom: spacing.large_24,
        gap: spacing.xSmall_8,
    },
});
`,
            `
import {StyleSheet} from "aphrodite";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

const styles = StyleSheet.create({
    container: {
        paddingTop: sizing.size_160,
        paddingBottom: sizing.size_240,
        gap: sizing.size_080,
    },
});
`,
            "should rewrite spacing values inside StyleSheet.create",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const layout = {gutterWidth: spacing.medium_16, marginWidth: spacing.large_24};
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const layout = {gutterWidth: sizing.size_160, marginWidth: sizing.size_240};
`,
            "should rewrite spacing values used as layout-spec fields",
        );
    });

    describe("JSX attribute usage", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import * as React from "react";
import {Spacer} from "./spacer";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

const Node = () => <Spacer width={spacing.xxxSmall_4} />;
`,
            `
import * as React from "react";
import {Spacer} from "./spacer";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

const Node = () => <Spacer width={sizing.size_040} />;
`,
            "should rewrite spacing values used as JSX prop values",
        );
    });

    describe("arithmetic", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const INNER_BORDER_RADIUS = spacing.small_12 - 1;
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const INNER_BORDER_RADIUS = \`calc(\${sizing.size_120} - 1px)\`;
`,
            "should rewrite subtraction of a numeric literal as calc()",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {paddingRight: spacing.large_24 + spacing.medium_16};
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const styles = {paddingRight: \`calc(\${sizing.size_240} + \${sizing.size_160})\`};
`,
            "should rewrite addition of two spacing tokens as calc()",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const doubled = spacing.medium_16 * 2;
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const doubled = \`calc(\${sizing.size_160} * 2)\`;
`,
            "should leave the multiplier unitless for `*`",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const compound = spacing.large_24 + spacing.medium_16 - 2;
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const compound = \`calc(\${sizing.size_240} + \${sizing.size_160} - 2px)\`;
`,
            "should flatten chained arithmetic into a single calc()",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const doubled = (spacing.medium_16 + 4) * 2;
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const doubled = \`calc((\${sizing.size_160} + 4px) * 2)\`;
`,
            "should preserve parens when a lower-precedence child sits inside a higher-precedence parent",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const halved = 2 * (spacing.large_24 - spacing.medium_16);
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const halved = \`calc(2 * (\${sizing.size_240} - \${sizing.size_160}))\`;
`,
            "should preserve parens when a lower-precedence child sits on the right of a higher-precedence parent",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const offset = spacing.large_24 - (spacing.medium_16 + 2);
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const offset = \`calc(\${sizing.size_240} - (\${sizing.size_160} + 2px))\`;
`,
            "should preserve parens for the right operand of a non-associative `-`",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const offset = computeBase() + spacing.medium_16;
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const offset = computeBase() + spacing.medium_16;
`,
            "should bail and flag when arithmetic mixes spacing with a CallExpression operand",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const offset = base + spacing.large_24;
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const offset = base + spacing.large_24;
`,
            "should bail and flag when arithmetic mixes spacing with an Identifier operand",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const label = "x" + spacing.small_12;
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const label = "x" + spacing.small_12;
`,
            "should bail and flag when arithmetic mixes spacing with a string-literal operand",
        );
    });

    describe("Strut", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut} from "@khanacademy/wonder-blocks-layout";
const node = <Strut size={spacing.medium_16} />;
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut} from "@khanacademy/wonder-blocks-layout";
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const node = <Strut size={spacing.medium_16} />;
`,
            "should leave spacing alone in a Strut size prop and flag the statement",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut} from "@khanacademy/wonder-blocks-layout";
const node = <Strut size={spacing.medium_16 + 4} />;
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut} from "@khanacademy/wonder-blocks-layout";
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const node = <Strut size={spacing.medium_16 + 4} />;
`,
            "should not flatten arithmetic into calc() inside a Strut size prop",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut} from "@khanacademy/wonder-blocks-layout";
const node = <Strut size={-spacing.medium_16} />;
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut} from "@khanacademy/wonder-blocks-layout";
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const node = <Strut size={-spacing.medium_16} />;
`,
            "should not produce a calc(-1 * sizing.X) string for unary-minus inside a Strut size prop",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut, View} from "@khanacademy/wonder-blocks-layout";
const node = (
    <View style={{padding: spacing.medium_16}}>
        <Strut size={spacing.large_24} />
    </View>
);
`,
            `
import {sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut, View} from "@khanacademy/wonder-blocks-layout";
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const node = (
    <View style={{padding: sizing.size_160}}>
        <Strut size={spacing.large_24} />
    </View>
);
`,
            "should still migrate sibling spacing references that are not inside a Strut",
        );
    });

    describe("VALID_* type imports", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import {VALID_SPACING} from "@khanacademy/wonder-blocks-tokens";
type SpacerSize = VALID_SPACING;
`,
            `
// TODO(spacing-migration): VALID_SPACING is deprecated — widen this type to 'number' (or 'number | string') and remove the import.
import {VALID_SPACING} from "@khanacademy/wonder-blocks-tokens";
type SpacerSize = VALID_SPACING;
`,
            "should leave the import alone but flag it with a TODO comment",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing, VALID_SPACING} from "@khanacademy/wonder-blocks-tokens";
const padding = spacing.medium_16;
type SpacerSize = VALID_SPACING;
`,
            `
// TODO(spacing-migration): VALID_SPACING is deprecated — widen this type to 'number' (or 'number | string') and remove the import.
import {sizing, VALID_SPACING} from "@khanacademy/wonder-blocks-tokens";
const padding = sizing.size_160;
type SpacerSize = VALID_SPACING;
`,
            "should swap spacing for sizing while keeping VALID_* and flagging it",
        );
    });

    describe("unary minus", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {marginLeft: -spacing.large_24};
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const styles = {marginLeft: \`calc(-1 * \${sizing.size_240})\`};
`,
            "should rewrite unary minus on spacing as a calc(-1 * sizing.X) template",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {marginLeft: -(spacing.medium_16 + 2)};
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const styles = {marginLeft: \`calc(-1 * (\${sizing.size_160} + 2px))\`};
`,
            "should wrap unary minus around an arithmetic expression in calc(-1 * (...))",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {marginRight: -(spacing.large_24 + spacing.medium_16)};
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const styles = {marginRight: \`calc(-1 * (\${sizing.size_240} + \${sizing.size_160}))\`};
`,
            "should wrap unary minus around two-spacing arithmetic in calc(-1 * (...))",
        );
    });

    describe("template-literal contexts", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {padding: \`10px \${spacing.medium_16}px\`};
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const styles = {padding: \`10px \${spacing.medium_16}px\`};
`,
            "should bail when spacing is followed by a CSS unit suffix in a template literal",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {width: \`calc(100% + \${spacing.large_24 * 2}px)\`};
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const styles = {width: \`calc(100% + \${spacing.large_24 * 2}px)\`};
`,
            "should bail on arithmetic inside a template literal (avoids nested template)",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {transform: \`translateX(\${spacing.medium_16})\`};
`,
            `
import {sizing} from "@khanacademy/wonder-blocks-tokens";
const styles = {transform: \`translateX(\${sizing.size_160})\`};
`,
            "should rewrite when the next quasi starts with punctuation/whitespace (safe)",
        );
    });

    describe("unhandled patterns", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const key = "medium_16" as const;
const padding = spacing[key];
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const key = "medium_16" as const;
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const padding = spacing[key];
`,
            "should leave dynamic-key access alone with a TODO comment",
        );

        defineInlineTest(
            transform,
            transformOptions,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
function spread(values) { return Object.values(values); }
const all = spread({...spacing});
`,
            `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
function spread(values) { return Object.values(values); }
// TODO(spacing-migration): manual review needed — \`spacing\` reference could not be auto-migrated.
const all = spread({...spacing});
`,
            "should leave whole-object spread alone with a TODO comment",
        );
    });

    describe("no-op", () => {
        defineInlineTest(
            transform,
            transformOptions,
            `
import * as React from "react";
import {Button} from "@khanacademy/wonder-blocks-button";

export const App = () => <Button>Click me</Button>;
`,
            `
import * as React from "react";
import {Button} from "@khanacademy/wonder-blocks-button";

export const App = () => <Button>Click me</Button>;
`,
            "should produce identical output for files with no spacing references",
        );
    });
});
