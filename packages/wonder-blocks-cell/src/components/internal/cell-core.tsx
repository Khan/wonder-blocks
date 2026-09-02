import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";

import {getHorizontalRuleStyles} from "./common";

import type {CellProps} from "../../util/types";

import styles from "./cell-core.module.css";

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
                style,
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
                style,
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
        id,
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
                id={id}
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
            id={id}
        >
            <CellInner {...props} />
        </View>
    );
};

export default CellCore;
