// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";

import type {Placement} from "@khanacademy/wonder-blocks-tooltip";
import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Floating/Tooltip",
};

const BaseTooltipExample = ({placement}: {|placement: Placement|}) => {
    const inputRef = React.useRef<null | HTMLElement>(null);
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

export const tooltipRight: StoryComponentType = () => (
    <BaseTooltipExample placement="right" />
);

export const tooltipLeft: StoryComponentType = () => (
    <BaseTooltipExample placement="left" />
);

export const tooltipTop: StoryComponentType = () => (
    <BaseTooltipExample placement="top" />
);

export const tooltipBottom: StoryComponentType = () => (
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
