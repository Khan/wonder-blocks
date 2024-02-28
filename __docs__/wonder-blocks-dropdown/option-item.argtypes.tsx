import * as React from "react";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Pill from "@khanacademy/wonder-blocks-pill";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export const AccessoryMappings = {
    none: null,
    icon: <PhosphorIcon icon={IconMappings.play} size="medium" />,
    pill: <Pill kind="accent">New</Pill>,
};

export default {
    label: {
        control: {type: "text"},
        description: "Display text of the option item.",
        table: {
            category: "Labelling",
            type: {summary: "string"},
        },
        type: {name: "string", required: true},
    },
    labelAsText: {
        control: {type: "text"},
        description: `Optional text to use as the label. If not provided, label
            will be used. This is useful for cases where the label is a complex
            component and you want to display a simpler string in the menu.`,
        table: {
            category: "Labelling",
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    value: {
        control: {type: "text"},
        description: `Value of the item, used as a key of sorts for the parent
            to manage its items, because label/display text may be identical
            for some selects. This is the value passed back when the item is
            selected.`,
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: true},
    },
    disabled: {
        control: {type: "boolean"},
        description: "Whether or not the option item is disabled.",
        table: {
            defaultValue: {summary: false},
            type: {summary: "boolean"},
        },
        type: {name: "boolean", required: true},
    },
    onClick: {
        control: {type: null},
        description: `Optional user-supplied callback when this item is called.`,
        table: {
            type: {summary: "() => unknown"},
        },
        type: {name: "function", required: false},
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
        type: {name: `"none" | "inset" | "full-width"`, required: false},
    },
    leftAccessory: {
        options: Object.keys(AccessoryMappings) as Array<React.ReactNode>,
        mapping: AccessoryMappings,
        control: {type: "select"},
        description: "Adds an accessory to the left of the action item.",
        table: {
            type: {summary: "React.Node"},
        },
        type: {name: "React.Node", required: false},
    },
    rightAccessory: {
        options: Object.keys(AccessoryMappings) as Array<React.ReactNode>,
        mapping: AccessoryMappings,
        control: {type: "select"},
        description: "Adds an accessory to the right of the action item.",
        table: {
            type: {summary: "React.Node"},
        },
        type: {name: "React.Node", required: false},
    },
    subtitle1: {
        control: {
            type: "text",
        },
        description: "Optional subtitle to display before the label.",
        table: {
            category: "Layout",
            type: {
                detail: "string | React.Element<Typography>",
            },
        },
    },
    subtitle2: {
        control: {
            type: "text",
        },
        description: "Optional subtitle to display after the label.",
        table: {
            category: "Layout",
            type: {
                detail: "string | React.Element<Typography>",
            },
        },
    },
};
