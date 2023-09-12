/* eslint-disable no-console */
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import IconButtonArgtypes from "./icon-button.argtypes";

export default {
    title: "IconButton",
    component: IconButton,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: IconButtonArgtypes,
} as Meta<typeof IconButton>;

type StoryComponentType = StoryObj<typeof IconButton>;

export const Default: StoryComponentType = {
    args: {
        icon: icons.search,
        color: "default",
        disabled: false,
        kind: "primary",
        size: "medium",

        onClick: (e: React.SyntheticEvent) => {
            console.log("Click!");
            action("clicked")(e);
        },
    },
};

export const Basic: StoryComponentType = () => {
    return (
        <IconButton icon={icons.search} onClick={() => console.log("Click!")} />
    );
};

Basic.parameters = {
    docs: {
        description: {
            story: `Minimal icon button. The only props specified in
            this example are \`icon\` and \`onClick\`.`,
        },
    },
};

/**
 * Icon buttons can be one of three sizes: `xsmall` (16px icon with a 24px touch target),
 * `small` (24px icon with a 32px touch target), and `medium` (24px icon with a 40px touch target).
 * The default size is `medium`.
 */
export const Sizes: StoryComponentType = (() => {
    return (
        <View style={{flexDirection: "column"}}>
            <View style={styles.row}>
                <LabelMedium style={styles.label}>xsmall</LabelMedium>
                <IconButton
                    icon={icons.search}
                    size="xsmall"
                    aria-label="search"
                    onClick={(e) => console.log("Click!")}
                />
            </View>
            <Strut size={Spacing.large_24} />
            <View style={styles.row}>
                <LabelMedium style={styles.label}>small</LabelMedium>
                <IconButton
                    icon={icons.search}
                    size="small"
                    aria-label="search"
                    onClick={(e) => console.log("Click!")}
                />
            </View>
            <Strut size={Spacing.large_24} />
            <View style={styles.row}>
                <LabelMedium style={styles.label}>medium</LabelMedium>
                <IconButton
                    icon={icons.search}
                    size="medium"
                    aria-label="search"
                    onClick={(e) => console.log("Click!")}
                />
            </View>
        </View>
    );
}) as StoryComponentType;

/**
 * In this example, we have primary, secondary, tertiary,
 * and disabled `IconButton`s from left to right.
 */
export const Variants: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.row}>
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    onClick={(e) => console.log("Click!")}
                />
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    kind="secondary"
                    onClick={(e) => console.log("Click!")}
                />
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    kind="tertiary"
                    onClick={(e) => console.log("Click!")}
                />
                <IconButton
                    disabled={true}
                    icon={icons.search}
                    aria-label="search"
                    onClick={(e) => console.log("Click!")}
                />
            </View>
        );
    },
};

/**
 * An IconButton on a dark background.
 * Only the primary kind is allowed to have the `light` prop set to true.
 */
export const Light: StoryComponentType = {
    render: () => {
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
    },
};

/**
 * This is a disabled icon button with the `light` prop set to true.
 */
export const DisabledLight: StoryComponentType = {
    render: () => {
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
    },
};

/**
 * This example has an `href` prop in addition to the `onClick` prop. `href` takes a URL or path,
 * and clicking the icon button will result in a navigation to the specified page. Note that
 * `onClick` is not required if `href` is defined. The `target="_blank"` prop will cause the href
 *  page to open in a new tab.
 */
export const UsingHref: StoryComponentType = {
    render: () => {
        return (
            <IconButton
                icon={icons.info}
                aria-label="More information"
                href="/"
                target="_blank"
                onClick={(e) => console.log("Click!")}
            />
        );
    },
};

/**
 * By default, the icon buttons do not have accessible names. The `aria-label` prop must be used
 * to explain the function of the button. Remember to keep the description concise but understandable.
 */
export const WithAriaLabel: StoryComponentType = {
    render: () => {
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
    row: {
        flexDirection: "row",
        gap: Spacing.medium_16,
        alignItems: "center",
    },
    label: {
        width: Spacing.xxxLarge_64,
    },
});
