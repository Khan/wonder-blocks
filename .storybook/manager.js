/**
 * Configuration of storybook addons.
 */
import {addons} from "storybook/manager-api";
import wonderBlocksTheme from "./wonder-blocks-theme";
import wonderBlocksDarkTheme from "./wonder-blocks-dark-theme";

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

// Listen to theme changes and update the Storybook UI theme dynamically
addons.register("theme", (api) => {
    api.on("globalsUpdated", ({globals}) => {
        const {theme} = globals;
        const storybookTheme = theme === "syl-dark" ? wonderBlocksDarkTheme : wonderBlocksTheme;
        addons.setConfig({theme: storybookTheme});
    });
});
