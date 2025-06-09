import * as React from "react";
import {StyleSheet} from "aphrodite";

import xIcon from "@phosphor-icons/core/regular/x.svg";

import Button from "@khanacademy/wonder-blocks-button";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon, PhosphorIconAsset} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Link from "@khanacademy/wonder-blocks-link";
import {font, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import infoIcon from "@phosphor-icons/core/regular/info.svg";
import successIcon from "@phosphor-icons/core/regular/smiley.svg";
import warningIcon from "@phosphor-icons/core/regular/warning.svg";
import criticalIcon from "@phosphor-icons/core/regular/warning-circle.svg";
import theme from "../theme";

type ActionTriggerBase = {
    title: string;
    ariaLabel?: string;
};

type ActionTriggerWithButton = ActionTriggerBase & {
    type: "button";
    onClick: () => void;
};

type ActionTriggerWithLink = ActionTriggerBase & {
    type: "link";
    href: string;
    onClick?: () => void;
};

type ActionTriggerCustom = {
    type: "custom";
    node: React.ReactNode;
};

type ActionTrigger =
    | ActionTriggerWithButton
    | ActionTriggerWithLink
    | ActionTriggerCustom;

type BannerKind =
    /**
     * Color blue, circle 'i' icon. This is the default.
     */
    | "info"
    /**
     * Color green, smiley icon
     */
    | "success"
    /**
     * Color gold, triangle exclamation-point icon
     */
    | "warning"
    /**
     * Color red, circle exclamation-point icon
     */
    | "critical";

type BannerLayout =
    /**
     * Renders a rounded rectangle, usually for when banner is used as an inset
     * element on a screen (e.g., the SOT card) that appears to be floating.
     */
    | "floating"
    /**
     * Renders a full-width banner, with no rounded corners.
     */
    | "full-width";

type BannerValues = {
    icon: PhosphorIconAsset;
    role: "status" | "alert";
    ariaLive?: "assertive" | "polite";
};

type Props = {
    /**
     * Accessible label for the banner.
     * This is read out before the other contents of the banner.
     */
    "aria-label"?: string;
    /**
     * Determines the color and icon of the banner.
     */
    kind?: BannerKind;
    /**
     * (DEPRECATED) Determines the edge style of the Banner.
     *
     * This prop is deprecated and will be removed in a future release.
     * Currently, it has no effect on the component.
     *
     * @deprecated
     */
    layout: BannerLayout;
    /**
     * Text on the banner (LabelSmall) or a node if you want something different.
     */
    text: string | React.ReactNode;
    /**
     * Links or tertiary Buttons that appear to the right of the text.
     *
     * The ActionTrigger must have either an onClick or an href field, or both.
     */
    actions?: ReadonlyArray<ActionTrigger>;
    /**
     * If present, dismiss button is on right side. If not, no button appears.
     */
    onDismiss?: () => void | null | undefined;
    /**
     * The accessible label for the dismiss button.
     * Please pass in a translated string.
     */
    dismissAriaLabel?: string;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * An optional icon to display. This is a reference to the icon asset (imported as a
     * static SVG file). If not provided, a default icon will be used based on
     * the "kind" prop.
     *
     * It supports the following types:
     * - `PhosphorIconAsset`: a reference to a Phosphor SVG asset.
     * - `string`: an import referencing an arbitrary SVG file.
     */
    icon?: PhosphorIconAsset | string;
};

const getValuesForKind = (kind: BannerKind): BannerValues => {
    switch (kind) {
        case "success":
            return {
                icon: successIcon,
                role: "status",
            };
        case "warning":
            return {
                icon: warningIcon,
                role: "alert",
                ariaLive: "polite",
            };
        case "critical":
            return {
                icon: criticalIcon,
                role: "alert",
            };
        default:
            return {
                icon: infoIcon,
                role: "status",
            };
    }
};

const getBannerKindStyle = (kind: BannerKind) => {
    switch (kind) {
        case "success":
            return styles.successBanner;
        case "info":
            return styles.infoBanner;
        case "warning":
            return styles.warningBanner;
        case "critical":
            return styles.criticalBanner;
    }
};

const getBannerIconKindStyle = (kind: BannerKind) => {
    switch (kind) {
        case "success":
            return styles.successIcon;
        case "info":
            return styles.infoIcon;
        case "warning":
            return styles.warningIcon;
        case "critical":
            return styles.criticalIcon;
    }
};

const StyledDiv = addStyle("div");

/**
 * Banner. A banner displays a prominent message and related optional actions.
 * It can be used as a way of informing the user of important changes.
 * Typically, it is displayed toward the top of the screen.
 *
 * There are two possible layouts for banners - floating and full-width.
 * The `floating` layout is intended to be used when there is whitespace
 * around the banner. The `full-width` layout is intended to be used when
 * the banner needs to be flush with surrounding elements.
 *
 * ### Usage
 * ```jsx
 * import Banner from "@khanacademy/wonder-blocks-banner";
 *
 * <Banner
 *     text="Here is some example text."
 *     kind="success"
 *     layout="floating"
 *     actions={[
 *         {title: "Button 1", onClick: () => {}},
 *         {title: "Button 2", onClick: () => {}},
 *     ]}
 *     onDismiss={() => {console.log("Has been dismissed.")}}
 * />
 * ```
 */
const Banner = (props: Props): React.ReactElement => {
    const {
        actions,
        // Suppressing lint on the next line because it's saying `aria-label`
        // is missing in props validation when it's not.
        // eslint-disable-next-line react/prop-types
        "aria-label": ariaLabel,
        dismissAriaLabel = "Dismiss banner.", // default prop
        onDismiss,
        kind = "info", // default prop
        text,
        testId,
        icon,
    } = props;

    const renderActions = () => {
        return actions?.filter(Boolean).map((action, i) => {
            if (action.type === "custom") {
                return (
                    <View style={styles.action} key={`custom-action-${i}`}>
                        {action.node}
                    </View>
                );
            }

            const handleClick = action.onClick;

            if (action.type === "link") {
                return (
                    <View style={styles.action} key={action.title}>
                        <Link
                            href={action.href}
                            onClick={handleClick}
                            aria-label={action.ariaLabel ?? action.title}
                            style={styles.link}
                        >
                            {action.title}
                        </Link>
                    </View>
                );
            } else {
                return (
                    <View style={styles.action} key={action.title}>
                        <Button
                            kind="tertiary"
                            size="small"
                            aria-label={action.ariaLabel ?? action.title}
                            onClick={handleClick}
                            style={styles.button}
                        >
                            {action.title}
                        </Button>
                    </View>
                );
            }
        });
    };

    const valuesForKind = getValuesForKind(kind);

    const bannerKindStyle = getBannerKindStyle(kind);
    const bannerIconKindStyle = getBannerIconKindStyle(kind);

    return (
        <View
            style={[styles.containerOuter, bannerKindStyle]}
            role={valuesForKind.role}
            aria-label={ariaLabel}
            aria-live={valuesForKind.ariaLive}
            testId={testId}
        >
            <View style={styles.containerInner}>
                <PhosphorIcon
                    icon={icon || valuesForKind.icon}
                    size="medium"
                    style={[styles.icon, bannerIconKindStyle]}
                    aria-label={kind}
                    testId="banner-kind-icon"
                    role="img"
                />
                <View style={styles.labelAndButtonsContainer}>
                    <View style={styles.labelContainer}>
                        {/* We use a div here since text can be a React node with other elements */}
                        <StyledDiv style={styles.labelTypography}>
                            {text}
                        </StyledDiv>
                    </View>
                    {actions && (
                        <View style={styles.actionsContainer}>
                            {renderActions()}
                        </View>
                    )}
                </View>
                {onDismiss ? (
                    <View style={styles.dismissContainer}>
                        <IconButton
                            icon={xIcon}
                            kind="tertiary"
                            actionType="neutral"
                            onClick={onDismiss}
                            style={styles.dismiss}
                            aria-label={dismissAriaLabel}
                        />
                    </View>
                ) : null}
            </View>
        </View>
    );
};

const bannerTokens = {
    root: {
        border: {
            radius: theme.root.border.radius,
            width: {
                inlineStart: theme.root.border.width.inlineStart,
                inlineEnd: theme.root.border.width.inlineEnd,
                blockStart: theme.root.border.width.blockStart,
                blockEnd: theme.root.border.width.blockEnd,
            },
        },
        layout: {
            padding: sizing.size_080,
        },
        color: {
            border: {
                info: theme.root.color.border.info,
                success: theme.root.color.border.success,
                warning: theme.root.color.border.warning,
                critical: theme.root.color.border.critical,
            },
            background: {
                info: semanticColor.feedback.info.subtle.background,
                success: semanticColor.feedback.success.subtle.background,
                warning: semanticColor.feedback.warning.subtle.background,
                critical: semanticColor.feedback.critical.subtle.background,
            },
            foreground: {
                info: semanticColor.feedback.info.subtle.text,
                success: semanticColor.feedback.success.subtle.text,
                warning: semanticColor.feedback.warning.subtle.text,
                critical: semanticColor.feedback.critical.subtle.text,
            },
        },
    },
    icon: {
        color: {
            info: theme.icon.color.info,
            success: theme.icon.color.success,
            warning: theme.icon.color.warning,
            critical: theme.icon.color.critical,
        },
        layout: {
            marginBlockStart: sizing.size_080,
            marginBlockEnd: sizing.size_080,
            // The total distance from the icon to the edge is 16px. The
            // vertical identifier is already 6px, and the padding on inner
            // conatiner is 8px. So that leaves 2px.
            marginInlineStart: sizing.size_020,
            marginInlineEnd: sizing.size_080,
        },
    },
    label: {
        layout: {
            margin: sizing.size_080,
        },
        font: {
            size: theme.label.font.size,
            weight: font.weight.semi,
            lineHeight: font.body.lineHeight.small,
            family: font.family.sans,
        },
    },
    actions: {
        layout: {
            marginBlock: sizing.size_080,
        },
        sizing: {
            height: sizing.size_180,
        },
    },
    action: {
        layout: {
            marginInline: sizing.size_080,
        },
    },
    link: {
        font: {
            family: font.family.sans,
            size: font.body.size.small,
            weight: font.weight.semi,
            lineHeight: font.body.lineHeight.small,
            decoration: theme.link.font.decoration,
            underlineOffset: theme.link.font.underlineOffset,
        },
    },
    button: {
        layout: {
            marginInline: theme.button.layout.marginInline,
        },
    },
    dismiss: {
        sizing: {
            height: sizing.size_400,
            width: sizing.size_400,
        },
        layout: {
            marginInline: sizing.size_040,
        },
    },
};

const styles = StyleSheet.create({
    containerOuter: {
        borderInlineStartWidth: bannerTokens.root.border.width.inlineStart,
        borderInlineEndWidth: bannerTokens.root.border.width.inlineEnd,
        borderBlockStartWidth: bannerTokens.root.border.width.blockStart,
        borderBlockEndWidth: bannerTokens.root.border.width.blockEnd,
        width: "100%",
        borderRadius: bannerTokens.root.border.radius,
        // Stop the square corners of the inner container from
        // flowing out of the rounded corners of the outer container.
        overflow: "hidden",
    },
    containerInner: {
        flexDirection: "row",
        padding: bannerTokens.root.layout.padding,
    },
    icon: {
        marginBlockStart: bannerTokens.icon.layout.marginBlockStart,
        marginBlockEnd: bannerTokens.icon.layout.marginBlockEnd,
        marginInlineStart: bannerTokens.icon.layout.marginInlineStart,
        marginInlineEnd: bannerTokens.icon.layout.marginInlineEnd,
        alignSelf: "flex-start",
    },
    labelAndButtonsContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    labelContainer: {
        flexShrink: 1,
        margin: bannerTokens.label.layout.margin,
        textAlign: "start",
        overflowWrap: "break-word",
    },
    labelTypography: {
        fontSize: bannerTokens.label.font.size,
        fontWeight: bannerTokens.label.font.weight,
        lineHeight: bannerTokens.label.font.lineHeight,
        fontFamily: bannerTokens.label.font.family,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBlock: bannerTokens.actions.layout.marginBlock,
        // Set the height to remove the padding from buttons
        height: bannerTokens.actions.sizing.height,
        alignItems: "center",
    },
    action: {
        marginInline: bannerTokens.action.layout.marginInline,
        justifyContent: "center",
    },
    link: {
        fontFamily: bannerTokens.link.font.family,
        fontSize: bannerTokens.link.font.size,
        fontWeight: bannerTokens.link.font.weight,
        lineHeight: bannerTokens.link.font.lineHeight,
        textDecoration: bannerTokens.link.font.decoration,
        textUnderlineOffset: bannerTokens.link.font.underlineOffset,
    },
    button: {
        marginInline: bannerTokens.button.layout.marginInline,
    },
    dismiss: {
        flexShrink: 1,
    },
    dismissContainer: {
        height: bannerTokens.dismiss.sizing.height,
        width: bannerTokens.dismiss.sizing.width,
        justifyContent: "center",
        alignItems: "center",
        marginInline: bannerTokens.dismiss.layout.marginInline,
    },
    successBanner: {
        backgroundColor: bannerTokens.root.color.background.success,
        borderColor: bannerTokens.root.color.border.success,
        color: bannerTokens.root.color.foreground.success,
    },
    infoBanner: {
        backgroundColor: bannerTokens.root.color.background.info,
        borderColor: bannerTokens.root.color.border.info,
        color: bannerTokens.root.color.foreground.info,
    },
    warningBanner: {
        backgroundColor: bannerTokens.root.color.background.warning,
        borderColor: bannerTokens.root.color.border.warning,
        color: bannerTokens.root.color.foreground.warning,
    },
    criticalBanner: {
        backgroundColor: bannerTokens.root.color.background.critical,
        borderColor: bannerTokens.root.color.border.critical,
        color: bannerTokens.root.color.foreground.critical,
    },
    successIcon: {
        color: bannerTokens.icon.color.success,
    },
    infoIcon: {
        color: bannerTokens.icon.color.info,
    },
    warningIcon: {
        color: bannerTokens.icon.color.warning,
    },
    criticalIcon: {
        color: bannerTokens.icon.color.critical,
    },
});

export default Banner;
