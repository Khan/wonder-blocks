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

type Props = {|
    /**
     * Determines the color and icon of the banner.
     */
    kind: BannerKind,

    /**
     * Determines the edge style of the Banner.
     */
    layout: BannerLayout,

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
    const {actions, onDismiss, kind, layout, text} = props;
    const layoutStyle = {
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
            } else {
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
            }
        });
    };

    return (
        <View
            style={[
                styles.containerOuter,
                layoutStyle,
                {borderInlineStartColor: colorForKind(kind ?? "info")},
            ]}
        >
            <View
                style={[
                    styles.backgroundColor,
                    layoutStyle,
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
                    <View style={styles.dismissContainer}>
                        <IconButton
                            icon={icons.dismiss}
                            kind={"tertiary"}
                            onClick={onDismiss}
                            style={styles.dismiss}
                        />
                    </View>
                ) : null}
            </View>
        </View>
    );
};

type DefaultProps = {|
    layout: Props["layout"],
    kind: Props["kind"],
|};

const defaultProps: DefaultProps = {layout: "full-width", kind: "info"};
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
});

export default Banner;
