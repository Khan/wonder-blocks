import * as React from "react";
import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {IconSize} from "../types";
import styles from "./icon.module.css";

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
                className={styles[size]}
                style={style}
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

export {Icon};
