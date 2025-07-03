import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";

import {PopoverContent} from "@khanacademy/wonder-blocks-popover";
import packageConfig from "../../packages/wonder-blocks-popover/package.json";

import ComponentInfo from "../components/component-info";
import PopoverContentArgtypes from "./popover-content.argtypes";

export default {
    title: "Packages / Popover / PopoverContent",
    component: PopoverContent as unknown as React.ComponentType<any>,
    argTypes: PopoverContentArgtypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
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
} as Meta<typeof PopoverContent>;

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
    },
});

type StoryComponentType = StoryObj<typeof PopoverContent>;

/**
 * Default popover variant that displays text-only.
 */
export const Default: StoryComponentType = {
    args: {
        title: "A simple popover",
        content: "The default version only includes text.",
        closeButtonVisible: true,
    },
    render: (args) => <PopoverContent {...args} />,
};

Default.storyName = "Default (text)";

/**
 * Decorate the popover with an illustrated icon. You need to pass an `icon`
 * prop with the following constraints:
 * - string: The URL of the icon asset
 * - `<img>` or `<svg>`: Make sure to define a width
 *
 * When passing in a url for the `icon` prop, use the `iconAlt` prop to provide
 * alternative text for the icon if it communicates meaning.
 */
export const WithIcon: StoryComponentType = {
    args: {
        title: "Popover with Icon",
        content: "Popovers can include images on the left.",
        icon: <img src="./logo.svg" width="100%" alt="Wonder Blocks logo" />,
    },
    render: (args) => <PopoverContent {...args} />,
};

/**
 * Call attention to the popover using a full-bleed illustration.
 */
export const WithIllustration: StoryComponentType = {
    args: {
        title: "Popover with Illustration",
        content:
            "As you can see, this popover includes a full-bleed illustration.",
        image: (
            <img
                src="./illustration.svg"
                alt="An illustration of a person skating on a pencil"
                width={288}
                height={200}
            />
        ),
        closeButtonVisible: true,
    },
    render: (args) => <PopoverContent {...args} />,
};
