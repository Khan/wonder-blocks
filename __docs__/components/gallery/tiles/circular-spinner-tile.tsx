import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";

import ComponentTile from "../component-tile";
import {styles} from "../styles";
import {CommonTileProps} from "../types";

export default function CircularSpinnerTile(props: CommonTileProps) {
    return (
        <ComponentTile
            name="CircularSpinner"
            href="/?path=/docs/packages-progressspinner-circularspinner--docs"
            description={`A circular spinner that can be used to
                    indicate that a page or part of page is loading.`}
            {...props}
        >
            <View style={styles.centerContent}>
                <CircularSpinner />
            </View>
        </ComponentTile>
    );
}
