import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {
    border,
    color,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";

import {CellMeasurements, getHorizontalRuleStyles} from "./common";

import type {CellProps} from "../../util/types";

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
        <>
            <View
                style={[
                    styles.accessory,
                    disabled && styles.accessoryDisabled,
                    {...leftAccessoryStyle},
                ]}
            >
                {leftAccessory}
            </View>
            <Strut size={CellMeasurements.accessoryHorizontalSpacing} />
        </>
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
        <>
            <Strut size={CellMeasurements.accessoryHorizontalSpacing} />
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
        </>
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
        horizontalRule = "inset",
        contentStyle = undefined,
        leftAccessory = undefined,
        leftAccessoryStyle = undefined,
        rightAccessory = undefined,
        rightAccessoryStyle = undefined,
        style,
        testId,
        innerStyle,
    } = props;
    const horizontalRuleStyles = getHorizontalRuleStyles(horizontalRule);

    return (
        <View
            style={[
                styles.innerWrapper,
                innerStyle,
                // custom styles
                style,
                horizontalRuleStyles,
                active && styles.activeInnerWrapper,
            ]}
            // Set className so we can set styles on the inner wrapper directly
            // when the clickable element is pressed
            className="inner-wrapper"
        >
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
        </View>
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
    } = props;

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
            style={[styles.wrapper, rootStyle, active && styles.active]}
            aria-current={active ? "true" : undefined}
            role={role}
        >
            <CellInner {...props} />
        </View>
    );
};

const cellTokens = {
    default: {
        background: semanticColor.surface.primary,
        foreground: semanticColor.text.primary,
    },
    hover: {
        background: color.fadedBlue8,
    },
    press: {
        background: color.fadedBlue8,
        border: semanticColor.surface.emphasis,
    },
    selected: {
        background: color.fadedBlue8,
        foreground: color.activeBlue,
        border: semanticColor.surface.emphasis,
    },
};

const styles = StyleSheet.create({
    wrapper: {
        background: cellTokens.default.background,
        color: cellTokens.default.foreground,
        display: "flex",
        minHeight: CellMeasurements.cellMinHeight,
        textAlign: "left",
        width: "100%",
    },

    innerWrapper: {
        minHeight: CellMeasurements.cellMinHeight,
        padding: `${CellMeasurements.cellPadding.paddingVertical}px ${CellMeasurements.cellPadding.paddingHorizontal}px`,
        flexDirection: "row",
        flex: 1,
        borderRadius: "inherit",
        // Hide overflow so that if custom styling applies a border radius, the
        // left visual indicator for press/active states does not overflow
        overflow: "hidden",
        // Make sure inner wrapper is always the same height as parent
        height: "100%",

        // Reduce the padding of the innerWrapper when the focus ring is
        // visible.
        ":focus-visible": {
            padding: `${CellMeasurements.cellPadding.paddingVertical - 2}px ${
                CellMeasurements.cellPadding.paddingHorizontal - 2
            }px`,
        },
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
            width: border.width.thick,
            backgroundColor: cellTokens.selected.border,
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

    accessoryRight: {
        // The right accessory will have this color by default. Unless the
        // accessory element overrides that color internally.
        color: semanticColor.icon.primary,
    },

    /**
     * States
     */
    clickable: {
        outline: "none",
        /**
         * States
         */
        // disabled
        // NOTE: We use `aria-disabled` instead of `disabled` because we want
        // to allow the cell to be focusable even when it's disabled.
        [":hover[aria-disabled=true]" as any]: {
            cursor: "not-allowed",
        },

        // focus (only visible when using keyboard navigation)
        ":focus-visible": {
            borderRadius: spacing.xxxSmall_4,
            // To hide the internal corners of the cell.
            overflow: "hidden",
            // To display the focus ring based on the cell's border.
            position: "relative",
        },
        // NOTE: We use a pseudo element to draw the focus ring because we can't
        // use `outline` since it conflicts with different layout contexts (e.g.
        // `View` elements add their own z-index).
        [":focus-visible:after" as any]: {
            content: "''",
            // Since we are using a pseudo element, we need to manually
            // calculate the width/height and use absolute position to
            // prevent other elements from being shifted around.
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            // We remove the border width from the width/height to ensure
            // that the focus ring is drawn inside the cell.
            width: `calc(100% - ${spacing.xxxSmall_4}px)`,
            height: `calc(100% - ${spacing.xxxSmall_4}px)`,
            border: `${spacing.xxxxSmall_2}px solid ${semanticColor.focus.outer}`,
            borderRadius: spacing.xxxSmall_4,
        },
        [":focus-visible[aria-disabled=true]:after" as any]: {
            borderColor: semanticColor.focus.outer,
        },

        // hover + enabled
        [":hover[aria-disabled=false]" as any]: {
            background: cellTokens.hover.background,
        },

        // pressed + enabled
        [":active[aria-disabled=false]" as any]: {
            background: cellTokens.press.background,
        },
        // press + enabled + not currently selected (active prop: false)
        // Using the first child to apply the left bar indicator on the pressed
        // state because setting the styles on the clickable element
        // directly causes issues since overflow must be hidden for cases where
        // the border is rounded
        [":active[aria-disabled=false]:not([aria-current=true]) > *:first-child" as any]:
            {
                position: "relative",
                ":before": {
                    // Styles for the left bar indicator
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: border.width.thin,
                    backgroundColor: cellTokens.press.border,
                },
            },
        },
        // press + enabled + not currently selected (active prop: false)
        // We apply the left bar indicator styles on the inner-wrapper element
        // instead of the clickable element directly because we need to hide the
        // left bar overflow when custom cell styles apply a border-radius. We
        // have overflow: hidden on the inner wrapper instead of the clickable element
        // because setting it on the clickable element causes issues with existing
        // cases.
        [":active[aria-disabled=false]:not([aria-current=true]) .inner-wrapper" as any]:
            {
                position: "relative",
                ":before": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: border.width.thin,
                    backgroundColor: semanticColor.surface.emphasis,
                },
            },
    },

    active: {
        background: cellTokens.selected.background,
        color: cellTokens.selected.foreground,
        cursor: "default",
    },

    disabled: {
        color: semanticColor.text.disabled,
        ":focus-visible": {
            // Prevent the focus ring from being displayed when the cell is
            // disabled.
            outline: "none",
        },
    },

    accessoryActive: {
        color: semanticColor.icon.action,
    },

    accessoryDisabled: {
        color: semanticColor.icon.disabled,
    },
});

export default CellCore;
