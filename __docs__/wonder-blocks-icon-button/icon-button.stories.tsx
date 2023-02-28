/* eslint-disable no-console */
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";
// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import ComponentInfo from "../../.storybook/components/component-info";
import {
    name,
    version,
} from "../../packages/wonder-blocks-icon-button/package.json";

export default {
    title: "IconButton / IconButton",
    component: IconButton,
    parameters: {
        componentSubtitle: (
            <ComponentInfo name={name} version={version} />
        ) as any,
    },
    argTypes: {
        icon: {
            options: icons,
        },
    },
};

// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const Default: StoryComponentType = (args) => {
    return <IconButton {...args} />;
};

Default.args = {
    icon: icons.search,
    color: "default",
    kind: "primary",

    onClick: (e: React.SyntheticEvent) => {
        console.log("Click!");
        action("clicked")(e);
    },
};

export const Basic: StoryComponentType = () => {
    return (
        <IconButton icon={icons.search} onClick={() => console.log("Click!")} />
    );
};

Basic.parameters = {
    docs: {
        storyDescription: `Minimal icon button. The only props specified in
            this example are \`icon\` and \`onClick\`.`,
    },
};

export const Variants: StoryComponentType = () => {
    return (
        <View style={{flexDirection: "row"}}>
            <IconButton
                icon={icons.search}
                aria-label="search"
                onClick={(e) => console.log("Click!")}
            />
            <Strut size={Spacing.medium_16} />
            <IconButton
                icon={icons.search}
                aria-label="search"
                kind="secondary"
                onClick={(e) => console.log("Click!")}
            />
            <Strut size={Spacing.medium_16} />
            <IconButton
                icon={icons.search}
                aria-label="search"
                kind="tertiary"
                onClick={(e) => console.log("Click!")}
            />
            <Strut size={Spacing.medium_16} />
            <IconButton
                disabled={true}
                icon={icons.search}
                aria-label="search"
                onClick={(e) => console.log("Click!")}
            />
        </View>
    );
};

Variants.parameters = {
    docs: {
        storyDescription: `In this example, we have primary, secondary,
            tertiary, and disabled \`IconButton\`s from left to right.`,
    },
};

export const Light: StoryComponentType = () => {
    return (
        <View style={styles.dark}>
            <IconButton
                icon={icons.search}
                aria-label="search"
                light={true}
                onClick={(e) => console.log("Click!")}
            />
        </View>
    );
};

Light.parameters = {
    docs: {
        storyDescription: `An IconButton on a dark background.
            Only the primary kind is allowed to have the \`light\`
            prop set to true.`,
    },
};

export const DisabledLight: StoryComponentType = () => {
    return (
        <View style={styles.dark}>
            <IconButton
                disabled={true}
                icon={icons.search}
                aria-label="search"
                light={true}
                onClick={(e) => console.log("Click!")}
            />
        </View>
    );
};

DisabledLight.parameters = {
    docs: {
        storyDescription:
            "This is a disabled icon button with the `light` prop set to true.",
    },
};

export const UsingHref: StoryComponentType = () => {
    return (
        <IconButton
            icon={icons.info}
            aria-label="More information"
            href="/"
            target="_blank"
            onClick={(e) => console.log("Click!")}
        />
    );
};

UsingHref.parameters = {
    docs: {
        storyDescription: `This example has an \`href\` prop in addition to the
            \`onClick\` prop. \`href\` takes a URL or path, and clicking the
            icon button will result in a navigation to the specified page.
            Note that \`onClick\` is not required if \`href\` is defined.
            The \`target="_blank"\` prop will cause the href page to open in
            a new tab.`,
    },
};

export const WithAriaLabel: StoryComponentType = () => {
    return (
        <View style={styles.arrowsWrapper}>
            <IconButton
                icon={icons.caretLeft}
                onClick={(e) => console.log("Click!")}
                aria-label="Previous page"
            />
            <IconButton
                icon={icons.caretRight}
                onClick={(e) => console.log("Click!")}
                aria-label="Next page"
            />
        </View>
    );
};

WithAriaLabel.parameters = {
    docs: {
        storyDescription: `By default, the icon buttons do not have
            accessible names. The \`aria-label\` prop must be used to explain
            the function of the button. Remember to keep the description
            concise but understandable.`,
    },
};

const styles = StyleSheet.create({
    dark: {
        backgroundColor: Color.darkBlue,
        padding: Spacing.medium_16,
    },
    arrowsWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: Spacing.xxxLarge_64,
    },
});
