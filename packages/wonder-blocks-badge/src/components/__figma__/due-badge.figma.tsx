import * as React from "react";
import {figma} from "@figma/code-connect";
import {DueBadge} from "../due-badge";

/*
NOTE about Code Connect + MCP: (Jonah)

The "example" function returns a string that is never rendered/parsed, so logic will never be executed!
Everything within (ternary operators, etc) would be returned as-is to the agent by the MCP.

1. Comments are used to take the place of logic, explaining behaviors
2. To appease the linter, we define consts. The values are never read!
*/
const HAS_ICON = true;
const DUE_STATUS = "";
const ICON_ARIA_LABEL = "";

figma.connect(
    DueBadge,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=6369%3A2496",
    {
        props: {
            icon: figma.enum("Icon", {
                Off: "off",
                Start: "start",
                "Icon Only": "icon-only",
            }),
            label: figma.textContent("Badge"),
        },
        example: (props: any) => {
            return (
                <DueBadge
                    kind={DUE_STATUS} // "due" | "overdue"
                    label={props.label} // DON'T include label prop if icon==="icon-only"
                    showIcon={HAS_ICON} // Only include showIcon prop if icon==="start" or "icon-only"
                    iconAriaLabel={ICON_ARIA_LABEL} // show if icon=="icon-only" and look for a11y annotation for value
                />
            );
        },
    },
);
