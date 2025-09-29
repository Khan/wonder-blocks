import type {ArgTypes} from "@storybook/react-vite";

export default {
    children: {
        table: {
            type: {
                summary: "React.ChildrenArray<React.Element<BreadcrumbsItem>>",
                detail: "This is the content for the collection of Breadcrumbs.",
            },
        },
        type: {
            name: "other",
            value: "React.ChildrenArray<React.Element<BreadcrumbsItem>>",
            required: true,
        },
    },

    "aria-label": {
        description:
            "The description of this component for the screenreader to read.",
        control: {
            type: "text",
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },

    testId: {
        control: {
            type: "text",
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },
} satisfies ArgTypes;
