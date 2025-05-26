import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Badge, BadgeProps} from "./badge";
import streakIcon from "../assets/streak-icon.svg";

type Props = {
    /**
     * Whether to show the gem icon.
     */
    showIcon?: boolean;
    /**
     * The alt text for the streak icon.
     */
    iconAriaLabel?: string;
} & Omit<BadgeProps, "icon">;

/**
 * A badge that represents streaks.
 */
const StreakBadge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {label, showIcon, iconAriaLabel, ...otherProps} = props;
    return (
        <Badge
            {...otherProps}
            label={label}
            icon={
                showIcon ? (
                    <img src={streakIcon} alt={iconAriaLabel || ""} />
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

const styles = StyleSheet.create({
    streakBadge: {
        // TODO: Replace with tokens
        backgroundColor: "#FEE9E5",
        border: "#FEE9E5",
        color: "#983C1A",
    },
});
