import * as React from "react";
import {StyleSheet} from "aphrodite";
import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import {IconSize, PhosphorIconAsset} from "../types";
import {resolveMirrorInRtl} from "../util/directional-icons";

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

    /**
     * Whether to mirror this icon's glyph in right-to-left content, overriding
     * the directional allowlist.
     *
     * - `true`: mirror even if the icon is not allowlisted (e.g. a custom
     *   directional SVG).
     * - `false`: do not mirror even if the icon is allowlisted.
     * - omitted: use the allowlist.
     */
    mirrorInRtl?: boolean;
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
 *
 * ## Right-to-left
 *
 * Directional glyphs (arrows, carets, and similar) are mirrored automatically
 * in RTL via a central allowlist. Pass the LTR-facing icon — do not swap icons
 * based on `isRtl`. Use `mirrorInRtl` to override the allowlist per call site.
 * See the PhosphorIcon RTL Mirroring docs for the list.
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
        mirrorInRtl,
        ...sharedProps
    } = props;

    const sizeStyles = getSize(size);
    const classNames = `${className ?? ""}`;
    const shouldMirror = resolveMirrorInRtl(icon, mirrorInRtl);

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
                },
                shouldMirror && styles.mirroredInRtl,
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

const styles = StyleSheet.create({
    svg: {
        display: "inline-block",
        verticalAlign: "text-bottom",
        flexShrink: 0,
        flexGrow: 0,
        maskSize: "100%",
        maskRepeat: "no-repeat",
        maskPosition: "center",
    },
    /**
     * Mirrors the glyph in RTL. Uses `:dir()` (not JS) so portal-rendered icons
     * stay correct. Aphrodite's types omit `:dir()`, hence the cast.
     */
    mirroredInRtl: {
        [":dir(rtl)" as string]: {
            transform: "scaleX(-1)",
        },
    },
    small: {
        width: sizing.size_160,
        height: sizing.size_160,
    },
    medium: {
        width: sizing.size_240,
        height: sizing.size_240,
    },
    large: {
        width: sizing.size_480,
        height: sizing.size_480,
    },
    xlarge: {
        width: sizing.size_960,
        height: sizing.size_960,
    },
});

PhosphorIcon.displayName = "PhosphorIcon";
