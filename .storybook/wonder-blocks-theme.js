import {create} from "@storybook/theming";
import Color from "@khanacademy/wonder-blocks-color";

/**
 * Custom theme to make Storybook look closer to the current Wonder Blocks
 * website (at least from the branding perspective).
 */
export default create({
    base: "light",
    brandTitle: "Wonder Blocks",
    brandUrl: "/",
    brandImage: "./logo-with-text.svg",
    appBg: Color.offWhite,
    colorSecondary: Color.blue,

    // Typography
    fontBase: '"Lato", sans-serif',
    fontCode: "Inconsolata",

    // Form colors
    inputBg: Color.white,
    inputBorder: Color.offBlack16,
    inputTextColor: Color.offBlack,
    inputBorderRadius: 4,

    // Text colors
    textColor: Color.offBlack,
});
