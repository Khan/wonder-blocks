import * as React from "react";
import {StyleSheet} from "aphrodite";
import {GemIcon, Icon} from "@khanacademy/wonder-blocks-icon";
import {Badge} from "./badge";
import {BaseBadgeProps, ShowIconProps} from "../types";

type Props = {
    /**
     * The alt text for the gem icon.
     */
    iconAriaLabel?: string;
} & BaseBadgeProps &
    ShowIconProps;

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

const styles = StyleSheet.create({
    gemBadge: {
        // TODO(WB-1947): Replace with tokens
        backgroundColor: "#FFE3F4",
        border: "#FFE3F4",
        color: "#84275E",
    },
});
