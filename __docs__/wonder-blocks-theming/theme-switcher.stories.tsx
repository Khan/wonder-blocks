import {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {
    SupportedThemes,
    ThemeSwitcher,
} from "@khanacademy/wonder-blocks-theming";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import Button from "@khanacademy/wonder-blocks-button";

export default {
    title: "Packages / Theming / ThemeSwitcher",
    component: ThemeSwitcher,
    // Hide stories in the sidebar. Only show Docs.
    tags: ["!dev"],
} as Meta<typeof ThemeSwitcher>;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = (() => {
    const [theme, setTheme] = React.useState<SupportedThemes>("default");

    const changeTheme = () => {
        // NOTE: Right now, this is just a placeholder, meaning that no visual
        // changes are expected.
        // TODO(WB-1896): Update this to use the `thunderblocks` theme.
        const newTheme = theme === "khanmigo" ? "default" : "khanmigo";
        setTheme(newTheme);
    };

    return (
        <>
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <Button kind="secondary" onClick={changeTheme}>
                    Switch theme
                </Button>
                <Button>Outside button (doesn&apos;t affect new theme)</Button>
            </View>
            <ThemeSwitcher theme={theme}>
                <p>Theming demo using: {theme}</p>
                <Button>Themed button</Button>
            </ThemeSwitcher>
        </>
    );
}) as Story;
