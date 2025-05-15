#!/usr/bin/env -S node -r @swc-node/register
import {parseArgs} from "node:util";
import {createCssFile} from "../src/build/generate-css-variables";

const HELP_TEXT = `
Usage: wonder-blocks-tokens [options] <files>

Options:
    -p, --prefix          The prefix to use for the CSS variables.
    -h, --help            Show this help message.
`;

const {
    values: {help, prefix},
    positionals: [files],
} = parseArgs({
    options: {
        /**
         * The prefix to use for the CSS variables.
         */
        prefix: {
            type: "string",
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

createCssFile(files, prefix);
