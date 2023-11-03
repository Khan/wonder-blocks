import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function TooltipSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Tooltip
            </HeadingLarge>

            <ComponentTile
                name="Tooltip"
                href="/?path=/docs/tooltip-tooltip--docs"
            >
                <View style={styles.centerContent}>
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
