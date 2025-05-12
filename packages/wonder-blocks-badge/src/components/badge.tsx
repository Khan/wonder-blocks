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
            {icon}
            {label}
        </StyledDiv>
    );
};

const styles = StyleSheet.create({
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: sizing.size_040,
        borderWidth: border.width.thin,
        borderStyle: "solid",
        paddingBlock: sizing.size_040,
        paddingInline: sizing.size_080,
        borderRadius: border.radius.radius_080,
    },
    iconOnly: {
        padding: sizing.size_040,
    },
    info: {
        backgroundColor: semanticColor.status.notice.background,
        color: semanticColor.status.notice.foreground,
    },
    success: {
        backgroundColor: semanticColor.status.success.background,
        color: semanticColor.status.success.foreground,
    },
    warning: {
        backgroundColor: semanticColor.status.warning.background,
        color: semanticColor.status.warning.foreground,
    },
    critical: {
        backgroundColor: semanticColor.status.critical.background,
        color: semanticColor.status.critical.foreground,
    },
});
