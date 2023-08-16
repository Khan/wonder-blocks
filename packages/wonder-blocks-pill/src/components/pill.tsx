import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color, {mix} from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, LabelXSmall} from "@khanacademy/wonder-blocks-typography";
import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";
import type {ClickableRole} from "@khanacademy/wonder-blocks-clickable";

type Props = AriaProps & {
    /**
     * The unique identifier for the pill.
     */
    id?: string;
    /**
     * The text to display within the pill.
     */
    children: string | React.ReactElement<typeof Link>;
    /**
     * Determines the color of the pill. Defaults to "neutral".
     * Neutral pills are gray, accent pills are blue.
     */
    kind?: "neutral" | "accent";
    /**
     * The size of the pill. Defaults to "small".
     * Small has more of a classic “badge” look and fits inline, whereas
     * large has normal body font size and is not meant to be inline.
     */
    size?: "small" | "large";
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
     * Option test ID for e2e testing.
     */
    testId?: string;
};

const PillInner = (props: {
    children: string | React.ReactElement<typeof Link>;
    size: "small" | "large";
}) => {
    if (props.size === "small") {
        return <LabelXSmall>{props.children}</LabelXSmall>;
    }

    return <Body>{props.children}</Body>;
};

/**
 * A large pill displays text in a rounded container. This contains text
 * the same size as body text. It can be clickable. It is not meant to
 * be used inline.
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
    ref: React.ForwardedRef<
        HTMLElement | HTMLButtonElement | HTMLAnchorElement
    >,
) {
    const {
        id,
        children,
        kind = "neutral",
        size = "small",
        role,
        onClick,
        style,
        testId,
    } = props;

    const wrapperSizeStyle =
        size === "small" ? pillStyles.wrapperSmall : pillStyles.wrapperLarge;
    const colorStyles = _generateColorStyles(!!onClick, kind, size);

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
        >
            <PillInner size={size}>{children}</PillInner>
        </View>
    );
});

const styles: Record<string, any> = {};

const pillStyles = StyleSheet.create({
    wrapper: {
        display: "inline-flex",
        width: "fit-content",
    },
    wrapperSmall: {
        paddingLeft: Spacing.xSmall_8,
        paddingRight: Spacing.xSmall_8,
        borderRadius: Spacing.xxxSmall_4,
    },
    wrapperLarge: {
        padding: Spacing.small_12,
        borderRadius: Spacing.large_24,
    },
});

const _generateColorStyles = (
    clickable: boolean,
    kind: "neutral" | "accent",
    size: "small" | "large",
) => {
    const pillType = `${kind}-${clickable.toString()}-${size.toString()}`;

    const activeAccentColor = mix(Color.offBlack16, Color.blue);

    const currentBackgroundColor =
        kind === "accent" ? Color.blue : Color.offBlack8;
    const currentTextColor = kind === "accent" ? Color.white : Color.offBlack;
    const currentActiveColor =
        kind === "accent" ? activeAccentColor : Color.offBlack16;

    const colorStyles: StyleDeclaration = {
        pill: {
            backgroundColor: currentBackgroundColor,
            color: currentTextColor,
        },
        clickableWrapper: {
            outline: "none",
            ":hover": {
                outline: `2px solid ${Color.blue}`,
                outlineOffset: 2,
            },
            ":active": {
                backgroundColor: currentActiveColor,
                outline: `2px solid ${activeAccentColor}`,
                outlineOffset: 2,
            },
            ":focus-visible": {
                outline: `2px solid ${Color.blue}`,
                outlineOffset: 2,
            },
        },
    };

    styles[pillType] = StyleSheet.create(colorStyles);
    return styles[pillType];
};

export default Pill;
