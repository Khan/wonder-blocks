// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {getPathForIcon, viewportPixelsForSize} from "../util/icon-util.js";

import type {IconAsset, IconSize} from "../util/icon-assets.js";

type Props = {|
    /**
     * Passed transparently to the SVG. If not provided, we assume the SVG is
     * purely decorative and it is invisible to screenreaders.
     */
    "aria-label"?: string,
    /**
     * The color of the icon. Will default to `currentColor`, which means that
     * it will take on the CSS `color` value from the parent element.
     */
    color?: string,
    /**
     * One of our named icons from icon-assets.js
     */
    icon: IconAsset,
    /**
     * One of `small` (16px), `medium` (24px), `large` (48px),
     * or `xlarge` (96px).
     */
    size: IconSize,
    /**
     * Styles that can be processed by `addStyle` — bare style objects,
     * Aphrodite style objects, or arrays thereof.
     */
    style?: StyleType,
|};

const StyledSVG = addStyle<React.ElementProps<"svg">>("svg");

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
export default class Icon extends React.PureComponent<Props> {
    static defaultProps = {
        color: "currentColor",
        size: "small",
    };

    render() {
        // There is a weird thing where Flow will only recognize a string-quoted
        // prop name if it's in single quotes, but our tooling normalizes it to
        // double-quotes on commit. So the aria-label prop isn't included in
        // props validation.
        // eslint-disable-next-line react/prop-types
        const {"aria-label": ariaLabel} = this.props;
        const {color, icon, size, style} = this.props;

        const {assetSize, path} = getPathForIcon(icon, size);
        const pixelSize = viewportPixelsForSize(size);
        const viewboxPixelSize = viewportPixelsForSize(assetSize);
        return (
            <StyledSVG
                style={[styles.svg, style]}
                width={pixelSize}
                height={pixelSize}
                aria-label={ariaLabel}
                viewBox={`0 0 ${viewboxPixelSize} ${viewboxPixelSize}`}
            >
                <path fill={color} d={path} />
            </StyledSVG>
        );
    }
}

const styles = StyleSheet.create({
    svg: {
        display: "inline-block",
        verticalAlign: "text-bottom",
        flexShrink: 0,
        flexGrow: 0,
    },
});
