// @flow

import React from "react";
import {storiesOf} from "@storybook/react";
import {StyleSheet} from "aphrodite";

import {Text, View} from "./index.js";

storiesOf("Core", module).add("all", () => (
    <div>
        <Text>Text</Text>
        <View>View</View>
    </div>
));

storiesOf("Core/Text", module)
    .add("text", () => <Text>Text</Text>)
    .add("aphrodite styles", () => <Text style={styles.pink}>Text</Text>)
    .add("multiple Aphrodite styles", () => (
        <Text style={[styles.pink, styles.bold]}>Text</Text>
    ))
    .add("multiple text elements", () => (
        <div>
            <Text style={styles.bold}>Text</Text>
            <Text style={styles.pink}>Text</Text>
        </div>
    ));

storiesOf("Core/View", module)
    .add("view", () => <View>View</View>)
    .add("aphrodite styles", () => <View style={styles.pink}>View</View>)
    .add("multiple Aphrodite styles", () => (
        <View style={[styles.pink, styles.bold]}>Text</View>
    ))
    .add("multiple view elements", () => (
        <div>
            <View style={styles.bold}>Text</View>
            <View style={styles.pink}>Text</View>
        </div>
    ));

const styles = StyleSheet.create({
    pink: {
        backgroundColor: "pink",
    },
    bold: {
        fontWeight: "bold",
    },
});
