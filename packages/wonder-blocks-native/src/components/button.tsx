import * as React from "react";
import {Animated, Pressable, Text} from "react-native";
import type {
    GestureResponderEvent,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";

// Type-only: web WB packages inject `require("./index.css")` into their JS,
// which Metro can't resolve, so native code must never import them at
// runtime. `import type` is erased, so sharing the prop vocabulary is free.
import type {ButtonProps as WebButtonProps} from "@khanacademy/wonder-blocks-button";

import {splitTextStyle} from "../css-runtime/resolve";
import {useTransitionedStyle} from "../css-runtime/use-transitioned-style";
import bodyTextSheet from "../generated/body-text.native-styles";
import buttonSheet from "../generated/button.native-styles";
import buttonUnstyledSheet from "../generated/button-unstyled.native-styles";
import {useNativeStyle} from "../theme/native-theme";

type Props = {
    /**
     * Text to appear on the button.
     */
    children: string;
    /**
     * The kind of the button, either primary, secondary, or tertiary.
     */
    kind?: NonNullable<WebButtonProps["kind"]>;
    /**
     * The action type of the button. Determines its colour.
     */
    actionType?: NonNullable<WebButtonProps["actionType"]>;
    /**
     * The size of the button.
     */
    size?: NonNullable<WebButtonProps["size"]>;
    /**
     * Whether the button is disabled. Screen readers still reach the button
     * and announce it as disabled.
     */
    disabled?: boolean;
    /**
     * Called when the button is pressed (not called while disabled).
     */
    onPress?: () => void;
    /**
     * Accessible label, if the visible text isn't descriptive enough.
     */
    "aria-label"?: string;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Custom styles for the root element.
     */
    style?: StyleProp<ViewStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Minimum touch target (Apple HIG: 44pt; Material: 48dp). */
const MIN_TOUCH_TARGET = 44;

const LABEL_CLASS = {
    small: "smallMedium",
    medium: "mediumMedium",
    large: "mediumBold",
} as const;

/**
 * SPIKE (FEI-8331): a React Native `Button` styled entirely from the web
 * `button.module.css`, compiled to data at build time.
 *
 * The props mirror the web `Button` (minus web-only concerns like `href`,
 * `target` and `skipClientNav`).
 */
export const Button = React.forwardRef(function Button(
    props: Props,
    ref: React.ForwardedRef<React.ElementRef<typeof Pressable>>,
) {
    const {
        children,
        kind = "primary",
        actionType = "progressive",
        size = "medium",
        disabled = false,
        onPress,
        testId,
        style,
        "aria-label": ariaLabel,
    } = props;

    const [pressed, setPressed] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    // Mirrors the browser's `:focus-visible` heuristic: focus that comes
    // from a pointer/touch press doesn't show the focus styles (otherwise
    // the focus rule would override the press styles on every tap, e.g.
    // SYL tertiary's press ring). Keyboard presses keep focus visible.
    const [focusFromPointer, setFocusFromPointer] = React.useState(false);
    const focusVisible = focused && !focusFromPointer;

    const handlePressIn = (event: GestureResponderEvent) => {
        setPressed(true);
        // react-native-web reports keyboard presses with the DOM keydown
        // event; everything else is a pointer or touch.
        const {type} = event.nativeEvent as {type?: string};
        if (type !== "keydown" && type !== "keyup") {
            setFocusFromPointer(true);
        }
    };

    // Same class list `button-core.tsx` builds on web.
    const buttonElement = {
        classes: [
            "reset",
            "button",
            kind,
            actionType,
            size === "small" && "small",
            size === "large" && "large",
        ],
        states: {
            hover: hovered,
            press: pressed,
            focus: focusVisible,
            disabled,
        },
    };
    const root = useNativeStyle(
        [buttonUnstyledSheet, buttonSheet],
        buttonElement,
    );

    const label = useNativeStyle([bodyTextSheet, buttonSheet], {
        classes: [
            "bodyText",
            LABEL_CLASS[size],
            "text",
            size === "small" && "smallText",
            size === "large" && "largeText",
        ],
        ancestors: [buttonElement],
        inherited: root.inherited,
    });

    const {view: rootViewStyle} = splitTextStyle(root.style);

    // Small buttons are 26pt (SYL) / 32pt (default) tall; extend the touch
    // target without changing the layout.
    const height =
        typeof rootViewStyle.height === "number" ? rootViewStyle.height : 0;
    const slop = Math.max(0, (MIN_TOUCH_TARGET - height) / 2);

    // e.g. SYL's `transition: border-radius 0.1s ease-in-out` (the corners
    // soften from 8px to 12px while pressed).
    const animatedRootStyle = useTransitionedStyle(
        rootViewStyle,
        root.transitions,
    );

    return (
        <AnimatedPressable
            ref={ref}
            role="button"
            aria-label={ariaLabel}
            // Unlike web (which uses `aria-disabled` to stay in the tab
            // order), native screen readers still reach `disabled` elements
            // and announce them as dimmed, so we use the platform idiom.
            disabled={disabled}
            testID={testId}
            hitSlop={slop ? {top: slop, bottom: slop} : undefined}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={() => setPressed(false)}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
                setFocused(false);
                setFocusFromPointer(false);
            }}
            style={[animatedRootStyle as ViewStyle, style]}
        >
            <Text
                numberOfLines={1}
                style={label.style as TextStyle}
                testID={testId ? `${testId}-inner-label` : undefined}
            >
                {children}
            </Text>
        </AnimatedPressable>
    );
});
