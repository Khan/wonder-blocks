// @flow

import React from "react";
import {storiesOf} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import Color from "wonder-blocks-color";

import * as Typography from "./index.js";

const componentNames = [
    "Title",
    "Tagline",
    "HeadingLarge",
    "HeadingMedium",
    "HeadingSmall",
    "HeadingXSmall",
    "BodySerifBlock",
    "BodySerif",
    "BodyMonospace",
    "Body",
    "LabelLarge",
    "LabelMedium",
    "LabelSmall",
    "LabelXSmall",
    "Caption",
    "Footnote",
];

storiesOf("Typography", module).addWithJSX("all", () => (
    <div>
        {componentNames.map(componentName => {
            const Component = Typography[componentName];
            return <div key={componentName}>
                <Component>{componentName}</Component>
            </div>;
        })}
    </div>
));

for (const componentName of componentNames) {
    const Component = Typography[componentName];
    storiesOf(`Typography/${componentName}`, module)
        .addWithJSX("default", () => <Component>{componentName}</Component>)
        .addWithJSX("light on dark", () => (
            <Component style={styles.lightOnDark}>{componentName}</Component>
        ))
        .addWithJSX("as an h5 tag", () => (
            <Component tag="h5">{componentName}</Component>
        ));
}

const styles = StyleSheet.create({
    lightOnDark: {
        color: Color.white,
        background: Color.offBlack,
    },
});
