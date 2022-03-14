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

    // Typography
    fontBase: '"Lato", sans-serif',
    fontCode: "Inconsolata",
});
