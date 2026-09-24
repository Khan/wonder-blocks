import {resolve} from "path";
import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

// Shared with Rollup so Storybook (Vite) and the published `dist` (Rollup)
// produce byte-identical hashed CSS Modules class names from the same
// `.module.css` source. Drift between the two would mean Storybook
// previews reference selectors that don't exist in the shipped CSS.
import {generateScopedName} from "./build-settings/css-modules-scoped-name.mjs";

export default defineConfig({
    plugins: [react()],
    build: {
        assetsInlineLimit: 0,
    },
    css: {
        modules: {
            generateScopedName,
        },
    },
    resolve: {
        alias: [
            // SPIKE (FEI-8331): render `@khanacademy/wonder-blocks-native`
            // components in Storybook through react-native-web.
            {
                find: /^react-native$/,
                replacement: resolve(
                    __dirname,
                    "./packages/wonder-blocks-native/node_modules/react-native-web",
                ),
            },
            {
                find: "@khanacademy/wonder-blocks-tokens/styles.css",
                replacement: resolve(
                    __dirname,
                    "./packages/wonder-blocks-tokens/dist/css/index.css",
                ),
            },
            // Allow us to detect changes from local wonder-blocks packages.
            // Anchored to `$` so subpath imports like
            // `@khanacademy/wonder-blocks-styles/focus-styles.css` are NOT
            // rewritten here — node resolution + the workspace symlink handles
            // those. (Greedy `.*` would otherwise eat the subpath and append
            // `/src`.)
            {
                find: /^@khanacademy\/wonder-blocks(-[^/]*)$/,
                replacement: resolve(
                    __dirname,
                    "./packages/wonder-blocks$1/src",
                ),
            },
        ],
    },
});
