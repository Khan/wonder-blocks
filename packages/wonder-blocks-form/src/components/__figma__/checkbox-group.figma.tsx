import React from "react";
import figma from "@figma/code-connect";
import Choice from "../choice";
import CheckboxGroup from "../checkbox-group";

/*
NOTE about Code Connect + MCP: (Jonah)

The "example" function returns a string that is never rendered/parsed, so logic will never be executed!
Everything within (ternary operators, etc) would be returned as-is to the agent by the MCP.

1. Comments are used to take the place of logic, explaining behaviors
2. To appease the linter, we define consts. The values are never read!
*/

const ON_CHANGE = () => {};
const LABEL_GROUP = "";
const LABEL_0 = "";
const LABEL_1 = "";
const VALUE_0 = "";
const VALUE_1 = "";
const DESCRIPTION_0 = "";
const DESCRIPTION_1 = "";
const DESCRIPTION_GROUP = "";
const GROUP_NAME = "";
const SELECTED_VALUES = ["", ""];
const ERROR_MESSAGE = "";

figma.connect(
    CheckboxGroup,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=9602%3A8632",
    {
        props: {
            helperText: figma.boolean("Helper Text"),
            helperTextContent: figma.textContent("Start Description"),
        },
        example: (props: any) => (
            <CheckboxGroup
                groupName={GROUP_NAME}
                label={LABEL_GROUP}
                description={DESCRIPTION_GROUP}
                selectedValues={SELECTED_VALUES} // Empty Array<string> unless values are selected in design
                onChange={ON_CHANGE}
                errorMessage={ERROR_MESSAGE} // Only add if design has error for group
            >
                <Choice
                    label={LABEL_0}
                    value={VALUE_0}
                    description={DESCRIPTION_0}
                />
                <Choice
                    label={LABEL_1}
                    value={VALUE_1}
                    description={DESCRIPTION_1}
                    disabled // if props.state === "disabled"
                />
            </CheckboxGroup>
        ),
    },
);
