import * as React from "react";
import type {InputType} from "@storybook/csf";

import Button from "@khanacademy/wonder-blocks-button";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

type Mappings = Record<string, React.ReactNode>;

const ActionsMappings: Mappings = {
    none: null,
    singleButton: <Button kind="primary">Continue</Button>,
    emphasizedSingleButton: (
        <Button kind="primary" light={true}>
            Continue
        </Button>
    ),
    pagination: (
        <>
            <Button kind="tertiary">Previous</Button>
            <Strut size={Spacing.medium_16} />
            <Button kind="primary">Next</Button>
        </>
    ),
    emphasizedPagination: (
        <>
            <Button kind="tertiary" light={true}>
                Previous
            </Button>
            <Strut size={Spacing.medium_16} />
            <Button kind="primary" light={true}>
                Next
            </Button>
        </>
    ),
    steps: (
        <>
            <LabelLarge>Step 1 of 5</LabelLarge>
            <Spring />
            <Button kind="tertiary">Skip this step</Button>
        </>
    ),
    emphasizedSteps: (
        <>
            <LabelLarge>Step 1 of 5</LabelLarge>
            <Spring />
            <Button kind="secondary" light={true}>
                Skip this step
            </Button>
        </>
    ),
};

const IconMappings: Mappings = {
    none: null,
    logo: <img src="/logo.svg" width="100%" alt="Wonder Blocks logo" />,
    itemAvatar: (
        <img src="./avatar.png" alt="ItemAvatar" width={48} height={48} />
    ),
};

const ImageMappings: Mappings = {
    none: null,
    default: (
        <img
            src="/illustration.svg"
            alt="An illustration of a person skating on a pencil"
            width={288}
            height={200}
        />
    ),
};

export default {
    content: {
        description: "The content to render inside the popover.",
        type: {name: "string", required: true},
    },
    title: {
        description: "The popover title",
        type: {name: "string", required: true},
    },
    actions: {
        description: `User-defined actions.\n\nIt can be either a Node or a function using the children-as-function pattern to pass a close function for use anywhere within the actions. This provides a lot of flexibility in terms of what actions may trigger the Popover to close the popover dialog`,
        type: {
            name: "other",
            value: "React.Node | (({|close: () => mixed|}) => React.Node)",
        },
        options: Object.keys(ActionsMappings) as Array<React.ReactNode>,
        mapping: ActionsMappings,
    },
    closeButtonVisible: {
        description: `When true, the close button is shown; otherwise, the close button is not shown.`,
        table: {
            type: {
                summary: "boolean",
            },
        },
    },
    closeButtonLabel: {
        description: "Close button label for use in screen readers",
        control: {type: "text"},
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
    icon: {
        description: `Decorate the popover with an illustrated icon. It cannot be used at the same time with image.`,
        type: {
            name: "union",
            value: [
                {name: "string"},
                {
                    name: "other",
                    value: `string | React.Element<"img"> | React.Element<"svg">`,
                },
            ],
        },
        options: Object.keys(IconMappings) as Array<React.ReactNode>,
        mapping: IconMappings,
    },
    image: {
        description: `Decorate the popover with a full-bleed illustration. It cannot be used at the same time with icon.`,
        type: {
            name: "union",
            value: [
                {name: "other", value: `React.Element<"img">`},
                {name: "other", value: `React.Element<"svg">`},
            ],
        },
        options: Object.keys(ImageMappings) as Array<React.ReactNode>,
        mapping: ImageMappings,
    },
    emphasized: {
        description: `When true, changes the popover dialog background to blue; otherwise, the popover dialog background is not modified. It can be used only with Text-only popovers. It cannot be used with icon or image.`,
        control: {type: "boolean"},
    },
} satisfies Record<string, InputType>;
