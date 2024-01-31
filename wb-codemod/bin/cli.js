#!/usr/bin/env -S node -r @swc-node/register
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
    positionals: [files],
} = parseArgs({
    options: {
        transformFile: {
            type: "string",
            short: "t",
        },
        dryRun: {
            type: "boolean",
            short: "d",
        },
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

run(transformFile, [files], {
    dryRun,
    print,
});
