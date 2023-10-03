import type {InputType} from "@storybook/csf";

import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import plusCircleBold from "@phosphor-icons/core/bold/plus-circle-bold.svg";
import xCircle from "@phosphor-icons/core/regular/x-circle.svg";
import xCircleBold from "@phosphor-icons/core/bold/x-circle-bold.svg";
import x from "@phosphor-icons/core/regular/x.svg";
import xBold from "@phosphor-icons/core/bold/x-bold.svg";
import checkCircle from "@phosphor-icons/core/regular/check-circle.svg";
import checkCircleBold from "@phosphor-icons/core/bold/check-circle-bold.svg";
import check from "@phosphor-icons/core/regular/check.svg";
import checkBold from "@phosphor-icons/core/bold/check-bold.svg";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretDownBold from "@phosphor-icons/core/bold/caret-down-bold.svg";
import caretUp from "@phosphor-icons/core/regular/caret-up.svg";
import caretUpBold from "@phosphor-icons/core/bold/caret-up-bold.svg";
import caretLeft from "@phosphor-icons/core/regular/caret-left.svg";
import caretLeftBold from "@phosphor-icons/core/bold/caret-left-bold.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import caretRightBold from "@phosphor-icons/core/bold/caret-right-bold.svg";
import minusCircle from "@phosphor-icons/core/regular/minus-circle.svg";
import minusCircleBold from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import lightbulb from "@phosphor-icons/core/regular/lightbulb.svg";
import lightbulbBold from "@phosphor-icons/core/bold/lightbulb-bold.svg";
import arrowUp from "@phosphor-icons/core/regular/arrow-up.svg";
import arrowUpBold from "@phosphor-icons/core/bold/arrow-up-bold.svg";
import arrowDown from "@phosphor-icons/core/regular/arrow-down.svg";
import arrowDownBold from "@phosphor-icons/core/bold/arrow-down-bold.svg";
import info from "@phosphor-icons/core/regular/info.svg";
import infoBold from "@phosphor-icons/core/bold/info-bold.svg";
import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import magnifyingGlassBold from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";
import magnifyingGlassPlus from "@phosphor-icons/core/regular/magnifying-glass-plus.svg";
import magnifyingGlassPlusBold from "@phosphor-icons/core/bold/magnifying-glass-plus-bold.svg";
import magnifyingGlassMinus from "@phosphor-icons/core/regular/magnifying-glass-minus.svg";
import magnifyingGlassMinusBold from "@phosphor-icons/core/bold/magnifying-glass-minus-bold.svg";
import article from "@phosphor-icons/core/regular/article.svg";
import articleBold from "@phosphor-icons/core/bold/article-bold.svg";
import pencilSimple from "@phosphor-icons/core/regular/pencil-simple.svg";
import pencilSimpleBold from "@phosphor-icons/core/bold/pencil-simple-bold.svg";
import play from "@phosphor-icons/core/regular/play.svg";
import playBold from "@phosphor-icons/core/bold/play-bold.svg";

import {tokens} from "@khanacademy/wonder-blocks-theming";

/**
 * Some pre-defined icon examples to use in our stories.
 */
export const IconMappings = {
    plusCircle,
    plusCircleBold,
    caretDown,
    caretDownBold,
    caretUp,
    caretUpBold,
    caretLeft,
    caretLeftBold,
    caretRight,
    caretRightBold,
    check,
    checkBold,
    checkCircle,
    checkCircleBold,
    x,
    xBold,
    xCircle,
    xCircleBold,
    minusCircle,
    minusCircleBold,
    lightbulb,
    lightbulbBold,
    arrowUp,
    arrowUpBold,
    arrowDown,
    arrowDownBold,
    info,
    infoBold,
    magnifyingGlass,
    magnifyingGlassBold,
    magnifyingGlassPlus,
    magnifyingGlassPlusBold,
    magnifyingGlassMinus,
    magnifyingGlassMinusBold,
    article,
    articleBold,
    pencilSimple,
    pencilSimpleBold,
    play,
    playBold,
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
