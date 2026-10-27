import * as React from "react";
import {Badge} from "./badge";
import styles from "./status-badge.module.css";
import {BaseBadgeProps, IconLabelProps} from "../types";

type Props = {
    /**
     * The kind of badge to display. Defaults to `info`.
     */
    kind?: "info" | "success" | "warning" | "critical";
    /**
     * Whether to show the border. Defaults to `true`.
     */
    showBorder?: boolean;
} & BaseBadgeProps &
    IconLabelProps;

/**
 * A badge that represents a status.
 *
 * `StatusBadge` uses the `Badge` component and applies the appropriate styles
 * for the status kinds. For more details, see the `Badge` docs.
 */
const StatusBadge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {kind = "info", showBorder, ...otherProps} = props;
    return (
        <Badge
            ref={ref}
            showBorder={showBorder}
            {...otherProps}
            styles={{
                ...otherProps.styles,
                root: [getKindStyle(kind), otherProps.styles?.root],
            }}
        />
    );
});

export {StatusBadge};

function getKindStyle(kind: Props["kind"]) {
    switch (kind) {
        case "info":
            return styles.info;
        case "success":
            return styles.success;
        case "warning":
            return styles.warning;
        case "critical":
            return styles.critical;
        default:
            return {};
    }
}
