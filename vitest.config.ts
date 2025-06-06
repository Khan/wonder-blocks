import {mergeConfig} from "vitest/config";
import {storybookTest} from "@storybook/experimental-addon-test/vitest-plugin";
import viteConfig from "./vite.config";

// More info at: https://storybook.js.org/docs/writing-tests/vitest-plugin
export default mergeConfig(viteConfig, {
    plugins: [
        // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
        storybookTest({
            configDir: ".storybook",
            storybookUrl: process.env.SB_URL || "http://localhost:6061",
        }),
    ],
    test: {
        name: "storybook",
        browser: {
            enabled: true,
            name: "chromium",
            headless: true,
            provider: "playwright",
        },
        // Make sure to adjust this pattern to match your stories files.
        stories: ["./__docs__/**/*.stories.@(ts|tsx)"],
        setupFiles: [".storybook/vitest.setup.ts"],
    },
});
