/**
 * Root PostCSS config — picked up by Vite (Storybook) and any future
 * Rollup-side CSS pipeline.
 *
 * Plugin order matters:
 *   1. postcss-import           — inline @import (incl. cross-package paths
 *                                 resolved through the workspace).
 *   2. @csstools/postcss-mixins — expand @define-mixin / @mixin before any
 *                                 downstream transform sees them.
 *
 * CSS Modules class-name hashing is handled by the consumer:
 *   - Vite handles `*.module.css` natively (its built-in CSS Modules pass
 *     runs *after* this PostCSS chain).
 *   - Phase-1 Rollup integration will run `postcss-modules` separately.
 */
const postcssImport = require("postcss-import");
const postcssMixins = require("@csstools/postcss-mixins");

module.exports = {
    plugins: [postcssImport(), postcssMixins()],
};
