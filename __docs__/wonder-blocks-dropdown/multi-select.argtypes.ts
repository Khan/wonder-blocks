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
    showOpenerLabelAsText: {
        control: {type: "boolean"},
        description: `When false, the SelectOpener can show a Node as a label. When true, the
         SelectOpener will use a string as a label. If using custom OptionItems, a
         plain text label can be provided with the \`labelAsText\` prop.
         Defaults to true.`,

        table: {
            type: {summary: "boolean"},
            defaultValue: {summary: "true"},
        },
    },
};

export default argTypes;
