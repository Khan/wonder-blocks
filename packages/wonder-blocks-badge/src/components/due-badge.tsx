import * as React from "react";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Badge} from "./badge";
import {BaseBadgeProps, IconLabelProps} from "../types";

type Props = BaseBadgeProps &
    IconLabelProps & {
        /**
         * The kind of due badge. Defaults to `due`.
         */
        kind?: "due" | "overdue";
    };

/**
 * A badge that communicates when a task is due.
 *
 * `DueBadge` uses the `Badge` component and applies the appropriate styles
 * for the status kinds. For more details, see the `Badge` docs.
 */
const DueBadge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {kind = "due", ...otherProps} = props;
    return (
        <Badge
            ref={ref}
            {...otherProps}
            styles={{
                ...otherProps.styles,
                root: [
                    kind === "due" && styles.dueBadge,
                    kind === "overdue" && styles.overdueBadge,
                    otherProps.styles?.root,
                ],
                icon: [
                    kind === "due" && styles.dueIcon,
                    kind === "overdue" && styles.overdueIcon,
                    otherProps.styles?.icon,
                ],
            }}
        />
    );
});

export {DueBadge};

const styles = StyleSheet.create({
    dueBadge: {
        backgroundColor: semanticColor.learning.background.due.subtle,
        borderColor: semanticColor.learning.background.due.subtle, // Border should be the same as the background
        color: semanticColor.learning.foreground.due.strong,
    },
    dueIcon: {
        color: semanticColor.learning.foreground.due.default,
    },
    overdueBadge: {
        backgroundColor: semanticColor.core.background.critical.subtle,
        // Border should be the same as the background
        borderColor: semanticColor.core.background.critical.subtle,
        color: semanticColor.core.foreground.critical.strong,
    },
    overdueIcon: {
        color: semanticColor.core.foreground.critical.default,
    },
});
