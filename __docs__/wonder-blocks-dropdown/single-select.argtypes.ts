import {ArgTypes} from "@storybook/react";
import baseSelectArgTypes from "./base-select.argtypes";

const argTypes: ArgTypes = {
    ...baseSelectArgTypes,
    placeholder: {
        description:
            "Placeholder for the opening component when there are no items selected.",
    },
    selectedValue: {
        description: "The value of the currently selected item.",
        table: {
            type: {summary: "string"},
        },
    },
    labels: {
        control: {type: "object"},
        description:
            "The object containing the custom labels used inside this component.",
        table: {
            type: {summary: "Labels"},
        },
    },
};

export default argTypes;
