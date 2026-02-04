import React from "react";
import figma from "@figma/code-connect";
import Banner from "../banner";

const ON_DISMISS = () => {};
const ACTIONS_ARRAY = [];

figma.connect(
    Banner,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=5173%3A104",
    {
        props: {
            onDismiss: figma.boolean("Close"),
            kind: figma.nestedProps("Icon", {
                type: figma.enum("Type", {
                    Info: "info",
                    Success: "success",
                    Warning: "warning",
                    Critical: "critical",
                }),
            }),
            actions: figma.nestedProps("Content", {
                hasAction: figma.boolean("Action"),
            }),
            text: figma.textContent("Text"),
        },
        example: (props: any) => {
            return (
                <Banner
                    text={props.text}
                    kind={props.kind?.type}
                    actions={ACTIONS_ARRAY} // Only include attr if props.actions?.hasAction==true
                    onDismiss={ON_DISMISS} // Only include attr if props.onDismiss==true
                />
            );
        },
    },
);
