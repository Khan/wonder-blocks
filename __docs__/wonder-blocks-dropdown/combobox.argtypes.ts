import {ArgTypes} from "@storybook/react";

const argTypes: ArgTypes = {
    autoComplete: {
        options: ["none", "list"],
        control: {type: "select"},
    },

    /**
     * States
     */
    disabled: {
        table: {
            category: "States",
        },
    },
    loading: {
        table: {
            category: "States",
        },
    },
    opened: {
        table: {
            category: "States",
        },
    },

    /**
     * Visual Style
     */
    style: {
        table: {
            category: "Visual style",
        },
    },

    /**
     * Events
     */
    onToggle: {
        table: {
            category: "Events",
        },
    },

    onChange: {
        table: {
            category: "Events",
        },
    },

    labels: {
        table: {
            type: {
                summary: "ComboboxLabels",
                detail: "See wonder-blocks-dropdown/src/util/types.ts",
            },
        },
    },
};

export default argTypes;
