import {resolve} from "path";
import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [react()],
    build: {
        assetsInlineLimit: 0,
    },
    resolve: {
        alias: [
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
