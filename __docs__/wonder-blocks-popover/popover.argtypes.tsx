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
const DefaultWrapper = Default as any;
const EmphasizedWrapper = Emphasized as any;
const WithIconWrapper = WithIcon as any;
const WithIllustrationWrapper = WithIllustration as any;
const CoreWithIconWrapper = CoreWithIcon as any;
const CoreWithDetailCellWrapper = CoreWithDetailCell as any;
const CoreDarkWrapper = CoreDark as any;

// NOTE: We have to use the `render` method to fix a bug in Storybook where
// reusable stories don't render properly with CSF v3.
// See https://github.com/storybookjs/storybook/issues/15954#issuecomment-1835905271
export const ContentMappings = {
    withTextOnly: DefaultWrapper.render({...Default.args}),
    withEmphasis: EmphasizedWrapper.render({...Emphasized.args}),
    withIcon: WithIconWrapper.render({...WithIcon.args}),
    withIllustration: WithIllustrationWrapper.render({
        ...WithIllustration.args,
    }),
    coreWithIcon: CoreWithIconWrapper.render({...CoreWithIcon.args}),
    coreWithCell: CoreWithDetailCellWrapper.render({
        ...CoreWithDetailCell.args,
    }),
    coreDark: CoreDarkWrapper.render({...CoreDark.args}),
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
            `[PopoverContent](../?path=/docs/packages-popover-popovercontent--docs) ` +
            `with one of the pre-defined variants, or include your own ` +
            `custom content using ` +
            `[PopoverContentCore](../?path=/docs/packages-popover-popovercontentcore--docs) ` +
            `directly.`,
        control: {type: "select"},
        defaultValue: ContentMappings.withTextOnly,
        options: Object.keys(ContentMappings) as Array<React.ReactNode>,
        mapping: ContentMappings,
    },
    id: {
        description:
            `The unique identifier to give to the popover. Provide ` +
            `this in cases where you want to override the default accessibility ` +
            `solution. This identifier will be applied to the popover title and ` +
            `content.\n\n` +
            `This is also used as a prefix to the IDs of the popover's elements. ` +
            `For example, if you pass \`"my-popover"\` as the ID, the popover ` +
            `title will have the ID \`"my-popover-title"\` and the popover ` +
            `content will have the ID \`"my-popover-content"\`.`,
    },
    closedFocusId: {
        description:
            `The selector for the element that will be focused after the ` +
            `popover dialog closes. When not set, the element that triggered ` +
            `the popover will be used.`,
        control: {
            type: "text",
        },
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
    rootBoundary: {
        description:
            `Optional property to set what the root boundary is for the popper behavior.` +
            `This is set to "viewport" by default, causing the popper to be positioned based` +
            `on the user's viewport. If set to "document", it will position itself based` +
            `on where there is available room within the document body.`,
        control: {
            type: "select",
            options: ["viewport", "document"],
        },
    },
    portal: {
        description:
            `Optional property to enable the portal functionality of popover.` +
            `This is very handy in cases where the Popover can't be easily` +
            `injected into the DOM structure and requires portaling to` +
            `the trigger location.` +
            `Set to "true" by default.\n\n` +
            `CAUTION: Turning off portal could cause some clipping issues` +
            `especially around legacy code with usage of z-indexing,` +
            `Use caution when turning this functionality off and ensure` +
            `your content does not get clipped or hidden.`,
        control: {
            type: "boolean",
        },
    },
};
