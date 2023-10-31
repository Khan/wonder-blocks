import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../component-gallery";

export default function ProgressSpinnerSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Progress Spinner
            </HeadingLarge>
            <ComponentTile
                name="CircularSpinner"
                href="/?path=/docs/progressspinner-circularspinner--docs"
            >
                <View style={styles.centerContent}>
                    <CircularSpinner />
                </View>
            </ComponentTile>
        </>
    );
}
