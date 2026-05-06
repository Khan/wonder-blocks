import type {ArgTypes} from "@storybook/react-vite";

import AriaArgTypes from "../wonder-blocks-core/aria.argtypes";

export default {
    ...AriaArgTypes,
    children: {
        control: {
            type: undefined,
        },
    },
} satisfies ArgTypes;
