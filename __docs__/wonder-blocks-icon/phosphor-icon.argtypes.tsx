import * as React from "react";
import type {InputType} from "@storybook/csf";
import {
    Icon,
    Article,
    CaretDown,
    CaretLeft,
    CaretRight,
    CaretUp,
    Check,
    CheckCircle,
    Circle,
    Exam,
    Info,
    Lightbulb,
    MagnifyingGlass,
    MagnifyingGlassMinus,
    MagnifyingGlassPlus,
    MinusCircle,
    PlusCircle,
    SortAscending,
    SortDescending,
    Video,
    X,
    XCircle,
} from "@phosphor-icons/react";

import {tokens} from "@khanacademy/wonder-blocks-theming";

/**
 * Some pre-defined icon examples to use in our stories.
 */
const someIcons = {
    PlusCircle,
    CaretDown,
    CaretUp,
    CaretLeft,
    CaretRight,
    Check,
    CheckCircle,
    X,
    XCircle,
    MinusCircle,
    Lightbulb,
    SortAscending,
    SortDescending,
    Circle,
    Info,
    MagnifyingGlass,
    MagnifyingGlassPlus,
    MagnifyingGlassMinus,
    Article,
    Exam,
    Video,
};

export const IconMappings: Record<
    string,
    React.ReactElement<Icon>
> = Object.entries(someIcons).reduce(
    (acc, [key, Icon]) => ({
        ...acc,
        [key]: <Icon />,
    }),
    {},
);

export default {
    icon: {
        description:
            "The icon to display. This is a React element that renders a Phosphor icon component.",
        options: Object.keys(someIcons),
        mapping: IconMappings,
        type: {
            name: "other",
            value: "React.ReactElement<PhosphorIcon>",
            required: true,
        },
        table: {
            type: {
                summary: "React.ReactElement<PhosphorIcon>",
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
        table: {type: {summary: "CSSProperties | Falsy"}},
        type: {
            name: "union",
            value: [
                {name: "other", value: "CSSProperties"},
                {name: "other", value: "Falsy"},
            ],
        },
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
