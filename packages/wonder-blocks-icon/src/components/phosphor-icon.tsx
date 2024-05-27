import * as React from "react";
// import {StyleSheet} from "aphrodite";

import {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import {cx} from "class-variance-authority";
import {viewportPixelsForSize} from "../util/icon-util";
import {IconSize, PhosphorIconAsset} from "../types";

import styles from "./phosphor-icon.module.css";

// We use a span instead of an img because we want to use the mask-image CSS
// property.
// const StyledIcon = addStyle("span");
const StyledIcon = "span";

type Props = Pick<AriaProps, "aria-hidden" | "aria-label" | "role"> & {
    /**
     * The color of the icon. Will default to `currentColor`, which means that
     * it will take on the CSS `color` value from the parent element.
     */
    color?: string;
    /**
     * Additional styles to apply to the icon.
     */
    style?: StyleType | string;
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
    const classNames = cx(styles.svg, styles.icon, className, style);
    // const iconStyles = _generateStyles(color, pixelSize);

    return (
        <StyledIcon
            {...sharedProps}
            className={classNames}
            style={
                {
                    "--i-mask-image": `url(${icon})`,
                    "--i-size": `${pixelSize}px`,
                    "--i-background-color": color,
                } as React.CSSProperties
            }
            data-testid={testId}
            ref={ref}
        />
    );
});

// const dynamicStyles: Record<string, any> = {};

/**
 * Generates the visual styles for the icon.
 */
// const _generateStyles = (color: string, size: number) => {
//     const iconStyle = `${color}-${size}`;
//     // The styles are cached to avoid creating a new object on every render.
//     if (styles[iconStyle]) {
//         return styles[iconStyle];
//     }

//     const newStyles: Record<string, any> = {
//         icon: {
//             backgroundColor: color,
//             width: size,
//             height: size,
//         },
//     };

//     dynamicStyles[iconStyle] = StyleSheet.create(newStyles);
//     return dynamicStyles[iconStyle];
// };

// const styles = StyleSheet.create({
//     svg: {
//         display: "inline-block",
//         verticalAlign: "text-bottom",
//         flexShrink: 0,
//         flexGrow: 0,
//         maskSize: "100%",
//         maskRepeat: "no-repeat",
//         maskPosition: "center",
//     },
// });

PhosphorIcon.displayName = "PhosphorIcon";
