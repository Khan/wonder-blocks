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
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

const Spacer = () => <Strut size={spacing.xxxSmall_4} />;
`,
            `
import * as React from "react";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

const Spacer = () => <Strut size={sizing.size_040} />;
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
