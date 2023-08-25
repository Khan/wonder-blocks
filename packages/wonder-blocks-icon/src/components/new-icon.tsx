import * as React from "react";
import {StyleSheet, css, CSSProperties, Falsy} from "aphrodite";
import {Icon} from "@phosphor-icons/react";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";

import type {IconSize} from "../util/icon-assets";
import {viewportPixelsForSize} from "../util/icon-util";

export type PhosphorIcon = Icon;

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
    icon: React.ReactElement<PhosphorIcon>;
    /**
     * One of `small` (16px), `medium` (24px), `large` (48px),
     * or `xlarge` (96px).
     */
    size?: IconSize;
    /**
     * Additional styles to apply to the icon.
     */
    style?: CSSProperties | Falsy;
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
const NewIcon = React.forwardRef(function NewIcon(
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
    } = props;

    const pixelSize = viewportPixelsForSize(size);

    const classNames = css(styles.svg) + " " + className;

    return React.cloneElement(icon, {
        className: classNames,
        style,
        "data-test-id": testId,
        weights: ["bold"],
        ref: ref,
        ...icon.props,
        color,
        size: pixelSize,
    } as Partial<Icon>);
});

const styles = StyleSheet.create({
    svg: {
        display: "inline-block",
        verticalAlign: "text-bottom",
        flexShrink: 0,
        flexGrow: 0,
    },
});

export default NewIcon;
