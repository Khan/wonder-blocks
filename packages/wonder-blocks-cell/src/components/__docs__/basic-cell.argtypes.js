// @flow
import * as React from "react";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

/**
 * Some pre-defined accessory examples to use in our stories.
 */
const CellMappings = {
    withContentArticle: ((
        <Icon icon={icons.contentArticle} size="medium" />
    ): React.Element<typeof Icon>),
    withContentVideo: ((
        <Icon icon={icons.contentVideo} size="medium" />
    ): React.Element<typeof Icon>),
    withCaret: (<Icon icon={icons.caretRight} size="medium" />: React.Element<
        typeof Icon,
    >),
};

export default {
    title: {
        description:
            "The title / main content of the cell. You can either provide a string or a Typography component.",
        type: {required: true},
        table: {
            type: {
                summary: "TypographyText",
                detail: "string | React.Element<Typography>",
            },
        },
    },
    leftAccessory: {
        description: `If provided, this adds a left accessory to the cell. Left Accessories can be defined using WB components such as Icon, IconButton, or it can even be used for a custom node/component if needed. What ever is passed in will occupy the "LeftAccessory” area of the Cell.`,
        control: {type: "select"},
        options: (Object.keys(CellMappings): Array<React.Node>),
        mapping: CellMappings,
        table: {
            category: "Layout",
        },
    },
    leftAccessoryStyle: {
        description: `Optional custom styles applied to the leftAccessory wrapper. For example, it can be used to set a custom minWidth or a custom alignment.`,
        table: {
            category: "Styling",
            type: {
                summary: "AccessoryStyle",
                detail: "NOTE: leftAccessoryStyle can only be used if leftAccessory is set.",
            },
        },
    },
    rightAccessory: {
        description: `If provided, this adds a right accessory to the cell. Right Accessories can be defined using WB components such as Icon, IconButton, or it can even be used for a custom node/component if needed. What ever is passed in will occupy the “RightAccessory” area of the Cell.`,
        control: {type: "select"},
        options: (Object.keys(CellMappings): Array<React.Node>),
        mapping: CellMappings,
        table: {
            category: "Layout",
        },
    },
    rightAccessoryStyle: {
        description: `Optional custom styles applied to the rightAccessory wrapper. For example, it can be used to set a custom minWidth or a custom alignment.`,
        table: {
            category: "Styling",
            type: {
                summary: "AccessoryStyle",
                detail: "NOTE: rightAccessoryStyle can only be used if rightAccessory is set.",
            },
        },
    },
};
