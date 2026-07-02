import * as React from "react";
import {StyleSheet} from "aphrodite";
import {GemIcon, Icon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Badge} from "./badge";
import {BaseBadgeProps, ShowIconProps} from "../types";

type Props = BaseBadgeProps & ShowIconProps;

/**
 * A badge that represents gem rewards.
 *
 * `GemBadge` uses the `Badge` component and applies the appropriate styles
 * and icon. For more details, see the `Badge` docs.
 */
const GemBadge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {label, showIcon = false, iconAriaLabel, ...otherProps} = props;
    return (
        <Badge
            {...otherProps}
            label={label || ""}
            icon={
                showIcon ? (
                    <Icon>
                        <GemIcon aria-label={iconAriaLabel} />
                    </Icon>
                ) : undefined
            }
            ref={ref}
            styles={{
                ...otherProps.styles,
                root: [styles.gemBadge, otherProps.styles?.root],
            }}
        />
    );
});

export {GemBadge};

const gemBadgeTokens = {
    root: {
        color: {
            background: semanticColor.learning.background.gems.default,
            border: semanticColor.learning.background.gems.default, // Border should be the same as the background
            foreground: semanticColor.learning.foreground.gems.strong,
        },
    },
};

const styles = StyleSheet.create({
    gemBadge: {
        backgroundColor: gemBadgeTokens.root.color.background,
        border: gemBadgeTokens.root.color.border,
        color: gemBadgeTokens.root.color.foreground,
    },
});
