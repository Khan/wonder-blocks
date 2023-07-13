import Spacing from "@khanacademy/wonder-blocks-spacing";
import Color, {fade, mix} from "@khanacademy/wonder-blocks-color";

const tokens = {
    colors: {
        ...Color,
        // New colors
        activeBlue: mix(Color.offBlack32, Color.blue),
        fadedBlue: mix(fade(Color.blue, 0.32), Color.white),
        activeRed: mix(Color.offBlack32, Color.red),
        fadedRed: mix(fade(Color.red, 0.32), Color.white),
    },
    spacing: Spacing,
    fonts: {
        primary: "Lato, sans-serif",
        secondary: "Source Serif sans, monospace",
    },
    fontWeights: {
        light: 300,
        regular: 400,
        bold: 700,
    },
    fontSizes: {
        // 36, 28, 24, 20, 16, 14, 12
        xxxLarge: 36,
        xxLarge: 28,
        xLarge: 24,
        large: 20,
        medium: 16,
        small: 14,
        xSmall: 12,
    },
    lineHeights: {
        // 40, 32, 28, 24, 20, 18, 16
        xxxLarge: 40,
        xxLarge: 32,
        xLarge: 28,
        large: 24,
        medium: 20,
        small: 18,
        xSmall: 16,
    },
};

export default tokens;
