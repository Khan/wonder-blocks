import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import {viewportPixelsForSize} from "../util/icon-util";

// We use a span instead of an img because we want to use the mask-image CSS
// property.
const StyledIcon = addStyle("span");

type CommonProps = Pick<AriaProps, "aria-hidden" | "aria-label"> & {
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
};

// Define icon size by icon weight
type Props =
    | (CommonProps & {
          /**
           * The icon size (16px).
           */
          size?: "small";
          /**
           * The icon to display. This is a reference to the icon asset
           * (imported as a static SVG file).
           * __NOTE:__ small icons only support `bold` and `fill` weights.
           */
          icon: PhosphorBold | PhosphorFill;
      })
    | (CommonProps & {
          /**
           * The icon size (24px).
           */
          size?: "medium";
          /**
           * The icon to display. This is a reference to the icon asset
           * (imported as a static SVG file).
           * __NOTE:__ medium icons only support `regular` and `fill` weights.
           */
          icon: PhosphorRegular | PhosphorFill;
      })
    | (CommonProps & {
          /**
           * The icon size (48px).
           */
          size?: "large";
          /**
           * The icon to display. This is a reference to the icon asset
           * (imported as a static SVG file).
           */
          icon: PhosphorRegular | PhosphorBold | PhosphorFill;
      })
    | (CommonProps & {
          /**
           * The icon size (96px).
           */
          size?: "xlarge";
          /**
           * The icon to display. This is a reference to the icon asset
           * (imported as a static SVG file).
           */
          icon: PhosphorRegular | PhosphorBold | PhosphorFill;
      });

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
 * ```js
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
const PhosphorIcon = React.forwardRef(function PhosphorIcon(
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

export default PhosphorIcon;
