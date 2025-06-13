import {ArgTypes} from "@storybook/react-vite";
import buttonSharedArgtypes from "./button-shared.argtypes";

export default {
    ...buttonSharedArgtypes,
    styles: {
        table: {
            category: "Layout",
        },
    },
} satisfies ArgTypes;
