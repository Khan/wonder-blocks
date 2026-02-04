import * as React from "react";
import {figma} from "@figma/code-connect";
import CompactCell from "../compact-cell";
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

// Variant 1: CompactCell (default)
figma.connect(
    CompactCell,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=5358%3A29",
    {
        variant: {Subtitle: false},
        props: {
            title: figma.textContent("Title"),
            state: figma.enum("State", {
                Rest: "rest",
                Hover: "hover",
                Press: "press",
                Selected: "selected",
                Disabled: "disabled",
            }),
            startAccessory: figma.boolean("Start Accessory"),
            endAccessory: figma.boolean("End Accessory"),
        },
        example: (props: any) => (
            <CompactCell
                title={props.title}
                disabled={DISABLED} // Include attr if props.state=="disabled"
                active={SELECTED} // Include attr if props.state=="selected"
                leftAccessory={LEFT_ACCESSORY} // If props.startAccessory === true, include Icon (likely Phosphor icon)
                rightAccessory={RIGHT_ACCESSORY} // If props.endAccessory === true, include Icon (likely "CheckCircle" Phosphor icon, weight "Fill", if props.state=="selected")
            />
        ),
    },
);

// Variant 2: Use DetailCell when subtitle IS present!!!!!
figma.connect(
    DetailCell,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=5358%3A29",
    {
        variant: {Subtitle: true},
        props: {
            title: figma.textContent("Title"),
            subtitle: figma.textContent("Subtitle"),
            state: figma.enum("State", {
                Rest: "rest",
                Hover: "hover",
                Press: "press",
                Selected: "selected",
                Disabled: "disabled",
            }),
            startAccessory: figma.boolean("Start Accessory"),
            endAccessory: figma.boolean("End Accessory"),
            // Note: focus is a visual state only in Figma, not a prop
            // Note: writingDirection is handled by the browser/layout, not a component prop
        },
        example: (props: any) => (
            <DetailCell
                title={props.title}
                subtitle1={props.subtitle} // Map to subtitle1 (appears before title visually)
                disabled={DISABLED} // Include attr if props.state=="disabled"
                active={SELECTED} // Include attr if props.state=="selected"
                leftAccessory={LEFT_ACCESSORY} // If props.startAccessory === true, include Icon (likely Phosphor icon)
                rightAccessory={RIGHT_ACCESSORY} // If props.endAccessory === true, include Icon (likely "CheckCircle" Phosphor icon, weight "Fill", if props.state=="selected")
            />
        ),
    },
);
