import {resolve} from "path";
import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [react()],
    build: {
        assetsInlineLimit: 0,
    },
    css: {
        modules: {
            generateScopedName: "[name]__[local]___[hash:base64:5]",
            localsConvention: "camelCase",
        },
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
            {
                find: /^@khanacademy\/wonder-blocks(-.*)$/,
                replacement: resolve(
                    __dirname,
                    "./packages/wonder-blocks$1/src",
                ),
            },
        ],
    },
});
