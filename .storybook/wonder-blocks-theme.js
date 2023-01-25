import {create} from "@storybook/theming";

/**
 * Custom theme to make Storybook look closer to the current Wonder Blocks
 * website (at least from the branding perspective).
 */
export default create({
    base: "light",
    brandTitle: "Wonder Blocks",
    brandUrl: "/",
    brandImage: "./logo-with-text.svg",
    appBg: "#f7f8fa", // offWhite
    colorSecondary: "#1865f2", // blue

    // Typography
    fontBase: '"Lato", sans-serif',
    fontCode: "Inconsolata",

    // Text colors
    textColor: "#21242c", // offBlack
});
