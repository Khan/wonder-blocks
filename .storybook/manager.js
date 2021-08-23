/**
 * Allows to configure Storybook.
 */
import {addons} from "@storybook/addons";
import wonderBlocks from "./wonder-blocks.js";

/**
 * Configures a custom theme to add some minor WB branding to our Storybook
 * instance.
 * @see https://storybook.js.org/docs/react/configure/theming
 */
addons.setConfig({
    theme: wonderBlocks,
});
