import figma from "@figma/code-connect";
import React from "react";

import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";

import TextField from "../text-field";

/**
 * NOTE about Code Connect + MCP:
 *
 * The "example" function returns a string that is never rendered/parsed, so logic will never be executed!
 * Everything within (ternary operators, etc) would be returned as-is to the agent by the MCP.
 *
 * 1. Comments are used to take the place of logic, explaining behaviors
 * 2. To appease the linter, we define consts. The values are never read!
 */

const ON_CHANGE = () => {};
const VALUE = "";
const LABEL = "Label";
const DESCRIPTION = "Start Description";
const ERROR_MESSAGE = "Error Text";
const READ_ONLY_MESSAGE = "Read Only";
const ADDITIONAL_HELPER_MESSAGE = "Additional helper text";

// When both Visible Label and Second Helper Text are false, render TextField without LabeledField wrapper
figma.connect(
    TextField,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=5302%3A354",
    {
        variant: {"Visible Label": false, "Second Helper Text": false},
        props: {
            state: figma.enum("State", {
                Rest: "rest",
                Error: "error",
                Active: "active",
                Disabled: "disabled",
                "Read Only": "read-only",
            }),
            writingDirection: figma.enum("Writing Direction", {
                "Left-to-Right": "left-to-right",
                "Right-to-Left": "right-to-left",
            }),
        },
        example: (props) => (
            <TextField
                value={VALUE}
                onChange={ON_CHANGE}
                disabled={props.state === "disabled"}
                readOnly={props.state === "read-only"}
                error={props.state === "error"}
            />
        ),
    },
);

// When either Visible Label or Second Helper Text is true, wrap TextField in LabeledField
figma.connect(
    TextField,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=5302%3A354",
    {
        variant: {"Visible Label": true},
        props: {
            secondHelperText: figma.boolean("Second Helper Text"),
            state: figma.enum("State", {
                Rest: "rest",
                Error: "error",
                Active: "active",
                Disabled: "disabled",
                "Read Only": "read-only",
            }),
            writingDirection: figma.enum("Writing Direction", {
                "Left-to-Right": "left-to-right",
                "Right-to-Left": "right-to-left",
            }),
        },
        example: (props) => (
            <LabeledField
                field={
                    <TextField
                        value={VALUE}
                        onChange={ON_CHANGE}
                        disabled={props.state === "disabled"}
                        readOnly={props.state === "read-only"}
                        error={props.state === "error"}
                    />
                }
                label={LABEL}
                description={DESCRIPTION}
                errorMessage={
                    props.state === "error" ? ERROR_MESSAGE : undefined
                }
                readOnlyMessage={
                    props.state === "read-only" ? READ_ONLY_MESSAGE : undefined
                }
                additionalHelperMessage={
                    props.secondHelperText
                        ? ADDITIONAL_HELPER_MESSAGE
                        : undefined
                }
            />
        ),
    },
);

// When Visible Label is false but Second Helper Text is true
figma.connect(
    TextField,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=5302%3A354",
    {
        variant: {"Visible Label": false, "Second Helper Text": true},
        props: {
            state: figma.enum("State", {
                Rest: "rest",
                Error: "error",
                Active: "active",
                Disabled: "disabled",
                "Read Only": "read-only",
            }),
            writingDirection: figma.enum("Writing Direction", {
                "Left-to-Right": "left-to-right",
                "Right-to-Left": "right-to-left",
            }),
        },
        example: (props) => (
            <LabeledField
                field={
                    <TextField
                        value={VALUE}
                        onChange={ON_CHANGE}
                        disabled={props.state === "disabled"}
                        readOnly={props.state === "read-only"}
                        error={props.state === "error"}
                    />
                }
                description={DESCRIPTION}
                errorMessage={
                    props.state === "error" ? ERROR_MESSAGE : undefined
                }
                readOnlyMessage={
                    props.state === "read-only" ? READ_ONLY_MESSAGE : undefined
                }
                additionalHelperMessage={ADDITIONAL_HELPER_MESSAGE}
            />
        ),
    },
);
