import type {InputType} from "@storybook/csf";

import PlusCircle from "@phosphor-icons/core/bold/plus-circle-bold.svg";
import XCircle from "@phosphor-icons/core/fill/x-circle-fill.svg";
import X from "@phosphor-icons/core/regular/x.svg";
import CheckCircle from "@phosphor-icons/core/regular/check-circle.svg";
import Check from "@phosphor-icons/core/regular/check.svg";
import CaretDown from "@phosphor-icons/core/regular/caret-down.svg";
import CaretUp from "@phosphor-icons/core/regular/caret-up.svg";
import CaretLeft from "@phosphor-icons/core/regular/caret-left.svg";
import CaretRight from "@phosphor-icons/core/regular/caret-right.svg";
import MinusCircle from "@phosphor-icons/core/regular/minus-circle.svg";
import Lightbulb from "@phosphor-icons/core/regular/lightbulb.svg";
import SortAscending from "@phosphor-icons/core/regular/sort-ascending.svg";
import SortDescending from "@phosphor-icons/core/regular/sort-descending.svg";
import Circle from "@phosphor-icons/core/regular/circle.svg";
import Info from "@phosphor-icons/core/bold/info-bold.svg";
import MagnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import MagnifyingGlassBold from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";
import MagnifyingGlassPlus from "@phosphor-icons/core/regular/magnifying-glass-plus.svg";
import MagnifyingGlassMinus from "@phosphor-icons/core/regular/magnifying-glass-minus.svg";
import Article from "@phosphor-icons/core/regular/article.svg";
import Exam from "@phosphor-icons/core/regular/exam.svg";
import Video from "@phosphor-icons/core/regular/video.svg";
// STOPSHIP(juan): This import should complain about the missing type. Only
// testing that by trying to import an "invalid" weight TypeScript should
// complain.
import VideoDuoTone from "@phosphor-icons/core/duotone/video-duotone.svg";

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
    MagnifyingGlassBold,
    MagnifyingGlassPlus,
    MagnifyingGlassMinus,
    Article,
    Exam,
    Video,
    VideoDuoTone,
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
