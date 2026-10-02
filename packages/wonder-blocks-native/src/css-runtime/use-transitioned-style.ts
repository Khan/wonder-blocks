import * as React from "react";
import {AccessibilityInfo, Animated, Easing} from "react-native";

import type {RNStyle} from "./css-to-rn";
import type {NativeTransition} from "./transitions";

/**
 * Tracks the OS "reduce motion" setting. Defaults to `false` until the
 * (async) platform query answers.
 */
export const useReducedMotion = (): boolean => {
    const [reduceMotion, setReduceMotion] = React.useState(false);

    React.useEffect(() => {
        let cancelled = false;
        AccessibilityInfo.isReduceMotionEnabled()
            .then((enabled) => {
                if (!cancelled) {
                    setReduceMotion(enabled);
                }
                return enabled;
            })
            // Unknown: keep animating, matching the CSS default.
            .catch(() => false);
        const subscription = AccessibilityInfo.addEventListener(
            "reduceMotionChanged",
            setReduceMotion,
        );
        return () => {
            cancelled = true;
            subscription?.remove();
        };
    }, []);

    return reduceMotion;
};

/**
 * The native counterpart of CSS `transition`: returns `style` with every
 * transitioned numeric property replaced by an `Animated.Value` that eases
 * towards the new value whenever it changes.
 *
 * The first render uses the target values directly (CSS doesn't transition
 * on mount either), and the animation is skipped when the user has asked
 * the OS to reduce motion.
 *
 * Animations run on the JS thread (`useNativeDriver: false`) because the
 * native driver only supports `transform` and `opacity`.
 */
export const useTransitionedStyle = (
    style: RNStyle,
    transitions: ReadonlyArray<NativeTransition>,
): RNStyle => {
    const reduceMotion = useReducedMotion();
    const valuesRef = React.useRef(new Map<string, Animated.Value>());
    // The last target each value was sent to, so we only animate on change.
    const targetsRef = React.useRef(new Map<string, number>());

    const animated: Array<{
        key: string;
        target: number;
        transition: NativeTransition;
    }> = [];
    for (const transition of transitions) {
        for (const key of transition.keys) {
            const target = style[key];
            if (typeof target === "number") {
                animated.push({key, target, transition});
                if (!valuesRef.current.has(key)) {
                    valuesRef.current.set(key, new Animated.Value(target));
                }
            }
        }
    }

    // Only re-run the effect when a target actually changes.
    const targetsKey = animated
        .map(({key, target}) => `${key}:${target}`)
        .join();

    React.useEffect(() => {
        const running = animated.map(({key, target, transition}) => {
            const value = valuesRef.current.get(key)!;
            const previous = targetsRef.current.get(key);
            targetsRef.current.set(key, target);
            if (previous === undefined || previous === target) {
                // Unchanged, but the cleanup below may have stopped this
                // value mid-animation when a *different* key (or the
                // reduce-motion setting) changed; land it on its target.
                value.setValue(target);
                return null;
            }
            if (reduceMotion) {
                value.setValue(target);
                return null;
            }
            const animation = Animated.timing(value, {
                toValue: target,
                duration: transition.durationMs,
                delay: transition.delayMs,
                easing: Easing.bezier(...transition.easing),
                useNativeDriver: false,
            });
            animation.start();
            return animation;
        });
        return () => {
            for (const animation of running) {
                animation?.stop();
            }
        };
        // `animated` is derived from `targetsKey`.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetsKey, reduceMotion]);

    if (!animated.length) {
        return style;
    }
    const result: RNStyle = {...style};
    for (const {key} of animated) {
        result[key] = valuesRef.current.get(key);
    }
    return result;
};
