import {create} from "@storybook/theming";

/**
 * Custom theme to make Storybook look closer to the current Wonder Blocks
 * website (at least from the branding perspective).
 */
export default create({
    base: "light",
    brandTitle: "Wonder Blocks",
    brandUrl: "/",
    brandImage: "./logo.svg",
    colorPrimary: "#E31937",
    colorSecondary: "#489FDF",

    // Typography
    fontBase: '"Lato", sans-serif',
    fontCode: "Inconsolata",

    // Text colors
    textColor: "#21242C",
    textInverseColor: "rgba(255,255,255,0.9)",
});
