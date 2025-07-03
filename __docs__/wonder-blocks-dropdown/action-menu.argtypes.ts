import {ArgTypes} from "@storybook/react";
import baseSelectArgTypes from "./base-select.argtypes";

export default {
    ...baseSelectArgTypes,
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
