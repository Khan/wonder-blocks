import type {InputType} from "@storybook/csf";

import PlusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import PlusCircleBold from "@phosphor-icons/core/bold/plus-circle-bold.svg";
import XCircle from "@phosphor-icons/core/regular/x-circle.svg";
import XCircleBold from "@phosphor-icons/core/bold/x-circle-bold.svg";
import X from "@phosphor-icons/core/regular/x.svg";
import XBold from "@phosphor-icons/core/bold/x-bold.svg";
import CheckCircle from "@phosphor-icons/core/regular/check-circle.svg";
import CheckCircleBold from "@phosphor-icons/core/bold/check-circle-bold.svg";
import Check from "@phosphor-icons/core/regular/check.svg";
import CheckBold from "@phosphor-icons/core/bold/check-bold.svg";
import CaretDown from "@phosphor-icons/core/regular/caret-down.svg";
import CaretDownBold from "@phosphor-icons/core/bold/caret-down-bold.svg";
import CaretUp from "@phosphor-icons/core/regular/caret-up.svg";
import CaretUpBold from "@phosphor-icons/core/bold/caret-up-bold.svg";
import CaretLeft from "@phosphor-icons/core/regular/caret-left.svg";
import CaretLeftBold from "@phosphor-icons/core/bold/caret-left-bold.svg";
import CaretRight from "@phosphor-icons/core/regular/caret-right.svg";
import CaretRightBold from "@phosphor-icons/core/bold/caret-right-bold.svg";
import MinusCircle from "@phosphor-icons/core/regular/minus-circle.svg";
import MinusCircleBold from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import Lightbulb from "@phosphor-icons/core/regular/lightbulb.svg";
import LightbulbBold from "@phosphor-icons/core/bold/lightbulb-bold.svg";
import ArrowUp from "@phosphor-icons/core/regular/arrow-up.svg";
import ArrowUpBold from "@phosphor-icons/core/bold/arrow-up-bold.svg";
import ArrowDown from "@phosphor-icons/core/regular/arrow-down.svg";
import ArrowDownBold from "@phosphor-icons/core/bold/arrow-down-bold.svg";
import Info from "@phosphor-icons/core/regular/info.svg";
import InfoBold from "@phosphor-icons/core/bold/info-bold.svg";
import MagnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import MagnifyingGlassBold from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";
import MagnifyingGlassPlus from "@phosphor-icons/core/regular/magnifying-glass-plus.svg";
import MagnifyingGlassPlusBold from "@phosphor-icons/core/bold/magnifying-glass-plus-bold.svg";
import MagnifyingGlassMinus from "@phosphor-icons/core/regular/magnifying-glass-minus.svg";
import MagnifyingGlassMinusBold from "@phosphor-icons/core/bold/magnifying-glass-minus-bold.svg";
import Article from "@phosphor-icons/core/regular/article.svg";
import ArticleBold from "@phosphor-icons/core/bold/article-bold.svg";
import PencilSimple from "@phosphor-icons/core/regular/pencil-simple.svg";
import PencilSimpleBold from "@phosphor-icons/core/bold/pencil-simple-bold.svg";
import Play from "@phosphor-icons/core/regular/play.svg";
import PlayBold from "@phosphor-icons/core/bold/play-bold.svg";

import {tokens} from "@khanacademy/wonder-blocks-theming";

/**
 * Some pre-defined icon examples to use in our stories.
 */
export const IconMappings = {
    PlusCircle,
    PlusCircleBold,
    CaretDown,
    CaretDownBold,
    CaretUp,
    CaretUpBold,
    CaretLeft,
    CaretLeftBold,
    CaretRight,
    CaretRightBold,
    Check,
    CheckBold,
    CheckCircle,
    CheckCircleBold,
    X,
    XBold,
    XCircle,
    XCircleBold,
    MinusCircle,
    MinusCircleBold,
    Lightbulb,
    LightbulbBold,
    ArrowUp,
    ArrowUpBold,
    ArrowDown,
    ArrowDownBold,
    Info,
    InfoBold,
    MagnifyingGlass,
    MagnifyingGlassBold,
    MagnifyingGlassPlus,
    MagnifyingGlassPlusBold,
    MagnifyingGlassMinus,
    MagnifyingGlassMinusBold,
    Article,
    ArticleBold,
    PencilSimple,
    PencilSimpleBold,
    Play,
    PlayBold,
} as const;

export default {
    icon: {
        description:
            "The icon to display. This is a reference to the icon asset (imported as a static SVG file). `small` size should use a `bold` icon, and `medium` size should use a `regular` icon.",
        options: Object.keys(IconMappings),
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
        control: {type: "object"},
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
    "aria-hidden": {
        description:
            "Whether or not the icon should be visible to screenreaders.",
        control: {
            type: "boolean",
        },
        table: {
            category: "Accessibility",
            type: {
                summary: "boolean",
            },
        },
    },
    "aria-label": {
        description:
            "The description of this component for the screenreader to read.",
        control: {
            type: "text",
        },
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
            },
        },
    },
} satisfies Record<string, InputType>;
