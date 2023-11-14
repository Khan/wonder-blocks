import * as React from "react";

// Reusable stories
import {
    Default,
    Emphasized,
    WithIcon,
    WithIllustration,
} from "./popover-content.stories";
import {
    WithIcon as CoreWithIcon,
    WithDetailCell as CoreWithDetailCell,
    Dark as CoreDark,
} from "./popover-content-core.stories";

// NOTE: Casting to any to avoid type errors.
const DefaultWrapper = Default as React.ElementType;
const EmphasizedWrapper = Emphasized as React.ElementType;
const WithIconWrapper = WithIcon as React.ElementType;
const WithIllustrationWrapper = WithIllustration as React.ElementType;
const CoreWithIconWrapper = CoreWithIcon as React.ElementType;
const CoreWithDetailCellWrapper = CoreWithDetailCell as React.ElementType;
const CoreDarkWrapper = CoreDark as React.ElementType;

export const ContentMappings = {
    withTextOnly: <DefaultWrapper {...Default.args} />,
    withEmphasis: <EmphasizedWrapper {...Emphasized.args} />,
    withIcon: <WithIconWrapper {...WithIcon.args} />,
    withIllustration: <WithIllustrationWrapper {...WithIllustration.args} />,
    coreWithIcon: <CoreWithIconWrapper {...CoreWithIcon.args} />,
    coreWithCell: <CoreWithDetailCellWrapper {...CoreWithDetailCell.args} />,
    coreDark: <CoreDarkWrapper {...CoreDark.args} />,
};

export default {
    children: {
        description:
            `The element that triggers the popover. This element will be ` +
            `used to position the popover. It can be either a Node or a ` +
            `function using the children-as-function pattern to pass an open ` +
            `function for use anywhere within children. The latter provides ` +
            `a lot of flexibility in terms of what actions may trigger the ` +
            `\`Popover\` to launch the popover dialog.`,
        control: {
            type: null,
        },
    },
    placement: {
        description:
            `Where the popover should try to appear in relation to the ` +
            `trigger element.,`,
        control: {
            type: "select",
            options: ["top", "bottom", "right", "left"],
        },
    },
    content: {
        description:
            `The content of the popover. You can either use ` +
            `[PopoverContent](../?path=/docs/popover-popovercontent--docs) ` +
            `with one of the pre-defined variants, or include your own ` +
            `custom content using ` +
            `[PopoverContentCore](../?path=/docs/popover-popovercontentcore--docs) ` +
            `directly.`,
        control: {type: "select"},
        defaultValue: ContentMappings.withTextOnly,
        options: Object.keys(ContentMappings) as Array<React.ReactNode>,
        mapping: ContentMappings,
    },
    describedBy: {
        control: {
            type: "select",
        },
        description:
            "The type of content labelling this popover, if applicable.",
        defaultValue: "title",
        table: {
            type: {summary: `"title" | "content" | "title-and-content"`},
            defaultValue: {summary: `"title"`},
        },
        type: {
            name: "enum",
            value: ["title", "content", "title-and-content"],
            required: false,
        },
    },
    dismissEnabled: {
        description:
            `When enabled, user can hide the popover content by pressing the ` +
            `\`esc\` key or clicking/tapping outside of it.`,
    },
    id: {
        description: `The unique identifier to give to the popover content.`,
    },
    initialFocusId: {
        description:
            `The selector for the element that will be focused when the ` +
            `popover content shows. When not set, the first focusable ` +
            `element within the popover content will be used.`,
    },
    opened: {
        description:
            `When true, the popover content is shown.\n\n` +
            `Using this prop makes the component behave as a controlled ` +
            `component. The parent is responsible for managing the ` +
            `opening/closing of the popover when using this prop.`,
        control: {
            type: "boolean",
        },
    },
    onClose: {
        description: `Called when the popover content is closed.`,
    },
    testId: {
        description: `Test ID used for e2e testing.`,
    },
    showTail: {
        description: `Whether to show the popover tail or not.`,
        control: {
            type: "boolean",
        },
    },
};
