import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import {viewportPixelsForSize} from "../util/icon-util";
import {PhosphorIconAsset} from "../types";

// We use a span instead of an img because we want to use the mask-image CSS
// property.
const StyledIcon = addStyle("span");

type Props = Pick<AriaProps, "aria-hidden" | "aria-label"> & {
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
     * Test ID used for e2e testing.
     */
    testId?: string;

    size?: "small" | "medium" | "large" | "xlarge";

    /**
     * The icon to display. This is a reference to the icon asset
     * (imported as a static SVG file).
     */
    icon: PhosphorIconAsset;
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
    const classNames = `${className ?? ""}`;

    return (
        <StyledIcon
            {...sharedProps}
            className={classNames}
            style={[
                styles.svg,
                {
                    maskImage: `url(${icon})`,
                    maskSize: "100%",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    backgroundColor: color,
                    width: pixelSize,
                    height: pixelSize,
                },
                style,
            ]}
            data-test-id={testId}
            ref={ref}
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

PhosphorIcon.displayName = "PhosphorIcon";
