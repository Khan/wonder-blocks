import * as React from "react";
import {figma} from "@figma/code-connect";
import Card from "../card";

const ON_DISMISS = () => {};

figma.connect(
    Card,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=13905%3A7619",
    {
        props: {
            children: figma.slot("children"),
            background: figma.enum("background", {
                "base-default": "base-default",
                "base-subtle": "base-subtle",
                // When "image" is selected in Figma, pass a URL string to the background prop
                image: undefined,
            }),
            borderRadius: figma.enum("borderRadius", {
                small: "small",
                medium: "medium",
            }),
            paddingSize: figma.enum("paddingSize", {
                none: "none",
                small: "small",
                medium: "medium",
            }),
            elevation: figma.enum("elevation", {
                none: "none",
                low: "low",
            }),
        },
        example: (props) => (
            <Card
                background={props.background}
                borderRadius={props.borderRadius}
                paddingSize={props.paddingSize}
                elevation={props.elevation}
                onDismiss={ON_DISMISS} // Only include if card has a dismiss affordance.
                labels={{dismissButtonAriaLabel: "Close"}} // Include if card has a dismiss affordance.
            >
                {props.children}
            </Card>
        ),
    },
);
