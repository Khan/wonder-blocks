import {create} from "storybook/theming";

// NOTE: We cannot import wonder-blocks-colors directly here because it's not a
// dependency of the main package.json file.

/**
 * Custom theme to make Storybook look closer to the current Wonder Blocks
 * website (at least from the branding perspective).
 */
export default create({
    base: "dark",
    brandTitle: "Wonder Blocks",
    brandUrl: "/",
    brandImage: "./logo-with-text--dark.svg",
});
