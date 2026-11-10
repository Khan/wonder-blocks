/**
 * Stylelint 17+ is published as ES modules only, which Jest 29 can't load
 * without `--experimental-vm-modules`. Node itself can `require()` ES modules,
 * so we load stylelint with Node's own `require` (bypassing Jest's module
 * system) and re-export it. `moduleNameMapper` in test.config.js points
 * `stylelint` imports here.
 */
const path = require("node:path");

// Jest replaces `createRequire` from `require("node:module")` with one that
// goes through Jest's module system, so get the real one from Node instead.
const {createRequire} = process.getBuiltinModule("node:module");

const nodeRequire = createRequire(
    path.join(
        __dirname,
        "../../packages/stylelint-plugin-wonder-blocks/package.json",
    ),
);

const stylelint = nodeRequire("stylelint");

module.exports = stylelint.default ?? stylelint;
