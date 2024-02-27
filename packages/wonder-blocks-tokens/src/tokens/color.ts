// TODO(WB-1642): Move wonder-blocks-color to tokens
import Color, {fade, mix} from "@khanacademy/wonder-blocks-color";

const fadedColorWithWhite = (color: string, alpha: number) =>
    mix(fade(color, alpha), Color.white);

export const color = {
    // Wonder Blocks base colors
    ...Color,
    // Additional colors
    white32: fade(Color.white, 0.32),
    // Blue shades
    activeBlue: mix(Color.offBlack32, Color.blue),
    fadedBlue: fadedColorWithWhite(Color.blue, 0.32),
    fadedBlue24: fadedColorWithWhite(Color.blue, 0.24),
    fadedBlue16: fadedColorWithWhite(Color.blue, 0.16),
    fadedBlue8: fadedColorWithWhite(Color.blue, 0.08),
    // Red shades
    activeRed: mix(Color.offBlack32, Color.red),
    fadedRed: fadedColorWithWhite(Color.red, 0.32),
    fadedRed24: fadedColorWithWhite(Color.red, 0.24),
    fadedRed16: fadedColorWithWhite(Color.red, 0.16),
    fadedRed8: fadedColorWithWhite(Color.red, 0.08),
    // Green shades
    fadedGreen24: fadedColorWithWhite(Color.green, 0.24),
    fadedGreen16: fadedColorWithWhite(Color.green, 0.16),
    // Gold shades
    fadedGold24: fadedColorWithWhite(Color.gold, 0.24),
    fadedGold16: fadedColorWithWhite(Color.gold, 0.16),
    // Purple shades
    fadedPurple24: fadedColorWithWhite(Color.purple, 0.24),
    fadedPurple16: fadedColorWithWhite(Color.purple, 0.16),
    // Khanmigo
    eggplant: "#5f1e5c",
};
