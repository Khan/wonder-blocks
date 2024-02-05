import transform from "../migrate-color-to-tokens";

// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const defineInlineTest = require("jscodeshift/dist/testUtils").defineInlineTest;

const transformOptions = {
    printOptions: {
        objectCurlySpacing: false,
    },
};

describe("migrate-color-to-tokens", () => {
    defineInlineTest(
        transform,
        transformOptions,
        `import Color from "@khanacademy/wonder-blocks-color";`,
        `import {color} from "@khanacademy/wonder-blocks-tokens";`,
        "should replace default import with named import",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import Colors from "@khanacademy/wonder-blocks-color";
const bgColor = Colors.red;
    `,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const bgColor = color.red;
    `,
        "should replace default import with named import when using a different name",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import Color from "@khanacademy/wonder-blocks-color";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
`,
        `import {color, spacing} from "@khanacademy/wonder-blocks-tokens";`,
        "should add a named import to the existing import declaration",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import Color from "@khanacademy/wonder-blocks-color";
import {color} from "@khanacademy/wonder-blocks-tokens";
`,
        `import {color} from "@khanacademy/wonder-blocks-tokens";`,
        "should delete the import declaration if the tokens.color named import is already used",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import Color, {fade} from "@khanacademy/wonder-blocks-color";
`,
        `
import {fade} from "@khanacademy/wonder-blocks-color";
import {color} from "@khanacademy/wonder-blocks-tokens";
`,
        "should keep the color import if there are other named imports in the source import declaration",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import Color, {fade} from "@khanacademy/wonder-blocks-color";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
`,
        `
import {fade} from "@khanacademy/wonder-blocks-color";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
`,
        "should keep the color import if there are other named imports in the source import declaration and move the default import to the existing target import",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import {fade, mix} from "@khanacademy/wonder-blocks-color";
const Color = {red: "red"};
// This Color definition comes from a different module.
const bgColor = Color.red;
`,
        `
import {fade, mix} from "@khanacademy/wonder-blocks-color";
const Color = {red: "red"};
// This Color definition comes from a different module.
const bgColor = Color.red;
`,
        "should do nothing if Color is not imported from @khanacademy/wonder-blocks-color",
    );
});
