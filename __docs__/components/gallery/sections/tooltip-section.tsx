import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function TooltipSection() {
    return (
        <>
            <HeadingLarge id="tooltip" tag="h3" style={styles.sectionLabel}>
                Tooltip
            </HeadingLarge>

            <ComponentTile
                name="Tooltip"
                href="/?path=/docs/tooltip-tooltip--docs"
                description={`A text label that appears when a user hovers
                    over or focuses on an element.`}
            >
                <View style={styles.centerContent}>
                    <View
                        // Add an artificial height to the view so that the
                        // tooltip doesn't overlap the description text.
                        style={{height: 60}}
                    />
                    <Tooltip
                        content="This is a text tooltip on the top"
                        opened={true}
                    >
                        Some text
                    </Tooltip>
                </View>
            </ComponentTile>
        </>
    );
}
