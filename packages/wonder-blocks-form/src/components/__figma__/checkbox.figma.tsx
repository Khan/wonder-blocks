import * as React from "react";
import {figma} from "@figma/code-connect";
import Checkbox from "../checkbox";

/*
NOTE about Code Connect + MCP: (Jonah)

The "example" function returns a string that is never rendered/parsed, so logic will never be executed!
Everything within (ternary operators, etc) would be returned as-is to the agent by the MCP.

1. Comments are used to take the place of logic, explaining behaviors
2. To appease the linter, we define consts. The values are never read!
*/

const ON_CHANGE = () => {};
const CHECKED = false;

figma.connect(
    Checkbox,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=9602%3A8632",
    {
        props: {
            label: figma.textContent("Label"),
            helperText: figma.boolean("Helper Text"),
            helperTextContent: figma.textContent("Start Description"),
            error: figma.enum("State", {
                Error: true,
            }),
        },
        example: (props: any) => (
            <Checkbox
                label={props.label}
                checked={CHECKED} // Only add prop if design has checked state
                onChange={ON_CHANGE}
                description={props.helperTextContent} // Only add prop if props.helperText is true
                error={props.error} // Only add prop if props.error is true
            />
        ),
    },
);
