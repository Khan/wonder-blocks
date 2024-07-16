import * as React from "react";
import type {ArgTypes} from "@storybook/react";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Pill from "@khanacademy/wonder-blocks-pill";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const AccessoryMappings = {
    none: null,
    icon: <PhosphorIcon icon={IconMappings.play} size="medium" />,
    pill: <Pill kind="accent">New</Pill>,
};

export default {
    label: {
        control: {type: "text"},
        description: "Display text of the action item.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: true},
    },
    disabled: {
        control: {type: "boolean"},
        description: "Whether or not the action item is disabled.",
        table: {
            defaultValue: {summary: "false"},
            type: {summary: "boolean"},
        },
        type: {name: "boolean", required: true},
    },
    onClick: {
        control: {type: undefined},
        description:
            `Callback when the action item is clicked.\n\n` +
            `Note: \`onClick\` is optional if \`href\` is present, but must ` +
            `be defined if \`href\` is not present.`,
        table: {
            type: {summary: "() => void"},
        },
        type: {name: "function", required: false},
    },
    href: {
        control: {type: "text"},
        description:
            `URL to navigate to when the action item is clicked.\n\n` +
            `Note: \`href\` must be defined if \`onClick\` is not present.`,

        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    target: {
        control: {type: "text"},
        description: "A target destination window for a link to open in.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    lang: {
        control: {type: "text"},
        description:
            `Optional attribute to indicate to the Screen Reader which ` +
            `language the item text is in.`,
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    testId: {
        control: {type: "text"},
        description: "Test ID used for e2e testing.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    horizontalRule: {
        options: ["none", "inset", "full-width"],
        control: {type: "select"},
        description: "Adds a horizontal rule at the bottom of the action item.",
        defaultValue: "none",
        table: {
            defaultValue: {summary: "none"},
            type: {summary: `"none" | "inset" | "full-width"`},
        },
        type: {
            name: "enum",
            value: ["none", "inset", "full-width"],
            required: false,
        },
    },
    leftAccessory: {
        options: Object.keys(AccessoryMappings) as Array<React.ReactNode>,
        mapping: AccessoryMappings,
        control: {type: "select"},
        description: "Adds an accessory to the left of the action item.",
        table: {
            type: {summary: "React.Node"},
        },
        type: {name: "other", required: false, value: "React.Node"},
    },
    rightAccessory: {
        options: Object.keys(AccessoryMappings) as Array<React.ReactNode>,
        mapping: AccessoryMappings,
        control: {type: "select"},
        description: "Adds an accessory to the right of the action item.",
        table: {
            type: {summary: "React.Node"},
        },
        type: {name: "other", required: false, value: "React.Node"},
    },
} satisfies ArgTypes;
