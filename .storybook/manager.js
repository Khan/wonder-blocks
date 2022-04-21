/**
 * Configuration of storybook addons.
 */
import {addons} from "@storybook/addons";
import wonderBlocksTheme from "./wonder-blocks-theme.js";

/**
 * Configures a custom theme to add some minor WB branding to our Storybook
 * instance.
 * @see https://storybook.js.org/docs/react/configure/theming
 */
addons.setConfig({
    theme: wonderBlocksTheme,
    sidebar: {
        showRoots: false,
    },
});
