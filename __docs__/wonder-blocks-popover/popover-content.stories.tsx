import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import {PopoverContent} from "@khanacademy/wonder-blocks-popover";
import {name, version} from "../../packages/wonder-blocks-popover/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import PopoverContentArgtypes from "./popover-content.argtypes";

export default {
    title: "Popover/PopoverContent",
    component: PopoverContent as unknown as React.ComponentType<any>,
    argTypes: PopoverContentArgtypes,
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>{Story()}</View>
        ),
    ],
} as ComponentMeta<typeof PopoverContent>;

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
    },
});

const Template = (args: any) => <PopoverContent {...args} />;

export const Default: ComponentStory<any> = Template.bind({});

Default.args = {
    title: "A simple popover",
    content: "The default version only includes text.",
    closeButtonVisible: true,
};

Default.storyName = "Default (text)";

Default.parameters = {
    docs: {
        storyDescription: "Default popover variant that displays text-only.",
    },
};

export const Emphasized: ComponentStory<any> = Template.bind({});

Emphasized.args = {
    title: "Popover with emphasis",
    content:
        "Some content for the popover. Note that the action buttons are using the light version.",
    emphasized: true,
    actions: (
        <>
            <Button light={true} kind="secondary">
                Previous
            </Button>
            <Strut size={Spacing.medium_16} />
            <Button light={true} kind="primary">
                Next
            </Button>
        </>
    ),
};

Emphasized.parameters = {
    docs: {
        storyDescription:
            `Text-only variant with added emphasis.\n\n` +
            `**NOTE:** When using this variant, make sure to apply the \`light\`
        prop to each button`,
    },
};

export const WithIcon: ComponentStory<any> = Template.bind({});

WithIcon.args = {
    title: "Popover with Icon",
    content: "Popovers can include images on the left.",
    icon: <img src="/logo.svg" width="100%" alt="Wonder Blocks logo" />,
};

WithIcon.parameters = {
    docs: {
        storyDescription:
            "Decorate the popover with an illustrated icon. You need to pass an `icon` prop with the following constraints:\n\n - string: The URL of the icon asset\n - `<img>` or `<svg>`: Make sure to define a width",
    },
};

export const WithIllustration: ComponentStory<any> = Template.bind({});

WithIllustration.args = {
    title: "Popover with Illustration",
    content: "As you can see, this popover includes a full-bleed illustration.",
    image: (
        <img
            src="/illustration.svg"
            alt="An illustration of a person skating on a pencil"
            width={288}
            height={200}
        />
    ),
    closeButtonVisible: true,
};

WithIllustration.parameters = {
    docs: {
        storyDescription:
            "Call attention to the popover using a full-bleed illustration.",
    },
};
