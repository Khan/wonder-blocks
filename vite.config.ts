import react from "@vitejs/plugin-react";
import {resolve} from "path";
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            // Allow us to detect changes from local wonder-blocks packages.
            {
                find: /^@khanacademy\/wonder-blocks(-.*)$/,
                replacement: resolve(
                    __dirname,
                    "./packages/wonder-blocks$1/src",
                ),
            },
            // Needed for Storybook + React to work with vitest.
            // https://github.com/storybookjs/storybook/issues/26842
            {
                find: "@storybook/react-dom-shim",
                replacement: "@storybook/react-dom-shim/dist/react-16",
            },
        ],
    },
});
