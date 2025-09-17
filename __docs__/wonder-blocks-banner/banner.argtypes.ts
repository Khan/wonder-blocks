import type {ArgTypes} from "@storybook/react";

import * as React from "react";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const actionsMappings = {
    none: null,
    buttons: [
        {title: "Button 1", onClick: () => {}},
        {title: "Button 2", onClick: () => {}},
    ],
    links: [
        {title: "Link 1", href: "/"},
        {title: "Link 2", href: "/"},
    ],
    buttonAndLink: [
        {title: "Button", onClick: () => {}},
        {title: "Link", href: "/"},
    ],
    linkAndButton: [
        {title: "Link", href: "/"},
        {title: "Button", onClick: () => {}},
    ],
} as const;

const dismissMappings = {
    none: null,
    "log on click": () => {
        // eslint-disable-next-line no-console
        console.log("Dimiss button clicked!");
    },
} as const;

const iconMappingsWithNone = {...IconMappings, none: "none"};

export default {
    kind: {
        control: {type: "select"},
        defaultValue: "info",
        options: ["info", "success", "warning", "critical"],
        table: {
            type: {summary: `"info" | "success" | "warning" | "critical"`},
            defaultValue: {summary: `"info"`},
        },
        type: {
            name: "enum",
            value: ["info", "success", "warning", "critical"],
            required: false,
        },
    },
    layout: {
        control: {type: "select"},
        options: ["floating", "full-width"],
        table: {
            type: {summary: `"floating" | "full-width"`},
        },
        type: {name: "enum", value: ["floating", "full-width"]},
    },
    text: {
        control: {type: "text"},
        table: {type: {summary: "string | React.Node"}},
        type: {
            name: "union",
            value: [
                {name: "string"},
                {name: "other", value: "React.ReactNode"},
            ],
            required: true,
        },
    },
    actions: {
        control: {type: "select"},
        options: Object.keys(actionsMappings) as Array<React.ReactNode>,
        mapping: actionsMappings,
        table: {
            type: {
                summary: "Array<ActionTrigger>",
                detail: "type ActionTrigger = {|\n\ttitle: string,\n\tonClick: () => void | href: string,\n\tariaLabel?: string,\n|}",
            },
        },
    },
    onDismiss: {
        control: {type: "select"},
        options: Object.keys(dismissMappings) as Array<React.ReactNode>,
        mapping: dismissMappings,
        table: {required: false},
    },
    dismissAriaLabel: {
        control: {type: "text"},
        defaultValue: "Dismiss banner.",
        table: {
            type: {summary: "string"},
            defaultValue: {summary: `"Dismiss banner."`},
        },
        type: {name: "string", required: false},
    },
    "aria-label": {
        control: {type: "text"},
        description:
            "Accessible label for the banner. This is read out before the other contents of the banner.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    icon: {
        control: {type: "select"},
        options: Object.keys(iconMappingsWithNone),
        mapping: iconMappingsWithNone,
        table: {
            type: {
                summary: "PhosphorIconAsset | string | `none`",
            },
        },
    },
} satisfies ArgTypes;
