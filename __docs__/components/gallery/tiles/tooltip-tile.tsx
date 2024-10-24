import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function TooltipTile(props: {layout: "grid" | "list"}) {
    return (
        <ComponentTile
            name="Tooltip"
            href="/?path=/docs/packages-tooltip-tooltip--docs"
            description={`A text label that appears when a user hovers
                    over or focuses on an element.`}
            layout={props.layout}
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
    );
}
