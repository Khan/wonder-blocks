import transform from "../migrate-color-to-semantic-color";

// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const defineInlineTest = require("jscodeshift/dist/testUtils").defineInlineTest;

const transformOptions = {
    printOptions: {
        objectCurlySpacing: false,
    },
};

describe("migrate-color-to-semantic-color", () => {
    defineInlineTest(
        transform,
        transformOptions,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const bgColor = color.blue;
    `,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const bgColor = color.blue;
    `,
        "should not transform when no CSS property context is found",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: color.red,
    padding: spacing.medium_16,
};
`,
        `
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: semanticColor.core.foreground.critical.subtle,
    padding: spacing.medium_16,
};
`,
        "should replace color with semanticColor when there are other imports",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color, semanticColor} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    background: semanticColor.core.background.instructive.default,
    color: color.blue,
};
`,
        `
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    background: semanticColor.core.background.instructive.default,
    color: semanticColor.core.foreground.instructive.subtle,
};
`,
        "should remove color import if semanticColor already exists",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const bgColor = "blue";
`,
        `
import {spacing} from "@khanacademy/wonder-blocks-tokens";
const bgColor = "blue";
`,
        "should do nothing if color is not imported",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: color.blue,
    backgroundColor: color.blue,
    borderColor: color.blue,
};
`,
        `
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: semanticColor.core.foreground.instructive.subtle,
    backgroundColor: semanticColor.core.background.instructive.default,
    borderColor: semanticColor.core.border.instructive.default,
};
`,
        "should map color.blue based on CSS property context (color, backgroundColor, borderColor)",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    borderColor: color.red,
    borderTopColor: color.green,
    borderBottomColor: color.gold,
    borderLeftColor: color.offBlack,
};
`,
        `
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    borderColor: semanticColor.core.border.critical.default,
    borderTopColor: semanticColor.core.border.success.default,
    borderBottomColor: semanticColor.core.border.warning.default,
    borderLeftColor: semanticColor.core.border.neutral.strong,
};
`,
        "should handle all borderColor variants (borderColor, borderTopColor, etc.)",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    backgroundColor: color.fadedBlue8,
    borderColor: color.offBlack,
    color: color.fadedOffBlack72,
};
`,
        `
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    backgroundColor: semanticColor.core.background.instructive.subtle,
    borderColor: semanticColor.core.border.neutral.strong,
    color: semanticColor.core.foreground.neutral.default,
};
`,
        "should map different colors based on their CSS property context",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const unknownColor = color.someUnknownColor;
`,
        `
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
const unknownColor = semanticColor.someUnknownColor;
`,
        "should keep property name if no mapping exists",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    border: \`1px solid \${color.blue}\`,
    background: \`linear-gradient(\${color.fadedBlue8}, \${color.white})\`,
};
`,
        `
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    border: \`1px solid \${semanticColor.core.border.instructive.default}\`,
    background: \`linear-gradient(\${semanticColor.core.background.instructive.subtle}, \${semanticColor.core.background.base.default})\`,
};
`,
        "should handle template literals with CSS property context",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: color.red,
    backgroundColor: color.fadedRed8,
    borderColor: color.activeRed,
};
`,
        `
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: semanticColor.core.foreground.critical.subtle,
    backgroundColor: semanticColor.core.background.critical.subtle,
    borderColor: semanticColor.core.border.critical.strong,
};
`,
        "should handle critical (red) colors with different contexts",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: color.green,
    backgroundColor: color.fadedGreen8,
    borderTopColor: color.activeGreen,
    borderBottomColor: color.fadedGreen24,
};
`,
        `
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: semanticColor.core.foreground.success.subtle,
    backgroundColor: semanticColor.core.background.success.subtle,
    borderTopColor: semanticColor.core.border.success.strong,
    borderBottomColor: semanticColor.core.border.success.subtle,
};
`,
        "should handle success (green) colors with different contexts including border variants",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: color.gold,
    backgroundColor: color.fadedGold8,
    outlineColor: color.activeGold,
};
`,
        `
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    color: semanticColor.core.foreground.warning.subtle,
    backgroundColor: semanticColor.core.background.warning.subtle,
    outlineColor: semanticColor.core.border.warning.strong,
};
`,
        "should handle warning (gold) colors and outline properties",
    );
});
