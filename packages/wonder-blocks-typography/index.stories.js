// @flow

import React from "react";
import {storiesOf} from "@storybook/react";
import {StyleSheet} from "aphrodite";

import * as Typography from "./index.js";

const componentNames = [
    "Title",
    "HeadingLarge",
    "HeadingMedium",
    "HeadingSmall",
    "HeadingXSmall",
    "LabelLarge",
    "LabelMedium",
    "LabelSmall",
];

storiesOf("Typography", module).add("all", () => (
    <div>
        {componentNames.map(componentName => {
            const Component = Typography[componentName];
            return <Component key={componentName}>{componentName}</Component>;
        })}
    </div>
));

for (const componentName of componentNames) {
    const Component = Typography[componentName];
    storiesOf(`Typography/${componentName}`, module)
        .add("default", () => <Component>{componentName}</Component>)
        .add("styled", () => (
            <Component style={styles.blue}>{componentName}</Component>
        ));
}

const styles = StyleSheet.create({
    blue: {
        color: "blue",
    },
});
