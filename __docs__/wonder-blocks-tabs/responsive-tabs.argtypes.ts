import type {ArgTypes} from "@storybook/react-vite";
import {AriaLabelOrAriaLabelledbyArgTypes} from "./shared.argtypes";

export default {
    tabs: {
        table: {
            type: {
                summary: "Array<ResponsiveTabItem>",
                detail: "type ResponsiveTabItem = {\n\tid: string,\n\tlabel: string,\n\tpanel: React.ReactNode,\n\ticon?: React.ReactElement<PhosphorIcon | Icon>\n}",
            },
        },
    },
    ...AriaLabelOrAriaLabelledbyArgTypes,
    tabsProps: {
        table: {
            type: {
                summary: "TabsProps",
            },
        },
    },
    dropdownProps: {
        table: {
            type: {
                summary: "TabsDropdownProps",
            },
        },
    },
} satisfies ArgTypes;
