import * as React from "react";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Badge} from "./badge";
import {BaseBadgeProps, IconLabelProps} from "../types";

type Props = {
    /**
     * The kind of badge to display. Defaults to `info`.
     */
    kind?: "info" | "success" | "warning" | "critical";
} & BaseBadgeProps &
    IconLabelProps;

/**
 * A badge that represents a status.
 *
 * `StatusBadge` uses the `Badge` component and applies the appropriate styles
 * for the status kinds. For more details, see the `Badge` docs.
 */
const StatusBadge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {kind = "info", ...otherProps} = props;
    return (
        <Badge
            ref={ref}
            {...otherProps}
            styles={{
                ...otherProps.styles,
                root: [getKindStyle(kind), otherProps.styles?.root],
                icon: [getIconKindStyle(kind), otherProps.styles?.icon],
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

function getIconKindStyle(kind: Props["kind"]) {
    switch (kind) {
        case "info":
            return styles.infoIcon;
        case "success":
            return styles.successIcon;
        case "warning":
            return styles.warningIcon;
        case "critical":
            return styles.criticalIcon;
        default:
            return {};
    }
}

const badgeTokens = {
    root: {
        color: {
            info: {
                background: semanticColor.feedback.info.subtle.background,
                border: semanticColor.feedback.info.subtle.border,
                foreground: semanticColor.feedback.info.subtle.text,
            },
            success: {
                background: semanticColor.feedback.success.subtle.background,
                border: semanticColor.feedback.success.subtle.border,
                foreground: semanticColor.feedback.success.subtle.text,
            },
            warning: {
                background: semanticColor.feedback.warning.subtle.background,
                border: semanticColor.feedback.warning.subtle.border,
                foreground: semanticColor.feedback.warning.subtle.text,
            },
            critical: {
                background: semanticColor.feedback.critical.subtle.background,
                border: semanticColor.feedback.critical.subtle.border,
                foreground: semanticColor.feedback.critical.subtle.text,
            },
        },
    },
    icon: {
        color: {
            info: {
                foreground: semanticColor.feedback.info.subtle.icon,
            },
            success: {
                foreground: semanticColor.feedback.success.subtle.icon,
            },
            warning: {
                foreground: semanticColor.feedback.warning.subtle.icon,
            },
            critical: {
                foreground: semanticColor.feedback.critical.subtle.icon,
            },
        },
    },
};

const styles = StyleSheet.create({
    info: {
        backgroundColor: badgeTokens.root.color.info.background,
        color: badgeTokens.root.color.info.foreground,
        borderColor: badgeTokens.root.color.info.border,
    },
    success: {
        backgroundColor: badgeTokens.root.color.success.background,
        color: badgeTokens.root.color.success.foreground,
        borderColor: badgeTokens.root.color.success.border,
    },
    warning: {
        backgroundColor: badgeTokens.root.color.warning.background,
        color: badgeTokens.root.color.warning.foreground,
        borderColor: badgeTokens.root.color.warning.border,
    },
    critical: {
        backgroundColor: badgeTokens.root.color.critical.background,
        color: badgeTokens.root.color.critical.foreground,
        borderColor: badgeTokens.root.color.critical.border,
    },
    infoIcon: {
        color: badgeTokens.icon.color.info.foreground,
    },
    successIcon: {
        color: badgeTokens.icon.color.success.foreground,
    },
    warningIcon: {
        color: badgeTokens.icon.color.warning.foreground,
    },
    criticalIcon: {
        color: badgeTokens.icon.color.critical.foreground,
    },
});
