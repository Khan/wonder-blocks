import {definePreset, defineKeyframes, defineTokens} from "@pandacss/dev";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import buttonDefaultTheme from "./default";
import buttonKhanmigoTheme from "./khanmigo";

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

// Supported keyframes
const keyframes = defineKeyframes({
    spin: {
        "0%": {
            transform: "rotate(0deg)",
        },
        "50%": {
            transform: "rotate(180deg)",
        },
        "100%": {
            transform: "rotate(360deg)",
        },
    },
});

export default definePreset({
    // Useful for theme customization
    theme: {
        tokens: tokens,
        keyframes,
    },
    themes: {
        /**
         * The themes available to the Button component.
         */
        // NOTE: This generates css variables at build time for each theme, so
        // we don't have to dynamically load the theme at runtime.
        buttonDefault: buttonDefaultTheme,
        buttonKhanmigo: buttonKhanmigoTheme,
    },
    staticCss: {
        css: [
            {
                properties: {
                    background: ["*"],
                },
            },
        ],
        themes: ["buttonDefault", "buttonKhanmigo"],
    },
});
