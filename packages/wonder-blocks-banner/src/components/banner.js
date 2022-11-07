// @flow
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

import * as bannerIcons from "./banner-icons.js";

type ActionTriggerBase = {|
    title: string,
    ariaLabel?: string,
|};

type ActionTriggerWithButton = {|
    ...ActionTriggerBase,
    onClick: () => void,
|};

type ActionTriggerWithLink = {|
    ...ActionTriggerBase,
    href: string,
    onClick?: () => void,
|};

type ActionTrigger = ActionTriggerWithButton | ActionTriggerWithLink;

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

type BannerValues = {|
    color: string,
    role: "status" | "alert",
    ariaLive?: "assertive" | "polite",
|};

type Props = {|
    ariaLabel?: string,
    /**
     * Determines the color and icon of the banner.
     */
    kind: BannerKind,

    /**
     * Determines the edge style of the Banner.
     */
    layout: BannerLayout,

    /**
     * Text on the banner (LabelSmall) or a node if you want something different.
     */
    text: string | React.Node,

    /**
     * Links or tertiary Buttons that appear to the right of the text.
     *
     * The ActionTrigger must have either an onClick or an href field, or both.
     */
    actions?: Array<ActionTrigger>,

    /**
     * If present, dismiss button is on right side. If not, no button appears.
     */
    onDismiss?: ?() => void,

    /**
     * The accessible label for the dismiss button.
     * Please pass in a translated string.
     */
    dismissAriaLabel: string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

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
const Banner = (props: Props): React.Node => {
    const {
        actions,
        ariaLabel,
        dismissAriaLabel,
        onDismiss,
        kind,
        layout,
        text,
        testId,
    } = props;

    const renderActions = () => {
        return actions?.filter(Boolean).map((action) => {
            const handleClick = action.onClick;
            if (action.href) {
                return (
                    <View style={styles.action} key={action.title}>
                        <Link
                            kind="primary"
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

type DefaultProps = {|
    kind: Props["kind"],
    dismissAriaLabel: Props["dismissAriaLabel"],
|};

const defaultProps: DefaultProps = {
    kind: "info",
    dismissAriaLabel: "Dismiss banner.",
};
Banner.defaultProps = defaultProps;

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
        overflow: "hidden",
    },
});

export default Banner;
