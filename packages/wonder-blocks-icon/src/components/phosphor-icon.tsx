import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

// import type {IconNames} from "./phosphor-catalog";

import type {IconSize} from "../util/icon-assets";
import {viewportPixelsForSize} from "../util/icon-util";

const StyledIcon = addStyle("img");

type Props = AriaProps & {
    /**
     * The color of the icon. Will default to `currentColor`, which means that
     * it will take on the CSS `color` value from the parent element.
     */
    color?: string;
    /**
     * The icon to display. This is a string that corresponds to the name of
     * the icon in the catalog.
     */
    // icon: IconNames;
    icon: string;
    /**
     * One of `small` (16px), `medium` (24px), `large` (48px),
     * or `xlarge` (96px).
     */
    size?: IconSize;
    /**
     * Additional styles to apply to the icon.
     */
    style?: StyleType;
    /**
     * Adds CSS classes to the Icon.
     */
    className?: string;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

/**
 * An Icon displays a small informational or decorative image as an icon font
 * family.
 *
 * @see https://phosphoricons.com/
 * @see https://github.com/phosphor-icons/web
 */
const PhosphorIcon = React.forwardRef(function PhosphorIcon(
    props: Props,
    ref: React.ForwardedRef<HTMLImageElement>,
) {
    const {
        color = "currentColor",
        icon,
        size = "small",
        style,
        testId,
        className,
        ...sharedProps
    } = props;

    const pixelSize = viewportPixelsForSize(size);
    const classNames = `${className ?? ""}`;

    return (
        <StyledIcon
            {...sharedProps}
            className={classNames}
            style={[styles.svg, {color: color}, {fontSize: pixelSize}, style]}
            data-test-id={testId}
            ref={ref}
            src={icon}
            width={pixelSize}
            height={pixelSize}
        />
    );
});

const styles = StyleSheet.create({
    svg: {
        display: "inline-block",
        verticalAlign: "text-bottom",
        flexShrink: 0,
        flexGrow: 0,
    },
});

export default PhosphorIcon;
