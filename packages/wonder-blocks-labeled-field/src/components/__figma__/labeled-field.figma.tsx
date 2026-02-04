import * as React from "react";
import {figma} from "@figma/code-connect";
import LabeledField from "../labeled-field";

const LABELED_COMPONENT = <React.Fragment />;

/*
NOTE about Code Connect + MCP: (Jonah)

The "example" function returns a string that is never rendered/parsed, so logic will never be executed!
Everything within (ternary operators, etc) would be returned as-is to the agent by the MCP.

1. Comments are used to take the place of logic, explaining behaviors
2. To appease the linter, we define consts. The values are never read!
*/

figma.connect(
    LabeledField,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=5302-354&t=ZLSFSa2FXOAV1uTB-4",
    {
        props: {
            state: figma.enum("State", {
                Rest: "rest",
                Error: "error",
                Active: "active",
                Disabled: "disabled",
                "Read Only": "read-only",
            }),
            label: figma.textContent("Label"),
            description: figma.textContent("Start Description"), // TODO:jonah - needs unique text layer name!
            errorMessage: figma.textContent("Start Description"), // TODO:jonah - needs unique text layer name!
            readOnlyMessage: figma.textContent("Start Description"), // TODO:jonah - needs unique text layer name!
            additionalHelperMessage: figma.textContent("Start Description"), // TODO:jonah - needs unique text layer name!
        },
        example: (props: any) => (
            <LabeledField
                field={LABELED_COMPONENT} // TextField | TextArea | SingleSelect | MultiSelect | SearchField
                label={props.label}
                description={props.description}
                errorMessage={props.errorMessage} // Only if props.state === "error"
                readOnlyMessage={props.readOnlyMessage} // Only if props.state === "read-only"
                additionalHelperMessage={props.additionalHelperMessage} // Only if no errorMessage, nor readOnlyMessage
            />
        ),
    },
);
