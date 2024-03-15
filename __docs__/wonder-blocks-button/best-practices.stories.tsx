import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    column: {
        alignItems: "flex-start",
    },
    row: {
        flexDirection: "row",
    },
    gap: {
        height: 16,
    },
    button: {
        marginRight: 10,
    },
    buttonMinWidth: {
        marginRight: 10,
        minWidth: 144,
    },
});

export default {
    title: "Button / Best practices",
    component: Button,

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

export const FullBleedButton = {
    render: () => (
        <View>
            <Button>Label</Button>
        </View>
    ),

    name: "Full-bleed button",
};

export const ButtonsInRows = {
    render: () => (
        <View>
            <View style={styles.row}>
                <Button>Button in a row</Button>
            </View>
            <View style={styles.gap} />
            <View style={styles.column}>
                <Button>Button in a column</Button>
            </View>
        </View>
    ),

    name: "Buttons in rows",
};

export const UsingMinWidth = {
    render: () => (
        <View style={styles.row}>
            <Button style={styles.buttonMinWidth} kind="secondary">
                label
            </Button>
            <Button style={styles.buttonMinWidth}>
                label in a different language
            </Button>
        </View>
    ),

    name: "Using minWidth",
};

export const TruncatingText = {
    render: () => (
        <View
            style={{
                flexDirection: "row",
                width: 300,
            }}
        >
            <Button style={styles.buttonMinWidth} kind="secondary">
                label
            </Button>
            <Button style={styles.buttonMinWidth}>
                label too long for the parent container
            </Button>
        </View>
    ),

    name: "Truncating text",
};
