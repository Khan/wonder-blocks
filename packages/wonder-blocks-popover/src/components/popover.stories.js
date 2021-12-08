// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";

import type {StoryComponentType} from "@storybook/react";
import type {Placement} from "@khanacademy/wonder-blocks-tooltip";
import Popover from "./popover.js";
import PopoverContent from "./popover-content.js";

export default {
    title: "Floating/Popover",
};

const styles = StyleSheet.create({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        height: `calc(100vh - 16px)`,
    },
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
    },
});

const BasePopoverExample = ({placement}: {|placement: Placement|}) => {
    const [opened, setOpened] = React.useState(true);
    return (
        <View style={styles.example}>
            <Popover
                placement={placement}
                opened={opened}
                onClose={() => setOpened(false)}
                content={
                    <PopoverContent
                        title="Title"
                        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                        closeButtonVisible
                    />
                }
            >
                <Button
                    onClick={() => {
                        setOpened(true);
                    }}
                >
                    {`Open popover: ${placement}`}
                </Button>
            </Popover>
        </View>
    );
};

export const PopoverAlignment: StoryComponentType = () => (
    <View style={styles.container}>
        <BasePopoverExample placement="left" />
        <BasePopoverExample placement="bottom" />
        <BasePopoverExample placement="right" />
        <BasePopoverExample placement="top" />
    </View>
);
