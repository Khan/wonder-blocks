import {figma} from "@figma/code-connect";
import * as React from "react";
import RadioGroup from "../radio-group";
import Choice from "../choice";

/*
NOTE about Code Connect + MCP: (Jonah)

The "example" function returns a string that is never rendered/parsed, so logic will never be executed!
Everything within (ternary operators, etc) would be returned as-is to the agent by the MCP.

1. Comments are used to take the place of logic, explaining behaviors
2. To appease the linter, we define consts. The values are never read!
*/

const ON_CHANGE = () => {};
const SELECTED_VALUE = "";
const GROUP_NAME = "";
const DESCRIPTION = "";
const LABEL_0 = "";
const VALUE_0 = "";
const LABEL_1 = "";
const VALUE_1 = "";

figma.connect(
    RadioGroup,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=9602%3A8600",
    {
        props: {
            state: figma.enum("State", {
                Rest: "rest",
                Disabled: "disabled",
                Error: "error",
            }),
            errorMessage: figma.textContent("Start Description"),
            label: figma.textContent("Label"),
        },
        example: (props: any) => (
            <RadioGroup
                groupName={GROUP_NAME}
                label={props.label}
                description={DESCRIPTION} // Only if there's a description
                onChange={ON_CHANGE}
                selectedValue={SELECTED_VALUE} // Check annotation for selected value, or use design as clue
                errorMessage={props.errorMessage} // Only props.state === "error"
            >
                <Choice label={LABEL_0} value={VALUE_0} />
                <Choice
                    label={LABEL_1}
                    value={VALUE_1}
                    disabled // if props.state === "disabled"
                />
            </RadioGroup>
        ),
    },
);
