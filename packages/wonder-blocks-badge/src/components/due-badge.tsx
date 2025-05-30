import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Badge} from "./badge";
import {BaseBadgeProps, IconLabelProps} from "../types";

type Props = BaseBadgeProps & IconLabelProps;

/**
 * A badge that communicates when a task is due.
 *
 * `DueBadge` uses the `Badge` component and applies the appropriate styles
 * for the status kinds. For more details, see the `Badge` docs.
 */
const DueBadge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {...otherProps} = props;
    return (
        <Badge
            ref={ref}
            {...otherProps}
            styles={{
                ...otherProps.styles,
                root: [styles.dueBadge, otherProps.styles?.root],
                icon: [styles.dueIcon, otherProps.styles?.icon],
            }}
        />
    );
});

export {DueBadge};

const styles = StyleSheet.create({
    // TODO(WB-1947): Replace with tokens
    dueBadge: {
        backgroundColor: "#DDF0FE",
        borderColor: "#DDF0FE",
        color: "#20628F",
    },
    dueIcon: {
        color: "#2485C7",
    },
});
