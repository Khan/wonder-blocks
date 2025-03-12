import {ArgTypes} from "@storybook/react";

export default {
    children: {
        table: {
            type: {
                summary:
                    "React.Element<NavigationTabItem> | Array<React.Element<NavigationTabItem>>",
            },
        },
    },
} satisfies ArgTypes;
