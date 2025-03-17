import {ArgTypes} from "@storybook/react";

export default {
    children: {
        table: {
            type: {
                // We put React.Element<NavigationTabItem> in the docs so
                // consumers know to use it with NavigationTabItem. In code,
                // it's marked as React.Element since TS can't enforce what
                // components are used as children
                summary:
                    "React.Element<NavigationTabItem> | Array<React.Element<NavigationTabItem>>",
            },
        },
    },
    styles: {
        table: {
            type: {
                summary: "{ root?: StyleType; list?: StyleType; }",
            },
            category: "Visual style",
        },
        control: {
            type: undefined,
        },
    },
} satisfies ArgTypes;
