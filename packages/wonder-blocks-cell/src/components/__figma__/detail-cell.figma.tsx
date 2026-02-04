import * as React from "react";
import {figma} from "@figma/code-connect";
import DetailCell from "../detail-cell";

/*
NOTE about Code Connect + MCP:

The "example" function returns a string that is never rendered/parsed, so logic will never be executed!
Everything within (ternary operators, etc) would be returned as-is to the agent by the MCP.

1. Comments are used to take the place of logic, explaining behaviors
2. To appease the linter, we define consts. The values are never read!
*/

const LEFT_ACCESSORY = <React.Fragment />;
const RIGHT_ACCESSORY = <React.Fragment />;
const DISABLED = true;
const SELECTED = true;

figma.connect(
    DetailCell,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=9612%3A9577",
    {
        props: {
            title: figma.textContent("Title"),
            subtitle1: figma.textContent("Eyebrow"), // TODO: (jonah) test if we can target the parent of a text layer (since both eyebrow and subtitle have text layers called "Text")
            subtitle2: figma.textContent("Subtitle"),
            state: figma.enum("State", {
                Rest: "rest",
                Hover: "hover",
                Press: "press",
                Selected: "selected",
                Disabled: "disabled",
            }),
            startAccessory: figma.boolean("Start Accessory"),
            endAccessory: figma.boolean("End Accessory"),
            hasBadge: figma.boolean("Badge"),
            hasProgressBar: figma.boolean("Progress Bar"),
        },
        example: (props: any) => (
            <DetailCell
                title={props.title} // If props.hasBadge==true or props.hasProgressBar==true, title should be a WB BodyText component with both title and any Badge or other needed components as children
                subtitle1={props.subtitle1} // If Eyebrow is visible, this appears before the title
                subtitle2={props.subtitle2} // If Subtitle is visible, this appears after the title
                disabled={DISABLED} // Include attr if props.state=="disabled"
                active={SELECTED} // Include attr if props.state=="selected"
                leftAccessory={LEFT_ACCESSORY} // If props.startAccessory === true, include Icon (likely Phosphor icon)
                rightAccessory={RIGHT_ACCESSORY} // If props.endAccessory === true, include Icon. If props.hasBadge === true, include a Badge component. If props.hasProgressBar === true, could include progress indicator
            />
        ),
    },
);
