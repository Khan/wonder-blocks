#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
const {parseArgs} = require("node:util");
const {run} = require("../src/wb-codemod");

const HELP_TEXT = `
Usage: wb-codemod [options] <files>

Options:
    -t, --transform-file  The path to the transform file to use.
    -d, --dry-run         Whether to run the codemod without making any changes.
    -p, --print           Whether to print the transformed code to stdout.
    -h, --help            Show this help message.
`;

const {
    values: {help, transformFile, dryRun, print},
    positionals,
} = parseArgs({
    options: {
        /**
         * The path to the transform file to use.
         */
        transformFile: {
            type: "string",
            short: "t",
        },
        /**
         * Whether to run the codemod without making any changes.
         */
        dryRun: {
            type: "boolean",
            short: "d",
        },
        /**
         * Whether to print the transformed code to stdout.
         */
        print: {
            type: "boolean",
            short: "p",
        },
        help: {
            type: "boolean",
            short: "h",
        },
    },
    allowPositionals: true,
});

if (help) {
    // eslint-disable-next-line no-console
    console.log(HELP_TEXT);
    process.exit(0);
}

if (!transformFile) {
    // eslint-disable-next-line no-console
    console.error("Error: --transform-file (-t) is required.");
    // eslint-disable-next-line no-console
    console.log(HELP_TEXT);
    process.exit(1);
}

if (positionals.length === 0) {
    // eslint-disable-next-line no-console
    console.error("Error: at least one file or directory path is required.");
    // eslint-disable-next-line no-console
    console.log(HELP_TEXT);
    process.exit(1);
}

run(transformFile, positionals, {
    dryRun,
    print,
});
