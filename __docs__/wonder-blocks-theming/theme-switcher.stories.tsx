import {Meta, StoryObj} from "@storybook/react-vite";
import * as React from "react";
import {StyleSheet} from "aphrodite";

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
    parameters: {
        // This is only for documentation purposes.
        chromatic: {
            disableSnapshot: true,
        },
    },
    // Hide stories in the sidebar. Only show Docs.
    tags: ["!dev"],
} as Meta<typeof ThemeSwitcher>;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = (() => {
    const [theme, setTheme] = React.useState<SupportedThemes>("default");

    const changeTheme = () => {
        const newTheme =
            theme === "thunderblocks" ? "default" : "thunderblocks";
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

export const Nested: Story = (() => {
    return (
        <ThemeSwitcher theme="default">
            <View style={styles.container}>
                <p>Default</p>
                <Button>Themed button</Button>
                <ThemeSwitcher theme="thunderblocks">
                    <View style={styles.container}>
                        <p>Thunder Blocks</p>
                        <Button>Themed button</Button>
                        <ThemeSwitcher theme="default">
                            <View style={styles.container}>
                                <p>Default</p>
                                <Button>Themed button</Button>
                            </View>
                        </ThemeSwitcher>
                    </View>
                </ThemeSwitcher>
            </View>
        </ThemeSwitcher>
    );
}) as Story;

const styles = StyleSheet.create({
    container: {
        padding: sizing.size_160,
        margin: sizing.size_160,
        border: "1px solid black",
    },
});
