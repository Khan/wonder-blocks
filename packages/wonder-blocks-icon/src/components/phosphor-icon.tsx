import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Icon} from "@phosphor-icons/react";

import {AriaProps, StyleType, View} from "@khanacademy/wonder-blocks-core";

import type {IconSize} from "../util/icon-assets";
import {viewportPixelsForSize} from "../util/icon-util";
import {processStyleList} from "../../../wonder-blocks-core/src/util/util";

export type PhosphorIcon = Icon;

type IconElement =
    | React.ReactElement<PhosphorIcon>
    | Array<React.ReactElement<PhosphorIcon>>;

type Props = AriaProps & {
    /**
     * The color of the icon. Will default to `currentColor`, which means that
     * it will take on the CSS `color` value from the parent element.
     */
    color?: string;
    /**
     * The icon to display. This is a React element that renders a Phosphor icon
     * component.
     */
    icon: IconElement;
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
 * An Icon displays a small informational or decorative image as an SVG.
 */
const PhosphorIcon = React.forwardRef(function PhosphorIcon(
    props: Props,
    ref: React.ForwardedRef<SVGSVGElement>,
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

    const styleAttributes = processStyleList([styles.svg, style]);

    const classNames = styleAttributes.className + " " + className;

    const renderIcon = (icon: React.ReactElement<PhosphorIcon>) => {
        return React.cloneElement(icon, {
            ...sharedProps,
            className: classNames,
            style: styleAttributes.style,
            "data-test-id": testId,
            weights: ["bold"],
            ref: ref,
            size: pixelSize,
            ...icon.props,
            color,
        } as Partial<Icon>);
    };

    if (Array.isArray(icon)) {
        return (
            <View style={styles.composed}>
                {icon.map((icon) => renderIcon(icon))}
            </View>
        );
    }

    return renderIcon(icon);
});

const styles = StyleSheet.create({
    svg: {
        display: "inline-block",
        verticalAlign: "text-bottom",
        flexShrink: 0,
        flexGrow: 0,
    },
    composed: {
        display: "inline-flex",
        position: "relative",
    },
});

export default PhosphorIcon;
