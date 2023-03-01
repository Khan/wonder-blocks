import * as React from "react";
import type {InputType} from "@storybook/csf";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import {LabelSmall, LabelXSmall} from "@khanacademy/wonder-blocks-typography";

/**
 * Some pre-defined accessory examples to use in our stories.
 */
export const AccessoryMappings = {
    withContentArticle: (
        <Icon icon={icons.contentArticle} size="medium" />
    ) as React.ReactElement<React.ComponentProps<typeof Icon>>,
    withContentVideo: (
        <Icon icon={icons.contentVideo} size="medium" />
    ) as React.ReactElement<React.ComponentProps<typeof Icon>>,
    withCaret: (
        <Icon icon={icons.caretRight} size="medium" />
    ) as React.ReactElement<React.ComponentProps<typeof Icon>>,
    withText: (<LabelSmall>26.3 GB</LabelSmall>) as React.ReactElement<
        React.ComponentProps<typeof LabelSmall>
    >,
    withIconText: (
        <View style={{alignItems: "center"}}>
            <Icon icon={icons.info} size="small" />
            <LabelXSmall>Info</LabelXSmall>
        </View>
    ) as React.ReactElement<React.ComponentProps<typeof View>>,
    withImage: (
        <img src="./avatar.png" alt="ItemAvatar" width={48} height={48} />
    ) as React.ReactElement<React.ComponentProps<"img">>,
} as const;

export default {
    title: {
        description:
            "The title / main content of the cell. You can either provide a string or a Typography component. If a string is provided, typography defaults to `LabelLarge`.",
        type: {
            name: "union",
            value: [
                {name: "string"},
                {name: "other", value: "React.ReactElement<Typography>"},
            ],
            required: true,
        },
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
        options: Object.keys(AccessoryMappings) as Array<React.ReactNode>,
        mapping: AccessoryMappings,
        table: {
            category: "Layout",
            type: {
                summary: "React.Node",
                detail: "By default it uses a free width and its default alignment is center (for both vertical and horizontal).",
            },
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
        options: Object.keys(AccessoryMappings) as Array<React.ReactNode>,
        mapping: AccessoryMappings,
        table: {
            category: "Layout",
            type: {
                summary: "React.Node",
                detail: "By default it uses a free width and its default alignment is center (for both vertical and horizontal).",
            },
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
    horizontalRule: {
        description:
            "Adds a horizontal rule at the bottom of the cell that can be used to separate cells within groups such as lists. Defaults to `inset`.",
        defaultValue: "inset",
        options: ["inset", "full-width", "none"],
        control: {type: "select"},
        table: {
            category: "Layout",
            type: {
                summary: "inset | full-width | none",
            },
        },
    },
    style: {
        description: "Optional custom styles.",
        control: {type: "object"},
        table: {
            category: "Styling",
            type: {
                summary: "StyleType",
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
    href: {
        description:
            "Optional href which Cell should direct to, uses client-side routing by default if react-router is present.",
        control: {type: "text"},
        table: {
            category: "Navigation",
            type: {
                summary: "string",
            },
        },
    },
    onClick: {
        action: "clicked",
        description: `Called when the cell is clicked.
        If not provided, the Cell can’t be hovered and/or pressed (highlighted on
    hover).
        `,
        table: {
            category: "Events",
            type: {
                summary: "(e: SyntheticEvent<>) => mixed",
            },
        },
    },
    disabled: {
        description: "Whether the cell is disabled.",
        control: {
            type: "boolean",
        },
        defaultValue: false,
        table: {
            type: {
                summary: "boolean",
            },
        },
    },
    active: {
        description: "Whether the cell is active (or currently selected).",
        control: {
            type: "boolean",
        },
        defaultValue: false,
        table: {
            type: {
                summary: "boolean",
            },
        },
    },
    /**
     * Accessibility
     */
    ariaLabel: {
        name: "aria-label",
        control: {
            type: "string",
        },
        description: "Used to announce the cell's content to screen readers.",
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
                detail: `aria-label should be specially used when the cell is pressable so screen readers can announce the link when the user is focused on it.`,
            },
        },
    },
} satisfies Record<string, InputType>;