import {ArgTypes} from "@storybook/react-vite";
import AriaArgTypes from "../wonder-blocks-core/aria.argtypes";

const argTypes: ArgTypes = {
    ...AriaArgTypes,

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
