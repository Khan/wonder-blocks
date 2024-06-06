import * as React from "react";

import {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import {css, cx} from "@/styled-system/css";
import {SystemStyleObject} from "@/styled-system/types";
import {viewportPixelsForSize} from "../util/icon-util";
import {IconSize, PhosphorIconAsset} from "../types";

// We use a span instead of an img because we want to use the mask-image CSS
// property.
const StyledIcon = "span"; //addStyle("span");

type Props = Pick<AriaProps, "aria-hidden" | "aria-label" | "role"> & {
    /**
     * The color of the icon. Will default to `currentColor`, which means that
     * it will take on the CSS `color` value from the parent element.
     */
    color?: string;
    /**
     * Additional styles to apply to the icon.
     */
    style?: StyleType;
    /**
     * Adds CSS classes to the Icon.
     */
    className?: string;

    /**
     * The role of the icon.
     * @see https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24
     */
    role?: "img";

    /**
     * Size of the icon. One of `small` (16), `medium` (24), `large` (48), or
     * `xlarge` (96). Defaults to `small`.
     */
    size?: IconSize;

    /**
     * Test ID used for e2e testing.
     */
    testId?: string;

    /**
     * The icon to display. This is a reference to the icon asset (imported as a
     * static SVG file).
     *
     * It supports the following types:
     * - `PhosphorIconAsset`: a reference to a Phosphor SVG asset.
     * - `string`: an import referencing an arbitrary SVG file.
     */
    icon: PhosphorIconAsset | string;
};

/**
 * A `PhosphorIcon` displays a small informational or decorative image as an
 * HTML element that renders a Phosphor Icon SVG available from the
 * `@phosphor-icons/core` package.
 *
 * For more information about the icons catalog, check the [Phosphor Icons
 * website](https://phosphoricons.com/).
 *
 * ## Usage
 *
 * ```tsx
 * import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
 * import MagnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
 *
 * <PhosphorIcon
 *     icon={MagnifyingGlass}
 *     color={Color.blue}
 *     size="medium"
 *     style={{margin: Spacing.xxxxSmall_2}}
 * />
 * ```
 *
 * These icons should fit into a viewport of `16`, `24`, `48`, and `96` pixels,
 * respectively.
 */
export const PhosphorIcon = React.forwardRef(function PhosphorIcon(
    props: Props,
    ref: React.ForwardedRef<HTMLSpanElement>,
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

    const rawStyle = Array.isArray(style)
        ? css(...style)
        : typeof style === "object"
        ? css(style as SystemStyleObject)
        : undefined;

    return (
        <StyledIcon
            {...sharedProps}
            className={cx(styles.svg, styles.icon, rawStyle, className)}
            style={
                {
                    "--icon-color": color,
                    "--icon-size": `${pixelSize}px`,
                    "--icon-path": `url(${icon})`,
                } as React.CSSProperties
            }
            data-testid={testId}
            ref={ref}
        />
    );
});

const styles = {
    svg: css({
        display: "inline-block",
        verticalAlign: "text-bottom",
        flexShrink: 0,
        flexGrow: 0,
        maskSize: "100%",
        maskRepeat: "no-repeat",
        maskPosition: "center",
    }),
    icon: css({
        backgroundColor: "var(--icon-color)",
        width: "var(--icon-size)",
        height: "var(--icon-size)",
        // We still pass inline styles to the icon itself, so we
        // prevent the icon from being overridden by the inline
        // styles.
        maskImage: "var(--icon-path)",
    }),
};

PhosphorIcon.displayName = "PhosphorIcon";
