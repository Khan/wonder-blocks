import {ArgTypes} from "@storybook/react";

export default {
    children: {
        table: {
            type: {
                // We put React.Element<Link> in the docs so consumers know to
                // use it with a Link. In code, it's marked as React.Element
                // since TS can't enforce what components are used as children
                summary: "React.Element<Link> | (linkProps) => React.Element",
            },
        },
    },
    style: {
        table: {
            type: {
                summary: "StyleType",
            },
            category: "Visual style",
        },
        control: {
            type: undefined,
        },
    },
} satisfies ArgTypes;
