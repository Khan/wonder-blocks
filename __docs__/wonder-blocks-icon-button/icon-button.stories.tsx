/* eslint-disable no-console */
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import caretLeft from "@phosphor-icons/core/regular/caret-left.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import info from "@phosphor-icons/core/regular/info.svg";
import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import magnifyingGlassBold from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import IconButtonArgtypes from "./icon-button.argtypes";

/**
 * An `IconButton` is a button whose contents are an SVG image.
 *
 * To use, supply an `onClick` function, a Phosphor icon asset (see the
 * `Icon>PhosphorIcon` section) and an `aria-label` to describe the button
 * functionality. Optionally specify href (URL), clientSideNav, color (Wonder
 * Blocks Blue or Red), kind ("primary", "secondary", or "tertiary"), light
 * (whether the IconButton will be rendered on a dark background), disabled ,
 * test ID, and custom styling.
 *
 * The size of an `IconButton` is based on how the `size` prop is defined (see
 * `Sizes` below for more details). The focus ring which is displayed on hover
 * and focus is much larger but does not affect its size. This matches the
 * behavior of Button.
 *
 * IconButtons require a certain amount of space between them to ensure the
 * focus rings don't overlap. The minimum amount of spacing is 16px, but you
 * should refer to the mocks provided by design.  Using a Strut in between
 * IconButtons is the preferred way to for adding this spacing.
 *
 * Many layouts require alignment of visual left (or right) side of an
 * `IconButton`. This requires a little bit of pixel nudging since each icon as
 * a different amount of internal padding.
 *
 * See the Toolbar documentation for examples of `IconButton` use that follow
 * the best practices described above.
 *
 * ```js
 * import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import IconButton from "@khanacademy/wonder-blocks-icon-button";
 *
 * <IconButton
 *     icon={magnifyingGlassIcon}
 *     aria-label="An Icon"
 *     onClick={(e) => console.log("Hello, world!")}
 *     size="medium"
 * />
 * ```
 */
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

/**
 * Minimal icon button. The only props specified in this example are `icon` and
 * `onClick`.
 */
export const Default: StoryComponentType = {
    args: {
        icon: magnifyingGlass,
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

/**
 * IconButtons can be used with any icon from the `@phosphor-icons/core`
 * package. The `icon` prop takes an SVG asset from the package.
 *
 * In this example you can see the different sizes of the icon button:
 * - `xsmall` (16px icon with a 24px touch target).
 * - `small` (24px icon with a 32px touch target).
 * - `medium` (24px icon with a 40px touch target).
 */
export const Sizes: StoryComponentType = {
    ...Default,
    args: {
        icon: magnifyingGlass,
    },
    render: (args) => (
        <View style={{gap: Spacing.medium_16}}>
            <View style={styles.row}>
                <LabelMedium style={styles.label}>xsmall</LabelMedium>
                <IconButton
                    {...args}
                    icon={magnifyingGlassBold}
                    size="xsmall"
                />
            </View>
            <View style={styles.row}>
                <LabelMedium style={styles.label}>small</LabelMedium>
                <IconButton {...args} size="small" />
            </View>
            <View style={styles.row}>
                <LabelMedium style={styles.label}>medium</LabelMedium>
                <IconButton {...args} size="medium" />
            </View>
        </View>
    ),
};

/**
 * In this example, we have primary, secondary, tertiary,
 * and disabled `IconButton`s from left to right.
 */
export const Variants: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.row}>
                <IconButton
                    icon={magnifyingGlass}
                    aria-label="search"
                    onClick={(e) => console.log("Click!")}
                />
                <IconButton
                    icon={magnifyingGlass}
                    aria-label="search"
                    kind="secondary"
                    onClick={(e) => console.log("Click!")}
                />
                <IconButton
                    icon={magnifyingGlass}
                    aria-label="search"
                    kind="tertiary"
                    onClick={(e) => console.log("Click!")}
                />
                <IconButton
                    disabled={true}
                    icon={magnifyingGlass}
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
                    icon={magnifyingGlass}
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
                    icon={magnifyingGlass}
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
                icon={info}
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
                    icon={caretLeft}
                    onClick={(e) => console.log("Click!")}
                    aria-label="Previous page"
                />
                <IconButton
                    icon={caretRight}
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
