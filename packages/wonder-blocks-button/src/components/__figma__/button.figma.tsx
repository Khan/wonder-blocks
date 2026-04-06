import {figma} from "@figma/code-connect";
import * as React from "react";
import Button from "../button";

/*
NOTE about Code Connect + MCP: (Jonah)

The "example" function returns a string that is never rendered/parsed, so logic will never be executed!
Everything within (ternary operators, etc) would be returned as-is to the agent by the MCP.

1. Comments are used to take the place of logic, explaining behaviors
2. To appease the linter, we define consts. The values are never read!
*/

const ICON = <React.Fragment />;
const ARIA_LABEL = "aria-label";
const DISABLED = true;
const ACTION_TYPE = "progressive";
const SIZE_MODE = "medium";

figma.connect(
    Button,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=5028%3A166",
    {
        props: {
            kind: figma.enum("Kind", {
                Primary: "primary",
                Secondary: "secondary",
                Tertiary: "tertiary",
            }),
            icon: figma.enum("Icon", {
                Off: "off",
                Start: "start",
                End: "end",
            }),
            state: figma.enum("State", {
                Rest: "rest",
                Hover: "hover",
                Press: "press",
            }),

            buttonText: figma.textContent("Button"),
        },
        example: (props: any) => (
            // Otherwise, use the regular Button component
            <Button
                kind={props.kind}
                actionType={ACTION_TYPE} // Include if Figma "🌈 Action" mode is specified && mode=="destructive"
                size={SIZE_MODE} // Include attr if Figma "📐 Utility Button" mode is specified && mode!="medium"
                disabled={DISABLED} // Only add prop if props.actionMode === "disabled"
                startIcon={ICON} // If props.icon === "start"
                endIcon={ICON} // If props.icon === "end"
                aria-label={ARIA_LABEL}
            >
                {props.buttonText}
            </Button>
        ),
    },
);
