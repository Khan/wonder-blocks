import type {ArgTypes} from "@storybook/react-vite";

import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import plusCircleBold from "@phosphor-icons/core/bold/plus-circle-bold.svg";
import calendar from "@phosphor-icons/core/regular/calendar.svg";
import calendarBold from "@phosphor-icons/core/bold/calendar-bold.svg";
import clock from "@phosphor-icons/core/regular/clock.svg";
import clockBold from "@phosphor-icons/core/bold/clock-bold.svg";
import xCircle from "@phosphor-icons/core/regular/x-circle.svg";
import xCircleBold from "@phosphor-icons/core/bold/x-circle-bold.svg";
import x from "@phosphor-icons/core/regular/x.svg";
import xBold from "@phosphor-icons/core/bold/x-bold.svg";
import checkCircle from "@phosphor-icons/core/regular/check-circle.svg";
import checkCircleBold from "@phosphor-icons/core/bold/check-circle-bold.svg";
import checkCircleFill from "@phosphor-icons/core/fill/check-circle-fill.svg";
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
import dotsThreeBold from "@phosphor-icons/core/bold/dots-three-bold.svg";
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
import playCircle from "@phosphor-icons/core/regular/play-circle.svg";
import playCircleBold from "@phosphor-icons/core/bold/play-circle-bold.svg";
import gear from "@phosphor-icons/core/regular/gear.svg";
import cookie from "@phosphor-icons/core/regular/cookie.svg";
import cookieBold from "@phosphor-icons/core/bold/cookie-bold.svg";
import iceCream from "@phosphor-icons/core/regular/ice-cream.svg";

import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

/**
 * Some pre-defined icon examples to use in our stories.
 */
export const IconMappings = {
    plusCircle,
    plusCircleBold,
    calendar,
    calendarBold,
    clock,
    clockBold,
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
    checkCircleFill,
    dotsThreeBold,
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
    playCircle,
    playCircleBold,
    gear,
    cookie,
    cookieBold,
    iceCream,
} as const;

export default {
    icon: {
        options: Object.keys(IconMappings),
        mapping: IconMappings,
        type: {
            name: "other",
            value: "string",
            required: true,
        },
        table: {
            type: {
                summary: "PhosphorIconAsset | string",
            },
        },
    },
    color: {
        options: Object.keys(semanticColor),
        mapping: semanticColor,
        control: {
            type: "select",
        },
        table: {
            defaultValue: {summary: "currentColor"},
        },
    },
    size: {
        options: ["small", "medium", "large", "xlarge"],
        control: {
            type: "select",
        },
        table: {
            defaultValue: {summary: "small"},
        },
    },
    style: {
        control: {type: "object"},
        table: {type: {summary: "StyleType"}},
    },
    className: {
        control: {type: "text"},
        table: {
            type: {
                summary: "string",
            },
        },
    },
    testId: {
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
    role: {
        defaultValue: "img",
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
} satisfies ArgTypes;
