import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    button: {
        marginRight: 10,
    },
});

export default {
    title: "Packages / Button / Accessibility",
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

export const Labeling = {
    render: () => (
        <View>
            <Button spinner={true} aria-label="The action is being saved...">
                Label
            </Button>
        </View>
    ),
};

export const DisabledState = {
    render: () => (
        <View
            style={{
                flexDirection: "row",
            }}
        >
            <Button
                style={styles.button}
                // eslint-disable-next-line no-console
                onClick={(e) => console.log("Hello, world!")}
                disabled={true}
            >
                Primary
            </Button>
            <Button
                style={styles.button}
                href={"/foo"}
                kind="secondary"
                disabled={true}
            >
                Secondary
            </Button>
            <Button
                style={styles.button}
                // eslint-disable-next-line no-console
                onClick={(e) => console.log("Hello, world!")}
                kind="tertiary"
                disabled={true}
            >
                Tertiary
            </Button>
        </View>
    ),

    name: "Disabled state",
};
