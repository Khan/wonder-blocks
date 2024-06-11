import {defineConfig} from "@pandacss/dev";
import {pandaPreset} from "@khanacademy/wonder-blocks-theming";

export default defineConfig({
    // Whether to use css reset
    preflight: false,

    // Where to look for your css declarations
    include: [
        "./packages/**/*.{ts,tsx}",
        "./__docs__/**/*.{ts,tsx,mdx}",
        "./.storybook/**/*.{ts,tsx}",
    ],
    // ISSUE(juan): Enabling this causes the keyframes tokens to stop working.
    // jsxFramework: "react",

    // Files to exclude
    exclude: [],

    // Disable default tokens
    // Use WB presets instead
    presets: [pandaPreset],

    // The output directory for your css system
    outdir: "styled-system",
    importMap: "@/styled-system",
    strictTokens: false,
    // optimizations
    minify: true,
    // hash: true,
});
