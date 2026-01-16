import type {ArgTypes} from "@storybook/react-vite";
import {AriaLabelOrAriaLabelledbyArgTypes} from "./shared.argtypes";

export default {
    tabs: {
        table: {
            type: {
                summary: "Array<TabDropdownItem>",
                detail: "type TabDropdownItem = {\n\tid: string,\n\tlabel: string,\n\tpanel: React.ReactNode,\n\ticon?: React.ReactElement\n}",
            },
        },
    },
    ...AriaLabelOrAriaLabelledbyArgTypes,
} satisfies ArgTypes;
