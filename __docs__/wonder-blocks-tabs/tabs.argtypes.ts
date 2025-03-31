import type {ArgTypes} from "@storybook/react";

export default {
    tabs: {
        table: {
            type: {
                summary: "Array<TabItem>",
                detail: "type TabItem = {|\n\tid: string,\n\tlabel: React.ReactNode,\n\tpanel: React.ReactNode\n|}",
            },
        },
    },
} satisfies ArgTypes;
