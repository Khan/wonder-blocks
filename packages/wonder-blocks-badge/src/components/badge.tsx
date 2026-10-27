import {addStyle} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";
import {BaseBadgeProps, IconLabelProps} from "../types";
import styles from "./badge.module.css";

type BadgeProps = {
    /**
     * Whether to show the border. Defaults to `true`.
     */
    showBorder?: boolean;
};

type Props = IconLabelProps & BaseBadgeProps & BadgeProps;

const StyledSpan = addStyle("span");

/**
 * Badges are visual indicators used to display concise information, such as
 * a status, label, or count.
 */
const Badge = React.forwardRef<HTMLDivElement, Props>(function Badge(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        icon,
        label,
        id,
        testId,
        styles: stylesProp,
        tag = "div",
        showBorder = true,
        ...otherProps
    } = props;
    const StyledTag = React.useMemo(() => addStyle(tag), [tag]);
    if (!label && !icon) {
        return <React.Fragment />;
    }
    return (
        <StyledTag
            id={id}
            data-testid={testId}
            ref={ref}
            style={[
                styles.badge,
                icon && !label ? styles.iconOnly : {},
                stylesProp?.root,
                // disabling border needs to be after custom styles so it can
                // override any border styles that were applied by another badge
                // component. It's a plain style object (not a class) so that
                // it's still applied after the consumer's styles.
                !showBorder && transparentBorder,
            ]}
            {...otherProps}
        >
            {icon && (
                <StyledSpan style={[styles.icon, stylesProp?.icon]}>
                    {icon}
                </StyledSpan>
            )}
            {label && (
                <StyledSpan style={[styles.label, stylesProp?.label]}>
                    {label}
                </StyledSpan>
            )}
        </StyledTag>
    );
});

export {Badge};

const transparentBorder = {
    borderColor: semanticColor.core.transparent,
};
