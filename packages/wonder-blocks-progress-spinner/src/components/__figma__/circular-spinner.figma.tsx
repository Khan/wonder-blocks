import * as React from "react";
import {figma} from "@figma/code-connect";
import CircularSpinner from "../circular-spinner";

figma.connect(
    CircularSpinner,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=10267%3A320",
    {
        props: {
            // In Figma, "Type" is a variant. In code, it's a boolean `light`.
            // Default -> dark spinner (`light={false}`)
            // Knockout -> light spinner (`light={true}`)
            light: figma.enum("Type", {
                Default: false,
                Knockout: true,
            }),
            size: figma.enum("Size", {
                "16x16": "xsmall",
                "24x24": "small",
                "48x48": "medium",
                "96x96": "large",
            }),
        },
        example: (props: any) => {
            return (
                <CircularSpinner
                    size={props.size}
                    light={props.light} // Only include attr if props.light==true
                />
            );
        },
    },
);
