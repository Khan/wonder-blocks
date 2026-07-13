import * as React from "react";
import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import {IconSize, PhosphorIconAsset} from "../types";

import styles from "./phosphor-icon.module.css";

// We use a span instead of an img because we want to use the mask-image CSS
// property.
const StyledSpan = addStyle("span");

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
     * The role of the icon. Will default to `img` if an `aria-label` is
     * provided.
     * @see https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24
     */
    role?: "img";

    /**
     * Size of the icon. One of `small` (1.6rem), `medium` (2.4rem), `large` (4.8rem), or `xlarge` (9.6rem). Defaults to `small`.
     */
    size?: IconSize;

    /**
     * Test ID used for e2e testing.
     */
    testId?: string;

    /**
     * Set the tabindex attribute on the rendered element.
     */
    tabIndex?: 0 | -1;

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
 *     style={{margin: sizing.size_020}}
 * />
 * ```
 *
 * These icons use rem-based sizing from wonder-blocks-tokens:
 * - small: 1.6rem (16px)
 * - medium: 2.4rem (24px)
 * - large: 4.8rem (48px)
 * - xlarge: 9.6rem (96px)
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
        role,
        ...sharedProps
    } = props;

    const sizeStyles = getSize(size);
    const classNames = `${className ?? ""}`;

    return (
        <StyledSpan
            {...sharedProps}
            className={classNames}
            style={[
                styles.svg,
                sizeStyles,
                {
                    backgroundColor: color,
                    maskImage: `url(${icon})`,
                    // `mask-*` stays inline (routed through Aphrodite's vendor
                    // prefixer via `processStyleList`) since the CSS Modules
                    // pipeline has no autoprefixer. See `phosphor-icon.module.css`.
                    maskSize: "100%",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                },
                style,
            ]}
            data-testid={testId}
            ref={ref}
            role={(role ?? sharedProps["aria-label"]) ? "img" : undefined}
        />
    );
});

/**
 * Gets the size-specific styles for the icon.
 */

function getSize(size: IconSize) {
    switch (size) {
        case "small":
        default:
            return styles.small;
        case "medium":
            return styles.medium;
        case "large":
            return styles.large;
        case "xlarge":
            return styles.xlarge;
    }
}

PhosphorIcon.displayName = "PhosphorIcon";
