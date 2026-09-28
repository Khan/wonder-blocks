import * as React from "react";
import {Meta} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";
import {
    FlexibleDialog,
    ModalLauncher,
    OnePaneDialog,
} from "@khanacademy/wonder-blocks-modal";
import {allModes, allThemeModes} from "../../.storybook/modes";
import Button from "@khanacademy/wonder-blocks-button";
import {longText, reallyLongText} from "../components/text-for-testing";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Modal / Testing / Snapshots / ModalLauncher",
    parameters: {
        chromatic: {
            modes: {
                "default rtl": allModes["themeDefault rtl"],
                small: allModes.small,
                ...allThemeModes,
            },
        },
    },
    tags: ["!autodocs", "!manifest"],
} as Meta;

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        gap: sizing.size_160,
    },
});
export const WithOnePaneDialog = {
    render: function Render() {
        const [opened, setOpened] = React.useState(true);

        const open = () => {
            setOpened(true);
        };
        const close = () => {
            setOpened(false);
        };
        return (
            <View style={styles.container}>
                {/* Include content in the background */}
                {longText}
                <Button onClick={open}>Open</Button>
                <ModalLauncher
                    modal={
                        <OnePaneDialog
                            title="OnePaneDialog"
                            subtitle="Subtitle"
                            content={<div>{reallyLongText}</div>}
                            footer={<Button onClick={close}>Action</Button>}
                        />
                    }
                    opened={opened}
                    onClose={close}
                />
            </View>
        );
    },
};

export const WithFlexibleDialog = {
    render: function Render() {
        const [opened, setOpened] = React.useState(true);

        const open = () => {
            setOpened(true);
        };
        const close = () => {
            setOpened(false);
        };
        return (
            <View style={styles.container}>
                {/* Include content in the background */}
                {longText}
                <Button onClick={open}>Open</Button>
                <ModalLauncher
                    modal={
                        <FlexibleDialog
                            title="FlexibleDialog"
                            content={<div>{reallyLongText}</div>}
                        />
                    }
                    opened={opened}
                    onClose={close}
                />
            </View>
        );
    },
};
