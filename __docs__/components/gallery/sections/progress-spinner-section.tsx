import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function ProgressSpinnerSection() {
    return (
        <>
            <HeadingLarge
                id="progress-spinner"
                tag="h3"
                style={styles.sectionLabel}
            >
                Progress Spinner
            </HeadingLarge>
            <ComponentTile
                name="CircularSpinner"
                href="/?path=/docs/progressspinner-circularspinner--docs"
                description={`A circular spinner that can be used to
                    indicate that a page or part of page is loading.`}
            >
                <View style={styles.centerContent}>
                    <CircularSpinner />
                </View>
            </ComponentTile>
        </>
    );
}
