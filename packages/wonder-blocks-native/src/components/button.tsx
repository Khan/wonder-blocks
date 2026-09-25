import * as React from "react";
import {Pressable, Text} from "react-native";
import type {
    LayoutChangeEvent,
    PressableProps,
    StyleProp,
    TextProps,
    View,
    ViewStyle,
} from "react-native";
import {styled, useCssElement} from "react-native-css/native";

// Type-only: web WB packages inject `require("./index.css")` into their JS,
// which Metro can't resolve, so native code must never import them at
// runtime. `import type` is erased, so sharing the prop vocabulary is free.
import type {ButtonProps as WebButtonProps} from "@khanacademy/wonder-blocks-button";

import {ensureStyles} from "../theme/native-theme";

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

/**
 * `react-native-css` wrappers: `className` is resolved against the compiled
 * rules and merged into `style`. For a `Pressable`, `react-native-css` also
 * wires `onPressIn/Out`, `onHoverIn/Out` and `onFocus/Blur` itself whenever a
 * matching rule uses `:active`, `:hover` or `:focus`, so the component
 * doesn't track any interaction state.
 *
 * The root uses `useCssElement` rather than `styled()`: `styled()` returns a
 * plain function component, which only receives `ref` as a prop on React 19.
 * Passing `ref` inside the props object works on React 18 too, because
 * `react-native-css` hands the props to `createElement` unchanged.
 */
const PRESSABLE_MAPPING = {className: "style"} as const;
// `useCssElement`'s generic props type is too complex for TS to check
// against `Pressable` (TS2590), so pin it to the shapes we use.
const useCssPressable = useCssElement as unknown as (
    component: typeof Pressable,
    props: PressableProps & {className: string; ref: React.Ref<View>},
    mapping: typeof PRESSABLE_MAPPING,
) => React.ReactElement;
const CssText = styled(Text, {className: "style"}) as (
    props: TextProps & {className: string},
) => React.ReactElement;

/** Minimum touch target (Apple HIG: 44pt; Material: 48dp). */
const MIN_TOUCH_TARGET = 44;

/** The `BodyText` variant class `button-core.tsx` uses for each size. */
const LABEL_CLASS = {
    small: "smallMedium",
    medium: "mediumMedium",
    large: "mediumBold",
} as const;

const cx = (...names: Array<string | false>) => names.filter(Boolean).join(" ");

/**
 * SPIKE (FEI-8331, option D): a React Native `Button` styled from the web
 * `button.module.css` through `react-native-css`.
 *
 * Class names are the web CSS Modules class names, prefixed with their sheet
 * name (see `build/compile-css.ts`). The props mirror the web `Button`
 * (minus web-only concerns like `href`, `target` and `skipClientNav`).
 */
export const Button = React.forwardRef(function Button(
    props: Props,
    ref: React.ForwardedRef<View>,
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

    ensureStyles();

    // Small buttons are 26pt (SYL) / 32pt (default) tall. The height comes
    // out of `react-native-css`, so measure it rather than guess, and extend
    // the touch target without changing the layout.
    const [height, setHeight] = React.useState<number | null>(null);
    const handleLayout = (e: LayoutChangeEvent) =>
        setHeight(e.nativeEvent.layout.height);
    const slop =
        height == null ? 0 : Math.max(0, (MIN_TOUCH_TARGET - height) / 2);

    const pressableProps: Parameters<typeof useCssPressable>[1] = {
        ref,
        // Same class list `button-core.tsx` builds on web.
        className: cx(
            "button-unstyled__reset",
            "button__button",
            `button__${kind}`,
            `button__${actionType}`,
            size === "small" && "button__small",
            size === "large" && "button__large",
        ),
        role: "button",
        "aria-label": ariaLabel,
        // Unlike web (which uses `aria-disabled` to stay in the tab order),
        // native screen readers still reach `disabled` elements and announce
        // them as dimmed, so we use the platform idiom. The build rewrites
        // `[aria-disabled="true"]` to `:disabled` to match.
        disabled,
        testID: testId,
        hitSlop: slop ? {top: slop, bottom: slop} : undefined,
        onLayout: handleLayout,
        onPress,
        style,
        children: (
            <CssText
                className={cx(
                    "body-text__bodyText",
                    `body-text__${LABEL_CLASS[size]}`,
                    "button__text",
                    size === "small" && "button__smallText",
                    size === "large" && "button__largeText",
                    // Web inherits `color` from the button; RN Text doesn't.
                    "wb-native__inherit-color",
                )}
                numberOfLines={1}
                testID={testId ? `${testId}-inner-label` : undefined}
            >
                {children}
            </CssText>
        ),
    };

    return useCssPressable(Pressable, pressableProps, PRESSABLE_MAPPING);
});
