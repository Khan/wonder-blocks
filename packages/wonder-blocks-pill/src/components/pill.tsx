import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {mix} from "@khanacademy/wonder-blocks-tokens";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    Body,
    LabelSmall,
    LabelXSmall,
} from "@khanacademy/wonder-blocks-typography";
import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";
import type {ClickableRole} from "@khanacademy/wonder-blocks-clickable";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import type {Typography} from "@khanacademy/wonder-blocks-typography";

export type PillKind =
    | "neutral"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "critical"
    | "transparent";

export type PillSize = "small" | "medium" | "large";

type Props = AriaProps & {
    /**
     * The unique identifier for the pill.
     */
    id?: string;
    /**
     * The text to display within the pill.
     */
    children: string | React.ReactElement<React.ComponentProps<Typography>>;
    /**
     * Determines the color of the pill. Defaults to "neutral".
     * Neutral pills are gray, accent pills are blue.
     */
    kind?: PillKind;
    /**
     * The size of the pill. Defaults to "small".
     * Size of pill. A small pill has more of a classic “badge”
     * look and fully fits within a line of body text inline,
     * whereas a large pill contains normal body font size.
     */
    size?: PillSize;
    /**
     * The role the pill should have depending on its behavior.
     * By default, it has none. If pill is Clickable, this is automatically
     * set to “button".
     *
     * Role should be set according to the pill's behavior. For example,
     * if the pill is used as a tab in a tabbed panel, set its role to "tab".
     * If pills are being selected or deselected from a list, they should
     * probably have a role of "checkbox".
     */
    role?: ClickableRole;
    /**
     * Called when the pill is clicked.
     */
    onClick?: () => unknown;
    /**
     * Custom styles to add to this pill component.
     */
    style?: StyleType;
    /**
     * The tab index of the pill (clickable only).
     */
    tabIndex?: number;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
};

const PillInner = (props: {
    children: string | React.ReactElement<React.ComponentProps<Typography>>;
    size: PillSize;
}) => {
    const {children, size} = props;

    if (typeof children !== "string") {
        return children;
    }

    if (size === "small") {
        return <LabelXSmall>{props.children}</LabelXSmall>;
    }

    if (size === "large") {
        return <Body>{children}</Body>;
    }

    return <LabelSmall>{children}</LabelSmall>;
};

/**
 * A `Pill` component displays text in a rounded, colored container. This is
 * usually used to add label tags or indicate a status.
 *
 * ### Usage
 *
 * ```jsx
 * import Pill from "@khanacademy/wonder-blocks-pill";
 *
 * <Pill text="Hello, world!" />
 * ```
 */
const Pill = React.forwardRef(function Pill(
    props: Props,
    ref: React.ForwardedRef<HTMLElement | HTMLButtonElement>,
) {
    const {
        id,
        children,
        kind = "neutral",
        size = "medium",
        role,
        onClick,
        style,
        tabIndex,
        testId,
        ...ariaProps
    } = props;

    let wrapperSizeStyle;

    switch (size) {
        case "small":
            wrapperSizeStyle = pillStyles.wrapperSmall;
            break;
        case "large":
            wrapperSizeStyle = pillStyles.wrapperLarge;
            break;
        default:
            wrapperSizeStyle = pillStyles.wrapperMedium;
    }

    const colorStyles = _generateColorStyles(!!onClick, kind);

    const defaultStyles = [
        pillStyles.wrapper,
        colorStyles.pill,
        wrapperSizeStyle,
    ];

    if (onClick) {
        return (
            <Clickable
                id={id}
                role={role}
                onClick={onClick}
                style={[defaultStyles, colorStyles.clickableWrapper, style]}
                testId={testId}
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
                tabIndex={tabIndex}
                {...ariaProps}
            >
                {() => <PillInner size={size}>{children}</PillInner>}
            </Clickable>
        );
    }

    return (
        <View
            id={id}
            role={role}
            style={[defaultStyles, style]}
            testId={testId}
            ref={ref as React.ForwardedRef<HTMLElement>}
            {...ariaProps}
        >
            <PillInner size={size}>{children}</PillInner>
        </View>
    );
});

const pillStyles = StyleSheet.create({
    wrapper: {
        display: "inline-flex",
        width: "fit-content",
    },
    wrapperSmall: {
        paddingLeft: tokens.spacing.xSmall_8,
        paddingRight: tokens.spacing.xSmall_8,
        borderRadius: tokens.spacing.xxSmall_6,
        height: 20,
    },
    wrapperMedium: {
        paddingLeft: tokens.spacing.xSmall_8,
        paddingRight: tokens.spacing.xSmall_8,
        borderRadius: tokens.spacing.xxSmall_6,
        // Minimum tap area recommendation for a11y
        height: tokens.spacing.large_24,
    },
    wrapperLarge: {
        paddingLeft: tokens.spacing.small_12,
        paddingRight: tokens.spacing.small_12,
        paddingTop: tokens.spacing.xxSmall_6,
        paddingBottom: tokens.spacing.xxSmall_6,
        borderRadius: tokens.spacing.large_24,
        height: tokens.spacing.xLarge_32,
    },
});

const styles: Record<string, any> = {};

const _generateColorStyles = (clickable: boolean, kind: PillKind) => {
    const pillType = `${kind}-${clickable.toString()}`;
    if (styles[pillType]) {
        return styles[pillType];
    }

    let backgroundColor;

    switch (kind) {
        case "accent":
            backgroundColor = tokens.color.blue;
            break;
        case "info":
            backgroundColor = tokens.color.fadedBlue16;
            break;
        case "success":
            backgroundColor = tokens.color.fadedGreen16;
            break;
        case "warning":
            backgroundColor = tokens.color.fadedGold16;
            break;
        case "critical":
            backgroundColor = tokens.color.fadedRed16;
            break;
        case "transparent":
            backgroundColor = "transparent";
            break;
        case "neutral":
        default:
            backgroundColor = tokens.color.offBlack8;
    }

    const activeColor =
        kind === "neutral" || kind === "transparent"
            ? tokens.color.offBlack16
            : mix(tokens.color.offBlack32, backgroundColor);

    const textColor =
        kind === "accent" ? tokens.color.white : tokens.color.offBlack;
    const outlineColor =
        kind === "critical" ? tokens.color.red : tokens.color.blue;
    const activeOutlineColor =
        kind === "critical" ? tokens.color.activeRed : tokens.color.activeBlue;

    const outline =
        kind === "transparent"
            ? `1px solid ${tokens.color.offBlack16}`
            : "none";

    const colorStyles: StyleDeclaration = {
        pill: {
            backgroundColor: backgroundColor,
            outline,
            color: textColor,
            alignItems: "center",
            justifyContent: "center",
        },
        clickableWrapper: {
            outline,

            ":hover": {
                outline: `2px solid ${outlineColor}`,
                outlineOffset: tokens.spacing.xxxxSmall_2,
            },
            ":active": {
                backgroundColor: activeColor,
                outline: `2px solid ${activeOutlineColor}`,
                outlineOffset: tokens.spacing.xxxxSmall_2,
            },
            ":focus-visible": {
                outline: `2px solid ${outlineColor}`,
                outlineOffset: tokens.spacing.xxxxSmall_2,
            },
        },
    };

    styles[pillType] = StyleSheet.create(colorStyles);
    return styles[pillType];
};

export default Pill;
