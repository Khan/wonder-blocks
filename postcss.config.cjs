// Root PostCSS config — picked up by Vite (Storybook) and Rollup
// (`rollup-plugin-postcss` in `build-settings/rollup.config.mjs`).
//
// Plugin order matters:
//   1. postcss-import           — inline @import (incl. cross-package paths
//                                 resolved through the workspace).
//   2. postcss-global-data      — inject the breakpoint `@custom-media`
//                                 definitions from the tokens package into
//                                 every file (removed again on exit), so
//                                 modules don't need to `@import` them.
//   3. @csstools/postcss-mixins — expand @define-mixin / @mixin before any
//                                 downstream transform sees them.
//   4. postcss-custom-media     — expand `@media (--wb-breakpoint-…)` to the
//                                 plain `min-width` / `max-width` query. Must
//                                 run before wrap-in-layer moves the
//                                 definitions into `@layer shared`.
//   5. wrap-in-layer            — move every remaining top-level rule into
//                                 `@layer shared { … }` so authors never
//                                 write the wrap by hand. Layer order is
//                                 declared once in
//                                 `.storybook/preview-head.html`
//                                 (`@layer reset, tokens, shared, overrides`).
//
// CSS Modules class-name hashing is handled by the consumer:
//   - Vite handles `*.module.css` natively (its built-in CSS Modules pass
//     runs *after* this PostCSS chain).
//   - Rollup uses `rollup-plugin-styler`'s `modules` option.
const {createRequire} = require("node:module");
const path = require("node:path");
const postcssImport = require("postcss-import");
const postcssMixins = require("@csstools/postcss-mixins");
const postcssGlobalData = require("@csstools/postcss-global-data");
const postcssCustomMedia = require("postcss-custom-media");

// Generated from `breakpoint.mediaQuery` in
// `packages/wonder-blocks-tokens/src/tokens/media-queries.ts`. Referenced by
// path (not a package export) because it's only consumed at build time;
// the published CSS contains the expanded queries.
const CUSTOM_MEDIA_FILE = path.join(
    __dirname,
    "packages/wonder-blocks-tokens/src/css/custom-media.css",
);

// postcss-import's default resolver (browserify/resolve) does not honor the
// `exports` field in package.json. `@khanacademy/wonder-blocks-styles`
// exposes its CSS via a subpath pattern (`"./*.css": "./src/styles/*.css"`)
// with no fallback `main`/`style`, so the default resolver fails on
// `@import "@khanacademy/wonder-blocks-styles/focus-styles.css"`.
//
// Node's own resolver understands `exports`, so we delegate to it for bare
// specifiers. Relative and absolute paths are left for postcss-import to
// handle itself.
//
// Note: Vite overrides this resolver in its own pipeline (it injects its
// resolver that already honors `exports`), so this primarily benefits the
// rspack build.
function resolveCssImport(id, basedir) {
    if (id.startsWith(".") || path.isAbsolute(id)) {
        return id;
    }
    return createRequire(path.join(basedir, "_")).resolve(id);
}

const wrapInLayer = (layerName) => ({
    postcssPlugin: "wrap-in-layer",
    Once(root, {AtRule}) {
        // Only wrap CSS Module files. Plain `.css` files (fonts, focus
        // styles, Storybook scaffolding, etc.) shouldn't be coerced into
        // `@layer shared` — those manage their own cascade.
        const from = root.source?.input?.from ?? "";
        if (!from.endsWith(".module.css")) {
            return;
        }

        // Skip files where every non-import/charset node is *already* an
        // `@layer <same name>` block — re-wrapping would create nested
        // `@layer shared { @layer shared { … } }`.
        const nonHeaderNodes = root.nodes.filter(
            (node) =>
                node.type !== "comment" &&
                !(
                    node.type === "atrule" &&
                    (node.name === "import" || node.name === "charset")
                ),
        );
        const alreadyWrapped =
            nonHeaderNodes.length > 0 &&
            nonHeaderNodes.every(
                (node) =>
                    node.type === "atrule" &&
                    node.name === "layer" &&
                    node.params === layerName,
            );
        if (alreadyWrapped) {
            return;
        }

        const layer = new AtRule({name: "layer", params: layerName});
        const nodes = root.nodes.slice();
        for (const node of nodes) {
            // `@import` / `@charset` must stay at the top of the file.
            if (
                node.type === "atrule" &&
                (node.name === "import" || node.name === "charset")
            ) {
                continue;
            }
            node.remove();
            layer.append(node);
        }
        root.append(layer);
    },
});
wrapInLayer.postcss = true;

module.exports = {
    plugins: [
        postcssImport({
            resolve: resolveCssImport,
            filter: (id) => {
                // Only process WB imports — don't try to inline @imports that
                // appear in third-party CSS files (e.g. font CDN URLs).
                return id.includes("@khanacademy/wonder-blocks-styles");
            },
        }),
        postcssGlobalData({files: [CUSTOM_MEDIA_FILE]}),
        postcssMixins(),
        // `preserve: false` (the default) drops the `@custom-media` rules
        // and leaves only the expanded `@media` queries in the output.
        postcssCustomMedia(),
        wrapInLayer("shared"),
    ],
};
