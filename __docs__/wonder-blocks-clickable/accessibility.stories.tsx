import * as React from "react";
import {StyleSheet} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body} from "@khanacademy/wonder-blocks-typography";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const styles = StyleSheet.create({
    resting: {
        boxShadow: `inset 0px 0px 1px 1px ${color.lightBlue}`,
        padding: spacing.xSmall_8,
    },
    hovered: {
        textDecoration: "underline",
        backgroundColor: color.blue,
        color: color.white,
    },
    pressed: {
        color: color.darkBlue,
    },
    focused: {
        outline: `solid 4px ${color.lightBlue}`,
    },
    panel: {
        padding: spacing.medium_16,
        boxShadow: `inset 0px 0px 0 1px ${color.offBlack8}`,
    },
});

export default {
    title: "Clickable / Clickable / Accessibility",
    component: Clickable,

    // Disables chromatic testing for these stories.
    parameters: {
        previewTabs: {
            canvas: {
                hidden: true,
            },
        },

        viewMode: "docs",

        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const Labeling = {
    render: () => (
        <View>
            <Clickable
                onClick={() => {}}
                aria-label="More information about this subject"
            >
                {({hovered, focused, pressed}) => (
                    <PhosphorIcon icon={IconMappings.info} />
                )}
            </Clickable>
        </View>
    ),
};

export const DisabledState = {
    render: () => (
        <Clickable
            // eslint-disable-next-line no-console
            onClick={(e) => console.log("Hello, world!")}
            disabled={true}
        >
            {({hovered, focused, pressed}) =>
                "This is a disabled clickable element"
            }
        </Clickable>
    ),

    name: "Disabled state",
};

export const KeyboardNavigation = {
    render: () => (
        <View>
            <Clickable role="tab" aria-controls="panel-1" id="tab-1">
                {({hovered, focused, pressed}) => (
                    <View
                        style={[
                            styles.resting,
                            hovered && styles.hovered,
                            focused && styles.focused,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Body>Open School Info</Body>
                    </View>
                )}
            </Clickable>
            <View
                id="panel-1"
                role="tabpanel"
                tabIndex={0}
                aria-labelledby="tab-1"
                style={styles.panel}
            >
                This is the information for the school.
            </View>
        </View>
    ),

    name: "Keyboard navigation",
};
