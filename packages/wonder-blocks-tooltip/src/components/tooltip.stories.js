// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";

import type {Placement} from "@khanacademy/wonder-blocks-tooltip";
import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Floating/Tooltip",
    parameters: {
        // TODO(WB-1170): Reassess this after investigating more about Chromatic
        // flakyness.
        chromatic: {
            disableSnapshot: true,
        },
    },
};

const BaseTooltipExample = ({placement}: {|placement: Placement|}) => {
    const inputRef = React.useRef(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <View style={styles.centered}>
            <View>
                <Tooltip
                    content={`This is a text tooltip on the ${placement}`}
                    placement={placement}
                >
                    <TextField
                        id="tf-1"
                        type="text"
                        value=""
                        placeholder="Text"
                        onChange={() => {}}
                        ref={inputRef}
                    />
                </Tooltip>
            </View>
        </View>
    );
};

export const TooltipOnButtons: StoryComponentType = () => {
    return (
        <View style={styles.centered}>
            <View>
                <Tooltip content={"This is a tooltip on a button."}>
                    <Button disabled={false}>Example 1</Button>
                </Tooltip>
                <Strut size={Spacing.medium_16} />
                <Tooltip
                    content="This is a tooltip on a disabled button."
                    placement="bottom"
                >
                    <Button disabled={true}>Example 2</Button>
                </Tooltip>
            </View>
        </View>
    );
};

TooltipOnButtons.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
};

export const TooltipRight: StoryComponentType = () => (
    <BaseTooltipExample placement="right" />
);

export const TooltipLeft: StoryComponentType = () => (
    <BaseTooltipExample placement="left" />
);

export const TooltipTop: StoryComponentType = () => (
    <BaseTooltipExample placement="top" />
);

export const TooltipBottom: StoryComponentType = () => (
    <BaseTooltipExample placement="bottom" />
);

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    fullBleed: {
        width: "100%",
    },
    wrapper: {
        height: "800px",
        width: "1200px",
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
        height: `calc(100vh - 16px)`,
    },
});
