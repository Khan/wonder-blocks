import * as React from "react";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Badge} from "./badge";
import {BaseBadgeProps, IconLabelProps} from "../types";

type Props = {
    /**
     * Whether to show the border. Defaults to `true`.
     */
    showBorder?: boolean;
} & BaseBadgeProps &
    IconLabelProps;

/**
 * A badge that represents information without conveying additional meaning
 * through its visual presentation
 *
 * `NeutralBadge` uses the `Badge` component and applies the appropriate styles
 * for the neutral styling. For more details, see the `Badge` docs.
 */
const NeutralBadge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {showBorder, ...otherProps} = props;
    return (
        <Badge
            ref={ref}
            showBorder={showBorder}
            {...otherProps}
            styles={{
                ...otherProps.styles,
                root: [styles.neutral, otherProps.styles?.root],
                icon: [styles.neutralIcon, otherProps.styles?.icon],
            }}
        />
    );
});

export {NeutralBadge};

const styles = StyleSheet.create({
    neutral: {
        backgroundColor: semanticColor.feedback.neutral.subtle.background,
        color: semanticColor.feedback.neutral.subtle.text,
        borderColor: semanticColor.feedback.neutral.subtle.border,
    },
    neutralIcon: {
        color: semanticColor.feedback.neutral.subtle.icon,
    },
});
