// @flow
import {defaultLabels} from "../birthday-picker.js";

export default {
    defaultValue: {
        control: {type: "text"},
        description:
            "The default value to populate the birthdate with. Should be in the format: `YYYY-MM-DD` (e.g. 2021-05-26). It's only used to populate the initial value as this is an uncontrolled component.",
        table: {
            type: {
                summary: "string",
            },
        },
    },
    labels: {
        control: {type: "object"},
        description:
            "The object containing the custom labels used inside this component.",
        defaultValue: defaultLabels,
        table: {
            type: {
                summary: "Labels",
            },
        },
    },
    onChange: {
        action: "onChanged",
        description:
            "Listen for changes to the birthdate. Could be a string in the `YYYY-MM-DD` format or `null`.",
        table: {
            category: "Events",
            type: {
                summary: "(date: ?string) => mixed",
            },
        },
    },
};
