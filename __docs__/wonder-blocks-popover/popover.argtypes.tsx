import * as React from "react";

// Reusable stories
import {ArgTypes} from "@storybook/react-vite";
import {Default, WithIcon, WithIllustration} from "./popover-content.stories";
import {
    WithIcon as CoreWithIcon,
    WithDetailCell as CoreWithDetailCell,
} from "./popover-content-core.stories";

// NOTE: Casting to any to avoid type errors.
const DefaultWrapper = Default as any;
const WithIconWrapper = WithIcon as any;
const WithIllustrationWrapper = WithIllustration as any;
const CoreWithIconWrapper = CoreWithIcon as any;
const CoreWithDetailCellWrapper = CoreWithDetailCell as any;

// NOTE: We have to use the `render` method to fix a bug in Storybook where
// reusable stories don't render properly with CSF v3.
// See https://github.com/storybookjs/storybook/issues/15954#issuecomment-1835905271
export const ContentMappings = {
    withTextOnly: DefaultWrapper.render({...Default.args}),
    withIcon: WithIconWrapper.render({...WithIcon.args}),
    withIllustration: WithIllustrationWrapper.render({
        ...WithIllustration.args,
    }),
    coreWithIcon: CoreWithIconWrapper.render({...CoreWithIcon.args}),
    coreWithCell: CoreWithDetailCellWrapper.render({
        ...CoreWithDetailCell.args,
    }),
};

export default {
    children: {
        control: {type: "text"},
        table: {
            type: {summary: "React.ReactNode"},
        },
        type: {name: "other", value: "React.ReactNode", required: true},
    },
    placement: {
        control: {
            type: "select",
            options: ["top", "bottom", "right", "left"],
        },
        table: {
            type: {summary: "Placement"},
            defaultValue: {summary: "top"},
        },
    },
    content: {
        control: {type: "select"},
        defaultValue: ContentMappings.withTextOnly,
        options: Object.keys(ContentMappings) as Array<React.ReactNode>,
        mapping: ContentMappings,
        table: {
            type: {
                summary: `PopoverContents | ((close: {close: () => void}) => PopoverContents)`,
            },
        },
    },

    closedFocusId: {
        control: {
            type: "text",
        },
    },
    opened: {
        control: {
            type: "boolean",
        },
    },
    showTail: {
        control: {
            type: "boolean",
        },
    },
    rootBoundary: {
        control: {
            type: "select",
            options: ["viewport", "document"],
        },
        table: {
            defaultValue: {summary: "viewport"},
        },
    },
    portal: {
        control: {
            type: "boolean",
        },
        table: {
            defaultValue: {summary: "true"},
        },
    },
    viewportPadding: {
        control: {
            type: "number",
        },
    },
} satisfies ArgTypes;
