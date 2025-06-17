import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Icon, StreakIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Badge} from "./badge";
import {BaseBadgeProps, ShowIconProps} from "../types";

type Props = BaseBadgeProps & ShowIconProps;

/**
 * A badge that represents streaks.
 *
 * `StreakBadge` uses the `Badge` component and applies the appropriate styles
 * and icon. For more details, see the `Badge` docs.
 */
const StreakBadge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {label, showIcon = false, iconAriaLabel, ...otherProps} = props;
    return (
        <Badge
            {...otherProps}
            label={label || ""}
            icon={
                showIcon ? (
                    <Icon>
                        <StreakIcon aria-label={iconAriaLabel} />
                    </Icon>
                ) : undefined
            }
            ref={ref}
            styles={{
                ...otherProps.styles,
                root: [styles.streakBadge, otherProps.styles?.root],
            }}
        />
    );
});

export {StreakBadge};

const streakBadgeTokens = {
    root: {
        color: {
            background: semanticColor.learning.background.streaks.subtle,
            border: semanticColor.learning.background.streaks.subtle, // Border should be the same as the background
            foreground: semanticColor.learning.foreground.streaks.strong,
        },
    },
};

const styles = StyleSheet.create({
    streakBadge: {
        backgroundColor: streakBadgeTokens.root.color.background,
        border: streakBadgeTokens.root.color.border,
        color: streakBadgeTokens.root.color.foreground,
    },
});
