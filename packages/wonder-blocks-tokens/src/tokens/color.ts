import {fade, mix} from "../util/color-utils";
import {color as thunderBlocksColor} from "../theme/semantic/internal/primitive-color-thunderblocks";

const offBlack = "#21242c";
const white = "#ffffff";
const eggplant = "#5f1e5c";

type ColorType = {
    // Product
    blue: string;
    purple: string;
    green: string;
    gold: string;
    red: string;
    // Neutral
    offBlack: string;
    offBlack64: string;
    offBlack50: string;
    offBlack32: string;
    offBlack16: string;
    offBlack8: string;
    offWhite: string;
    white: string;
    white64: string;
    white50: string;
    white32: string;
    // Brand
    darkBlue: string;
    teal: string;
};

const baseColors: ColorType = {
    // Product
    blue: "#1865f2",
    purple: "#9059ff",
    green: "#00a60e",
    gold: "#ffb100",
    red: "#d92916",

    // Neutral
    offBlack,
    offBlack64: fade(offBlack, 0.64),
    offBlack50: fade(offBlack, 0.5),
    offBlack32: fade(offBlack, 0.32),
    offBlack16: fade(offBlack, 0.16),
    offBlack8: fade(offBlack, 0.08),

    offWhite: "#f7f8fa",
    white,
    white64: fade(white, 0.64),
    white50: fade(white, 0.5),
    white32: fade(white, 0.32),

    // Brand
    darkBlue: "#0b2149",
    teal: "#14bf96",
};

const fadedColorWithWhite = (color: string, alpha: number) =>
    mix(fade(color, alpha), baseColors.white);

export const color = {
    // Wonder Blocks base colors
    ...baseColors,
    // Additional colors
    // Blue shades
    activeBlue: mix(baseColors.offBlack32, baseColors.blue),
    fadedBlue: fadedColorWithWhite(baseColors.blue, 0.32),
    fadedBlue24: fadedColorWithWhite(baseColors.blue, 0.24),
    fadedBlue16: fadedColorWithWhite(baseColors.blue, 0.16),
    fadedBlue8: fadedColorWithWhite(baseColors.blue, 0.08),
    // Red shades
    activeRed: mix(baseColors.offBlack32, baseColors.red),
    fadedRed: fadedColorWithWhite(baseColors.red, 0.32),
    fadedRed24: fadedColorWithWhite(baseColors.red, 0.24),
    fadedRed16: fadedColorWithWhite(baseColors.red, 0.16),
    fadedRed8: fadedColorWithWhite(baseColors.red, 0.08),
    // Green shades
    activeGreen: mix(baseColors.offBlack32, baseColors.green),
    fadedGreen24: fadedColorWithWhite(baseColors.green, 0.24),
    fadedGreen16: fadedColorWithWhite(baseColors.green, 0.16),
    fadedGreen8: fadedColorWithWhite(baseColors.green, 0.08),
    // Gold shades
    activeGold: mix(baseColors.offBlack32, baseColors.gold),
    fadedGold24: fadedColorWithWhite(baseColors.gold, 0.24),
    fadedGold16: fadedColorWithWhite(baseColors.gold, 0.16),
    fadedGold8: fadedColorWithWhite(baseColors.gold, 0.08),
    // Purple shades
    fadedPurple24: fadedColorWithWhite(baseColors.purple, 0.24),
    fadedPurple16: fadedColorWithWhite(baseColors.purple, 0.16),
    fadedPurple8: fadedColorWithWhite(baseColors.purple, 0.08),
    // Khanmigo
    eggplant: eggplant,
    fadedEggplant8: fadedColorWithWhite(eggplant, 0.08),
    // Faded versions of offBlack
    fadedOffBlack72: fadedColorWithWhite(offBlack, 0.72),
    fadedOffBlack64: fadedColorWithWhite(offBlack, 0.64),
    fadedOffBlack50: fadedColorWithWhite(offBlack, 0.5),
    fadedOffBlack32: fadedColorWithWhite(offBlack, 0.32),
    fadedOffBlack16: fadedColorWithWhite(offBlack, 0.16),
    fadedOffBlack8: fadedColorWithWhite(offBlack, 0.08),

    // Magenta - same as Thunderblocks
    magenta_90: thunderBlocksColor.magenta_90,
    magenta_80: thunderBlocksColor.magenta_80,
    magenta_70: thunderBlocksColor.magenta_70,
    magenta_60: thunderBlocksColor.magenta_60,
    magenta_50: thunderBlocksColor.magenta_50,
    magenta_40: thunderBlocksColor.magenta_40,
    magenta_30: thunderBlocksColor.magenta_30,
    magenta_20: thunderBlocksColor.magenta_20,
    magenta_10: thunderBlocksColor.magenta_10,
    magenta_05: thunderBlocksColor.magenta_05,

    // Orange - same as Thunderblocks
    orange_90: thunderBlocksColor.orange_90,
    orange_80: thunderBlocksColor.orange_80,
    orange_70: thunderBlocksColor.orange_70,
    orange_60: thunderBlocksColor.orange_60,
    orange_50: thunderBlocksColor.orange_50,
    orange_40: thunderBlocksColor.orange_40,
    orange_30: thunderBlocksColor.orange_30,
    orange_20: thunderBlocksColor.orange_20,
    orange_10: thunderBlocksColor.orange_10,
    orange_05: thunderBlocksColor.orange_05,

    // Cyan - same as Thunderblocks
    cyan_90: thunderBlocksColor.cyan_90,
    cyan_80: thunderBlocksColor.cyan_80,
    cyan_70: thunderBlocksColor.cyan_70,
    cyan_60: thunderBlocksColor.cyan_60,
    cyan_50: thunderBlocksColor.cyan_50,
    cyan_40: thunderBlocksColor.cyan_40,
    cyan_30: thunderBlocksColor.cyan_30,
    cyan_20: thunderBlocksColor.cyan_20,
    cyan_10: thunderBlocksColor.cyan_10,
    cyan_05: thunderBlocksColor.cyan_05,
};
