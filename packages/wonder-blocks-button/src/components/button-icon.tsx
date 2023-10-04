import * as React from "react";
import {StyleType} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon, PhosphorIconAsset} from "@khanacademy/wonder-blocks-icon";

/**
 * Returns the phosphor icon component based on the size. This is necessary
 * so we can cast the icon to the correct type.
 */
export function ButtonIcon({
    icon,
    size,
    style,
    testId,
}: {
    icon: PhosphorIconAsset;
    size: "small" | "medium";
    style?: StyleType;
    testId?: string;
}) {
    const commonProps = {
        "aria-hidden": true,
        color: "currentColor",
        style: style,
        testId,
    };

    switch (size) {
        case "small":
            return (
                <PhosphorIcon
                    {...commonProps}
                    size="small"
                    icon={icon as PhosphorBold | PhosphorFill}
                />
            );

        case "medium":
        default:
            return (
                <PhosphorIcon
                    {...commonProps}
                    size="medium"
                    icon={icon as PhosphorRegular | PhosphorFill}
                />
            );
    }
}
