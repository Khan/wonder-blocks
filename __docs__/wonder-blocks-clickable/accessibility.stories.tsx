import * as React from "react";
import {StyleSheet} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body} from "@khanacademy/wonder-blocks-typography";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const actionCategory = semanticColor.action.outlined.progressive;

const styles = StyleSheet.create({
    rest: {
        border: `1px solid ${actionCategory.default.border}`,
        padding: spacing.xSmall_8,
    },
    hover: {
        textDecoration: "underline",
        borderColor: actionCategory.hover.border,
        backgroundColor: actionCategory.hover.background,
        color: actionCategory.hover.foreground,
    },
    press: {
        background: actionCategory.press.background,
        borderColor: actionCategory.press.border,
        color: actionCategory.press.foreground,
    },
    focus: {
        outline: `solid 1px ${semanticColor.focus.outer}`,
        outlineOffset: spacing.xxxxSmall_2,
    },
    panel: {
        padding: spacing.medium_16,
        // TODO(WB-1878): Use elevation token.
        boxShadow: `0 ${spacing.xSmall_8}px ${spacing.xSmall_8}px 0 ${color.offBlack8}`,
    },
});

export default {
    title: "Packages / Clickable / Clickable / Accessibility",
    component: Clickable,
    parameters: {
        // Disables chromatic testing for these stories.
        chromatic: {
            disableSnapshot: true,
        },
    },
    // Include these stories in the Docs tab, but hide them from the sidebar.
    tags: ["autodocs", "!dev"],
};

export const Labeling = {
    render: () => (
        <View>
            <Clickable
                onClick={() => {}}
                aria-label="More information about this subject"
            >
                {() => <PhosphorIcon icon={IconMappings.info} />}
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
            {() => "This is a disabled clickable element"}
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
                            styles.rest,
                            hovered && styles.hover,
                            focused && styles.focus,
                            pressed && styles.press,
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
