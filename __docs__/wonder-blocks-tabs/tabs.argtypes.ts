import type {ArgTypes} from "@storybook/react-vite";
import {AriaLabelOrAriaLabelledbyArgTypes} from "./shared.argtypes";

export default {
    tabs: {
        table: {
            type: {
                summary: "Array<TabItem>",
                detail: "type TabItem = {\n\tid: string,\n\tlabel: React.ReactNode,\n\tpanel: React.ReactNode,\n\ticon?: React.ReactElement<PhosphorIcon | Icon>} & AriaProps",
            },
        },
    },
    ...AriaLabelOrAriaLabelledbyArgTypes,
    activationMode: {
        table: {
            type: {
                summary: '"manual" | "automatic"',
            },
        },
    },
} satisfies ArgTypes;
