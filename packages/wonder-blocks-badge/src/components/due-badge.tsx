import * as React from "react";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
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

const dueBadgeTokens = {
    root: {
        color: {
            background: semanticColor.learning.background.due.subtle,
            border: semanticColor.learning.background.due.subtle, // Border should be the same as the background
            foreground: semanticColor.learning.foreground.due.strong,
        },
    },
    icon: {
        color: {
            foreground: semanticColor.learning.foreground.due.default,
        },
    },
};

const styles = StyleSheet.create({
    dueBadge: {
        backgroundColor: dueBadgeTokens.root.color.background,
        borderColor: dueBadgeTokens.root.color.border,
        color: dueBadgeTokens.root.color.foreground,
    },
    dueIcon: {
        color: dueBadgeTokens.icon.color.foreground,
    },
});
