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
     * One of our named icons from icon-assets.js
     */
    icon: React.ReactElement<PhosphorIcon>;
    /**
     * One of `small` (16px), `medium` (24px), `large` (48px),
     * or `xlarge` (96px).
     */
    size?: IconSize;
    /**
     * Styles that can be processed by `addStyle` — bare style objects,
     * Aphrodite style objects, or arrays thereof.
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
 *
 * ```js
 * import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
 *
 * <Icon
 *     icon={icons.search}
 *     color={Color.white}
 *     size="medium"
 *     style={{margin: 4}}
 * />
 * ```
 *
 * Wonder Blocks comes with a fixed set of icons available by importing `icons`,
 * but you can also provide your own `IconAsset`.
 *
 * ```js
 * import Icon from "@khanacademy/wonder-blocks-icon";
 * import type {IconAsset} from "@khanacademy/wonder-blocks-icon";
 *
 * // Easter egg: what shape am I?
 * const customIcon: IconAsset = {
 *     small: "M6.92820 0L13.85640 4L13.85640 12L6.92820 16L0 12L0 4Z",
 * };
 * ```
 *
 * `IconAsset` should be in the following format:
 * ```js
 * {small?: string, medium?: string, large?: string, xlarge?: string}
 * ```
 *
 * These icons should fit into a viewport of 16, 24, 48, and 96 pixels,
 * respectively.
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
        ...sharedProps
    } = props;

    const pixelSize = viewportPixelsForSize(size);

    const classNames = css(styles.svg, style) + " " + className;

    return React.cloneElement(icon, {
        ...sharedProps,
        className: classNames,
        // style,
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
