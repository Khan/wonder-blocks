import type {ArgTypes} from "@storybook/react-vite";

export default {
    label: {
        table: {
            category: "Accessibility",
            type: {summary: "string"},
        },
    },
    options: {
        table: {
            type: {
                summary: "ReadonlyArray<ExclusiveCategoryFilterOption>",
                detail: `{
    value: string;
    label: string;
    startIcon?: PhosphorIconAsset | React.ReactElement;
    testId?: string;
}`,
            },
        },
    },
    selectedValue: {
        control: {type: "text"},
        table: {
            category: "State",
            type: {summary: "string"},
        },
    },
    onChange: {
        table: {
            category: "Events",
            type: {summary: "(value: string) => unknown"},
        },
    },
    styles: {
        table: {
            category: "Visual style",
            type: {
                summary:
                    "{root?: StyleType; label?: StyleType; options?: StyleType; option?: StyleType}",
            },
        },
    },
    id: {
        table: {category: "Accessibility"},
    },
    testId: {
        table: {category: "Testing"},
    },
} satisfies ArgTypes;
