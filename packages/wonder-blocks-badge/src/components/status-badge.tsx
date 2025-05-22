import * as React from "react";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Badge, BadgeProps} from "./badge";

type Props = {
    /**
     * The kind of badge to display. Defaults to `info`.
     */
    kind?: "info" | "success" | "warning" | "critical";
} & BadgeProps;

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
                background: semanticColor.status.notice.background,
                border: semanticColor.status.notice.background,
                foreground: semanticColor.text.primary,
            },
            success: {
                background: semanticColor.status.success.background,
                border: semanticColor.status.success.background,
                foreground: semanticColor.text.primary,
            },
            warning: {
                background: semanticColor.status.warning.background,
                border: semanticColor.status.warning.background,
                foreground: semanticColor.text.primary,
            },
            critical: {
                background: semanticColor.status.critical.background,
                border: semanticColor.status.critical.background,
                foreground: semanticColor.text.primary,
            },
        },
    },
    icon: {
        color: {
            info: {
                foreground: semanticColor.status.notice.foreground,
            },
            success: {
                foreground: semanticColor.status.success.foreground,
            },
            warning: {
                foreground: semanticColor.status.warning.foreground,
            },
            critical: {
                foreground: semanticColor.status.critical.foreground,
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
