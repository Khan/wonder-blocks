import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {
    useInterval,
    ClearPolicy,
    SchedulePolicy,
} from "@khanacademy/wonder-blocks-timing";
import {Body} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Timing / useInterval",

    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const Immediately = () => {
    const [callCount, setCallCount] = React.useState(0);
    const [intervalSet, setIntervalSet] = React.useState(false);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    const interval = useInterval(callback, 1000);
    useInterval(() => {
        // Need to update on an interval as the returned `isSet` value is not
        // driven by React state.
        setIntervalSet(interval.isSet);
    }, 100);
    return (
        <View>
            <Body>
                Interval should fire every second until cleared. Setting the
                interval again resets the interval.
            </Body>
            <View>isSet = {String(intervalSet)}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => interval.set()}>Set interval</Button>
                <Button onClick={() => interval.clear()}>Clear interval</Button>
            </View>
        </View>
    );
};

export const OnDemandAndResolveOnClear = () => {
    const [callCount, setCallCount] = React.useState(0);
    const [intervalSet, setIntervalSet] = React.useState(false);
    const callback = React.useCallback(() => {
        setCallCount((callCount) => callCount + 1);
    }, []);
    const interval = useInterval(callback, 1000, {
        clearPolicy: ClearPolicy.Resolve,
        schedulePolicy: SchedulePolicy.OnDemand,
    });
    useInterval(() => {
        // Need to update on an interval as the returned `isSet` value is not
        // driven by React state.
        setIntervalSet(interval.isSet);
    }, 100);
    return (
        <View>
            <Body>
                Interval will not start until set is explicitly invoked.
                Interval should fire every second until cleared. Clearing the
                interval will invoke the interval action one more time. Setting
                the interval again resets the interval.
            </Body>
            <View>isSet = {String(intervalSet)}</View>
            <View>callCount = {callCount}</View>
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => interval.set()}>Set interval</Button>
                <Button onClick={() => interval.clear()}>Clear interval</Button>
            </View>
        </View>
    );
};
