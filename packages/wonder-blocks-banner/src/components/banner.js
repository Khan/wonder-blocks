// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";
import Link from "@khanacademy/wonder-blocks-link";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";

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

type ActionTrigger = {|
    title: string,
    onClick?: () => void,
    href?: string,
    ariaLabel?: string,
|};

type Props = {|
    /**
     * Determines the color and icon of the banner.
     */
    kind?: BannerKind,

    /**
     * Determines the edge style of the Banner.
     */
    layout?: BannerLayout,

    /**
     * Text on the banner (LabelSmall) or a node if you want something different
     */
    text: string | React.Node,

    /**
     * Links or tertiary Buttons that appear to the right of the text.
     *
     * The ActionTrigger must have either an onClick or an href field, or both.
     */
    actions?: Array<ActionTrigger>,

    /**
     * If present, dismiss button is on right side. If not, no button appears
     */
    onDismiss?: ?() => void,
|};

const colorForKind = (kind: BannerKind) => {
    switch (kind) {
        case "info":
            return Color.blue;
        case "success":
            return Color.green;
        case "warning":
            return Color.gold;
        case "critical":
            return Color.red;
        default:
            return Color.blue;
    }
};

// TODO(WB-1409): Use Phosphor icons instead of custom svgs. Also, use
// Wonder Blocks Icon instead of img in the render fucntion.
const iconForKind = (kind: BannerKind) => {
    switch (kind) {
        case "info":
            return "/info.svg";
        case "success":
            return "/success.svg";
        case "warning":
            return "/warning.svg";
        case "critical":
            return "/critical.svg";
        default:
            return "/info.svg";
    }
};

/**
 * Banner. A banner displays a prominent message and related optional actions.
 * It can be used as a way of informing the user of important changes.
 * Typically, it is displayed toward the top of the screen.
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
    const {actions, onDismiss, kind, layout = "full-width", text} = props;
    const layoutstyle = {
        borderRadius: layout && layout === "full-width" ? 0 : 4,
    };

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
                        >
                            {action.title}
                        </Link>
                    </View>
                );
            } else if (action.onClick) {
                return (
                    <View style={styles.action} key={action.title}>
                        <Button
                            kind="tertiary"
                            size="medium"
                            aria-label={action.ariaLabel ?? action.title}
                            onClick={handleClick}
                        >
                            {action.title}
                        </Button>
                    </View>
                );
            } else {
                throw new Error(
                    "An action must have an href or an onClick field.",
                );
            }
        });
    };

    return (
        <View
            style={[
                styles.containerOuter,
                layoutstyle,
                {borderInlineStartColor: colorForKind(kind ?? "info")},
            ]}
        >
            <View
                style={[
                    styles.backgroundColor,
                    layoutstyle,
                    {backgroundColor: colorForKind(kind ?? "info")},
                ]}
            />
            <View style={styles.containerInner}>
                <img
                    src={iconForKind(kind ?? "info")}
                    alt={kind}
                    className={css(styles.icon)}
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
                    <IconButton
                        icon={icons.dismiss}
                        kind={"tertiary"}
                        onClick={onDismiss}
                        style={styles.dismiss}
                    />
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
        minHeight: 56,
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
        marginInlineStart: Spacing.xxxxSmall_2,
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
        marginLeft: Spacing.xSmall_8,
        marginRight: Spacing.xSmall_8,
        paddingInlineStart: Spacing.xSmall_8,
    },
    labelContainer: {
        flexShrink: 1,
        marginTop: Spacing.small_12,
        marginBottom: 10,
        marginInlineEnd: Spacing.medium_16,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    action: {
        marginInlineEnd: Spacing.medium_16,
        justifyContent: "center",
    },
    dismiss: {
        flexShrink: 1,
        top: Spacing.xSmall_8,
        marginInlineEnd: Spacing.xSmall_8,
    },
});

export default Banner;
