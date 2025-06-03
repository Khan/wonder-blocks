import {ArgTypes} from "@storybook/react-vite";
import baseSelectArgTypes from "./base-select.argtypes";

export default {
    ...baseSelectArgTypes,
    alignment: {
        control: {type: "select"},
        description: `The alignment of the menu component in relation to the
            opener component. Defaults to "left", which is below the opener and
            left aligned. Any valid Popper placement is also supported.`,
        options: [
            "left",
            "right",
            "top",
            "bottom",
            "top-start",
            "top-end",
            "bottom-start",
            "bottom-end",
            "right-start",
            "right-end",
            "left-start",
            "left-end",
            "auto",
            "auto-start",
            "auto-end",
        ],
        table: {
            category: "Layout",
            type: {summary: `"left" | "right" | Placement`},
            defaultValue: {summary: `"left"`},
        },
        type: {
            name: "enum",
            value: [
                "left",
                "right",
                "top",
                "bottom",
                "top-start",
                "top-end",
                "bottom-start",
                "bottom-end",
                "right-start",
                "right-end",
                "left-start",
                "left-end",
                "auto",
                "auto-start",
                "auto-end",
            ],
            required: false,
        },
    },
    children: {
        control: {type: undefined},
        description: "The items in this dropdown.",
        table: {
            type: {
                summary: `Array<Item> | Item`,
            },
        },
    },
    menuText: {
        control: {type: "text"},
        description: "Text for the opener of this menu.",
        table: {
            type: {summary: "string"},
        },
    },
    selectedValues: {
        description: "The values of the items that are currently selected.",
        table: {
            type: {summary: "Array<string>"},
        },
    },
} satisfies ArgTypes;
