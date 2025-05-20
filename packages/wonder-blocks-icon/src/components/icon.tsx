import * as React from "react";
import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {CSSProperties, StyleSheet} from "aphrodite";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconSize} from "../types";

const StyledImg = addStyle("img");

type Props = AriaProps & {
    /**
     * The id for the icon.
     */
    id?: string;
    /**
     * The test id for the icon.
     */
    testId?: string;
    /**
     * Custom styles to apply to the icon.
     */
    style?: StyleType;
    /**
     * Size of the icon. One of `small` (16), `medium` (24), `large` (48), or
     * `xlarge` (96). Defaults to `small`.
     */
    size?: IconSize;
    /**
     * The alt text for the icon. If not provided, the icon will have `alt=""`
     * and be marked as decorative.
     */
    alt?: string;
    /**
     * The icon to display. This is a reference to the icon asset.
     */
    icon: string;
};

function getSize(size: IconSize): CSSProperties {
    switch (size) {
        case "small":
        default: {
            return styles.small;
        }
        case "medium": {
            return styles.medium;
        }
        case "large": {
            return styles.large;
        }
        case "xlarge": {
            return styles.xlarge;
        }
    }
}

/**
 * A component for displaying a custom icon. For Phosphor icons, use the
 * `PhosphorIcon` component.
 *
 * If the icon is interactive, use `IconButton` instead.
 */
const Icon = React.forwardRef(
    (props: Props, ref: React.Ref<HTMLImageElement>) => {
        const {
            size = "small",
            alt,
            icon,
            id,
            testId,
            style,
            ...otherProps
        } = props;

        return (
            <StyledImg
                id={id}
                data-testid={testId}
                src={icon}
                style={[getSize(size), style]}
                alt={alt || ""}
                ref={ref}
                {...otherProps}
            />
        );
    },
);

const styles = StyleSheet.create({
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

export {Icon};
