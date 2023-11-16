import * as React from "react";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const iconsMap: Record<string, React.ReactElement<typeof PhosphorIcon>> = {};

Object.entries(IconMappings).forEach(([iconLabel, iconValue]) => {
    iconsMap[iconLabel] = <PhosphorIcon icon={iconValue} />;
});

export default {
    "aria-describedby": {
        description: "The id of an element that describes the switch.",
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
            },
        },
    },
    "aria-label": {
        description:
            "An accessible label for the switch. If a visible label is not provided, aria-label should be used to describe the purpose of the switch.",
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
            },
        },
    },
    "aria-labelledby": {
        description:
            "The id of an element that is a label for the switch. Aria-labelledby takes precedence over all other methods of providing an accessible name.",
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
            },
        },
    },
    checked: {
        description: "Whether this component is checked.",
        control: {
            type: "boolean",
        },
    },
    disabled: {
        description: "Whether the switch is disabled. Defaults to `false`.",
        control: {
            type: "boolean",
        },
        table: {
            type: {
                summary: "boolean",
            },
        },
    },
    icon: {
        description: "Optional icon to display on the slider.",
        control: {
            type: "select",
            labels: {
                null: "none",
            },
        },
        options: [null, ...Object.keys(iconsMap)],
        mapping: iconsMap,
        table: {
            type: {
                summary: "PhosphorIcon",
            },
        },
    },
    id: {
        description:
            "The unique identifier for the switch. If not provided, a unique id will be generated.",
        control: {
            type: "text",
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },
    onChange: {
        description: "Function to call when the switch is clicked.",
        table: {
            type: {
                summary: "(newCheckedState: boolean) => unknown",
            },
        },
    },
    testId: {
        description: "Optional test ID used for e2e testing.",
        control: {
            type: "text",
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },
};
