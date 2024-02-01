// TODO(WB-1642): Move wonder-blocks-color to tokens
import Color, {fade, mix} from "@khanacademy/wonder-blocks-color";

export const color = {
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
    fadedGreen16: fade(Color.green, 0.16),
    fadedGold16: fade(Color.gold, 0.16),
    // Additional colors (e.g. for use in other themes)
    // Khanmigo
    white32: fade(Color.white, 0.32),
    eggplant: "#5f1e5c",
};
