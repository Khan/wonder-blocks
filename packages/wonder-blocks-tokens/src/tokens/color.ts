import {fade, mix} from "../util/utils";

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
    fadedGreen24: fadedColorWithWhite(baseColors.green, 0.24),
    fadedGreen16: fadedColorWithWhite(baseColors.green, 0.16),
    fadedGreen8: fadedColorWithWhite(baseColors.green, 0.08),
    // Gold shades
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
    fadedOffBlack64: fadedColorWithWhite(offBlack, 0.64),
    fadedOffBlack50: fadedColorWithWhite(offBlack, 0.5),
    fadedOffBlack32: fadedColorWithWhite(offBlack, 0.32),
    fadedOffBlack16: fadedColorWithWhite(offBlack, 0.16),
    fadedOffBlack8: fadedColorWithWhite(offBlack, 0.08),
};
