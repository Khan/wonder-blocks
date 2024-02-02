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
const color = Colors.red;
    `,
        `
import {color} from "@khanacademy/wonder-blocks-tokens";
const color = color.red;
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
        `import {spacing, color} from "@khanacademy/wonder-blocks-tokens";`,
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
});
