import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";

import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {getHorizontalRuleStyles} from "./common";

import type {CellProps} from "../../util/types";
import theme from "../../theme";

type LeftAccessoryProps = {
    leftAccessory?: CellProps["leftAccessory"];
    style?: StyleType;
    disabled?: CellProps["disabled"];
};

/**
 * Left Accessories can be defined using WB components such as Icon, IconButton,
 * or it can even be used for a custom node/component if needed.
 */
const LeftAccessory = ({
    leftAccessory,
    style,
    disabled,
}: LeftAccessoryProps): React.ReactElement => {
    if (!leftAccessory) {
        // @ts-expect-error [FEI-5019] - TS2322 - Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
        return null;
    }

    return (
        <View
            style={[
                styles.accessory,
                styles.accessoryLeft,
                disabled && styles.accessoryDisabled,
                {...style},
            ]}
        >
            {leftAccessory}
        </View>
    );
};

type RightAccessoryProps = {
    rightAccessory?: CellProps["rightAccessory"];
    style?: StyleType;
    active?: CellProps["active"];
    disabled?: CellProps["disabled"];
};

/**
 * Right Accessories can be defined using WB components such as Icon,
 * IconButton, or it can even be used for a custom node/component if needed.
 */
const RightAccessory = ({
    rightAccessory,
    style,
    active,
    disabled,
}: RightAccessoryProps): React.ReactElement => {
    if (!rightAccessory) {
        // @ts-expect-error [FEI-5019] - TS2322 - Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
        return null;
    }

    return (
        <View
            style={[
                styles.accessory,
                styles.accessoryRight,
                disabled && styles.accessoryDisabled,
                {...style},
                active && styles.accessoryActive,
            ]}
        >
            {rightAccessory}
        </View>
    );
};

/**
 * The Cell inner wrapper is the main container for the Cell contents. It
 * doesn't include the optional Clickable wrapper, which is added by the Cell
 * component.
 */
function CellInner(props: CellCoreProps): React.ReactElement {
    const {
        active,
        children,
        disabled,
        contentStyle = undefined,
        leftAccessory = undefined,
        rightAccessory = undefined,
        styles: stylesProp,
        testId,
    } = props;

    return (
        <>
            {/* Left accessory */}
            <LeftAccessory
                leftAccessory={leftAccessory}
                style={stylesProp?.leftAccessory}
                disabled={disabled}
            />

            {/* Cell contents */}
            <View
                style={[styles.content, contentStyle, stylesProp?.content]}
                testId={testId}
            >
                {children}
            </View>

            {/* Right accessory */}
            <RightAccessory
                rightAccessory={rightAccessory}
                style={stylesProp?.rightAccessory}
                active={active}
                disabled={disabled}
            />
        </>
    );
}

type CellCoreProps = Partial<Omit<CellProps, "title">> & {
    /**
     * The content of the cell.
     */
    children: React.ReactNode;

    /**
     * Optional custom styles applied to the content wrapper. For example, it
     * can be used to set a custom minWidth or a custom alignment.
     */
    contentStyle?: StyleType;

    /**
     * The optional styles applied to the inner wrapper.
     *
     * Note: This is not intended to be used externally, only used directly
     * within the package scope.
     */
    innerStyle?: StyleType;
};

/**
 * CellCore is the base cell wrapper. It's used as the skeleton/layout that is
 * used by CompactCell and DetailCell (and any other variants).
 *
 * Both variants share how they render their accessories, and the main
 * responsibility of this component is to render the contents that are passed in
 * (using the `children` prop).
 */
const CellCore = (props: CellCoreProps): React.ReactElement => {
    const {
        active,
        disabled,
        href,
        onClick,
        "aria-label": ariaLabel,
        "aria-selected": ariaSelected,
        "aria-checked": ariaChecked,
        target,
        role,
        tabIndex,

        horizontalRule = "inset",
        styles: stylesProp,
        innerStyle,
    } = props;

    const horizontalRuleStyles = getHorizontalRuleStyles(horizontalRule);

    const sharedStyles = [
        styles.wrapper,
        innerStyle,
        active && styles.active,
        horizontalRuleStyles,
    ];
    // Pressable cell.
    if (onClick || href) {
        return (
            // @ts-expect-error - TypeScript doesn't know that `target` can only be defined when `href` is.
            <Clickable
                disabled={disabled}
                onClick={onClick}
                href={href}
                hideDefaultFocusRing={true}
                aria-label={ariaLabel ? ariaLabel : undefined}
                aria-selected={ariaSelected ? ariaSelected : undefined}
                aria-checked={ariaChecked}
                role={role}
                target={target}
                style={[
                    sharedStyles,
                    styles.clickable,
                    disabled && styles.disabled,
                    // custom styles
                    stylesProp?.root,
                ]}
                aria-current={active ? "true" : undefined}
                tabIndex={tabIndex}
            >
                {() => <CellInner {...props} />}
            </Clickable>
        );
    }

    // No click event attached, so just render the cell without a Clickable
    // wrapper.
    return (
        <View
            style={[
                sharedStyles, // custom styles
                stylesProp?.root,
            ]}
            aria-current={active ? "true" : undefined}
            role={role}
        >
            <CellInner {...props} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        background: semanticColor.core.background.base.default,
        borderRadius: theme.root.border.radius.default,
        color: semanticColor.core.foreground.neutral.strong,
        minHeight: theme.root.sizing.minHeight,
        // Hide overflow so that if custom styling applies a border radius, the
        // left visual indicator for press/active states does not overflow
        overflow: "hidden",
        textAlign: "left",
        width: "100%",
        // layout
        // We need to specify flex as the wrapper can be a <View> or a
        // <Clickable> component.
        display: "flex",
        flex: 1,
        flexDirection: "row",
        // The spacing between the left and right accessories.
        gap: theme.root.layout.gap.default,
        paddingBlock: theme.root.layout.padding.block.default,
        paddingInline: theme.root.layout.padding.inline.default,
    },

    content: {
        alignSelf: "center",
        // Expand the content to fill the available space.
        flex: 1,
        overflowWrap: "break-word",
    },

    accessory: {
        // Use content width by default.
        minWidth: "auto",
        // Horizontal alignment of the accessory.
        alignItems: "center",
        // Vertical alignment.
        alignSelf: "center",
    },

    accessoryLeft: {
        color: theme.accessoryLeft.color.default.foreground,
    },

    accessoryRight: {
        // The right accessory will have this color by default. Unless the
        // accessory element overrides that color internally.
        color: theme.accessoryRight.color.default.foreground,
    },

    /**
     * States
     */
    clickable: {
        /**
         * States
         */
        ":hover": {
            background: semanticColor.core.background.instructive.subtle,
        },
        ":active": {
            background: semanticColor.core.background.instructive.subtle,
            borderRadius: theme.root.border.radius.press,
        },
        // focus (only visible when using keyboard navigation)
        ":focus-visible": {
            borderRadius: theme.root.border.radius.focus,
            outline: focusStyles.focus[":focus-visible"].outline,
            outlineOffset: `calc(${theme.root.border.width.default} * -1)`,
            // We need to use a thicker box-shadow to ensure that the inner ring
            // is visible when the cell is focused.
            boxShadow: `inset 0 0 0 calc(${border.width.medium}*2) ${semanticColor.focus.inner}`,
            // To hide the internal corners of the cell.
            overflow: "hidden",
            // To display the focus ring based on the cell's border.
            position: "relative",

            // Hide the left bar indicator when focused, so the focus ring
            // doesn't overlap with it.
            [":after" as any]: {
                content: "unset",
            },
        },
        [":focus-visible:active" as any]: {
            borderRadius: theme.root.border.radius.focusPress,
        },
        // press + enabled + not currently selected (active prop: false)
        [":active[aria-disabled=false]:not([aria-current=true])" as any]: {
            position: "relative",
            ":before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: theme.root.border.width.default,
                // We use the border token as this element acts like a border
                // when the cell is pressed.
                backgroundColor: theme.root.color.press.border,
            },
        },
    },

    active: {
        background: semanticColor.core.background.instructive.subtle,
        color: theme.root.color.selected.foreground,
        cursor: "default",
        position: "relative",
        ":before": {
            // Styles for the left bar indicator
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: theme.root.border.width.selected,
            backgroundColor: theme.root.color.selected.border,
        },
    },

    disabled: {
        background: semanticColor.core.background.base.default,
        borderRadius: theme.root.border.radius.default,
        color: theme.root.color.disabled.foreground,
        ":hover": {
            background: semanticColor.core.background.base.default,
            cursor: "not-allowed",
        },
        ":active": {
            background: semanticColor.core.background.base.default,
            borderRadius: theme.root.border.radius.default,
        },
        [":focus-visible:active" as any]: {
            borderRadius: theme.root.border.radius.default,
        },
    },

    accessoryActive: {
        color: theme.accessoryRight.color.selected.foreground,
    },

    accessoryDisabled: {
        color: theme.accessoryRight.color.disabled.foreground,
        opacity: 0.32,
    },
});

export default CellCore;
