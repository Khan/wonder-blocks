import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Link from "@khanacademy/wonder-blocks-link";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";

import * as bannerIcons from "./banner-icons";

type ActionTriggerBase = {
    title: string;
    ariaLabel?: string;
};

type ActionTriggerWithButton = ActionTriggerBase & {
    onClick: () => void;
};

type ActionTriggerWithLink = ActionTriggerBase & {
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
     * element on a screen (e.g., the SOT card) that appears to be floating
     */
    | "floating"
    /**
     * Renders a full-width banner, with no rounded corners.
     * This is the default.
     */
    | "full-width";

type BannerValues = {
    color: string;
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
    actions?: Array<ActionTrigger>;
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
};

const valuesForKind = (kind: BannerKind): BannerValues => {
    switch (kind) {
        case "success":
            return {
                color: Color.green,
                role: "status",
            };
        case "warning":
            return {
                color: Color.gold,
                role: "alert",
                ariaLive: "polite",
            };
        case "critical":
            return {
                color: Color.red,
                role: "alert",
            };
        default:
            return {
                color: Color.blue,
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
const Banner: React.FC<Props> = (props): React.ReactElement => {
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
    } = props;

    const renderActions = () => {
        return actions
            ?.filter(Boolean)
            .map((action: NonNullable<ActionTrigger>, i: number) => {
                // @ts-expect-error [FEI-5019] - TS2339 - Property 'type' does not exist on type 'ActionTrigger'.
                if (action.type === "custom") {
                    return (
                        <View style={styles.action} key={`custom-action-${i}`}>
                            {/* @ts-expect-error [FEI-5019] - TS2339 - Property 'node' does not exist on type 'ActionTrigger'. */}
                            {action.node}
                        </View>
                    );
                }

                // @ts-expect-error [FEI-5019] - TS2339 - Property 'onClick' does not exist on type 'ActionTrigger'.
                const handleClick = action.onClick;

                // @ts-expect-error [FEI-5019] - TS2339 - Property 'href' does not exist on type 'ActionTrigger'.
                if (action.href) {
                    return (
                        // @ts-expect-error [FEI-5019] - TS2339 - Property 'title' does not exist on type 'ActionTrigger'.
                        <View style={styles.action} key={action.title}>
                            <Link
                                kind="primary"
                                // @ts-expect-error [FEI-5019] - TS2339 - Property 'href' does not exist on type 'ActionTrigger'.
                                href={action.href}
                                onClick={handleClick}
                                // @ts-expect-error [FEI-5019] - TS2339 - Property 'ariaLabel' does not exist on type 'ActionTrigger'. | TS2339 - Property 'title' does not exist on type 'ActionTrigger'.
                                aria-label={action.ariaLabel ?? action.title}
                                style={styles.link}
                            >
                                {/* @ts-expect-error [FEI-5019] - TS2339 - Property 'title' does not exist on type 'ActionTrigger'. */}
                                {action.title}
                            </Link>
                        </View>
                    );
                } else {
                    return (
                        // @ts-expect-error [FEI-5019] - TS2339 - Property 'title' does not exist on type 'ActionTrigger'.
                        <View style={styles.action} key={action.title}>
                            <Button
                                kind="tertiary"
                                size="small"
                                // @ts-expect-error [FEI-5019] - TS2339 - Property 'ariaLabel' does not exist on type 'ActionTrigger'. | TS2339 - Property 'title' does not exist on type 'ActionTrigger'.
                                aria-label={action.ariaLabel ?? action.title}
                                onClick={handleClick}
                            >
                                {/* @ts-expect-error [FEI-5019] - TS2339 - Property 'title' does not exist on type 'ActionTrigger'. */}
                                {action.title}
                            </Button>
                        </View>
                    );
                }
            });
    };

    return (
        <View
            style={[
                styles.containerOuter,
                layout === "floating" && styles.floatingBorder,
                {borderInlineStartColor: valuesForKind(kind).color},
            ]}
            role={valuesForKind(kind).role}
            aria-label={ariaLabel}
            aria-live={valuesForKind(kind).ariaLive}
            testId={testId}
        >
            <View
                style={[
                    styles.backgroundColor,
                    {backgroundColor: valuesForKind(kind).color},
                ]}
            />
            <View style={styles.containerInner}>
                <Icon
                    icon={bannerIcons[kind]}
                    size="medium"
                    style={styles.icon}
                    aria-label={kind}
                    testId="banner-kind-icon"
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
                            icon={icons.dismiss}
                            kind={"tertiary"}
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
        borderInlineStartWidth: Spacing.xxSmall_6,
        width: "100%",
        // Because of the background color's opacity value,
        // the base color needs to be hard-coded as white for the
        // intended pastel background color to show up correctly
        // on dark backgrounds.
        backgroundColor: Color.white,
    },
    containerInner: {
        flexDirection: "row",
        padding: Spacing.xSmall_8,
    },
    icon: {
        marginTop: Spacing.xSmall_8,
        marginBottom: Spacing.xSmall_8,
        // The total distance from the icon to the edge is 16px. The
        // vertical identifier is already 6px, and the padding on inner
        // conatiner is 8px. So that leaves 2px.
        marginInlineStart: Spacing.xxxxSmall_2,
        marginInlineEnd: Spacing.xSmall_8,
        alignSelf: "flex-start",
        color: Color.offBlack64,
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
        margin: Spacing.xSmall_8,
        textAlign: "start",
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: Spacing.xSmall_8,
        marginBottom: Spacing.xSmall_8,
    },
    action: {
        marginLeft: Spacing.xSmall_8,
        marginRight: Spacing.xSmall_8,
        justifyContent: "center",
        // Set the height to remove the padding from buttons
        height: 18,
    },
    link: {
        fontSize: 14,
    },
    dismiss: {
        flexShrink: 1,
    },
    dismissContainer: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: Spacing.xSmall_8,
        marginRight: Spacing.xSmall_8,
    },
    floatingBorder: {
        borderRadius: 4,
        // Stop the square corners of the inner container from
        // flowing out of the rounded corners of the outer container.
        overflow: "hidden",
    },
});

export default Banner;
