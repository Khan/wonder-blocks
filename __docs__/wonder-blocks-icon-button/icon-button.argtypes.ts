import type {ArgTypes} from "@storybook/react";
import iconButtonSharedArgtypes from "./icon-button-shared.argtypes";

export default {
    ...iconButtonSharedArgtypes,
    size: {
        control: {
            type: "select",
        },
        table: {
            defaultValue: {
                summary: `"medium"`,
            },
        },
    },
} satisfies ArgTypes;
