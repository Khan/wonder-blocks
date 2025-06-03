/* eslint-disable no-console */
import * as React from "react";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";
import {StyleSheet} from "aphrodite";
import {action} from "storybook/actions";
import type {Meta, StoryObj} from "@storybook/react-vite";

import caretLeft from "@phosphor-icons/core/regular/caret-left.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import externalLinkIcon from "@phosphor-icons/core/regular/arrow-square-out.svg";
import info from "@phosphor-icons/core/regular/info.svg";
import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import magnifyingGlassBold from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";
import minusCircle from "@phosphor-icons/core/regular/minus-circle.svg";

import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import IconButtonArgtypes from "./icon-button.argtypes";
import TextField from "../../packages/wonder-blocks-form/src/components/text-field";
import {Icon} from "@khanacademy/wonder-blocks-icon";

/**
 * An `IconButton` is a button whose contents are an SVG image.
 *
 * To use, supply an `onClick` function, a Phosphor icon asset (see the
 * `Icon>PhosphorIcon` section) and an `aria-label` to describe the button
 * functionality. Optionally specify href (URL), clientSideNav, color (Wonder
 * Blocks Blue or Red), kind ("primary", "secondary", or "tertiary"), disabled,
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
    title: "Packages / IconButton / IconButton",
    component: IconButton,
    decorators: [(Story): React.ReactElement => <View>{Story()}</View>],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling all snapshots because we are testing all the variants
            // in `icon-button-testing-snapshots.stories.tsx`.
            disableSnapshot: true,
        },
        docs: {
            source: {
                type: "code",
            },
        },
    },
    argTypes: IconButtonArgtypes,
    args: {
        "aria-label": "Search",
    },
} as Meta<typeof IconButton>;

type StoryComponentType = StoryObj<typeof IconButton>;

/**
 * Minimal icon button. The only props specified in this example are `icon` and
 * `onClick`.
 */
export const Default: StoryComponentType = {
    args: {
        icon: magnifyingGlass,
        actionType: "progressive",
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
 * - `large` (24px icon with a 48px touch target).
 */
export const Sizes: StoryComponentType = {
    ...Default,
    args: {
        icon: magnifyingGlass,
    },
    render: (args) => (
        <View style={{gap: spacing.medium_16}}>
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
            <View style={styles.row}>
                <LabelMedium style={styles.label}>large</LabelMedium>
                <IconButton {...args} size="large" />
            </View>
        </View>
    ),
};

/**
 * In this example, we have `primary`, `secondary`, `tertiary`,
 * and disabled `IconButton`s from left to right.
 */
export const Kinds: StoryComponentType = {
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
 * IconButton has an `actionType` prop that is either `progressive` (the default, as shown
 * above), `destructive` or `neutral` (as can seen below):
 */
export const WithActionType: StoryComponentType = {
    name: "ActionType",
    render: (args) => (
        <View style={{gap: spacing.medium_16}}>
            <View style={styles.row}>
                <IconButton
                    {...args}
                    icon={minusCircle}
                    onClick={() => {}}
                    actionType="destructive"
                />
                <IconButton
                    {...args}
                    icon={minusCircle}
                    onClick={() => {}}
                    kind="secondary"
                    actionType="destructive"
                />
                <IconButton
                    {...args}
                    icon={minusCircle}
                    onClick={() => {}}
                    kind="tertiary"
                    actionType="destructive"
                />
                <IconButton
                    {...args}
                    disabled={true}
                    icon={minusCircle}
                    aria-label="search"
                    onClick={(e) => console.log("Click!")}
                    actionType="destructive"
                />
            </View>
            <View style={styles.row}>
                <IconButton
                    {...args}
                    icon={minusCircle}
                    onClick={() => {}}
                    actionType="neutral"
                />
                <IconButton
                    {...args}
                    icon={minusCircle}
                    onClick={() => {}}
                    kind="secondary"
                    actionType="neutral"
                />
                <IconButton
                    {...args}
                    icon={minusCircle}
                    onClick={() => {}}
                    kind="tertiary"
                    actionType="neutral"
                />
                <IconButton
                    {...args}
                    disabled={true}
                    icon={minusCircle}
                    aria-label="search"
                    onClick={(e) => console.log("Click!")}
                    actionType="neutral"
                />
            </View>
        </View>
    ),
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

/**
 * Icon Buttons do client-side navigation by default, if React Router exists:
 */
export const WithRouter: StoryComponentType = {
    name: "Navigation with React Router",
    render: () => (
        <MemoryRouter>
            <CompatRouter>
                <View style={styles.row}>
                    <IconButton
                        href="/foo"
                        icon={caretRight}
                        onClick={() => console.log("Click!")}
                        aria-label="Navigate to /foo using React Router"
                    />
                    <IconButton
                        href="https://www.khanacademy.org"
                        target="_blank"
                        icon={externalLinkIcon}
                        onClick={() => console.log("Click!")}
                        aria-label="Skip client navigation"
                        skipClientNav
                    />
                    <Routes>
                        <Route
                            path="/foo"
                            element={<View id="foo">Hello, world!</View>}
                        />
                    </Routes>
                </View>
            </CompatRouter>
        </MemoryRouter>
    ),
};

/**
 * If the button is inside a form, you can use the `type="submit"` prop, so the
 * form will be submitted on click or by pressing `Enter`.
 */
export const SubmittingForms: StoryComponentType = {
    name: "Submitting forms",
    render: () => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                console.log("form submitted");
                action("form submitted")(e);
            }}
        >
            <View style={styles.row}>
                <LabelMedium tag="label" style={styles.row}>
                    Search:{" "}
                    <TextField
                        id="foo"
                        value="press the button"
                        onChange={() => {}}
                    />
                </LabelMedium>
                <IconButton
                    icon={magnifyingGlass}
                    aria-label="Search"
                    type="submit"
                />
            </View>
        </form>
    ),
    parameters: {
        chromatic: {
            // We are testing the form submission, not UI changes.
            disableSnapshot: true,
        },
    },
};

/**
 * For non-Phosphor icons, you can use the Wonder Blocks Icon component to wrap
 * the custom icon.
 *
 * Note: The IconButton component will handle the sizing for the icon.
 */
export const WithCustomIcon: StoryComponentType = {
    render: (args) => (
        <IconButton
            {...args}
            icon={
                <Icon>
                    <img src="logo.svg" alt="" />
                </Icon>
            }
            aria-label="Wonder Blocks"
            onClick={(e) => action("clicked")(e)}
        />
    ),
    args: {
        kind: "secondary",
    },
};

const styles = StyleSheet.create({
    arrowsWrapper: {
        flexDirection: "row",
        gap: spacing.medium_16,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        gap: spacing.medium_16,
        alignItems: "center",
    },
    label: {
        width: spacing.xxxLarge_64,
    },
});
