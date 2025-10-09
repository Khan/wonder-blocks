import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";
import {themeModes} from "../../.storybook/modes";
import {Card} from "@khanacademy/wonder-blocks-card";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {AllVariants} from "../components/all-variants";
import eotBackground from "../../static/EOT-Background.svg";

/**
 * The following stories are used to generate all possible prop combinations
 * for the Card component. This is used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Card / Testing / Snapshots / Card",
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs"],
    args: {},
} as Meta<typeof Card>;

type StoryComponentType = StoryObj<typeof Card>;

// Define visible style variations
const backgrounds = [
    {name: "Default", props: {background: "base-default"}},
    {name: "Subtle", props: {background: "base-subtle"}},
    {name: "Image", props: {background: eotBackground}},
];

const borderRadii = [
    {name: "Small", props: {borderRadius: "small"}},
    {name: "Medium", props: {borderRadius: "medium"}},
];

const paddingSizes = [
    {name: "None", props: {paddingSize: "none"}},
    {name: "Small", props: {paddingSize: "small"}},
    {name: "Medium", props: {paddingSize: "medium"}},
];

const elevations = [
    {name: "None", props: {elevation: "none"}},
    {name: "Low", props: {elevation: "low"}},
];

const dismissible = [
    {name: "Not Dismissible", props: {}},
    {
        name: "Dismissible",
        props: {
            onDismiss: () => {},
            labels: {dismissButtonAriaLabel: "Dismiss card"},
        },
    },
];

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        minHeight: sizing.size_320,
        display: "flex",
    },
    card: {
        minHeight: sizing.size_320,
        width: "100%",
    },
});

/**
 * Visual style variations for the Card component
 */
export const StateSheet: StoryComponentType = {
    render: () => (
        <View>
            {/* Background and Border Radius combinations */}
            <AllVariants
                rows={backgrounds}
                columns={borderRadii}
                title="Background / Border Radius"
            >
                {({props}) => (
                    <View style={styles.cardContainer}>
                        <Card {...props} styles={{root: styles.card}}>
                            {props.background === "base-default"
                                ? "base-default"
                                : props.background === "base-subtle"
                                  ? "base-subtle"
                                  : "Image background"}
                            {" + "}
                            {props.borderRadius} radius
                        </Card>
                    </View>
                )}
            </AllVariants>

            {/* Padding and Elevation combinations */}
            <AllVariants
                rows={paddingSizes}
                columns={elevations}
                title="Padding / Elevation"
            >
                {({props}) => (
                    <View style={styles.cardContainer}>
                        <Card
                            {...props}
                            background="base-subtle"
                            styles={{root: styles.card}}
                        >
                            {props.paddingSize} padding
                            {" + "}
                            {props.elevation} elevation
                        </Card>
                    </View>
                )}
            </AllVariants>

            {/* Dismissible variations with different backgrounds */}
            <AllVariants
                rows={backgrounds}
                columns={dismissible}
                title="Background / Dismissible"
            >
                {({props}) => (
                    <View style={styles.cardContainer}>
                        <Card {...props} styles={{root: styles.card}}>
                            {props.background === "base-default"
                                ? "base-default"
                                : props.background === "base-subtle"
                                  ? "base-subtle"
                                  : "Image background"}
                            {props.onDismiss
                                ? " (dismissible)"
                                : " (not dismissible)"}
                        </Card>
                    </View>
                )}
            </AllVariants>
        </View>
    ),
};
