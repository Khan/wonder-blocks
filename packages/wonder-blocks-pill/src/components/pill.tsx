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

const {semanticColor} = tokens;

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
            backgroundColor = semanticColor.status.notice.foreground;
            break;
        case "info":
            backgroundColor = semanticColor.status.notice.background;
            break;
        case "success":
            backgroundColor = semanticColor.status.success.background;
            break;
        case "warning":
            backgroundColor = semanticColor.status.warning.background;
            break;
        case "critical":
            backgroundColor = semanticColor.status.critical.background;
            break;
        case "transparent":
            backgroundColor = "transparent";
            break;
        case "neutral":
        default:
            backgroundColor = semanticColor.status.neutral.background;
    }

    const pressColor =
        kind === "transparent"
            ? semanticColor.status.neutral.background
            : // NOTE(WB-1880): This will be simplified once we split this into Badge and Pill.
              mix(tokens.color.offBlack32, backgroundColor);

    const textColor =
        kind === "accent"
            ? semanticColor.text.inverse
            : semanticColor.text.primary;

    const theme = {
        default: {
            border:
                kind === "transparent"
                    ? `1px solid ${semanticColor.border.primary}`
                    : "none",
            background: backgroundColor,
            foreground: textColor,
        },
        focus: {
            border: semanticColor.border.focus,
        },
        hover: {
            border: semanticColor.border.focus,
        },
        press: {
            border: semanticColor.action.filled.progressive.press.border,
            background: pressColor,
        },
    };

    const colorStyles: StyleDeclaration = {
        pill: {
            backgroundColor: theme.default.background,
            outline: theme.default.border,
            color: theme.default.foreground,
            alignItems: "center",
            justifyContent: "center",
        },
        clickableWrapper: {
            outline: theme.default.border,

            ":hover": {
                outline: `2px solid ${theme.hover.border}`,
                outlineOffset: tokens.spacing.xxxxSmall_2,
            },
            ":active": {
                backgroundColor: theme.press.background,
                outline: `2px solid ${theme.press.border}`,
                outlineOffset: tokens.spacing.xxxxSmall_2,
            },
            ":focus-visible": {
                outline: `2px solid ${theme.focus.border}`,
                outlineOffset: tokens.spacing.xxxxSmall_2,
            },
        },
    };

    styles[pillType] = StyleSheet.create(colorStyles);
    return styles[pillType];
};

export default Pill;
