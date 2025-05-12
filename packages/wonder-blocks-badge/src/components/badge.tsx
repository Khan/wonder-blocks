import {addStyle} from "@khanacademy/wonder-blocks-core";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    kind?: "info" | "success" | "warning" | "critical";
} & (IconOnlyProps | BadgeWithLabelProps);

type IconOnlyProps = {
    icon: React.ReactNode;
    "aria-label": string;
    label?: never;
};

type BadgeWithLabelProps = {
    label: string;
    icon?: React.ReactNode;
    "aria-label"?: string;
};

const StyledDiv = addStyle("div");
const StyledSpan = addStyle("span");

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

export const Badge = (props: Props) => {
    const {kind, "aria-label": ariaLabel, icon, label} = props;
    return (
        <StyledDiv
            style={[
                typographyStyles.LabelXSmall,
                styles.badge,
                getKindStyle(kind),
                icon && !label ? styles.iconOnly : {},
            ]}
            aria-label={ariaLabel}
        >
            {icon && (
                <StyledSpan style={[styles.icon, getIconKindStyle(kind)]}>
                    {icon}
                </StyledSpan>
            )}
            {label}
        </StyledDiv>
    );
};

const badgeTokens = {
    root: {
        sizing: {
            paddingBlock: sizing.size_040,
            paddingInline: sizing.size_080,
            gap: sizing.size_040,
        },
        border: {
            width: border.width.thin,
            style: "solid",
            radius: border.radius.radius_080,
        },
        color: {
            info: {
                background: semanticColor.status.notice.background,
                border: semanticColor.status.notice.foreground,
                foreground: semanticColor.text.primary,
            },
            success: {
                background: semanticColor.status.success.background,
                border: semanticColor.status.success.foreground,
                foreground: semanticColor.text.primary,
            },
            warning: {
                background: semanticColor.status.warning.background,
                border: semanticColor.status.warning.foreground,
                foreground: semanticColor.text.primary,
            },
            critical: {
                background: semanticColor.status.critical.background,
                border: semanticColor.status.critical.foreground,
                foreground: semanticColor.text.primary,
            },
        },
    },
    icon: {
        sizing: {
            width: sizing.size_160,
            height: sizing.size_160,
        },
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
    iconOnly: {
        sizing: {
            padding: sizing.size_040,
        },
    },
};

const styles = StyleSheet.create({
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: badgeTokens.root.sizing.gap,
        borderWidth: badgeTokens.root.border.width,
        borderStyle: badgeTokens.root.border.style,
        paddingBlock: badgeTokens.root.sizing.paddingBlock,
        paddingInline: badgeTokens.root.sizing.paddingInline,
        borderRadius: badgeTokens.root.border.radius,
    },
    icon: {
        width: badgeTokens.icon.sizing.width,
        height: badgeTokens.icon.sizing.height,
    },
    iconOnly: {
        padding: badgeTokens.iconOnly.sizing.padding,
    },
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
