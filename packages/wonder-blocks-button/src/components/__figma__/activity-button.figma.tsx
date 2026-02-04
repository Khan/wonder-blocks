import * as React from "react";
import {figma} from "@figma/code-connect";
import {ActivityButton} from "../activity-button";

/*
NOTE about Code Connect + MCP: (Jonah)

The "example" function returns a string that is never rendered/parsed, so logic will never be executed!
Everything within (ternary operators, etc) would be returned as-is to the agent by the MCP.

1. Comments are used to take the place of logic, explaining behaviors
2. To appease the linter, we define consts. The values are never read!
*/

const ICON = <React.Fragment />;
const ARIA_LABEL = "aria-label";

figma.connect(
    ActivityButton,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=6775%3A3053",
    {
        props: {
            text: figma.textContent("Button Text"),
            kind: figma.enum("Kind", {
                Primary: "primary",
                Secondary: "secondary",
            }),
        },
        example: (props: any) => (
            <ActivityButton
                kind={props.kind}
                startIcon={ICON} // optional
                endIcon={ICON} // optional
                aria-label={ARIA_LABEL} // if a11y annotation specifies something other than props.text
            >
                {props.text}
            </ActivityButton>
        ),
    },
);
