import type {InputType} from "@storybook/csf";

import {tokens} from "@khanacademy/wonder-blocks-theming";

/**
 * Some pre-defined icon examples to use in our stories.
 */
const someIcons = {
    PlusCircle: "plus-circle",
    CaretDown: "caret-down",
    CaretUp: "caret-up",
    CaretLeft: "caret-left",
    CaretRight: "caret-right",
    Check: "check",
    CheckCircle: "check-circle",
    X: "x",
    XCircle: "x-circle",
    MinusCircle: "minus-circle",
    Lightbulb: "lightbulb",
    SortAscending: "sort-ascending",
    SortDescending: "sort-descending",
    Circle: "circle",
    Info: "info",
    MagnifyingGlass: "magnifying-glass",
    MagnifyingGlassPlus: "magnifying-glass-plus",
    MagnifyingGlassMinus: "magnifying-glass-minus",
    Article: "article",
    Exam: "exam",
    Video: "video",
} as const;

export const IconMappings = someIcons;

export default {
    icon: {
        description:
            "The icon to display. This is a string that corresponds to the name of the icon in the catalog.",
        options: Object.keys(someIcons),
        mapping: IconMappings,
        type: {
            name: "other",
            value: "string",
            required: true,
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },
    color: {
        description:
            "The color of the icon. Will default to `currentColor`, which means that it will take on the CSS `color` value from the parent element.",
        options: Object.keys(tokens.color),
        mapping: tokens.color,
        control: {
            type: "select",
        },
        table: {
            defaultValue: {summary: "currentColor"},
        },
    },
    size: {
        description:
            "One of `small` (16px), `medium` (24px), `large` (48px), or `xlarge` (96px).",
        options: ["small", "medium", "large", "xlarge"],
        control: {
            type: "select",
        },
        table: {
            defaultValue: {summary: "small"},
        },
    },
    style: {
        description: "Additional styles to apply to the icon.",
        table: {type: {summary: "StyleType"}},
    },
    className: {
        description: "Adds CSS classes to the Icon.",
        control: {type: "text"},
        table: {
            type: {
                summary: "string",
            },
        },
    },
    testId: {
        description: "Test ID used for e2e testing.",
        control: {type: "text"},
        table: {
            type: {
                summary: "string",
            },
        },
    },
} satisfies Record<string, InputType>;
