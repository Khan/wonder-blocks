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
    title: "Popover",
};

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
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
                    Open popover
                </Button>
            </Popover>
        </View>
    );
};
export const leftAlignedPopover: StoryComponentType = () => (
    <BasePopoverExample placement="left" />
);

export const rightAlignedPopover: StoryComponentType = () => (
    <BasePopoverExample placement="right" />
);

export const bottomAlignedPopover: StoryComponentType = () => (
    <BasePopoverExample placement="bottom" />
);

export const topAlignedPopover: StoryComponentType = () => (
    <BasePopoverExample placement="top" />
);
