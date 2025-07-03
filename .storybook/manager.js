/**
 * Configuration of storybook addons.
 */
import {addons} from "@storybook/manager-api";
import wonderBlocksTheme from "./wonder-blocks-theme";

/**
 * Configures a custom theme to add some minor WB branding to our Storybook
 * instance.
 * @see https://storybook.js.org/docs/react/configure/theming
 */
addons.setConfig({
    theme: wonderBlocksTheme,
    sidebar: {
        showRoots: true,
    },
});
