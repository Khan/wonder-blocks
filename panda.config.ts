import {defineConfig, defineTokens} from "@pandacss/dev";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

const wbTokenToPandaToken = (token: Record<string, string | number>) =>
    Object.entries(token)
        .map(([key, value]) => {
            if (typeof value === "number") {
                value = `${value}px`;
            }
            return {
                [key]: {
                    value,
                },
            };
        })
        .reduce((acc, curr) => ({...acc, ...curr}), {}) as {
        [x: string]: {
            value: string;
        };
    };

// Map WB tokens to Panda CSS tokens
const tokens = defineTokens({
    colors: wbTokenToPandaToken(color),
    spacing: wbTokenToPandaToken(spacing),
});

export default defineConfig({
    // Whether to use css reset
    preflight: false,

    // Where to look for your css declarations
    include: [
        "./packages/**/*.{ts,tsx}",
        "./__docs__/**/*.{ts,tsx,mdx}",
        "./.storybook/**/*.{ts,tsx}",
    ],

    // Files to exclude
    exclude: [],

    // Disable default tokens
    presets: [],

    // Useful for theme customization
    theme: {
        tokens: tokens,
    },

    // The output directory for your css system
    outdir: "styled-system",

    staticCss: {
        css: [
            {
                properties: {
                    background: ["*"],
                },
            },
        ],
    },

    importMap: "@/styled-system",
    strictTokens: false,
    // optimizations
    minify: true,
    // hash: true,
});
