import Spacing from "@khanacademy/wonder-blocks-spacing";
import Color, {fade, mix} from "@khanacademy/wonder-blocks-color";

/**
 * Core tokens for the Wonder Blocks design system.
 * @private
 *
 * NOTE: This file is private for WB usage only. It's not recommended to use
 * this file in consumer apps at the moment.
 */
const tokens = {
    color: {
        // Wonder Blocks base colors
        ...Color,
        // New colors
        activeBlue: mix(Color.offBlack32, Color.blue),
        fadedBlue: mix(fade(Color.blue, 0.32), Color.white),
        fadedBlue16: fade(Color.blue, 0.16),
        fadedBlue8: fade(Color.blue, 0.08),
        activeRed: mix(Color.offBlack32, Color.red),
        fadedRed: mix(fade(Color.red, 0.32), Color.white),
        fadedRed16: fade(Color.red, 0.16),
        fadedRed8: fade(Color.red, 0.08),
        // Additional colors (e.g. for use in other themes)
        // Khanmigo
        white32: fade(Color.white, 0.32),
        eggplant: "#5f1e5c",
        // Pill
        pillBlue: fade(Color.blue, 0.24),
        pillGreen: fade(Color.green, 0.24),
        pillGold: fade(Color.gold, 0.24),
        pillRed: fade(Color.red, 0.24),
    },
    spacing: Spacing,
    border: {
        radius: {
            xSmall_2: 2,
            small_3: 3,
            medium_4: 4,
            large_6: 6,
            xLarge_12: 12,
            full: "50%",
        },
        width: {
            none: 0,
            hairline: 1,
            thin: 2,
            thick: 4,
        },
    },
    font: {
        family: {
            sans: 'Lato, "Noto Sans", sans-serif',
            serif: '"Noto Serif", serif',
            mono: "Inconsolata, monospace",
        },
        size: {
            xxxLarge: 36,
            xxLarge: 28,
            xLarge: 24,
            large: 20,
            medium: 16,
            small: 14,
            xSmall: 12,
        },
        lineHeight: {
            xxxLarge: 40,
            xxLarge: 32,
            xLarge: 28,
            large: 24,
            medium: 20,
            small: 18,
            xSmall: 16,
        },
        weight: {
            light: 300,
            regular: 400,
            bold: 700,
        },
    },
};

export default tokens;
