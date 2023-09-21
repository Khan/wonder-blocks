import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

// import type {IconNames} from "./phosphor-catalog";

import {viewportPixelsForSize} from "../util/icon-util";

const StyledIcon = addStyle("i");

type BaseProps = AriaProps & {
    /**
     * The color of the icon. Will default to `currentColor`, which means that
     * it will take on the CSS `color` value from the parent element.
     */
    color?: string;
    /**
     * The icon to display. This is a string that corresponds to the name of
     * the icon in the catalog.
     */
    // icon: string;
    /**
     * One of `small` (16px), `medium` (24px), `large` (48px),
     * or `xlarge` (96px).
     */
    // size?: IconSize;
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
type PropsByWeight =
    | {
          size?: "small";
          // eslint-disable-next-line no-undef
          icon: PhosphorBold | PhosphorFill;
      }
    | {
          size?: "medium";
          // eslint-disable-next-line no-undef
          icon: PhosphorRegular | PhosphorFill;
      }
    | {
          size?: "large" | "xlarge";
          // eslint-disable-next-line no-undef
          icon: PhosphorRegular | PhosphorBold | PhosphorFill;
      };

type Props = BaseProps & PropsByWeight;

/**
 * An Icon displays a small informational or decorative image as an icon font
 * family.
 *
 * @see https://phosphoricons.com/
 * @see https://github.com/phosphor-icons/web
 */
function PhosphorIconInner(props: Props, ref: React.ForwardedRef<HTMLElement>) {
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
}

// const PhosphorIcon = React.forwardRef(PhosphorIconInner) as <
//     T extends PhosphorWeight,
// >(
//     props: Props<T> & {ref?: React.ForwardedRef<HTMLElement>},
// ) => ReturnType<typeof PhosphorIconInner>;

const PhosphorIcon = React.forwardRef(PhosphorIconInner);

const styles = StyleSheet.create({
    svg: {
        display: "inline-block",
        verticalAlign: "text-bottom",
        flexShrink: 0,
        flexGrow: 0,
    },
});

export default PhosphorIcon;
