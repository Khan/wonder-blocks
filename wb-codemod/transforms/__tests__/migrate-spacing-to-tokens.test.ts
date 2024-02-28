import transform from "../migrate-spacing-to-tokens";

// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const defineInlineTest = require("jscodeshift/dist/testUtils").defineInlineTest;

const transformOptions = {
    printOptions: {
        objectCurlySpacing: false,
    },
};

describe("migrate-spacing-to-tokens", () => {
    defineInlineTest(
        transform,
        transformOptions,
        `import Spacing from "@khanacademy/wonder-blocks-spacing";`,
        `import {spacing} from "@khanacademy/wonder-blocks-tokens";`,
        "should replace default import with named import",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {color} from "@khanacademy/wonder-blocks-tokens";
`,
        `import {color, spacing} from "@khanacademy/wonder-blocks-tokens";`,
        "should add a named import to the existing import declaration",
    );

    defineInlineTest(
        transform,
        transformOptions,
        `
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
`,
        `import {spacing} from "@khanacademy/wonder-blocks-tokens";`,
        "should delete the import declaration if the tokens.spacing named import is already used",
    );
});
