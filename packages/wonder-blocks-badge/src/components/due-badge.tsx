import * as React from "react";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import DateIcon from "@phosphor-icons/core/bold/calendar-blank-bold.svg";
import WarningCircle from "@phosphor-icons/core/bold/warning-circle-bold.svg";
import {Badge} from "./badge";
import styles from "./due-badge.module.css";
import {BaseBadgeProps, ShowIconProps} from "../types";

type Props = BaseBadgeProps &
    ShowIconProps & {
        /**
         * The kind of due badge. Defaults to `due`.
         */
        kind?: "due" | "overdue";
    };

/**
 * A badge that communicates when a task is due.
 *
 * `DueBadge` uses the `Badge` component and applies the appropriate styles
 * for the kinds.
 *
 * Note: The `iconAriaLabel` prop can be used to set an `aria-label` on the icon
 * if `showIcon` is `true`. This is helpful for providing context to screen
 * readers about what the badge is communicating.
 *
 * For more details, see the `Badge` docs.
 */
const DueBadge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {
        kind = "due",
        showIcon = false,
        label,
        iconAriaLabel,
        ...otherProps
    } = props;

    let icon;
    switch (kind) {
        case "due":
            icon = DateIcon;
            break;
        case "overdue":
            icon = WarningCircle;
            break;
    }

    return (
        <Badge
            ref={ref}
            {...otherProps}
            label={label || ""}
            icon={
                showIcon ? (
                    <PhosphorIcon icon={icon} aria-label={iconAriaLabel} />
                ) : undefined
            }
            styles={{
                ...otherProps.styles,
                root: [
                    kind === "due" && styles.due,
                    kind === "overdue" && styles.overdue,
                    otherProps.styles?.root,
                ],
            }}
        />
    );
});

export {DueBadge};
