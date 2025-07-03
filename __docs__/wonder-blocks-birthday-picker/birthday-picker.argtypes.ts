import {defaultLabels} from "../../packages/wonder-blocks-birthday-picker/src/components/birthday-picker";

export default {
    labels: {
        defaultValue: defaultLabels,
    },
    onChange: {
        action: "onChanged",
        table: {
            category: "Events",
        },
    },
    style: {
        description: `Additional styles applied to the root element of the
            component.`,
        table: {
            type: {
                summary: "StyleType",
            },
        },
    },
    dropdownStyle: {
        description: "Additional styles applied to the dropdowns.",
        table: {
            type: {
                summary: "StyleType",
            },
        },
    },
};
