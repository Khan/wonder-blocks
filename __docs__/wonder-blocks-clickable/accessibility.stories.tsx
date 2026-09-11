import * as React from "react";
import {StyleSheet} from "aphrodite";

import Clickable, {
    type ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {
    border,
    boxShadow,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const actionCategory = semanticColor.action.secondary.progressive;

const styles = StyleSheet.create({
    rest: {
        border: `1px solid ${actionCategory.default.border}`,
        padding: sizing.size_080,
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
        outlineOffset: sizing.size_020,
    },
    panel: {
        padding: sizing.size_160,
        boxShadow: boxShadow.mid,
    },
    tabButton: {
        width: "100%",
    },
    tinyTarget: {
        blockSize: sizing.size_120,
        inlineSize: sizing.size_120,
        padding: "unset",
        borderWidth: border.width.medium,
    },
    pseudoShadow: {
        "::before": {
            boxShadow: boxShadow.mid,
        },
    },
    row: {
        flexDirection: "row",
        gap: sizing.size_240,
        alignItems: "center",
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

const Target = (
    props: React.PropsWithChildren<ClickableState & {style?: StyleType}>,
) => (
    <View
        style={[
            styles.rest,
            props.hovered && styles.hover,
            props.focused && styles.focus,
            props.pressed && styles.press,
            props.style,
        ]}
    >
        {props.children}
    </View>
);

export const KeyboardNavigation = {
    render: () => (
        <View>
            <Clickable
                role="button"
                aria-expanded="false" // Example shows aria attributes can be set
                id="button-1"
                style={styles.tabButton}
            >
                {(state) => (
                    <Target {...state}>
                        <BodyText tag="span">School Info</BodyText>
                    </Target>
                )}
            </Clickable>
        </View>
    ),

    name: "Keyboard navigation",
};

export const MinimumTargetSize = {
    render: () => (
        <View style={styles.row}>
            <Clickable
                onClick={() => {}}
                aria-label="Default hit area"
                style={styles.pseudoShadow}
            >
                {(state) => <Target style={styles.tinyTarget} {...state} />}
            </Clickable>
            <Clickable
                onClick={() => {}}
                aria-label="Hit area disabled"
                disableMinTargetSize={true}
            >
                {(state) => <Target style={styles.tinyTarget} {...state} />}
            </Clickable>
        </View>
    ),

    name: "Minimum target size",
};

export const OverlappingTargets = {
    render: () =>
        Array.from({length: 3}).map((_, i) => (
            <View key={i} style={[styles.row, {gap: "unset"}]}>
                {Array.from({length: 3}).map((_, j) => (
                    <Clickable
                        key={j}
                        onClick={() => {}}
                        aria-label={String(j)}
                    >
                        {(state) => (
                            <Target style={styles.tinyTarget} {...state} />
                        )}
                    </Clickable>
                ))}
            </View>
        )),

    name: "Overlapping targets",
};
