import * as React from "react";
import {Icon, StreakIcon} from "@khanacademy/wonder-blocks-icon";
import {Badge} from "./badge";
import styles from "./badge.module.css";
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
