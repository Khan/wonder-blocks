import * as React from "react";
import {StyleType} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon, PhosphorIconAsset} from "@khanacademy/wonder-blocks-icon";

import theme from "../theme/index";

/**
 * Returns the phosphor icon component based on the size. This is necessary
 * so we can cast the icon to the correct type.
 */
export function ButtonIcon({
    icon,
    size,
    style,
    testId,
    "aria-hidden": ariaHidden = true,
}: {
    icon: PhosphorIconAsset | React.ReactElement;
    size: "small" | "medium";
    style?: StyleType;
    testId?: string;
    "aria-hidden"?: boolean;
}) {
    // We set the icon size based on the theme object. This is necessary
    // because the icon size could change based on the theme.
    const iconStyle = {
        width: theme.icon.sizing[size],
        height: theme.icon.sizing[size],
    };

    const commonProps = {
        "aria-hidden": ariaHidden,
        style: [style, iconStyle],
        testId,
    };

    const phosphorIconProps = {
        ...commonProps,
        color: "currentColor",
    };

    if (typeof icon !== "string") {
        // If the icon is not a string, it is a custom icon that can be rendered
        // directly with the corresponding styles
        return React.cloneElement(icon, {
            ...commonProps,
            "aria-hidden":
                // If the icon props explicitly sets aria-hidden, use that value
                icon.props["aria-hidden"] ?? commonProps["aria-hidden"],
        });
    }

    switch (size) {
        case "small":
            return (
                <PhosphorIcon
                    {...phosphorIconProps}
                    size="small"
                    icon={icon as PhosphorBold | PhosphorFill}
                />
            );

        case "medium":
        default:
            return (
                <PhosphorIcon
                    {...phosphorIconProps}
                    size="medium"
                    icon={icon as PhosphorRegular | PhosphorFill}
                />
            );
    }
}
