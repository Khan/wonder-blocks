// @flow

import React from "react";
import {storiesOf} from "@storybook/react";
import {StyleSheet} from "aphrodite";

import {Text, View} from "./index.js";

storiesOf("Core", module).addWithJSX("all", () => (
    <div>
        <Text>Text</Text>
        <View>View</View>
    </div>
));

storiesOf("Core/Text", module)
    .addWithJSX("text", () => <Text>Text</Text>)
    .addWithJSX("aphrodite styles", () => <Text style={styles.pink}>Text</Text>)
    .addWithJSX("multiple Aphrodite styles", () => (
        <Text style={[styles.pink, styles.bold]}>Text</Text>
    ))
    .addWithJSX("multiple text elements", () => (
        <div>
            <Text style={styles.bold}>Text</Text>
            <Text style={styles.pink}>Text</Text>
        </div>
    ));

storiesOf("Core/View", module)
    .addWithJSX("view", () => <View>View</View>)
    .addWithJSX("aphrodite styles", () => <View style={styles.pink}>View</View>)
    .addWithJSX("multiple Aphrodite styles", () => (
        <View style={[styles.pink, styles.bold]}>Text</View>
    ))
    .addWithJSX("multiple view elements", () => (
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
