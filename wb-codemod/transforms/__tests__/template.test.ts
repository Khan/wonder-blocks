import transform from "../template";

// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const defineInlineTest = require("jscodeshift/dist/testUtils").defineInlineTest;

const transformOptions = {
    printOptions: {
        objectCurlySpacing: false,
    },
};

describe("template", () => {
    defineInlineTest(
        transform,
        transformOptions,
        `const foo = true;`,
        `const bar = true;`,
        "should replace foo with bar",
    );
});
