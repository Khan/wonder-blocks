import * as React from "react";
import {StyleSheet} from "aphrodite";

import xIcon from "@phosphor-icons/core/regular/x.svg";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon, PhosphorIconAsset} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Link from "@khanacademy/wonder-blocks-link";
import {
    border,
    font,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";

import infoIcon from "@phosphor-icons/core/regular/info.svg";
import successIcon from "@phosphor-icons/core/regular/smiley.svg";
import warningIcon from "@phosphor-icons/core/regular/warning.svg";
import criticalIcon from "@phosphor-icons/core/regular/warning-circle.svg";

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
    color: string;
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
     * Determines the edge style of the Banner.
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
                color: semanticColor.status.success.foreground,
                icon: successIcon,
                role: "status",
            };
        case "warning":
            return {
                color: semanticColor.status.warning.foreground,
                icon: warningIcon,
                role: "alert",
                ariaLive: "polite",
            };
        case "critical":
            return {
                color: semanticColor.status.critical.foreground,
                icon: criticalIcon,
                role: "alert",
            };
        default:
            return {
                color: semanticColor.status.notice.foreground,
                icon: infoIcon,
                role: "status",
            };
    }
};

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
        layout,
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
                        >
                            {action.title}
                        </Button>
                    </View>
                );
            }
        });
    };

    const valuesForKind = getValuesForKind(kind);

    return (
        <View
            style={[
                styles.containerOuter,
                layout === "floating" && styles.floatingBorder,
                {borderInlineStartColor: valuesForKind.color},
            ]}
            role={valuesForKind.role}
            aria-label={ariaLabel}
            aria-live={valuesForKind.ariaLive}
            testId={testId}
        >
            <View
                style={[
                    styles.backgroundColor,
                    {backgroundColor: valuesForKind.color},
                ]}
            />
            <View style={styles.containerInner}>
                <PhosphorIcon
                    icon={icon || valuesForKind.icon}
                    size="medium"
                    style={styles.icon}
                    aria-label={kind}
                    testId="banner-kind-icon"
                    role="img"
                />
                <View style={styles.labelAndButtonsContainer}>
                    <View style={styles.labelContainer}>
                        <LabelSmall>{text}</LabelSmall>
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

const styles = StyleSheet.create({
    backgroundColor: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.08,
    },
    containerOuter: {
        borderInlineStartWidth: spacing.xxSmall_6,
        width: "100%",
        // Because of the background color's opacity value,
        // the base color needs to be hard-coded as white for the
        // intended pastel background color to show up correctly
        // on dark backgrounds.
        // TODO(WB-1865): Verify if we can change this to use semanticColor
        // status tokens.
        backgroundColor: semanticColor.surface.primary,
    },
    containerInner: {
        flexDirection: "row",
        padding: spacing.xSmall_8,
    },
    icon: {
        marginTop: spacing.xSmall_8,
        marginBottom: spacing.xSmall_8,
        // The total distance from the icon to the edge is 16px. The
        // vertical identifier is already 6px, and the padding on inner
        // conatiner is 8px. So that leaves 2px.
        marginInlineStart: spacing.xxxxSmall_2,
        marginInlineEnd: spacing.xSmall_8,
        alignSelf: "flex-start",
        color: semanticColor.icon.primary,
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
        margin: spacing.xSmall_8,
        textAlign: "start",
        overflowWrap: "break-word",
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: spacing.xSmall_8,
        marginBottom: spacing.xSmall_8,
        // Set the height to remove the padding from buttons
        height: 18,
        alignItems: "center",
    },
    action: {
        marginLeft: spacing.xSmall_8,
        marginRight: spacing.xSmall_8,
        justifyContent: "center",
    },
    link: {
        fontSize: font.body.size.small,
    },
    dismiss: {
        flexShrink: 1,
    },
    dismissContainer: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: spacing.xSmall_8,
        marginRight: spacing.xSmall_8,
    },
    floatingBorder: {
        borderRadius: border.radius.radius_040,
        // Stop the square corners of the inner container from
        // flowing out of the rounded corners of the outer container.
        overflow: "hidden",
    },
});

export default Banner;
