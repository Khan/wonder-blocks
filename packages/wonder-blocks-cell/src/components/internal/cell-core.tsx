import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color, {fade} from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

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
        children,
        disabled,
        href,
        horizontalRule = "inset",
        leftAccessory = undefined,
        leftAccessoryStyle = undefined,
        onClick,
        rightAccessory = undefined,
        rightAccessoryStyle = undefined,
        style,
        testId,
        "aria-label": ariaLabel,
        innerStyle,
        target,
    } = props;

    const renderCell = (): React.ReactElement => {
        const horizontalRuleStyles = getHorizontalRuleStyles(horizontalRule);

        return (
            <View
                style={[
                    styles.innerWrapper,
                    innerStyle,
                    // custom styles
                    style,
                    horizontalRuleStyles,
                ]}
                className="cell-core-inner-wrapper"
            >
                {/* Left accessory */}
                <LeftAccessory
                    leftAccessory={leftAccessory}
                    leftAccessoryStyle={leftAccessoryStyle}
                    disabled={disabled}
                />

                {/* Cell contents */}
                <View style={styles.content} testId={testId}>
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
    };

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
                target={target}
                style={[
                    styles.wrapper,
                    styles.clickable,
                    active && styles.active,
                    disabled && styles.disabled,
                ]}
                aria-current={active ? "true" : undefined}
            >
                {() => renderCell()}
            </Clickable>
        );
    }

    // No click event attached, so just render the cell as-is.
    return (
        <View
            style={[styles.wrapper, active && styles.active]}
            aria-current={active ? "true" : undefined}
        >
            {renderCell()}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        background: Color.white,
        color: Color.offBlack,
        // minHeight: CellMeasurements.cellMinHeight,
        textAlign: "left",
    },

    innerWrapper: {
        // minHeight: CellMeasurements.cellMinHeight,
        padding: `${CellMeasurements.cellPadding.paddingVertical}px ${CellMeasurements.cellPadding.paddingHorizontal}px`,
        flexDirection: "row",
        flex: 1,
        height: "100%",

        // Reduce the padding of the innerWrapper when the focus ring is
        // visible.
        ":focus-visible": {
            padding: `${CellMeasurements.cellPadding.paddingVertical - 2}px ${
                CellMeasurements.cellPadding.paddingHorizontal - 2
            }px`,
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
        color: Color.offBlack64,
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
        [":hover[aria-disabled=true]" as any]: {
            cursor: "not-allowed",
        },

        // focus (only visible when using keyboard navigation)
        ":focus-visible": {
            borderRadius: Spacing.xxxSmall_4,
            // To hide the internal corners of the cell.
            overflow: "hidden",
            // To display the focus ring based on the cell's border.
            position: "relative",
        },
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
            width: `calc(100% - ${Spacing.xxxSmall_4}px)`,
            height: `calc(100% - ${Spacing.xxxSmall_4}px)`,
            border: `${Spacing.xxxxSmall_2}px solid ${Color.blue}`,
            borderRadius: Spacing.xxxSmall_4,
        },

        // hover + enabled
        [":hover[aria-disabled=false]" as any]: {
            background: Color.offBlack8,
        },

        // pressed + enabled
        [":active[aria-disabled=false]" as any]: {
            background: Color.offBlack16,
        },
    },

    active: {
        background: fade(Color.blue, 0.08),
        color: Color.blue,

        [":hover[aria-disabled=false]" as any]: {
            background: fade(Color.blue, 0.16),
        },

        [":active[aria-disabled=false]" as any]: {
            background: fade(Color.blue, 0.24),
        },
    },

    disabled: {
        color: Color.offBlack32,
    },

    accessoryActive: {
        color: Color.blue,
    },

    accessoryDisabled: {
        color: Color.offBlack,
        opacity: 0.32,
    },
});

export default CellCore;
