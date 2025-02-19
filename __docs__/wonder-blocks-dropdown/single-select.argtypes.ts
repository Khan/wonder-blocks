import {ArgTypes} from "@storybook/react";
import baseSelectArgTypes from "./base-select.argtypes";

const argTypes: ArgTypes = {
    ...baseSelectArgTypes,
    "aria-label": {
        description: `An optional prop to expose an accessible name.
        A visible label element with \`id\`/\`htmlFor\` pairing is preferred.`,
    },
    "aria-labelledby": {
        description: `An optional prop to expose an accessible name from another element.
        A visible label element with \`id\`/\`htmlFor\` pairing is still preferred.`,
    },
    "aria-describedby": {
        description: `An optional prop to expose an accessible description from another element.
        This can be useful for visible text that is too long for a field name.`,
    },
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
            "The object containing the custom label values used inside this component.",
        table: {
            type: {summary: "Labels"},
        },
    },
    showOpenerLabelAsText: {
        control: {type: "boolean"},
        description: `When false, the SelectOpener can show a Node as the selected value. When true, the
         SelectOpener will use a string as the selected value. If using custom OptionItems, a
         plain text label can be provided with the \`labelAsText\` prop.
         Defaults to true.`,

        table: {
            type: {summary: "boolean"},
            defaultValue: {summary: "true"},
        },
    },
};

export default argTypes;
