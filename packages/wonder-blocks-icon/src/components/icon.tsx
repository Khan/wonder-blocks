import * as React from "react";
import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {CSSProperties, StyleSheet} from "aphrodite";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconSize} from "../types";

type Props = AriaProps & {
    /**
     * The id for the icon component.
     */
    id?: string;
    /**
     * The test id for the icon component.
     */
    testId?: string;
    /**
     * Custom styles to apply to the icon component.
     */
    style?: StyleType;
    /**
     * Size of the icon. One of `small` (16), `medium` (24), `large` (48), or
     * `xlarge` (96). Defaults to `small`.
     */
    size?: IconSize;
    /**
     * The icon to display. This can be an inline svg or an image.
     */
    children: React.ReactElement;
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

const StyledDiv = addStyle("div");

/**
 * A component for displaying a custom icon. The Icon component supports custom
 * icons that are `img` elements or inline svg assets with their own fill.
 *
 * Related components:
 * - For Phosphor icons, use the `PhosphorIcon` component.
 * - For custom icons that are single colored svg assets, use the `PhosphorIcon`
 * component, which supports changing the color of the icon.
 * - If the icon is interactive, use `IconButton` instead.
 */
const Icon = React.forwardRef(
    (props: Props, ref: React.Ref<HTMLDivElement>) => {
        const {
            size = "small",
            id,
            testId,
            style,
            children,
            ...otherProps
        } = props;
        const childrenElement = React.cloneElement(children, {
            style: {
                // Make sure the children element takes up the width/height of
                // the Icon component div
                width: "100%",
                height: "100%",
            },
        });

        return (
            <StyledDiv
                style={[getSize(size), style]}
                id={id}
                data-testid={testId}
                ref={ref}
                {...otherProps}
            >
                {childrenElement}
            </StyledDiv>
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
