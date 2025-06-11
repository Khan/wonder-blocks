import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";

import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {getHorizontalRuleStyles} from "./common";

import type {CellProps} from "../../util/types";
import theme from "../../theme";

type LeftAccessoryProps = {
    leftAccessory?: CellProps["leftAccessory"];
    leftAccessoryStyle?: CellProps["leftAccessoryStyle"];
    disabled?: CellProps["disabled"];
};

/**
 * Left Accessories can be defined using WB components such as Icon, IconButton,
 * or it can even be used for a custom node/component if needed.
 */
const LeftAccessory = ({
    leftAccessory,
    leftAccessoryStyle,
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
                {...leftAccessoryStyle},
            ]}
        >
            {leftAccessory}
        </View>
    );
};

type RightAccessoryProps = {
    rightAccessory?: CellProps["rightAccessory"];
    rightAccessoryStyle?: CellProps["rightAccessoryStyle"];
    active?: CellProps["active"];
    disabled?: CellProps["disabled"];
};

/**
 * Right Accessories can be defined using WB components such as Icon,
 * IconButton, or it can even be used for a custom node/component if needed.
 */
const RightAccessory = ({
    rightAccessory,
    rightAccessoryStyle,
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
                {...rightAccessoryStyle},
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
        leftAccessoryStyle = undefined,
        rightAccessory = undefined,
        rightAccessoryStyle = undefined,
        testId,
    } = props;
    // const horizontalRuleStyles = getHorizontalRuleStyles(horizontalRule);

    return (
        // <View
        //     style={[
        //         styles.innerWrapper,
        //         innerStyle,
        //         // custom styles
        //         style,
        //         horizontalRuleStyles,
        //         active && styles.activeInnerWrapper,
        //     ]}
        //     // Set className so we can set styles on the inner wrapper directly
        //     // when the clickable element is pressed
        //     className="inner-wrapper"
        // >
        <>
            {/* Left accessory */}
            <LeftAccessory
                leftAccessory={leftAccessory}
                leftAccessoryStyle={leftAccessoryStyle}
                disabled={disabled}
            />

            {/* Cell contents */}
            <View style={[styles.content, contentStyle]} testId={testId}>
                {children}
            </View>

            {/* Right accessory */}
            <RightAccessory
                rightAccessory={rightAccessory}
                rightAccessoryStyle={rightAccessoryStyle}
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
        rootStyle,

        horizontalRule = "inset",
        style,
        innerStyle,
    } = props;

    const horizontalRuleStyles = getHorizontalRuleStyles(horizontalRule);

    const innerStyles = [
        styles.innerWrapper,
        innerStyle,
        // custom styles
        style,
        horizontalRuleStyles,
        active && styles.activeInnerWrapper,
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
                    styles.wrapper,
                    styles.clickable,
                    rootStyle,
                    active && styles.active,
                    disabled && styles.disabled,
                    innerStyles,
                ]}
                aria-current={active ? "true" : undefined}
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
                styles.wrapper,
                rootStyle,
                active && styles.active,
                innerStyles,
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
        background: semanticColor.surface.primary,
        borderRadius: theme.root.border.radius.default,
        color: semanticColor.core.foreground.neutral.strong,
        display: "flex",
        minHeight: theme.root.sizing.minHeight,
        overflow: "hidden",
        textAlign: "left",
        width: "100%",
    },

    innerWrapper: {
        minHeight: theme.root.sizing.minHeight,
        // The spacing between the left and right accessories.
        gap: theme.root.layout.gap.default,
        paddingBlock: theme.root.layout.padding.block.default,
        paddingInline: theme.root.layout.padding.inline.default,
        flexDirection: "row",
        flex: 1,
        borderRadius: "inherit",
        // Hide overflow so that if custom styling applies a border radius, the
        // left visual indicator for press/active states does not overflow
        overflow: "hidden",
        // Make sure inner wrapper is always the same height as parent
        // height: "100%",

        // Reduce the padding of the innerWrapper when the focus ring is
        // visible.
        // ":focus-visible": {
        //     paddingBlock: `calc(${theme.root.layout.padding.block.default} - ${theme.root.border.width.default})`,
        //     paddingInline: `calc(${theme.root.layout.padding.inline.default} - ${theme.root.border.width.default})`,
        // },
    },
    activeInnerWrapper: {
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
        outline: "none",
        zIndex: "unset",
        /**
         * States
         */

        // focus (only visible when using keyboard navigation)
        ":focus-visible": {
            borderRadius: theme.root.border.radius.focus,
            outline: focusStyles.focus[":focus-visible"].outline,
            outlineOffset: -2,
            // boxShadow: `inset 0 0 0 ${theme.root.border.width.default} red`,
            // To hide the internal corners of the cell.
            overflow: "hidden",
            // To display the focus ring based on the cell's border.
            position: "relative",
            // zIndex: 100,

            ":after": {
                content: "unset",
            },
        },
        // // NOTE: We use a pseudo element to draw the focus ring because we can't
        // // use `outline` since it conflicts with different layout contexts (e.g.
        // // `View` elements add their own z-index).
        // [":focus-visible:after" as any]: {
        //     content: "''",
        //     // Since we are using a pseudo element, we need to manually
        //     // calculate the width/height and use absolute position to
        //     // prevent other elements from being shifted around.
        //     position: "absolute",
        //     top: 0,
        //     left: 0,
        //     zIndex: 1,
        //     // We remove the border width from the width/height to ensure
        //     // that the focus ring is drawn inside the cell.
        //     width: `calc(100% - ${theme.root.border.width.default} * 2)`,
        //     height: `calc(100% - ${theme.root.border.width.default} * 2)`,
        //     border: `${theme.root.border.width.default} solid ${semanticColor.focus.outer}`,
        //     borderRadius: theme.root.border.radius.focus,
        // },
        // [":focus-visible:active:after" as any]: {
        //     // When the cell is pressed, we want to change the focus ring
        //     // to match the pressed state.
        //     // borderRadius: theme.root.border.radius.pressFocus,
        // },

        ":hover": {
            background: semanticColor.core.background.instructive.subtle,
        },
        ":active": {
            background: semanticColor.core.background.instructive.subtle,
            borderRadius: theme.root.border.radius.press,
        },
        // press + enabled + not currently selected (active prop: false)
        // We apply the left bar indicator styles on the inner-wrapper element
        // instead of the clickable element directly because we need to hide the
        // left bar overflow when custom cell styles apply a border-radius. We
        // have overflow: hidden on the inner wrapper instead of the clickable element
        // because setting it on the clickable element causes issues with existing
        // cases.
        [":active[aria-disabled=false]:not([aria-current=true])" as any]: {
            position: "relative",
            ":before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: theme.root.border.width.default,
                // We use the border token as this element acts like a
                // border when the cell is pressed.
                backgroundColor: theme.root.color.press.border,
            },
        },
    },

    active: {
        background: semanticColor.core.background.instructive.subtle,
        color: theme.root.color.selected.foreground,
        cursor: "default",
    },

    disabled: {
        background: semanticColor.surface.primary,
        borderRadius: theme.root.border.radius.default,
        color: semanticColor.core.foreground.inverse.subtle,
        ":hover": {
            background: semanticColor.surface.primary,
            cursor: "not-allowed",
        },
        ":focus-visible": {
            // Prevent the focus ring from being displayed when the cell is
            // disabled.
            outline: "none",
        },
        ":active": {
            background: semanticColor.surface.primary,
            borderRadius: theme.root.border.radius.default,
        },
        // [".inner-wrapper" as any]: {
        //     ":before": {
        //         // Prevent the left bar indicator from being displayed when the
        //         // cell is disabled.
        //         content: "none",
        //     },
        // },
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
