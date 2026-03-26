import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {
    useAnimationFrame,
    useInterval,
    ClearPolicy,
    SchedulePolicy,
} from "@khanacademy/wonder-blocks-timing";
import {Body} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Timing / useAnimationFrame",

    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

/**
 * The primary use case: a continuous animation loop using OnDemand +
 * ClearPolicy.Resolve. The loop starts on demand and stopping with Resolve
 * fires one final callback before halting — useful for settling animation
 * state cleanly.
 */
export const OnDemandAndResolveOnClear = () => {
    const [frameCount, setFrameCount] = React.useState(0);
    const [frameSet, setFrameSet] = React.useState(false);
    const runningRef = React.useRef(false);

    // Clear the running flag before the animation frame cleanup fires so that
    // ClearPolicy.Resolve's final callback doesn't re-schedule on unmount.
    React.useEffect(
        () => () => {
            runningRef.current = false;
        },
        [],
    );

    const animationFrame = useAnimationFrame(
        () => {
            setFrameCount((n) => n + 1);
            // Only continue the loop if we're still running. When
            // ClearPolicy.Resolve fires the final callback on stop,
            // runningRef.current is already false, preventing re-scheduling.
            if (runningRef.current) {
                animationFrame.set();
            }
        },
        {
            clearPolicy: ClearPolicy.Resolve,
            schedulePolicy: SchedulePolicy.OnDemand,
        },
    );

    useInterval(() => {
        // Poll isSet since it is not driven by React state.
        setFrameSet(animationFrame.isSet);
    }, 100);

    const handleStart = () => {
        runningRef.current = true;
        animationFrame.set();
    };

    const handleStop = () => {
        runningRef.current = false;
        // ClearPolicy.Resolve fires one final callback before stopping
        animationFrame.clear();
    };

    return (
        <View>
            <Body>
                Loop does not start on mount (OnDemand). Stopping with
                ClearPolicy.Resolve fires one final callback.
            </Body>
            <View>isSet = {String(frameSet)}</View>
            <View>frameCount = {frameCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={handleStart}>Start</Button>
                <Button onClick={handleStop}>Stop (resolve)</Button>
            </View>
        </View>
    );
};

/**
 * The default schedule policy: the frame fires automatically on mount without
 * needing to call set(). Useful for deferring a one-time DOM read/write to
 * just before the first paint.
 */
export const Immediately = () => {
    const [callCount, setCallCount] = React.useState(0);
    const callback = React.useCallback(() => {
        setCallCount((c) => c + 1);
    }, []);
    const animationFrame = useAnimationFrame(callback);
    return (
        <View>
            <Body>
                Frame fires immediately on mount unless set again or cleared
            </Body>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => animationFrame.set()}>Set frame</Button>
                <Button onClick={() => animationFrame.clear()}>
                    Clear frame
                </Button>
            </View>
        </View>
    );
};

/**
 * Use SchedulePolicy.OnDemand to defer a single unit of work to just before
 * the next paint. Unlike the animation loop, this fires once and stops.
 */
export const OneShot = () => {
    const [lastFired, setLastFired] = React.useState<string>("—");
    const animationFrame = useAnimationFrame(
        () => {
            setLastFired(new Date().toISOString());
        },
        {schedulePolicy: SchedulePolicy.OnDemand},
    );
    return (
        <View>
            <Body>
                Fires once per click — useful for deferring a DOM read/write to
                just before the next paint.
            </Body>
            <View>Last fired: {lastFired}</View>
            <Button onClick={() => animationFrame.set()}>
                Request animation frame
            </Button>
        </View>
    );
};
