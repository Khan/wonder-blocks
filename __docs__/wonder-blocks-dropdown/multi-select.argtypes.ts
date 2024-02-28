import {ArgTypes} from "@storybook/react";
import baseSelectArgTypes from "./base-select.argtypes";

const argTypes: ArgTypes = {
    ...baseSelectArgTypes,
    implicitAllEnabled: {
        description: `When this is true, the menu text shows either "All items"
            or the value set in \`labels.allSelected\` when no item is selected.`,
    },
    selectedValues: {
        description: "The values of the items that are currently selected.",
        table: {
            type: {summary: "Array<string>"},
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
