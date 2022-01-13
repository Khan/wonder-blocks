// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color, {fade} from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {ClickableState} from "@khanacademy/wonder-blocks-clickable";
import {CellMeasurements, getHorizontalRuleStyles} from "./common.js";

import type {CellProps, TypographyText} from "../../util/types.js";

type LeftAccessoryProps = {|
    leftAccessory?: CellProps["leftAccessory"],
    leftAccessoryStyle?: CellProps["leftAccessoryStyle"],
    disabled?: CellProps["disabled"],
|};

/**
 * Left Accessories can be defined using WB components such as Icon, IconButton,
 * or it can even be used for a custom node/component if needed.
 */
const LeftAccessory = ({
    leftAccessory,
    leftAccessoryStyle,
    disabled,
}: LeftAccessoryProps): React.Node => {
    if (!leftAccessory) {
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

type RightAccessoryProps = {|
    rightAccessory?: CellProps["rightAccessory"],
    rightAccessoryStyle?: CellProps["rightAccessoryStyle"],
    active?: CellProps["active"],
    disabled?: CellProps["disabled"],
|};

/**
 * Right Accessories can be defined using WB components such as Icon,
 * IconButton, or it can even be used for a custom node/component if needed.
 */
const RightAccessory = ({
    rightAccessory,
    rightAccessoryStyle,
    active,
    disabled,
}: RightAccessoryProps): React.Node => {
    if (!rightAccessory) {
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

type CellCoreProps = {|
    ...$Rest<CellProps, {|title: TypographyText|}>,

    /**
     * The content of the cell.
     */
    children: React.Node,
|};

/**
 * CellCore is the base cell wrapper. It's used as the skeleton/layout that is
 * used by BasicCell and DetailCell (and any other variants).
 *
 * Both variants share how they render their accessories, and the main
 * responsibility of this component is to render the contents that are passed in
 * (using the `children` prop).
 */
const CellCore = (props: CellCoreProps): React.Node => {
    const {
        active,
        children,
        disabled,
        horizontalRule = "inset",
        leftAccessory = undefined,
        leftAccessoryStyle = undefined,
        onClick,
        rightAccessory = undefined,
        rightAccessoryStyle = undefined,
        style,
        testId,
        "aria-label": ariaLabel,
    } = props;

    const renderCell = (eventState?: ClickableState): React.Node => {
        const horizontalRuleStyles = getHorizontalRuleStyles(horizontalRule);

        return (
            <View
                style={[
                    styles.wrapper,
                    // focused applied to the main wrapper to make the border
                    // outline part of the wrapper
                    eventState?.focused && styles.focused,
                    // custom styles
                    style,
                ]}
                aria-current={active ? "true" : undefined}
            >
                <View
                    style={[
                        styles.innerWrapper,
                        horizontalRuleStyles,
                        disabled && styles.disabled,
                        active && styles.active,
                        // other states applied to the inner wrapper to blend
                        // the background color properly
                        !disabled && eventState?.hovered && styles.hovered,
                        // active + hovered
                        active && eventState?.hovered && styles.activeHovered,
                        !disabled && eventState?.pressed && styles.pressed,
                        // active + pressed
                        !disabled &&
                            active &&
                            eventState?.pressed &&
                            styles.activePressed,
                    ]}
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
            </View>
        );
    };

    // Pressable cell.
    if (onClick) {
        return (
            <Clickable
                disabled={disabled}
                onClick={onClick}
                hideDefaultFocusRing={true}
                aria-label={ariaLabel ? ariaLabel : undefined}
            >
                {(eventState) => renderCell(eventState)}
            </Clickable>
        );
    }

    // No click event attached, so just render the cell as-is.
    return renderCell();
};

const styles = StyleSheet.create({
    wrapper: {
        background: Color.white,
        color: Color.offBlack,
        minHeight: CellMeasurements.cellMinHeight,
        textAlign: "left",
    },

    innerWrapper: {
        padding: `${CellMeasurements.cellPadding.paddingVertical}px ${CellMeasurements.cellPadding.paddingHorizontal}px`,
        flexDirection: "row",
        flex: 1,
    },

    content: {
        alignSelf: "center",
        padding: `${CellMeasurements.contentVerticalSpacing}px 0`,
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
        // Align the right accessory to the right side of the cell, so we can
        // prevent the accessory from shifting left, if the content is too
        // short.
        marginLeft: "auto",
    },

    /**
     * States
     */
    hovered: {
        background: Color.offBlack8,
    },

    // Handling the focus ring internally because clickable doesn't support
    // rounded focus ring.
    focused: {
        borderRadius: Spacing.xxxSmall_4,
        outline: `solid ${Spacing.xxxxSmall_2}px ${Color.blue}`,
        // The focus ring is not visible when there are stacked cells.
        // Using outlineOffset to display the focus ring inside the cell.
        outlineOffset: -Spacing.xxxxSmall_2,
        // To hide the internal corners of the cell.
        overflow: "hidden",
    },

    pressed: {
        background: Color.offBlack16,
    },

    active: {
        background: fade(Color.blue, 0.08),
        color: Color.blue,
    },

    activeHovered: {
        background: fade(Color.blue, 0.16),
    },

    activePressed: {
        background: fade(Color.blue, 0.24),
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
