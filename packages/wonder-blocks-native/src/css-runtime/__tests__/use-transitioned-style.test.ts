import {act, renderHook} from "@testing-library/react";
import {AccessibilityInfo, Animated} from "react-native";

import {useTransitionedStyle} from "../use-transitioned-style";
import type {NativeTransition} from "../transitions";

// NOTE: react-native-web swaps in `AnimatedMock` under test
// (`Platform.isTesting`), which jumps straight to the end value. So these
// tests assert on what we hand to `Animated.timing`, not on frames; the
// animation itself is exercised in Storybook.

const transitions: Array<NativeTransition> = [
    {
        keys: ["borderTopLeftRadius"],
        durationMs: 100,
        delayMs: 0,
        easing: [0.42, 0, 0.58, 1],
    },
];

/** Render at 8px, let the reduce-motion query settle, then retarget. */
const renderAndRetarget = async () => {
    const {result, rerender} = renderHook(
        ({radius}) =>
            useTransitionedStyle({borderTopLeftRadius: radius}, transitions),
        {initialProps: {radius: 8}},
    );
    await act(() => Promise.resolve());
    rerender({radius: 12});
    return result;
};

describe("useTransitionedStyle", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should pass non-transitioned styles through untouched", () => {
        // Arrange
        const style = {height: 40, backgroundColor: "red"};

        // Act
        const {result} = renderHook(() => useTransitionedStyle(style, []));

        // Assert
        expect(result.current).toBe(style);
    });

    it("should not animate on the first render", () => {
        // Arrange
        const timingSpy = jest.spyOn(Animated, "timing");

        // Act
        renderHook(() =>
            useTransitionedStyle({borderTopLeftRadius: 8}, transitions),
        );

        // Assert
        expect(timingSpy).not.toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({toValue: 8}),
        );
    });

    it("should animate to the new value with the CSS duration", async () => {
        // Arrange
        jest.spyOn(
            AccessibilityInfo,
            "isReduceMotionEnabled",
        ).mockResolvedValue(false);
        const timingSpy = jest.spyOn(Animated, "timing");

        // Act
        await renderAndRetarget();

        // Assert
        expect(timingSpy).toHaveBeenLastCalledWith(
            expect.anything(),
            expect.objectContaining({
                toValue: 12,
                duration: 100,
                useNativeDriver: false,
            }),
        );
    });

    it("should not animate when reduce motion is on", async () => {
        // Arrange
        jest.spyOn(
            AccessibilityInfo,
            "isReduceMotionEnabled",
        ).mockResolvedValue(true);
        const timingSpy = jest.spyOn(Animated, "timing");

        // Act
        await renderAndRetarget();

        // Assert
        expect(timingSpy).not.toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({toValue: 12}),
        );
    });
});
