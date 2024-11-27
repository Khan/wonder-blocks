import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
// import viteTsconfigPaths from "vite-tsconfig-paths";
import {resolve} from "path";

export default defineConfig({
    plugins: [
        react(),
        // viteTsconfigPaths()
    ],
    resolve: {
        // Allow us to detect changes from local wonder-blocks packages.
        alias: [
            {
                find: /^@khanacademy\/wonder-blocks(-.*)$/,
                replacement: resolve(
                    __dirname,
                    "./packages/wonder-blocks$1/src",
                ),
            },
            {
                find: "@storybook/react-dom-shim",
                replacement: "@storybook/react-dom-shim/dist/react-16",
            },
        ],
    },
});
